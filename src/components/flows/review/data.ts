/** Mock data for the Submit Review flow (Figma 432:11730 / 497:22335 / 497:22768). */

export type ReviewFirm = {
  id: string;
  name: string;
  meta: string;
  /** FundingPips has a real logo asset; the others use FirmLogo initials. */
  logo?: string;
  initials: string;
  logoClass: string;
};

export const REVIEW_FIRMS: ReviewFirm[] = [
  {
    id: "fundingpips",
    name: "FundingPips",
    meta: "4.4 · 16 reviews · UAE",
    logo: "/images/flows/fundingpips-logo.svg",
    initials: "FP",
    logoClass: "bg-fundingpips-navy text-white",
  },
  { id: "the5ers", name: "The5ers", meta: "4.6 · 42 reviews · Israel", initials: "T5", logoClass: "bg-raised text-ink" },
  { id: "ftmo", name: "FTMO", meta: "4.5 · 88 reviews · Czechia", initials: "FT", logoClass: "bg-guardian-blue text-white" },
  { id: "fundednext", name: "FundedNext", meta: "4.3 · 57 reviews · UAE", initials: "FN", logoClass: "bg-funded-blue text-white" },
];

export const RATING_LABELS = ["", "Poor", "Fair", "Good", "Great", "Excellent"] as const;

export const STOOD_OUT = [
  "Fast Payouts",
  "Clear Rules",
  "Good Support",
  "Easy Challenge",
  "Recommend",
  "Slow payouts",
  "Unclear rules",
] as const;

export const PROMPTS = [
  { label: "What went well?", text: "What went well: " },
  { label: "What could be better?", text: "What could be better: " },
  { label: "Would you recommend it?", text: "Would I recommend it: " },
] as const;

export const ACCOUNT_SIZES = ["$5K", "$10K", "$25K", "$50K", "$100K+", "Other"] as const;
export const CHALLENGE_TYPES = ["1-Step", "2-Step", "Instant"] as const;
export const OUTCOMES = ["Still in evaluation", "Passed", "Funded", "Payout received", "Didn’t pass"] as const;

export const PROOF_KINDS = [
  { icon: "receipt-f0f0f0", label: "Payout screenshot" },
  { icon: "medal-star-f0f0f0", label: "Funded certificate" },
  { icon: "document-text-f0f0f0", label: "Account statement" },
  { icon: "sms-f0f0f0", label: "Email from the firm" },
] as const;

export const GUIDANCE = [
  {
    icon: "gps-00d26a",
    title: "Be specific",
    body: "Describe the firm, programme and the part of your experience you are reviewing.",
  },
  {
    icon: "receipt-00d26a",
    title: "Include relevant proof",
    body: "Support the key points with a clear screenshot or document.",
  },
  {
    icon: "profile-2user-00d26a",
    title: "Keep it respectful",
    body: "Focus on what happened and avoid sharing another person’s private information.",
  },
] as const;

export const INITIAL_REVIEW = {
  firmId: "fundingpips",
  rating: 5,
  tags: ["Fast Payouts", "Clear Rules", "Good Support", "Recommend"] as string[],
  title: "I’ve made a withdrawal",
  body: "They’ve got the best rules and account size. I’ve withdrawn even from their giveaway account, and support answered my questions quickly. Would recommend to anyone starting out.",
  accountSize: "$100K+" as string | null,
  challengeType: "2-Step" as string | null,
  outcome: "Payout received" as string | null,
  file: { name: "payout-screenshot.png", size: 1.2 * 1024 * 1024 } as { name: string; size: number } | null,
  postAs: "name" as "name" | "anonymous",
  confirmed: false,
};

export const USER_DISPLAY = { name: "Martin R.", initials: "MR" };

export const TITLE_MAX = 80;
export const BODY_MAX = 2000;
export const BODY_MIN = 50;
export const MAX_FILE_BYTES = 10 * 1024 * 1024;
