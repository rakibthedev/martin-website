/** Mock data for the FundingPips editorial profile (Figma 432:12504 / 497:23201 / 497:23975). */

export const FIRM = {
  name: "FundingPips",
  logo: "/images/flows/fundingpips-logo.svg",
  website: "https://fundingpips.com",
  country: "UAE",
  founded: "2022",
  platform: "MT5",
  maxAllocation: "$800K",
  profitSplit: "Up to 90%",
  avgPayout: "Not reported",
  score: "4.4",
  scoreLabel: "Excellent",
  reviewCount: 16,
};

export const META_CHIPS = ["UAE", "Established 2022", "MT5"];

export const STATS = [
  { label: "Total Reviews", icon: "star-00d26a", value: "16", sub: "16 verified", tone: "good" },
  { label: "Complaints", icon: "danger-00d26a", value: "0", sub: "0.0% complaint rate", tone: "good" },
  { label: "Resolution Rate", icon: "refresh-00d26a", value: "—", sub: "No complaints to resolve yet", tone: "muted" },
  { label: "Verified Rate", icon: "tick-circle-outline-00d26a", value: "100%", sub: "All reviews include proof", tone: "good" },
] as const;

export const HIGHLIGHTS = [
  { label: "Max allocation", value: "$800K" },
  { label: "Profit split", value: "Up to 90%" },
  { label: "Platform", value: "MT5" },
];

export const DISTRIBUTION = [
  { stars: 5, pct: 88 },
  { stars: 4, pct: 13 },
  { stars: 3, pct: 0 },
  { stars: 2, pct: 0 },
  { stars: 1, pct: 0 },
];

export const FIRM_DETAILS = [
  { label: "Country", value: "UAE", tone: "ink" },
  { label: "Founded", value: "2022", tone: "ink" },
  { label: "Max Allocation", value: "$800K", tone: "brand" },
  { label: "Profit Split", value: "Up to 90%", tone: "brand" },
  { label: "Avg Payout", value: "Not reported", tone: "muted" },
  { label: "Platforms", value: "MT5", tone: "ink" },
] as const;

export const INSIGHTS = [
  { icon: "tick-circle-outline-00d26a", title: "100% verified proof", sub: "Above platform average" },
  { icon: "danger-00d26a", title: "0.0% complaint rate", sub: "Very low vs. platform average" },
];

export type FirmReview = {
  id: string;
  initials: string;
  name: string;
  ago: string;
  /** days ago — used for sorting */
  age: number;
  rating: number;
  title: string;
  body: string;
  /** Figma renders this one review's body in the text colour instead of muted */
  bodyInk?: boolean;
  tags: string[];
  sentiment: "Positive" | "Complaint";
  proof: boolean;
};

