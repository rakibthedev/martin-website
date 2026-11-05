// Downloads Figma MCP asset URLs into public/.
// Usage: node scripts/fetch-assets.mjs <map.json> [--force]
//
// map.json: { "<key>": "<figma mcp asset url>", ... }
//   - Key WITH an extension ("images/hero.png") is saved exactly at that path.
//   - Key WITHOUT an extension ("icons/arrow-up") is treated as an SVG icon and saved as
//     "icons/arrow-up-<color>.svg", where <color> is the first hex colour inside the SVG
//     (lowercase, no #). This keeps every colour variant of an icon as its own exact file.
// Existing files are skipped unless --force is passed. Prints the final public path per key.
import fs from "node:fs";
import path from "node:path";

const [, , mapFile, flag] = process.argv;
const force = flag === "--force";
const map = JSON.parse(fs.readFileSync(mapFile, "utf8").replace(/^﻿/, ""));
const root = path.resolve(import.meta.dirname, "..", "public");

for (const [key, url] of Object.entries(map)) {
  const res = await fetch(url);
  if (!res.ok) {
    console.error("FAIL", key, res.status);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  let rel = key;
  let note = "";
  const isSvg = !path.extname(key) || key.endsWith(".svg");
  if (isSvg) {
    const text = buf.toString("utf8");
    const colors = [...new Set((text.match(/#[0-9a-fA-F]{6}\b/g) || []).map((c) => c.toLowerCase()))];
    const size = (text.match(/<svg[^>]*?width="([^"]*)" height="([^"]*)"/) || []).slice(1).join("x");
    if (!path.extname(key)) rel = `${key}-${(colors[0] || "none").slice(1)}.svg`;
    note = ` colors=${colors.join(",")} size=${size}`;
  }
  const out = path.join(root, rel);
  if (!force && fs.existsSync(out) && fs.statSync(out).size > 0) {
    console.log("exists /" + rel.replace(/\\/g, "/") + note);
    continue;
  }
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buf);
  console.log("saved  /" + rel.replace(/\\/g, "/") + note);
}
