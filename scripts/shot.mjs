// Full-page screenshot of a route at an exact viewport width, using the system Edge/Chrome via puppeteer-core.
// Usage: node scripts/shot.mjs <route> <width> <outFile.png> [--clip=y,height] [--click=<css selector>]
//   node scripts/shot.mjs /account 393 C:\tmp\account-393.png
//   node scripts/shot.mjs /account 1920 C:\tmp\menu.png --click="[aria-label='Account menu']"
// Requires the dev server on http://localhost:3100 (npm run dev -- -p 3100).
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const [, , route = "/", width = "1920", out = "shot.png", ...flags] = process.argv;
const opt = Object.fromEntries(flags.map((f) => f.replace(/^--/, "").split(/=(.*)/s).slice(0, 2)));
const executablePath = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
].find((p) => fs.existsSync(p));

const browser = await puppeteer.launch({ executablePath, headless: true, args: ["--hide-scrollbars"] });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: Number(width), height: 900, deviceScaleFactor: 1 });
  await page.goto(`http://localhost:3100${route}`, { waitUntil: "networkidle0", timeout: 120000 });
  await page.evaluate(() => document.fonts.ready);
  if (opt.click) {
    await page.click(opt.click);
    await new Promise((r) => setTimeout(r, 400));
  }
  const shotOpts = { path: path.resolve(out), fullPage: !opt.clip };
  if (opt.clip) {
    const [y, h] = opt.clip.split(",").map(Number);
    shotOpts.clip = { x: 0, y, width: Number(width), height: h };
    shotOpts.captureBeyondViewport = true;
  }
  await page.screenshot(shotOpts);
  const docW = await page.evaluate(() => document.documentElement.scrollWidth);
  console.log("saved", path.resolve(out), docW > Number(width) ? `WARNING horizontal overflow: ${docW}px` : "no overflow");
} finally {
  await browser.close();
}