/** First six = Figma "Verified reviews" (newest first). The remaining ten are revealed by "Load 10 more reviews". */
export const REVIEWS: FirmReview[] = [
  {
    id: "ek",
    initials: "EK",
    name: "Ejike Kenneth Onyedika",
    ago: "3 months ago",
    age: 88,
    rating: 5,
    title: "I've made withdrawal",
    body: "They've got the best rules and account size, I've withdrawn even from their giveaway account",
    tags: ["Fast Payouts", "Clear Rules", "Good Support", "Easy Challenge", "Recommend"],
    sentiment: "Positive",
    proof: true,
  },
  {
    id: "ir",
    initials: "IR",
    name: "Ibrahim Ridwan",
    ago: "3 months ago",
    age: 91,
    rating: 5,
    title: "Yes",
    body: "The propfirm is good and well am so glad. And appreciate the propfirm.",
    bodyInk: true,
    tags: ["Fast Payouts"],
    sentiment: "Positive",
    proof: true,
  },
  {
    id: "es",
    initials: "ES",
    name: "Emma Shoneye",
    ago: "3 months ago",
    age: 95,
    rating: 5,
    title: "Fundingpips paid out within 1 hour",
    body: "Well I got my first ever payout with Fundingpips… I’m very happily and I’ll continue to trade with fundingpips",
    tags: ["Fast Payouts", "Clear Rules", "Good Support", "Easy Challenge", "Recommend"],
    sentiment: "Positive",
    proof: true,
  },
  {
    id: "po",
    initials: "PO",
    name: "Prosper Ogbonna",
    ago: "5 months ago",
    age: 150,
    rating: 5,
    title: "Fundingpips has good trading conditions",
    body: "I purchased a 5k acc and the trading experience has been awesome, unfortunately I didn't make it to payout, I've also gotten a payout from this firm with their 1k instant giveaway acc. I was paid in 2 mins.",
    tags: ["Fast Payouts", "Clear Rules", "Recommend"],
    sentiment: "Positive",
    proof: true,
  },
  {
    id: "ik",
    initials: "IK",
    name: "Isaac Kuye",
    ago: "6 months ago",
    age: 180,
    rating: 5,
    title: "Amazing",
    body: "They have the best rules and are the best firm me i recommend them",
    tags: ["Good Support", "Easy Challenge", "Recommend", "Clear Rules", "Fast Payouts"],
    sentiment: "Positive",
    proof: true,
  },
  {
    id: "lk",
    initials: "LK",
    name: "Lesley Kipngeno",
    ago: "6 months ago",
    age: 185,
    rating: 5,
    title: "Received phase 2 credentials in a few minutes",
    body: "Amazing experience with them so far. I had a couple of trades on phase one under 1 minute and there's no problem with that. Amazing firm in my opinion",
    tags: ["Recommend", "Easy Challenge"],
    sentiment: "Positive",
    proof: true,
  },
  // ── sample content beyond the Figma frame (revealed by "Load 10 more reviews") ──
  {
    id: "ao",
    initials: "AO",
    name: "Adebayo Okafor",
    ago: "7 months ago",
    age: 210,
    rating: 5,
    title: "Smooth payout process",
    body: "Requested my first payout on a Monday and it arrived the same day. The dashboard is simple and support replied within minutes.",
    tags: ["Fast Payouts", "Good Support"],
    sentiment: "Positive",
    proof: true,
  },
  {
    id: "mk",
    initials: "MK",
    name: "Mariam Khalid",
    ago: "7 months ago",
    age: 214,
    rating: 4,
    title: "Clear rules, fair evaluation",
    body: "The drawdown rules are explained clearly and there were no surprises during the challenge. Spreads could be a little tighter.",
    tags: ["Clear Rules"],
    sentiment: "Positive",
    proof: true,
  },
  {
    id: "jt",
    initials: "JT",
    name: "James Thornton",
    ago: "8 months ago",
    age: 240,
    rating: 5,
    title: "Passed phase 1 in a week",
    body: "Targets are realistic and the platform was stable throughout. Got my phase 2 account almost immediately after passing.",
    tags: ["Easy Challenge", "Recommend"],
    sentiment: "Positive",
    proof: true,
  },
  {
    id: "sn",
    initials: "SN",
    name: "Sipho Ndlovu",
    ago: "8 months ago",
    age: 246,
    rating: 4,
    title: "Good firm overall",
    body: "Support helped me with a KYC issue quickly. Payout took a day longer than I expected but it came through without problems.",
    tags: ["Good Support"],
    sentiment: "Positive",
    proof: true,
  },
  {
    id: "lr",
    initials: "LR",
    name: "Lucia Romero",
    ago: "9 months ago",
    age: 270,
    rating: 5,
    title: "Best conditions I have tried",
    body: "I have traded with three firms and FundingPips has the most straightforward rules. Withdrawals have been consistent every cycle.",
    tags: ["Clear Rules", "Fast Payouts", "Recommend"],
    sentiment: "Positive",
    proof: true,
  },
  {
    id: "dh",
    initials: "DH",
    name: "Daniel Hughes",
    ago: "9 months ago",
    age: 275,
    rating: 5,
    title: "Fast and transparent",
    body: "Everything from purchase to funded account was quick. The rules page answered most of my questions before I needed support.",
    tags: ["Clear Rules", "Easy Challenge"],
    sentiment: "Positive",
    proof: true,
  },
  {
    id: "ny",
    initials: "NY",
    name: "Nadia Yusuf",
    ago: "10 months ago",
    age: 300,
    rating: 4,
    title: "Reliable payouts",
    body: "Three payouts so far, all received on time. Would like to see more platform options but MT5 works well for me.",
    tags: ["Fast Payouts"],
    sentiment: "Positive",
    proof: true,
  },
  {
    id: "tc",
    initials: "TC",
    name: "Tomás Costa",
    ago: "10 months ago",
    age: 305,
    rating: 5,
    title: "Great support team",
    body: "Had a question about news trading rules and got a detailed answer in under ten minutes. Very professional.",
    tags: ["Good Support", "Recommend"],
    sentiment: "Positive",
    proof: true,
  },
  {
    id: "ra",
    initials: "RA",
    name: "Ravi Anand",
    ago: "11 months ago",
    age: 330,
    rating: 5,
    title: "Instant account was worth it",
    body: "Took the instant funding option and was trading the same afternoon. First payout arrived within 24 hours.",
    tags: ["Fast Payouts", "Easy Challenge"],
    sentiment: "Positive",
    proof: true,
  },
  {
    id: "co",
    initials: "CO",
    name: "Chiamaka Obi",
    ago: "1 year ago",
    age: 365,
    rating: 4,
    title: "Solid experience",
    body: "The challenge was fair and I passed on my second attempt. Discount codes made the reset affordable.",
    tags: ["Clear Rules", "Recommend"],
    sentiment: "Positive",
    proof: true,
  },
];

export const PAGE_SIZE = 6;
export const LOAD_STEP = 10;
