/**
 * Mock data for the Insights pages (Compare, Leaderboard, Favourite Firms).
 * Figures for FundingPips / Blue Guardian / Aqua Funded / Goat Funded Trader / Maven / Equity Edge and the
 * FundedNext leaderboard row are taken from the Figma file; the rest is plausible sample content.
 */

export type Logo = { src: string; /** width / height */ aspect: number };

export const LOGOS = {
  fundingpips: { src: "/images/insights/fundingpips.svg", aspect: 1 },
  blueGuardian: { src: "/images/insights/blue-guardian.png", aspect: 4 / 3 },
  aquaFunded: { src: "/images/insights/aqua-funded.svg", aspect: 21.6 / 10.241 },
  alphaCapital: { src: "/images/insights/alpha-capital.svg", aspect: 1 },
  fundedNext: { src: "/images/insights/fundednext.svg", aspect: 1 },
} satisfies Record<string, Logo>;

export type Firm = {
  id: string;
  name: string;
  initials: string;
  logo?: Logo;
  href: string;
  /** Trust score out of 5 */
  trust: number;
  /** Verified reviews */
  reviews: number;
  countryCode: string;
  countryName: string;
  flag: string;
  years: number;
  platforms: string;
  /** Max allocation in $K */
  maxAlloc: number;
  /** Max profit split in % */
  split: number;
  market: string;
  offer: { title: string; code: string; discount: number };
};

