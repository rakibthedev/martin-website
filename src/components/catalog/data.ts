/**
 * Mock data for the catalog pages (/firms, /challenges, /offers).
 * Offers data lives in ./offers/data.ts and is re-exported here.
 */
export * from "./offers/data";

/* ------------------------------------------------------------------ */
/* Browse Firms                                                         */
/* ------------------------------------------------------------------ */

export type Market = "futures" | "forex";
export type Platform = "ctrader" | "mt5" | "tradingview";

export type Firm = {
  id: string;
  name: string;
  /** Profile route — every firm points at the FundingPips profile for now. */
  href: string;
  country: string;
  years: number;
  rating: number;
  reviews: number;
  favorites: number;
  assets: string[];
  platforms: Platform[];
  /** Display string, e.g. "$1.43M" */
  maxAllocation: string;
  /** Raw number used for sorting */
  allocation: number;
  discount: number;
  code: string;
  markets: Market[];
};

const PROFILE = "/firms/fundingpips";
const ALL_PLATFORMS: Platform[] = ["ctrader", "mt5", "tradingview"];

type Row = [
  name: string,
  country: string,
  years: number,
  rating: number,
  reviews: number,
  favorites: number,
  assets: string[],
  allocation: number,
  discount: number,
  code: string,
  markets: Market[],
];

const FX5 = ["FX", "Indices", "Crypto", "Other Commodities", "Stocks"];

