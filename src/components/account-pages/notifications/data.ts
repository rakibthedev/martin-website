export type NotifCategory = "reviews" | "offers" | "referrals" | "account";
export type NotifAction = {
  label: string;
  variant: "primary" | "outline-page" | "subtle";
  href?: string;
  copy?: string;
};

export type Notif = {
  id: string;
  group: "TODAY" | "THIS WEEK" | "EARLIER";
  category: NotifCategory;
  title: string;
  body: string;
  when: string;
  unread?: boolean;
  urgent?: boolean;
  /** icon file + circle background */
  icon: string;
  iconBg: string;
  actions?: NotifAction[];
  /** only shown after "Show older notifications" */
  older?: boolean;
};

export const NOTIFICATIONS: Notif[] = [
  {
    id: "proof",
    group: "TODAY",
    category: "reviews",
    title: "Proof requested for your FundingPips review",
    body: "Our moderators need a payout screenshot to publish it. You have 13 days left before the review is removed.",
    when: "5h ago",
    unread: true,
    urgent: true,
    icon: "danger-20-ff6b6b",
    iconBg: "bg-danger-bg",
    actions: [
      { label: "Add proof", variant: "primary", href: "/reviews/new" },
      { label: "View review", variant: "subtle", href: "/account/reviews" },
    ],
  },
  {
    id: "aqua-live",
    group: "TODAY",
    category: "reviews",
    title: "Your Aqua Funded review is live",
    body: "It passed human verification and earned you +120 trust points.",
    when: "2h ago",
    unread: true,
    icon: "tick-circle-bold-20-00d26a",
    iconBg: "bg-brand-tint",
    actions: [{ label: "View review", variant: "outline-page", href: "/account/reviews" }],
  },
  {
    id: "new-offer",
    group: "TODAY",
    category: "offers",
    title: "New offer on your shortlist",
    body: "FundingPips: 20% off all challenges with code PFS-ALEX20. Expires in 3 days.",
    when: "8h ago",
    unread: true,
    icon: "ticket-20-00d26a",
    iconBg: "bg-brand-tint",
    actions: [
      { label: "Copy code", variant: "outline-page", copy: "PFS-ALEX20" },
      { label: "See offer", variant: "subtle", href: "/offers" },
    ],
  },
  {
    id: "split",
    group: "THIS WEEK",
    category: "offers",
    title: "FundingPips raised its profit split to 90%",
    body: "A firm on your shortlist changed its terms. Your saved comparison was updated.",
    when: "Yesterday",
    icon: "trend-up-20-898587",
    iconBg: "bg-raised",
  },
  {
    id: "sam",
    group: "THIS WEEK",
    category: "referrals",
    title: "Sam R. joined with your referral link",
    body: "You will receive $50 when they publish their first verified review.",
    when: "3 days ago",
    icon: "people-20-898587",
    iconBg: "bg-raised",
  },
  {
    id: "helpful",
    group: "THIS WEEK",
    category: "reviews",
    title: "12 traders found your Blue Guardian review helpful",
    body: "Helpful votes add +5 trust points each.",
    when: "5 days ago",
    icon: "like-20-898587",
    iconBg: "bg-raised",
  },
  {
    id: "signin",
    group: "EARLIER",
    category: "account",
    title: "New sign-in from iPhone · Dhaka",
    body: "If this wasn’t you, sign out of other devices and change your password.",
    when: "12 Oct",
    icon: "shield-tick-20-898587",
    iconBg: "bg-raised",
    actions: [{ label: "Review sessions", variant: "subtle", href: "/account/settings" }],
  },
  // Revealed by "Show older notifications" (makes the tab counts in the design add up: All 9, Reviews 4, Referrals 2)
  {
    id: "priya",
    group: "EARLIER",
    category: "referrals",
    title: "Priya K. published a verified review",
    body: "$50 was added to your referral balance.",
    when: "24 Oct",
    icon: "people-20-898587",
    iconBg: "bg-raised",
    older: true,
  },
  {
    id: "bg-verified",
    group: "EARLIER",
    category: "reviews",
    title: "Your Blue Guardian review was verified",
    body: "It is now public and counts towards your trust level.",
    when: "02 Oct",
    icon: "like-20-898587",
    iconBg: "bg-raised",
    older: true,
  },
];

export const PREFS = [
  { label: "Review status", hint: "Verified, published or needs proof", on: true },
  { label: "Offers from saved firms", hint: "New codes and price drops", on: true },
  { label: "Rule changes", hint: "When a saved firm changes its terms", on: true },
  { label: "Referral activity", hint: "Sign-ups and rewards", on: true },
  { label: "Weekly digest", hint: "Sunday summary email", on: false },
];

export const CHANNELS = [
  { label: "In-app", hint: "Always on", on: true },
  { label: "Email", hint: "alex.carter@mail.com", on: true },
  { label: "Browser push", hint: "Off · enable in your browser", on: false },
];