export const FIRMS: Firm[] = [
  {
    id: "fundingpips",
    name: "FundingPips",
    initials: "FP",
    logo: LOGOS.fundingpips,
    href: "/firms/fundingpips",
    trust: 4.4,
    reviews: 16,
    countryCode: "AE",
    countryName: "UAE",
    flag: "🇦🇪",
    years: 4,
    platforms: "MT5",
    maxAlloc: 800,
    split: 90,
    market: "Forex / CFD",
    offer: { title: "Exclusive deal", code: "D76151DB", discount: 0 },
  },
  {
    id: "blue-guardian",
    name: "Blue Guardian",
    initials: "BG",
    logo: LOGOS.blueGuardian,
    href: "/firms",
    trust: 4.3,
    reviews: 13,
    countryCode: "GB",
    countryName: "UK",
    flag: "🇬🇧",
    years: 5,
    platforms: "MT4 · MT5",
    maxAlloc: 200,
    split: 85,
    market: "Forex / CFD",
    offer: { title: "35% OFF", code: "1X5H", discount: 35 },
  },
  {
    id: "aqua-funded",
    name: "Aqua Funded",
    initials: "AF",
    logo: LOGOS.aquaFunded,
    href: "/firms",
    trust: 4.3,
    reviews: 14,
    countryCode: "AE",
    countryName: "UAE",
    flag: "🇦🇪",
    years: 3,
    platforms: "MT5",
    maxAlloc: 200,
    split: 95,
    market: "Forex / CFD",
    offer: { title: "50% OFF", code: "6JO", discount: 50 },
  },
  {
    id: "goat-funded-trader",
    name: "Goat Funded Trader",
    initials: "GF",
    href: "/firms",
    trust: 4.3,
    reviews: 17,
    countryCode: "HK",
    countryName: "HK",
    flag: "🇭🇰",
    years: 3,
    platforms: "MT5 · cTrader",
    maxAlloc: 400,
    split: 95,
    market: "Forex / CFD",
    offer: { title: "25% OFF", code: "GOAT25", discount: 25 },
  },
  {
    id: "maven",
    name: "Maven",
    initials: "M",
    href: "/firms",
    trust: 4.2,
    reviews: 14,
    countryCode: "CA",
    countryName: "Canada",
    flag: "🇨🇦",
    years: 2,
    platforms: "MT5 · Match-Trader",
    maxAlloc: 200,
    split: 90,
    market: "Forex / CFD",
    offer: { title: "20% OFF", code: "MAVEN20", discount: 20 },
  },
  {
    id: "equity-edge",
    name: "Equity Edge",
    initials: "EE",
    href: "/firms",
    trust: 4.2,
    reviews: 10,
    countryCode: "GB",
    countryName: "UK",
    flag: "🇬🇧",
    years: 2,
    platforms: "MT5",
    maxAlloc: 300,
    split: 90,
    market: "Forex / CFD",
    offer: { title: "15% OFF", code: "EDGE15", discount: 15 },
  },
  {
    id: "alpha-capital",
    name: "Alpha Capital",
    initials: "AC",
    logo: LOGOS.alphaCapital,
    href: "/firms",
    trust: 4.2,
    reviews: 12,
    countryCode: "GB",
    countryName: "UK",
    flag: "🇬🇧",
    years: 4,
    platforms: "MT5 · cTrader",
    maxAlloc: 400,
    split: 90,
    market: "Forex / CFD",
    offer: { title: "10% OFF", code: "ALPHA10", discount: 10 },
  },
  {
    id: "ftmo",
    name: "FTMO",
    initials: "F",
    href: "/firms",
    trust: 4.4,
    reviews: 22,
    countryCode: "CZ",
    countryName: "Czechia",
    flag: "🇨🇿",
    years: 10,
    platforms: "MT4 · MT5 · cTrader",
    maxAlloc: 400,
    split: 90,
    market: "Forex / CFD",
    offer: { title: "Exclusive deal", code: "FTMO10", discount: 10 },
  },
  {
    id: "the5ers",
    name: "The5ers",
    initials: "T",
    href: "/firms",
    trust: 4.3,
    reviews: 18,
    countryCode: "IL",
    countryName: "Israel",
    flag: "🇮🇱",
    years: 9,
    platforms: "MT5",
    maxAlloc: 560,
    split: 100,
    market: "Forex / CFD",
    offer: { title: "5% OFF", code: "FIVERS5", discount: 5 },
  },
  {
    id: "topstep",
    name: "TopStep",
    initials: "T",
    href: "/firms",
    trust: 4.1,
    reviews: 15,
    countryCode: "US",
    countryName: "USA",
    flag: "🇺🇸",
    years: 12,
    platforms: "TopstepX · Rithmic",
    maxAlloc: 150,
    split: 90,
    market: "Futures",
    offer: { title: "30% OFF", code: "TOP30", discount: 30 },
  },
  {
    id: "apex-trader-funding",
    name: "Apex Trader Funding",
    initials: "AT",
    href: "/firms",
    trust: 4.0,
    reviews: 19,
    countryCode: "US",
    countryName: "USA",
    flag: "🇺🇸",
    years: 3,
    platforms: "Rithmic · Tradovate",
    maxAlloc: 300,
    split: 100,
    market: "Futures",
    offer: { title: "80% OFF", code: "APEX80", discount: 80 },
  },
];

export const firmById = (id: string) => FIRMS.find((f) => f.id === id)!;

export const fmtAlloc = (k: number) => (k >= 1000 ? `$${(k / 1000).toFixed(k % 1000 ? 2 : 0)}M` : `$${k}K`);

/* ------------------------------------------------------------------ Compare */

export const COMPARE_DEFAULT = ["fundingpips", "blue-guardian"];
/** Firms offered under "Suggested for you" (in order) */
export const COMPARE_SUGGESTED = ["aqua-funded", "goat-funded-trader", "maven", "equity-edge", "alpha-capital", "ftmo", "the5ers"];

export const CRITERIA: { label: string; caption: string; icon?: string; glyph?: string }[] = [
  { label: "Trust score", caption: "Overall rating out of 5", icon: "/icons/star-00d26a.svg" },
  { label: "Verified reviews", caption: "Proof-backed trader reviews", icon: "/images/insights/tick-circle-00d26a.svg" },
  { label: "Country", caption: "Where the firm is based", icon: "/icons/flag-00d26a.svg" },
  { label: "Max allocation", caption: "Largest funded account", glyph: "$" },
  { label: "Profit split", caption: "How much you keep", glyph: "%" },
  { label: "Platforms", caption: "MT4, MT5, cTrader, Rithmic…", icon: "/icons/monitor-00d26a.svg" },
];

