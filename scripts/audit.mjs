// Audits every route at several widths: horizontal overflow, page height, broken images, console errors.
// Optionally saves full-page screenshots. Usage: node scripts/audit.mjs [outDir]
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const ROUTES = [
  "/", "/firms", "/firms/fundingpips", "/challenges", "/offers", "/compare", "/articles",
  "/articles/how-to-read-a-prop-firm-review", "/referrals", "/leaderboard", "/favourite-firms", "/reviews/new",
  "/choose-firms", "/account", "/account/welcome", "/account/reviews", "/account/favourites", "/account/comparisons",
  "/account/claimed-offers", "/account/referrals", "/account/notifications", "/account/settings",
];
const WIDTHS = [360, 393, 768, 1280, 1440, 1920];
const outDir = process.argv[2];
if (outDir) fs.mkdirSync(outDir, { recursive: true });

const executablePath = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
].find((p) => fs.existsSync(p));
const browser = await puppeteer.launch({ executablePath, headless: true, args: ["--hide-scrollbars"] });
const problems = [];
try {
  for (const route of ROUTES) {
    const row = [];
    for (const w of WIDTHS) {
      const page = await browser.newPage();
      const errors = [];
      page.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 140)));
      page.on("pageerror", (e) => errors.push(String(e).slice(0, 140)));
      await page.setViewport({ width: w, height: 900 });
      await page.goto(`http://localhost:3100${route}`, { waitUntil: "load", timeout: 120000 });
      await page.evaluate(async () => {
        await document.fonts.ready;
        // trigger lazy images
        for (let y = 0; y < document.body.scrollHeight; y += 800) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 30));
        }
        window.scrollTo(0, 0);
        await Promise.all([...document.images].map((i) => (i.complete ? 0 : new Promise((r) => (i.onload = i.onerror = r)))));
      });
      const info = await page.evaluate((vw) => {
        const docW = document.documentElement.scrollWidth;
        const broken = [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.getAttribute("src"));
        let culprit = "";
        if (docW > vw) {
          const el = [...document.querySelectorAll("body *")].find((e) => e.getBoundingClientRect().right > vw + 1);
          culprit = el ? `${el.tagName}.${String(el.className).slice(0, 80)}` : "";
        }
        return { docW, h: document.documentElement.scrollHeight, broken, culprit };
      }, w);
      if (outDir) await page.screenshot({ path: path.join(outDir, `${route === "/" ? "home" : route.slice(1).replace(/\//g, "_")}-${w}.png`), fullPage: true });
      row.push(`${w}:${info.h}`);
      if (info.docW > w) problems.push(`${route} @${w}: overflow ${info.docW}px  ${info.culprit}`);
      if (info.broken.length) problems.push(`${route} @${w}: broken images ${info.broken.join(", ")}`);
      if (errors.length) problems.push(`${route} @${w}: console ${[...new Set(errors)].join(" | ")}`);
      await page.close();
    }
    console.log(route.padEnd(44), row.join("  "));
  }
} finally {
  await browser.close();
}
console.log(problems.length ? "\nPROBLEMS:\n" + problems.join("\n") : "\nNo overflow, broken images or console errors.");
