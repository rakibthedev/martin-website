# PropFirmScores — build conventions

Next.js 15 (App Router) + TypeScript + Tailwind CSS v4. Pixel-perfect implementation of the Figma file
`Dr8zQudcH1bo5QbcczhjKt` (page "Signed-in · Account", node 368:3475).

## Breakpoints (mobile-first)
| Range | Figma source | Tailwind prefix |
|---|---|---|
| < 768px | `Responsive / Mobile 393` frames | (none) |
| 768–1279px | `Responsive / Tablet 768` frames | `md:` |
| ≥ 1280px | `Desktop 1920` frames | `xl:` |

- Use the Figma values **exactly** at 393 / 768 / 1920 and let layouts flex in between (flex-1, %, minmax grids).
  Never use fixed page widths like `w-[1504px]`; convert fixed widths of columns to `flex-1`, `basis-[x%]`,
  `max-w-[…]` or grid tracks so nothing overflows from 360px to 1920px. Page frame max width is 1920 (SiteShell).
- Header switches from hamburger to full desktop nav at `2xl` (1536px) — already handled in `Header.tsx`.
- Horizontal page padding: mobile 16 (`px-4`), tablet 24 (`md:px-6`), desktop 48 (`xl:px-12`) unless the frame says otherwise.

## Tokens (src/app/globals.css)
Colours: `page #151513`, `surface #212121`, `card #2b2a27`, `raised #393734`, `line #44423e` (borders),
`muted #898587`, `ink #f0f0f0`, `white`, `brand #00d26a`, `brand-tint #052116`, `brand-tint-raised #0a2b1e`,
`fundingpips-navy #121355`, `guardian-blue #0b3d91`, `funded-blue #1e4fd8`, `danger #ff6b6b`, `danger-bg #2a1414`,
`warning #f5a524`, `warning-bg #2a2110`. → `bg-surface`, `text-muted`, `border-line`, `bg-brand-tint`, …

Text styles (Mulish via next/font, `font-sans` default): `type-display` 64/72·600, `type-h1` 36/46·600,
`type-h2` 32/42·600, `type-h3` 24/32·600, `type-label` 16/24·600, `type-body` 16/24·400, `type-body-sm` 14/22·400,
`type-caption` 14/20·400, `type-table-heading` 14/16·600, `type-overline` 10/14·600 +1px tracking.
Other "Martin / Detail / …" styles → write them inline: e.g. ExtraBold 28/34 → `text-[28px] leading-[34px] font-extrabold`,
"…–Auto" line height → `leading-normal`.

## Shared components (DO NOT EDIT — create local components instead if you need something different)
- `components/layout/*` — SiteShell (Header + Footer), Header, MobileNav, ShellUI (overlay state: `useShellUI()`), Footer
- `components/account/AccountLayout.tsx` — breadcrumb + 288px sidebar (xl only) + main column. Use for every /account page.
- `components/account/AccountSidebar.tsx` — sidebar + `ReferralPromo`
- `components/ui/Icon.tsx` — `<Icon name="arrow-right-f0f0f0" size={16} rotate={45} />`
- `components/ui/Button.tsx` — pill button (primary / outline / subtle / white; sm 40, md 44, lg 48)
- `components/ui/FirmLogo.tsx`, `components/ui/Avatar.tsx`
- `lib/nav.ts` — site nav, account nav, USER mock

## Assets
- Every image/SVG from `get_design_context` must be downloaded — never ship figma.com/api/mcp/asset URLs.
- `node scripts/fetch-assets.mjs <map.json>` (map = `{ "icons/arrow-right": "<url>", "images/home/hero.png": "<url>" }`).
  Keys without extension are icons and are saved as `public/icons/<name>-<firsthexcolour>.svg` — the script prints the final path.
  Use the Iconsax layer name (`vuesax/linear/<name>` → `icons/<name>`). Check `public/icons/` first; reuse identical files.
- Same glyph in another colour: `node scripts/recolor-icon.mjs <name> <fromHex> <toHex>`.
- Raster images → `public/images/<page>/<name>.<ext>` rendered with `next/image` (or `<img>` for SVG illustrations), keep the exact crop (object-cover + position from Figma).

## Verify
- Dev server is already running at http://localhost:3100 — do NOT start another one, do NOT run `next build`.
- `node scripts/shot.mjs <route> <width> <out.png>` → full-page screenshot (prints a warning on horizontal overflow).
  Check 393, 768, 1280 and 1920 and compare against the Figma screenshots.
- `npx tsc --noEmit` must pass; `npx eslint <your files>` clean.