export const POPULAR_COMPARISONS: { a: string; b: string; caption: string }[] = [
  { a: "fundingpips", b: "blue-guardian", caption: "4.4 vs 4.3 trust score" },
  { a: "aqua-funded", b: "alpha-capital", caption: "Up to 95% vs up to 90% split" },
  { a: "ftmo", b: "the5ers", caption: "$400K vs $560K max allocation" },
  { a: "topstep", b: "apex-trader-funding", caption: "$150K vs $300K max allocation" },
];

/* -------------------------------------------------------------- Leaderboard */

export type Platform = "ctrader" | "mt5" | "tradingview";
export const PLATFORM_ICONS: Record<Platform, { src: string; label: string }> = {
  ctrader: { src: "/images/insights/platform-ctrader.svg", label: "cTrader" },
  mt5: { src: "/images/insights/platform-mt5.svg", label: "MetaTrader 5" },
  tradingview: { src: "/images/insights/platform-tradingview.svg", label: "TradingView" },
};

export const ASSET_CLASSES = ["FX", "Indices", "Crypto", "Other Commodities", "Stocks", "Futures"] as const;
export type AssetClass = (typeof ASSET_CLASSES)[number];

export type LeaderboardFirm = {
  id: string;
  name: string;
  initials: string;
  logo?: Logo;
  href: string;
  countryCode: string;
  countryLabel: string;
  flag: string;
  years: number;
  rating: number;
  reviews: number;
  favourites: number;
  assets: AssetClass[];
  platforms: Platform[];
  maxAlloc: string;
  /** Allocation bar fill, 0–1 */
  allocFill: number;
  promo: string;
  code: string;
};

const ALL_FX: AssetClass[] = ["FX", "Indices", "Crypto", "Other Commodities", "Stocks"];