const ROWS: Row[] = [
  ["FundedNext", "EUA", 4, 4.3, 914, 38393, FX5, 1.43, 12, "23d4e3", ["forex", "futures"]],
  ["FundedNext", "EUA", 4, 4.3, 914, 38393, FX5, 1.43, 12, "23d4e3", ["forex"]],
  ["FundedNext", "EUA", 4, 4.3, 914, 38393, FX5, 1.43, 12, "23d4e3", ["futures"]],
  ["CapitalEdge", "UK", 3, 4.7, 1120, 27500, ["FX", "Commodities", "Crypto", "Bonds", "Stocks"], 2.1, 15, "1a9f34", ["forex"]],
  ["TradeSphere", "CAN", 5, 4.2, 870, 31000, ["FX", "Indices", "Crypto", "Energy", "Stocks"], 1.75, 10, "3b7c6f", ["forex", "futures"]],
  ["AlphaQuant", "AUS", 2, 4.5, 940, 29500, ["FX", "Indices", "Crypto", "Metals", "Stocks"], 1.9, 8, "7d5a3b", ["futures"]],
  ["PrimeVest", "GER", 4, 4.8, 1005, 32000, ["FX", "Commodities", "Crypto", "Other Commodities", "Stocks"], 2.3, 20, "4c9d88", ["forex"]],
  ["NextGenTrade", "FRA", 3, 4.1, 860, 28000, ["FX", "Indices", "Crypto", "Energy", "Stocks"], 1.65, 18, "2f6e9a", ["forex", "futures"]],
  ["EquiFund", "JPN", 5, 4.6, 1020, 34000, ["FX", "Metals", "Crypto", "Bonds", "Stocks"], 2.0, 14, "589e3f", ["forex"]],
  ["VistaCapital", "USA", 4, 4.4, 900, 31000, ["FX", "Indices", "Crypto", "Energy", "Stocks"], 1.85, 13, "a37c2e", ["futures"]],
  ["PinnacleFunds", "SGP", 3, 4.3, 880, 26500, ["FX", "Commodities", "Crypto", "Other Commodities", "Stocks"], 1.55, 11, "5d8b21", ["forex"]],
  ["QuantumCapital", "NZ", 2, 4.0, 830, 24000, ["FX", "Indices", "Crypto", "Metals", "Stocks"], 1.4, 9, "3c7a44", ["forex", "futures"]],
  ["SummitInvest", "CHN", 4, 4.5, 950, 33500, ["FX", "Commodities", "Crypto", "Energy", "Stocks"], 2.05, 16, "6e4c8a", ["forex"]],
  ["FundingPips", "UAE", 4, 4.6, 1240, 30500, ["FX", "Indices", "Crypto", "Metals", "Stocks"], 2.0, 15, "fp15pips", ["forex"]],
  ["Blue Guardian", "UAE", 3, 4.4, 760, 22800, ["FX", "Indices", "Crypto", "Metals"], 1.5, 12, "bg12safe", ["forex"]],
  ["Aqua Funded", "UK", 2, 4.2, 540, 18400, ["FX", "Indices", "Crypto", "Energy"], 1.2, 10, "aqua10", ["forex", "futures"]],
  ["TopStep Pro", "USA", 6, 4.5, 1310, 35200, ["Futures", "Indices", "Energy", "Metals"], 1.8, 20, "ts20top", ["futures"]],
  ["Apex Ridge", "USA", 5, 4.3, 990, 29800, ["Futures", "Indices", "Energy", "Crypto"], 2.5, 25, "apx25r", ["futures"]],
  ["Lumen Trading", "IRL", 2, 3.9, 410, 12300, ["FX", "Indices", "Metals"], 0.8, 7, "lum7ie", ["forex"]],
  ["Northline Capital", "CAN", 3, 4.1, 620, 16900, ["FX", "Indices", "Crypto", "Stocks"], 1.1, 9, "nl9cap", ["forex"]],
  ["Helix Funded", "NLD", 2, 4.0, 380, 11500, ["FX", "Crypto", "Metals", "Energy"], 0.9, 11, "hx11fd", ["forex", "futures"]],
  ["Orbit Markets", "SGP", 4, 4.4, 870, 25600, ["FX", "Indices", "Crypto", "Bonds", "Stocks"], 1.6, 13, "orb13m", ["forex"]],
  ["Granite Prop", "AUS", 5, 4.6, 1110, 30100, ["Futures", "Indices", "Metals", "Energy"], 2.2, 17, "gr17pp", ["futures"]],
  ["Velocity FX", "UK", 3, 4.2, 700, 19700, ["FX", "Indices", "Crypto"], 1.0, 8, "vel8fx", ["forex"]],
  ["Meridian Funded", "ESP", 2, 3.8, 290, 9800, ["FX", "Indices", "Energy"], 0.75, 6, "mer6fd", ["forex"]],
  ["Crestline Traders", "USA", 4, 4.3, 830, 23400, ["Futures", "Indices", "Crypto", "Energy"], 1.7, 14, "cr14tr", ["futures"]],
  ["Atlas Funding", "GER", 3, 4.1, 560, 15200, ["FX", "Indices", "Metals", "Stocks"], 1.3, 10, "atl10f", ["forex"]],
  ["Zenith Capital", "SUI", 6, 4.7, 1280, 36100, ["FX", "Indices", "Crypto", "Metals", "Bonds"], 2.4, 19, "zen19c", ["forex", "futures"]],
  ["Harbor Prop", "NOR", 2, 3.9, 330, 10400, ["FX", "Indices", "Crypto"], 0.85, 7, "hb7prp", ["forex"]],
  ["Ember Funded", "ITA", 3, 4.0, 470, 13800, ["FX", "Commodities", "Crypto", "Stocks"], 1.15, 9, "emb9fd", ["forex"]],
  ["Keystone Futures", "USA", 5, 4.4, 920, 27300, ["Futures", "Indices", "Energy", "Metals"], 1.95, 15, "ks15ft", ["futures"]],
  ["Solace Trading", "POL", 2, 3.7, 260, 8600, ["FX", "Indices", "Metals"], 0.6, 5, "sol5tr", ["forex"]],
  ["Ironclad Capital", "UK", 4, 4.3, 790, 21900, ["FX", "Indices", "Crypto", "Energy", "Stocks"], 1.45, 12, "irn12c", ["forex", "futures"]],
  ["Polaris Prop", "SWE", 3, 4.1, 510, 14700, ["FX", "Crypto", "Metals", "Stocks"], 1.05, 8, "pol8pp", ["forex"]],
  ["Tidewater Funded", "USA", 2, 3.9, 350, 10900, ["Futures", "Indices", "Energy"], 0.95, 10, "tw10fd", ["futures"]],
  ["Evergreen Traders", "CAN", 5, 4.5, 1060, 28800, ["FX", "Indices", "Crypto", "Metals", "Stocks"], 2.15, 16, "evg16t", ["forex", "futures"]],
];

function money(m: number) {
  return `$${m % 1 === 0 ? m.toFixed(1) : String(m)}M`;
}

