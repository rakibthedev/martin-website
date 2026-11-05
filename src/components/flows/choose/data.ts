/** Mock data for "Choose firms" (Figma 432:14454 / 497:29055 / 497:30596). Order = Figma order. */

export type PickFirm = {
  id: string;
  name: string;
  initials: string;
  /** null = "New · no reviews yet" */
  rating: number | null;
  reviews: number;
  flag: string;
  /** text after the flag, e.g. "AE · MT5 · $800K · up to 90% split" */
  meta: string;
  futures?: boolean;
  logo?: { src: string; w: number; h: number; cover?: boolean };
};

const FP_LOGO = { src: "/images/flows/fundingpips-logo.svg", w: 26, h: 26 };
const BG_LOGO = { src: "/images/flows/blueguardian-logo.png", w: 26, h: 19.5, cover: true };
const AQUA_LOGO = { src: "/images/flows/aquafunded-logo.svg", w: 26, h: 12.33 };
const ALPHA_LOGO = { src: "/images/flows/alphacapital-logo.svg", w: 26, h: 26 };

const r = (
  id: string,
  name: string,
  initials: string,
  rating: number,
  reviews: number,
  flag: string,
  meta: string,
  extra: Partial<PickFirm> = {},
): PickFirm => ({ id, name, initials, rating, reviews, flag, meta, ...extra });

const n = (id: string, name: string, initials: string, flag: string, meta: string, extra: Partial<PickFirm> = {}): PickFirm => ({
  id,
  name,
  initials,
  rating: null,
  reviews: 0,
  flag,
  meta,
  ...extra,
});

export const RATED: PickFirm[] = [
  r("fundingpips", "FundingPips", "FP", 4.4, 16, "🇦🇪", "AE · MT5 · $800K · up to 90% split", { logo: FP_LOGO }),
  r("blue-guardian", "Blue Guardian", "BG", 4.3, 13, "🇬🇧", "GB · MT4 · MT5 · $200K · up to 85% split", { logo: BG_LOGO }),
  r("goat-funded-trader", "Goat Funded Trader", "GF", 4.3, 17, "🇨🇾", "CY · MT4 · MT5 · $800K · up to 90% split"),
  r("aqua-funded", "Aqua Funded", "AF", 4.3, 14, "🇦🇪", "AE · MT5 · $200K · up to 95% split", { logo: AQUA_LOGO }),
  r("maven", "Maven", "M", 4.2, 14, "🇬🇧", "GB · MT5 · $200K · up to 80% split"),
  r("equity-edge", "Equity Edge", "EE", 4.2, 10, "🇬🇧", "GB · MT5 · $400K · up to 80% split"),
  r("atlas-funded", "Atlas Funded", "AF", 4.1, 8, "🇬🇧", "GB · MT5 · $200K · up to 90% split"),
  r("alpha-capital", "Alpha Capital", "AC", 3.9, 3, "🇬🇧", "GB · MT4 · MT5 · $200K · up to 90% split", { logo: ALPHA_LOGO }),
  r("lucid-trading", "Lucid Trading", "LT", 3.8, 2, "🇺🇸", "US · Rithmic · $150K · up to 85% split"),
  r("ck-capital", "CK Capital", "CC", 3.7, 1, "🇬🇧", "GB · MT5 · $200K · up to 80% split"),
  r("titan-capital-markets", "Titan Capital Markets", "TC", 3.7, 1, "🇬🇧", "GB · MT5 · $200K · up to 85% split"),
  r("topstep", "TopStep", "T", 3.7, 1, "🇺🇸", "US · Rithmic · Tradovate · $150K · up to 90% split"),
  r("goat-funded-futures", "Goat Funded Futures", "GF", 3.7, 2, "🇨🇾", "CY · Rithmic · Tradovate · $200K · up to 90% split", {
    futures: true,
  }),
  r("fundednext", "FundedNext", "F", 3.7, 1, "🇧🇩", "BD · MT4 · MT5 · cTrader · $2.5M · up to 95% split"),
  r("the5ers", "The5ers", "T", 3.7, 1, "🇮🇱", "IL · MT5 · DXtrade · $560K · up to 100% split"),
  r("blueberry-funded", "Blueberry Funded", "BF", 3.7, 5, "🇦🇺", "AU · MT4 · MT5 · $200K · up to 85% split"),
  r("blue-guardian-futures", "Blue Guardian Futures", "BG", 3.7, 1, "🇬🇧", "GB · Rithmic · $200K · up to 85% split", {
    futures: true,
  }),
  r("instant-funding", "Instant Funding", "IF", 3.4, 2, "🇻🇨", "VC · MT4 · MT5 · $100K · up to 90% split"),
  r("quant-tekel", "Quant Tekel", "QT", 3.2, 5, "🇬🇧", "GB · MT5 · $200K · up to 90% split"),
];

export const NEW: PickFirm[] = [
  n("ftmo", "FTMO", "F", "🇨🇿", "CZ · MT4 · MT5 · cTrader · $400K · up to 90% split"),
  n("blueberry-futures", "Blueberry Futures", "BF", "🇦🇺", "AU · Rithmic · $200K · up to 85% split", { futures: true }),
  n("my-crypto-funding", "My Crypto Funding", "MC", "🇪🇪", "EE · MT5 · $200K · up to 85% split"),
  n("ftuk", "FTUK", "F", "🇬🇧", "GB · MT4 · MT5 · $640K · up to 80% split"),
  n("alpine-funded", "Alpine Funded", "AF", "🇨🇭", "CH · MT5 · $200K · up to 90% split"),
  n("e8-markets", "E8 Markets", "EM", "🇺🇸", "US · MT4 · MT5 · $400K · up to 80% split"),
  n("my-funded-futures", "My Funded Futures", "MF", "🇺🇸", "US · Rithmic · Tradovate · $600K · up to 90% split", { futures: true }),
  n("ic-funded", "IC Funded", "IF", "🇦🇺", "AU · MT4 · MT5 · $200K · up to 80% split"),
  n("lark-funding", "Lark Funding", "LF", "🇺🇸", "US · MT4 · MT5 · $200K · up to 80% split"),
  n("brightfunded", "BrightFunded", "B", "🇬🇧", "GB · MT4 · MT5 · $200K · up to 95% split"),
  n("alpha-futures", "Alpha Futures", "AF", "🇺🇸", "US · Rithmic · $250K · up to 90% split", { futures: true }),
  n("fundednext-futures", "FundedNext Futures", "FF", "🇧🇩", "BD · Rithmic · $200K · up to 90% split", { futures: true }),
  n("apex-trader-funding", "Apex Trader Funding", "AT", "🇺🇸", "US · Rithmic · Tradovate · $300K · up to 100% split"),
  n("breakout-prop", "Breakout Prop", "BP", "🇬🇧", "GB · MT5 · $100K · up to 80% split"),
  n("tradeify", "Tradeify", "T", "🇺🇸", "US · Rithmic · Tradovate · $300K · up to 90% split"),
  n("fxify", "FXIFY", "F", "🇬🇧", "GB · MT4 · MT5 · $400K · up to 90% split"),
  n("e8-futures", "E8 Futures", "EF", "🇺🇸", "US · Rithmic · $250K · up to 80% split", { futures: true }),
];

export const ALL_FIRMS = [...RATED, ...NEW];
export const INITIAL_SELECTION = ["fundingpips", "blue-guardian", "aqua-funded"];
export const MAX_PICK = 3;
export const MIN_PICK = 2;
