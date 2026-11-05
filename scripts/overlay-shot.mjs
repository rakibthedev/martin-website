// Viewport screenshot with a header overlay opened (clicks the VISIBLE trigger — Header renders desktop
// and responsive copies of each button).
// Usage: node scripts/overlay-shot.mjs <route> <width> <out.png> <account|notifications|logout|loggedout> [height]
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const [, , route = "/account", width = "1920", out = "overlay.png", action = "account", height = "900"] = process.argv;
const executablePath = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
].find((p) => fs.existsSync(p));

const clickVisible = (page, selector) =>
  page.evaluate((sel) => {
    const el = [...document.querySelectorAll(sel)].find((e) => e.getClientRects().length > 0);
    if (!el) throw new Error("no visible " + sel);
    el.click();
  }, selector);
const clickText = (page, text) =>
  page.evaluate((t) => {
    const el = [...document.querySelectorAll("button, a")].find(
      (e) => e.textContent.trim() === t && e.getClientRects().length > 0,
    );
    if (!el) throw new Error("no visible " + t);
    el.click();
  }, text);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath, headless: true, args: ["--hide-scrollbars"] });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: Number(width), height: Number(height), deviceScaleFactor: 1 });
  await page.goto(`http://localhost:3100${route}`, { waitUntil: "networkidle0", timeout: 120000 });
  await page.evaluate(() => document.fonts.ready);
  if (action === "notifications") {
    await clickVisible(page, "header [aria-label^='Notifications']");
  } else {
    await clickVisible(page, "header [aria-label='Account menu']");
  }
  await wait(300);
  if (action === "logout" || action === "loggedout") {
    await clickText(page, "Log out");
    await wait(300);
  }
  if (action === "loggedout") {
    await page.evaluate(() => {
      const b = [...document.querySelectorAll("[role=dialog] button")].find((e) => e.textContent.trim() === "Log out");
      b.click();
    });
    await wait(2500);
  }
  await page.screenshot({ path: path.resolve(out) });
  const info = await page.evaluate(() => {
    const card = document.querySelector("header [role=dialog], [role=dialog]");
    const r = card?.getBoundingClientRect();
    return {
      url: location.pathname,
      docW: document.documentElement.scrollWidth,
      card: r ? [r.x, r.y, r.width, r.height].map(Math.round) : null,
      toast: document.querySelector("[role=status]")?.textContent ?? "",
    };
  });
  console.log("saved", path.resolve(out), JSON.stringify(info));
} finally {
  await browser.close();
}
