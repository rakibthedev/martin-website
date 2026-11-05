export const REFERRAL_LINK = "propfirmscores.com/r/alexc";
const ENC = encodeURIComponent(`https://${REFERRAL_LINK}`);

export const SHARE = [
  { label: "WhatsApp", href: `https://wa.me/?text=Join%20me%20on%20PropFirmScores%20${ENC}` },
  { label: "Telegram", href: `https://t.me/share/url?url=${ENC}` },
  { label: "X", href: `https://x.com/intent/post?url=${ENC}` },
  { label: "Email", href: `mailto:?subject=Join%20me%20on%20PropFirmScores&body=${ENC}` },
];

export const BREAKDOWN = [
  { label: "Pending", value: "$50.00", tone: "text-warning" },
  { label: "Paid out", value: "$0.00", tone: "text-ink" },
  { label: "Lifetime earned", value: "$240.00", tone: "text-brand" },
];

export const FUNNEL = [
  { value: "12", label: "Link clicks" },
  { value: "5", label: "Signed up" },
  { value: "3", label: "Reviewed" },
];

export type LedgerEntry = {
  activity: string;
  icon: "people" | "gift";
  date: string;
  status: "Pending" | "Available";
  amount: string;
};

export const LEDGER: LedgerEntry[] = [
  { activity: "Sam R. published a verified review", icon: "people", date: "01 Nov 2026", status: "Pending", amount: "+$50.00" },
  { activity: "Priya K. published a verified review", icon: "people", date: "24 Oct 2026", status: "Available", amount: "+$50.00" },
  { activity: "Jordan M. published a verified review", icon: "people", date: "12 Oct 2026", status: "Available", amount: "+$50.00" },
  { activity: "Review bonus — Aqua Funded proof verified", icon: "gift", date: "04 Oct 2026", status: "Available", amount: "+$40.00" },
  { activity: "Lee W. published a verified review", icon: "people", date: "28 Sep 2026", status: "Available", amount: "+$50.00" },
];

export const PERKS = [
  { label: "Verified badge on every review", unlocked: true },
  { label: "Early access to new offers", unlocked: true },
  { label: "2× points on proof-verified reviews", unlocked: true },
  { label: "Members-only codes (Level 4)", unlocked: false },
  { label: "Withdraw without minimum (Level 5)", unlocked: false },
];

/** 1,240 of 1,500 points to Level 4 — Figma track 390 / 470px */
export const LEVEL_PROGRESS = 390 / 470;
