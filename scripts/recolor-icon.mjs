// Creates a colour variant of an already-downloaded Figma icon (same vector, new stroke/fill colour).
// Figma's Button/Sidebar components say "recolor icon to match label", so variants are the same glyph.
// Usage: node scripts/recolor-icon.mjs <icon-base-name> <fromHex> <toHex> [<toHex> ...]
//   node scripts/recolor-icon.mjs category 00d26a 898587
//   -> public/icons/category-898587.svg  (from public/icons/category-00d26a.svg)
import fs from "node:fs";
import path from "node:path";

const [, , name, from, ...targets] = process.argv;
const dir = path.resolve(import.meta.dirname, "..", "public", "icons");
const src = path.join(dir, `${name}-${from.toLowerCase()}.svg`);
const text = fs.readFileSync(src, "utf8");
for (const to of targets) {
  const out = path.join(dir, `${name}-${to.toLowerCase()}.svg`);
  if (fs.existsSync(out)) {
    console.log("exists", path.basename(out));
    continue;
  }
  fs.writeFileSync(out, text.replace(new RegExp(`#${from}`, "gi"), `#${to.toUpperCase()}`));
  console.log("saved ", path.basename(out));
}
