import type { ReviewStatus } from "./StatusBadge";

/** Mock data for the dashboard overview (/account) — copy matches Figma 370:98. */

export const FIRM_COLORS: Record<string, string> = {
  FP: "bg-fundingpips-navy text-white",
  BG: "bg-guardian-blue text-white",
  AF: "bg-funded-blue text-white",
  FN: "bg-card text-white",
  GF: "bg-card text-white",
};

export const OVERVIEW_STATS = [
  { label: "Reviews published", value: "6", hint: "+2 this month", icon: "document-text-22-00d26a" },
  { label: "Trust points", value: "1,240", hint: "260 pts to Level 4", icon: "medal-22-00d26a" },
  { label: "Saved firms", value: "3 / 5", hint: "2 shortlist slots left", icon: "heart-22-00d26a" },
  { label: "Referral earnings", value: "$240", hint: "$50 pending payout", icon: "wallet-22-00d26a" },
];

export const PROFILE_STEPS: { label: string; done: boolean; points?: string; href: string }[] = [
  { label: "Verify your email", done: true, href: "/account/settings" },
  { label: "Add trading experience", done: true, href: "/account/settings" },
  { label: "Publish your first review", done: true, href: "/account/reviews" },
  { label: "Upload proof of payout", done: false, points: "+40 pts", href: "/account/reviews" },
  { label: "Add a profile photo", done: false, points: "+40 pts", href: "/account/settings" },
];

export type OverviewReview = {
  firm: string;
  initials: string;
  status: ReviewStatus;
  rating?: string;
  meta: string;
  note?: string;
  action: { label: string; href: string; primary?: boolean };
};

export const OVERVIEW_REVIEWS: OverviewReview[] = [
  {
    firm: "FundingPips",
    initials: "FP",
    status: "needs-proof",
    rating: "4.5",
    meta: "Reviewed 28 Oct 2026",
    note: "Upload a payout screenshot so our moderators can publish this review.",
    action: { label: "Add proof", href: "/account/reviews", primary: true },
  },
  {
    firm: "Blue Guardian",
    initials: "BG",
    status: "under-review",
    rating: "4.0",
    meta: "Reviewed 21 Oct 2026",
    action: { label: "View", href: "/account/reviews" },
  },
  {
    firm: "Aqua Funded",
    initials: "AF",
    status: "verified",
    rating: "5.0",
    meta: "Reviewed 02 Oct 2026",
    action: { label: "Edit", href: "/account/reviews" },
  },
  {
    firm: "FundedNext",
    initials: "FN",
    status: "draft",
    meta: "Draft saved 30 Oct 2026",
    action: { label: "Continue", href: "/reviews/new" },
  },
];

export const SHORTLIST = [
  { firm: "FundingPips", initials: "FP", rating: "4.4", max: "Max $800K" },
  { firm: "Blue Guardian", initials: "BG", rating: "4.3", max: "Max $200K" },
  { firm: "Aqua Funded", initials: "AF", rating: "4.3", max: "Max $200K" },
];

export const OFFERS = [
  {
    firm: "FundingPips",
    initials: "FP",
    discount: "20% OFF",
    code: "PFS-ALEX20",
    expiry: "Expires in 3 days",
    urgent: true,
  },
  { firm: "Aqua Funded", initials: "AF", discount: "50% OFF", code: "6JO", expiry: "Expires 15 Nov" },
  { firm: "Blue Guardian", initials: "BG", discount: "35% OFF", code: "1X5H", expiry: "Expires 30 Nov" },
];

export const ACTIVITY = [
  { icon: "tick-circle-00d26a", text: "Your Aqua Funded review was verified and published.", time: "2h ago" },
  { icon: "danger-16-ff6b6b", text: "Moderator requested proof for your FundingPips review.", time: "Yesterday" },
  { icon: "ticket-16-00d26a", text: "New 20% offer from FundingPips on your shortlist.", time: "Yesterday" },
  { icon: "people-16-00d26a", text: "Sam R. joined with your referral link (+$50 pending).", time: "3 days ago" },
  { icon: "like-16-898587", text: "12 traders found your Blue Guardian review helpful.", time: "5 days ago" },
];