export const LEADERBOARD: LeaderboardFirm[] = [
  { id: "fundednext", name: "FundedNext", initials: "FN", logo: LOGOS.fundedNext, href: "/firms", countryCode: "AE", countryLabel: "EUA", flag: "🇦🇪", years: 4, rating: 4.3, reviews: 914, favourites: 38393, assets: ALL_FX, platforms: ["ctrader", "mt5", "tradingview"], maxAlloc: "$1.43M", allocFill: 0.82, promo: "12% OFF", code: "23d4e3" },
  { id: "fundingpips", name: "FundingPips", initials: "FP", logo: LOGOS.fundingpips, href: "/firms/fundingpips", countryCode: "AE", countryLabel: "UAE", flag: "🇦🇪", years: 4, rating: 4.4, reviews: 862, favourites: 35120, assets: ["FX", "Indices", "Crypto", "Other Commodities"], platforms: ["mt5", "ctrader"], maxAlloc: "$800K", allocFill: 0.56, promo: "Exclusive", code: "D76151DB" },
  { id: "ftmo", name: "FTMO", initials: "FT", href: "/firms", countryCode: "CZ", countryLabel: "CZE", flag: "🇨🇿", years: 10, rating: 4.4, reviews: 1210, favourites: 33874, assets: ALL_FX, platforms: ["mt5", "ctrader"], maxAlloc: "$400K", allocFill: 0.28, promo: "10% OFF", code: "FTMO10" },
  { id: "the5ers", name: "The5ers", initials: "T5", href: "/firms", countryCode: "IL", countryLabel: "ISR", flag: "🇮🇱", years: 9, rating: 4.3, reviews: 640, favourites: 29411, assets: ["FX", "Indices", "Crypto", "Other Commodities"], platforms: ["mt5"], maxAlloc: "$560K", allocFill: 0.39, promo: "5% OFF", code: "FIVERS5" },
  { id: "blue-guardian", name: "Blue Guardian", initials: "BG", logo: LOGOS.blueGuardian, href: "/firms", countryCode: "GB", countryLabel: "GBR", flag: "🇬🇧", years: 5, rating: 4.3, reviews: 412, favourites: 21087, assets: ["FX", "Indices", "Crypto", "Other Commodities"], platforms: ["mt5", "tradingview"], maxAlloc: "$200K", allocFill: 0.14, promo: "35% OFF", code: "1X5H" },
  { id: "aqua-funded", name: "Aqua Funded", initials: "AF", logo: LOGOS.aquaFunded, href: "/firms", countryCode: "AE", countryLabel: "UAE", flag: "🇦🇪", years: 3, rating: 4.3, reviews: 388, favourites: 18452, assets: ["FX", "Indices", "Crypto"], platforms: ["mt5"], maxAlloc: "$200K", allocFill: 0.14, promo: "50% OFF", code: "6JO" },
  { id: "alpha-capital", name: "Alpha Capital", initials: "AC", logo: LOGOS.alphaCapital, href: "/firms", countryCode: "GB", countryLabel: "GBR", flag: "🇬🇧", years: 4, rating: 4.2, reviews: 351, favourites: 16230, assets: ALL_FX, platforms: ["mt5", "ctrader"], maxAlloc: "$400K", allocFill: 0.28, promo: "10% OFF", code: "ALPHA10" },
  { id: "goat-funded-trader", name: "Goat Funded Trader", initials: "GF", href: "/firms", countryCode: "HK", countryLabel: "HKG", flag: "🇭🇰", years: 3, rating: 4.3, reviews: 297, favourites: 14905, assets: ["FX", "Indices", "Crypto", "Other Commodities"], platforms: ["mt5", "ctrader"], maxAlloc: "$400K", allocFill: 0.28, promo: "25% OFF", code: "GOAT25" },
  { id: "topstep", name: "TopStep", initials: "TS", href: "/firms", countryCode: "US", countryLabel: "USA", flag: "🇺🇸", years: 12, rating: 4.1, reviews: 780, favourites: 13870, assets: ["Futures", "Indices", "Other Commodities"], platforms: ["tradingview"], maxAlloc: "$150K", allocFill: 0.1, promo: "30% OFF", code: "TOP30" },
  { id: "apex-trader-funding", name: "Apex Trader Funding", initials: "AT", href: "/firms", countryCode: "US", countryLabel: "USA", flag: "🇺🇸", years: 3, rating: 4.0, reviews: 1035, favourites: 12764, assets: ["Futures", "Indices", "Crypto"], platforms: ["tradingview"], maxAlloc: "$300K", allocFill: 0.21, promo: "80% OFF", code: "APEX80" },
  { id: "maven", name: "Maven", initials: "M", href: "/firms", countryCode: "CA", countryLabel: "CAN", flag: "🇨🇦", years: 2, rating: 4.2, reviews: 214, favourites: 11320, assets: ["FX", "Indices", "Crypto"], platforms: ["mt5"], maxAlloc: "$200K", allocFill: 0.14, promo: "20% OFF", code: "MAVEN20" },
  { id: "e8-markets", name: "E8 Markets", initials: "E8", href: "/firms", countryCode: "US", countryLabel: "USA", flag: "🇺🇸", years: 4, rating: 4.1, reviews: 455, favourites: 10288, assets: ["FX", "Indices", "Crypto", "Futures"], platforms: ["mt5", "tradingview"], maxAlloc: "$400K", allocFill: 0.28, promo: "15% OFF", code: "E8NEW" },
  { id: "funded-trading-plus", name: "Funded Trading Plus", initials: "FT", href: "/firms", countryCode: "GB", countryLabel: "GBR", flag: "🇬🇧", years: 5, rating: 4.1, reviews: 318, favourites: 9134, assets: ["FX", "Indices", "Other Commodities"], platforms: ["mt5", "ctrader"], maxAlloc: "$200K", allocFill: 0.14, promo: "12% OFF", code: "FTP12" },
  { id: "equity-edge", name: "Equity Edge", initials: "EE", href: "/firms", countryCode: "GB", countryLabel: "GBR", flag: "🇬🇧", years: 1, rating: 4.2, reviews: 96, favourites: 7712, assets: ["FX", "Indices", "Crypto"], platforms: ["mt5"], maxAlloc: "$300K", allocFill: 0.21, promo: "15% OFF", code: "EDGE15" },
  { id: "brightfunded", name: "BrightFunded", initials: "BF", href: "/firms", countryCode: "BE", countryLabel: "BEL", flag: "🇧🇪", years: 2, rating: 4.2, reviews: 184, favourites: 6840, assets: ["FX", "Indices", "Crypto", "Other Commodities"], platforms: ["ctrader"], maxAlloc: "$400K", allocFill: 0.28, promo: "20% OFF", code: "BRIGHT20" },
  { id: "instant-funding", name: "Instant Funding", initials: "IF", href: "/firms", countryCode: "GB", countryLabel: "GBR", flag: "🇬🇧", years: 2, rating: 4.0, reviews: 142, favourites: 5523, assets: ["FX", "Indices", "Crypto"], platforms: ["mt5"], maxAlloc: "$200K", allocFill: 0.14, promo: "25% OFF", code: "IF25" },
  { id: "lux-trading-firm", name: "Lux Trading Firm", initials: "LT", href: "/firms", countryCode: "GB", countryLabel: "GBR", flag: "🇬🇧", years: 4, rating: 4.0, reviews: 133, favourites: 4870, assets: ["FX", "Indices", "Stocks", "Other Commodities"], platforms: ["mt5"], maxAlloc: "$2.5M", allocFill: 1, promo: "10% OFF", code: "LUX10" },
  { id: "city-traders-imperium", name: "City Traders Imperium", initials: "CT", href: "/firms", countryCode: "GB", countryLabel: "GBR", flag: "🇬🇧", years: 6, rating: 3.9, reviews: 260, favourites: 4215, assets: ["FX", "Indices", "Crypto", "Stocks"], platforms: ["mt5", "tradingview"], maxAlloc: "$4M", allocFill: 1, promo: "15% OFF", code: "CTI15" },
  { id: "earn2trade", name: "Earn2Trade", initials: "E2", href: "/firms", countryCode: "US", countryLabel: "USA", flag: "🇺🇸", years: 9, rating: 3.9, reviews: 302, favourites: 3960, assets: ["Futures"], platforms: ["tradingview"], maxAlloc: "$400K", allocFill: 0.28, promo: "40% OFF", code: "E2T40" },
  { id: "myfundedfx", name: "MyFundedFX", initials: "MF", href: "/firms", countryCode: "US", countryLabel: "USA", flag: "🇺🇸", years: 3, rating: 3.8, reviews: 221, favourites: 3412, assets: ["FX", "Indices", "Crypto"], platforms: ["mt5", "ctrader"], maxAlloc: "$300K", allocFill: 0.21, promo: "10% OFF", code: "MFFX10" },
];

/** Visible before "View All" */
export const LEADERBOARD_PAGE = 15;
export const MAX_FAVOURITES = 5;

/* ---------------------------------------------------------- Favourite firms */

export const FAVOURITES_DEFAULT = ["fundingpips", "blue-guardian", "aqua-funded"];
export const FAVOURITE_SUGGESTIONS = ["goat-funded-trader", "maven", "equity-edge", "alpha-capital", "ftmo"];
export const SHORTLIST_MAX = 5;

export const SORTS = [
  { id: "trust", label: "Highest trust score" },
  { id: "discount", label: "Biggest discount" },
  { id: "alloc", label: "Largest allocation" },
  { id: "split", label: "Best profit split" },
  { id: "saved", label: "Recently saved" },
] as const;
export type SortId = (typeof SORTS)[number]["id"];