export const FIRMS: Firm[] = ROWS.map(
  ([name, country, years, rating, reviews, favorites, assets, allocation, discount, code, markets], i) => ({
    id: `firm-${i + 1}`,
    name,
    href: PROFILE,
    country,
    years,
    rating,
    reviews,
    favorites,
    assets,
    platforms: ALL_PLATFORMS,
    maxAllocation: money(allocation),
    allocation,
    discount,
    code,
    markets,
  }),
);

export const FIRM_TABS = [
  { id: "all", label: "All Firms" },
  { id: "favorites", label: "Favorite" },
  { id: "futures", label: "Futures" },
  { id: "forex", label: "Forex / CFD" },
] as const;
export type FirmTab = (typeof FIRM_TABS)[number]["id"];

export const FIRM_SORTS = [
  { id: "popularity", label: "Popularity" },
  { id: "rating", label: "Highest rated" },
  { id: "favorites", label: "Most favorited" },
  { id: "allocation", label: "Max allocation" },
  { id: "discount", label: "Biggest discount" },
] as const;
export type FirmSort = (typeof FIRM_SORTS)[number]["id"];

export const MAX_FAVOURITES = 5;
export const FIRMS_PAGE_SIZE = 13;

/* ------------------------------------------------------------------ */
/* Challenges                                                           */
/* ------------------------------------------------------------------ */

export type ChallengeFirm = "fundingpips" | "blueguardian" | "aquafunded";
export type EvaluationType = "1-Step" | "2-Step" | "Instant";
export type ChallengePlatform = "MT5" | "MT4" | "cTrader" | "TradingView" | "Match-Trader";

export type Challenge = {
  id: string;
  firm: ChallengeFirm;
  firmName: string;
  type: EvaluationType;
  phases: string;
  /** Account size in $K */
  size: number;
  /** Profit targets per phase, in % */
  targets: number[];
  dailyLoss: number;
  maxLoss: number;
  platforms: ChallengePlatform[];
  keywords: string;
};

/** Logo artwork per firm — Figma "Asset / 20" (FundingPips), "Asset / 21" (Blue Guardian), "Asset / 14" (Aqua Funded). */
export const CHALLENGE_LOGOS: Record<ChallengeFirm, { src: string; w: number; h: number }> = {
  fundingpips: { src: "/images/catalog/fundingpips-mark.svg", w: 32, h: 32 },
  blueguardian: { src: "/images/catalog/offers/blueguardian-logo.png", w: 32, h: 24 },
  aquafunded: { src: "/images/catalog/aquafunded-mark.svg", w: 32, h: 15.172 },
};

const FIRM_NAMES: Record<ChallengeFirm, string> = {
  fundingpips: "FundingPips",
  blueguardian: "Blue Guardian",
  aquafunded: "Aqua Funded",
};

type CRow = [ChallengeFirm, EvaluationType, number, number[], number, number, ChallengePlatform[], string?];
const PHASES: Record<EvaluationType, string> = {
  "1-Step": "Single phase",
  "2-Step": "Two phases",
  Instant: "Instant funding",
};

