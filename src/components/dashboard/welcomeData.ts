/** Mock data for the first-login dashboard (/account/welcome) — copy matches Figma 376:2458. */

export const WELCOME_STATS = [
  { label: "Reviews published", value: "0", hint: "Write one to earn 200 pts", icon: "document-text-22-00d26a" },
  { label: "Trust points", value: "50", hint: "Welcome bonus · Level 1", icon: "medal-22-00d26a" },
  { label: "Saved firms", value: "0 / 5", hint: "Save up to 5 firms", icon: "heart-22-00d26a" },
  { label: "Referral earnings", value: "$0", hint: "Invite a trader, earn $50", icon: "wallet-22-00d26a" },
];

export const GETTING_STARTED: { label: string; done: boolean; points?: string; href: string }[] = [
  { label: "Create your account", done: true, href: "/account/settings" },
  { label: "Tell us how you trade", done: false, points: "+30 pts", href: "#step-1" },
  { label: "Save your first firm", done: false, points: "+20 pts", href: "#step-2" },
  { label: "Write your first review", done: false, points: "+200 pts", href: "/reviews/new" },
];

export const MARKETS = ["Forex", "Futures", "Crypto", "Indices", "Stocks"];
export const DEFAULT_MARKETS = ["Forex", "Indices"];

export const EXPERIENCE = ["Less than 1 year", "1–3 years", "3–5 years", "5+ years"];

export const POPULAR_FIRMS = [
  { firm: "FundingPips", initials: "FP", score: "4.4 trust score" },
  { firm: "Aqua Funded", initials: "AF", score: "4.3 trust score" },
  { firm: "Goat Funded Trader", initials: "GF", score: "4.3 trust score" },
];

export const REVIEW_TIPS = [
  "The firm and account size",
  "Your challenge or payout experience",
  "A screenshot as proof (can add later)",
];

export const EMPTY_STATES = [
  {
    icon: "document-text-27-00d26a",
    title: "No reviews yet",
    text: "Your submitted reviews and their verification status will appear here.",
    cta: { label: "Write a review", href: "/reviews/new" },
  },
  {
    icon: "heart-27-00d26a",
    title: "Your shortlist is empty",
    text: "Save up to 5 firms to compare them side by side and get their offers first.",
    cta: { label: "Browse firms", href: "/firms" },
  },
  {
    icon: "clock-27-00d26a",
    title: "Nothing here yet",
    text: "Review updates, offers and referral rewards will show up as they happen.",
  },
];
