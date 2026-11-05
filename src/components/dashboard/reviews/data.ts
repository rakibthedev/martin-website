import type { ReviewStatus } from "@/components/dashboard/StatusBadge";

/** Mock data for /account/reviews (Figma "My Reviews" 372:1761). */

export type StepState = "done" | "warning" | "danger" | "pending";

export type ReviewAction = {
  label: string;
  variant: "primary" | "outline" | "subtle";
  icon?: string;
  href?: string;
  /** client-side behaviour instead of a link */
  kind?: "share" | "delete";
};

export type MyReview = {
  id: string;
  firm: string;
  initials: string;
  /** firm logo tile colours */
  logoClass: string;
  status: ReviewStatus;
  /** star rating; omitted for drafts */
  rating?: number;
  /** meta parts after the stars, separated by "·" */
  meta: string[];
  /** ISO date used for sorting */
  date: string;
  title: string;
  body: string;
  actions: ReviewAction[];
  steps?: { label: string; state: StepState }[];
  /** right-hand footer note */
  note?: { text: string; tone: "danger" | "muted" };
  stats?: { helpful: string; views: string; points: string };
  draftPercent?: number;
};

const STEPS_PUBLISHED: MyReview["steps"] = [
  { label: "Submitted", state: "done" },
  { label: "Human verification", state: "done" },
  { label: "Published", state: "done" },
];

const EDIT: ReviewAction = { label: "Edit", variant: "outline", icon: "edit-2-16-f0f0f0", href: "/reviews/new" };
const SHARE: ReviewAction = { label: "Share", variant: "subtle", kind: "share" };

export const MY_REVIEWS: MyReview[] = [
  {
    id: "fundingpips",
    firm: "FundingPips",
    initials: "FP",
    logoClass: "bg-fundingpips-navy text-white",
    status: "needs-proof",
    rating: 4.5,
    meta: ["$100K account", "2-step challenge", "Submitted 28 Oct 2026"],
    date: "2026-10-28",
    title: "“Quick payouts but read the news-trading rule carefully”",
    body: "Passed the 2-step evaluation in 19 days. Support answered within an hour every time. The only surprise was the news-trading window, which is stricter than the FAQ suggests…",
    actions: [
      { label: "Add proof", variant: "primary", icon: "add-16-151513", href: "/reviews/new" },
      EDIT,
    ],
    steps: [
      { label: "Submitted", state: "done" },
      { label: "Proof needed", state: "danger" },
      { label: "Published", state: "pending" },
    ],
    note: { text: "13 days left to add proof", tone: "danger" },
  },
  {
    id: "blue-guardian",
    firm: "Blue Guardian",
    initials: "BG",
    logoClass: "bg-guardian-blue text-white",
    status: "under-review",
    rating: 4.0,
    meta: ["$50K account", "Instant funding", "Submitted 21 Oct 2026"],
    date: "2026-10-21",
    title: "“Solid rules, slower support at weekends”",
    body: "Clear drawdown rules and a fair scaling plan. Weekend tickets took 2 days to get a reply, which matters if you trade crypto…",
    actions: [{ label: "View submission", variant: "outline", icon: "eye-f0f0f0", href: "/reviews/new" }],
    steps: [
      { label: "Submitted", state: "done" },
      { label: "Human verification", state: "warning" },
      { label: "Published", state: "pending" },
    ],
    note: { text: "Usually takes 24–48 hours", tone: "muted" },
  },
  {
    id: "aqua-funded",
    firm: "Aqua Funded",
    initials: "AF",
    logoClass: "bg-funded-blue text-white",
    status: "verified",
    rating: 5.0,
    meta: ["$200K account", "1-step challenge", "Published 04 Oct 2026"],
    date: "2026-10-04",
    title: "“Best payout experience I have had so far”",
    body: "Requested my first payout on a Monday and had it in my wallet by Wednesday. Dashboard is clean and the profit split increased to 90% after the second payout…",
    actions: [EDIT, SHARE],
    steps: STEPS_PUBLISHED,
    stats: { helpful: "24 helpful", views: "1.2K views", points: "+120 pts" },
  },
  {
    id: "fundednext",
    firm: "FundedNext",
    initials: "FN",
    logoClass: "bg-card text-white",
    status: "draft",
    meta: ["Last edited 30 Oct 2026", "2 of 5 steps complete"],
    date: "2026-10-30",
    title: "“Untitled review”",
    body: "You started this review but have not submitted it yet. Drafts are saved automatically for 30 days.",
    actions: [
      { label: "Continue draft", variant: "primary", icon: "edit-2-16-151513", href: "/reviews/new" },
      { label: "Delete", variant: "subtle", kind: "delete" },
    ],
    draftPercent: 40,
  },
  // Older verified reviews revealed by "Load more reviews" (Figma shows 4 of 7).
  {
    id: "the5ers",
    firm: "The5ers",
    initials: "T5",
    logoClass: "bg-raised text-white",
    status: "verified",
    rating: 4.0,
    meta: ["$20K account", "Bootcamp", "Published 12 Sep 2026"],
    date: "2026-09-12",
    title: "“Slow start, great once you are funded”",
    body: "The bootcamp steps feel long, but scaling is generous and payouts have arrived on time every month since I was funded…",
    actions: [EDIT, SHARE],
    steps: STEPS_PUBLISHED,
    stats: { helpful: "9 helpful", views: "640 views", points: "+80 pts" },
  },
  {
    id: "ftmo",
    firm: "FTMO",
    initials: "FT",
    logoClass: "bg-raised text-white",
    status: "verified",
    rating: 4.5,
    meta: ["$100K account", "2-step challenge", "Published 28 Aug 2026"],
    date: "2026-08-28",
    title: "“The benchmark for rules and support”",
    body: "Rules are clearly documented and the dashboard metrics match what support tells you. Pricier than most, but no surprises…",
    actions: [EDIT, SHARE],
    steps: STEPS_PUBLISHED,
    stats: { helpful: "31 helpful", views: "2.4K views", points: "+120 pts" },
  },
  {
    id: "e8-markets",
    firm: "E8 Markets",
    initials: "E8",
    logoClass: "bg-raised text-white",
    status: "verified",
    rating: 3.5,
    meta: ["$50K account", "1-step challenge", "Published 02 Aug 2026"],
    date: "2026-08-02",
    title: "“Good platform, payouts took a week”",
    body: "Trading conditions were fine and spreads tight. My first payout took seven business days instead of the advertised three…",
    actions: [EDIT, SHARE],
    steps: STEPS_PUBLISHED,
    stats: { helpful: "6 helpful", views: "410 views", points: "+60 pts" },
  },
];

export const PAGE_SIZE = 4;

export const FILTERS: { id: "all" | ReviewStatus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "verified", label: "Verified" },
  { id: "under-review", label: "Under review" },
  { id: "needs-proof", label: "Needs proof" },
  { id: "draft", label: "Drafts" },
];

export const SORTS = [
  { id: "recent", label: "Most recent" },
  { id: "oldest", label: "Oldest first" },
  { id: "rating", label: "Highest rated" },
] as const;
export type SortId = (typeof SORTS)[number]["id"];