const C_ROWS: CRow[] = [
  // The six challenges shown in the Figma results ($100K · MT5 · ≤ 5% daily loss)
  ["fundingpips", "1-Step", 100, [10], 5, 10, ["MT5", "MT4", "cTrader"]],
  ["blueguardian", "2-Step", 100, [8, 5], 5, 10, ["MT5", "TradingView"]],
  ["aquafunded", "1-Step", 100, [10], 5, 10, ["MT5", "Match-Trader"]],
  ["fundingpips", "2-Step", 100, [8, 5], 5, 10, ["MT5", "MT4", "cTrader"]],
  ["blueguardian", "1-Step", 100, [10], 5, 10, ["MT5", "TradingView"]],
  ["aquafunded", "2-Step", 100, [8, 5], 5, 10, ["MT5", "Match-Trader"]],
  // More programmes revealed when filters change
  ["fundingpips", "1-Step", 100, [10], 4, 8, ["cTrader", "MT4"], "no time limit"],
  ["blueguardian", "Instant", 100, [8], 3, 6, ["TradingView"], "no time limit"],
  ["aquafunded", "2-Step", 100, [6, 6], 5, 10, ["Match-Trader"], "no time limit"],
  ["fundingpips", "1-Step", 10, [10], 5, 10, ["MT5", "MT4"]],
  ["blueguardian", "2-Step", 10, [8, 5], 4, 8, ["MT5", "TradingView"]],
  ["aquafunded", "Instant", 10, [10], 3, 6, ["Match-Trader"], "no time limit"],
  ["fundingpips", "2-Step", 25, [8, 5], 5, 10, ["MT5", "cTrader"]],
  ["blueguardian", "1-Step", 25, [10], 4, 6, ["MT4", "TradingView"]],
  ["aquafunded", "1-Step", 25, [9], 5, 10, ["MT5", "Match-Trader"]],
  ["fundingpips", "1-Step", 50, [10], 5, 10, ["MT5", "MT4", "cTrader"]],
  ["blueguardian", "2-Step", 50, [8, 5], 5, 10, ["MT5"]],
  ["aquafunded", "Instant", 50, [10], 3, 5, ["Match-Trader", "MT5"], "no time limit"],
  ["fundingpips", "2-Step", 200, [8, 5], 5, 10, ["MT5", "cTrader"]],
  ["blueguardian", "1-Step", 200, [10], 4, 8, ["MT5", "TradingView"]],
  ["aquafunded", "2-Step", 200, [8, 4], 5, 10, ["MT5", "Match-Trader"]],
];

export const CHALLENGES: Challenge[] = C_ROWS.map(
  ([firm, type, size, targets, dailyLoss, maxLoss, platforms, keywords = ""], i) => ({
    id: `ch-${i + 1}`,
    firm,
    firmName: FIRM_NAMES[firm],
    type,
    phases: PHASES[type],
    size,
    targets,
    dailyLoss,
    maxLoss,
    platforms,
    keywords,
  }),
);

export const EVALUATION_TYPES = ["All", "1-Step", "2-Step", "Instant"] as const;
export type EvaluationFilter = (typeof EVALUATION_TYPES)[number];
export const ACCOUNT_SIZES = [10, 25, 50, 100, 200];
export const DAILY_LOSS_OPTIONS = [3, 4, 5];
export const CHALLENGE_PLATFORMS: ChallengePlatform[] = ["MT5", "MT4", "cTrader", "TradingView", "Match-Trader"];
/** Profit target slider scale (%), thumbs default to 5 and 10. */
export const TARGET_SCALE = { min: 4, max: 11, step: 0.5 } as const;

export const CHALLENGE_SORTS = [
  { id: "target", label: "Lowest profit target" },
  { id: "daily", label: "Highest daily loss" },
  { id: "maxloss", label: "Highest maximum loss" },
  { id: "size", label: "Largest account" },
  { id: "firm", label: "Firm A–Z" },
] as const;
export type ChallengeSort = (typeof CHALLENGE_SORTS)[number]["id"];

export const CHALLENGES_PAGE_SIZE = 6;
export const MAX_COMPARE = 4;

export const MATCHMAKER = [
  { q: "What’s your trading style?", options: ["Scalping", "Day trading", "Swing trading", "Still learning"] },
  { q: "How much can you lose in a day?", options: ["≤ 3%", "≤ 4%", "≤ 5%"] },
  { q: "Which account size suits you?", options: ["$10K", "$25K", "$50K", "$100K", "$200K"] },
  { q: "Which platform do you trade on?", options: ["MT5", "MT4", "cTrader", "TradingView", "Match-Trader"] },
];

export const CHALLENGE_FAQ = [
  {
    q: "What’s the difference between 1-Step and 2-Step?",
    a: "A 1-Step evaluation has one phase and one profit target. A 2-Step splits it into two phases, usually with a higher target first and a lower one second (for example 8% then 5%).",
  },
  {
    q: "What is maximum loss?",
    a: "Maximum loss is the furthest your account balance or equity may fall below its starting value over the whole challenge. Touch it once and the account is closed.",
  },
  {
    q: "What does daily loss mean?",
    a: "Daily loss caps how much you can lose in a single trading day, measured from the day’s starting balance or equity. It resets every day at the firm’s server time.",
  },
  {
    q: "How is the profit target calculated?",
    a: "The profit target is a percentage of your starting balance. On a $100,000 account a 10% target means closing the phase with at least $10,000 in profit.",
  },
];
