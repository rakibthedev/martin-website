/** Mock data for /articles, /articles/how-to-read-a-prop-firm-review and /referrals (Figma 381:4764, 432:13576, 379:14904). */

export const ARTICLE_HREF = "/articles/how-to-read-a-prop-firm-review";

export type ArtKind = "proof" | "split" | "drawdown";
export type Level = "Beginner" | "Intermediate" | "Advanced";
export type Tab = "Beginner guides" | "Firm research" | "Rules & payouts" | "Strategy" | "Industry news";

export const ART_SRC: Record<ArtKind, string> = {
  proof: "/images/content/art-proof.svg",
  split: "/images/content/art-profit-split.svg",
  drawdown: "/images/content/art-drawdown.svg",
};

export type ArticleCardData = {
  id: string;
  art: ArtKind;
  category: string;
  tab: Tab;
  level: Level;
  minutes: number;
  title: string;
  description: string;
  takeaway: string;
  tool: { label: string; href: string };
  saved?: boolean;
  /** lower = newer */
  age: number;
  reads: number;
};

const TOOLS = {
  firms: { label: "Related tool: Browse firms", href: "/firms" },
  compare: { label: "Related tool: Compare firms", href: "/compare" },
  challenges: { label: "Related tool: Challenges", href: "/challenges" },
};

export const ARTICLES: ArticleCardData[] = [
  {
    id: "proof-behind-the-review",
    art: "proof",
    category: "Firm research",
    tab: "Firm research",
    level: "Intermediate",
    minutes: 6,
    title: "Proof behind the review",
    description: "Why supporting evidence adds context to a trading experience.",
    takeaway: "A review with proof shows what really happened, not just how someone felt.",
    tool: TOOLS.firms,
    age: 1,
    reads: 1900,
  },
  {
    id: "understanding-profit-splits",
    art: "split",
    category: "Trading rules",
    tab: "Rules & payouts",
    level: "Intermediate",
    minutes: 6,
    title: "Understanding profit splits",
    description: "Questions to ask when you read a firm’s payout terms.",
    takeaway: "Check whether the headline split applies from day one or only after scaling.",
    tool: TOOLS.compare,
    saved: true,
    age: 2,
    reads: 2100,
  },
  {
    id: "daily-loss-and-maximum-drawdown",
    art: "drawdown",
    category: "Trading rules",
    tab: "Beginner guides",
    level: "Beginner",
    minutes: 6,
    title: "Daily loss and maximum drawdown",
    description: "Understand the difference before comparing programmes.",
    takeaway: "Daily loss usually resets each day; maximum loss is your overall limit for the account.",
    tool: TOOLS.challenges,
    age: 3,
    reads: 3200,
  },
  {
    id: "7-red-flags-in-payout-terms",
    art: "proof",
    category: "Firm research",
    tab: "Firm research",
    level: "Intermediate",
    minutes: 8,
    title: "7 red flags in payout terms",
    description: "What to check before you trust a firm’s payout promises.",
    takeaway: "If the payout rules are vague, ask support in writing before you buy.",
    tool: TOOLS.firms,
    age: 4,
    reads: 2800,
  },
  {
    id: "scaling-plans-explained",
    art: "split",
    category: "Rules & payouts",
    tab: "Rules & payouts",
    level: "Advanced",
    minutes: 7,
    title: "Scaling plans, explained",
    description: "How account growth targets really work across top firms.",
    takeaway: "Scaling usually needs consistent profit over 3–4 months, not one big week.",
    tool: TOOLS.compare,
    age: 5,
    reads: 1500,
  },
  {
    id: "1-step-vs-2-step-challenges",
    art: "drawdown",
    category: "Strategy",
    tab: "Strategy",
    level: "Beginner",
    minutes: 5,
    title: "1-step vs. 2-step challenges",
    description: "Which evaluation fits your trading style and risk appetite.",
    takeaway: "2-step is cheaper but slower; 1-step has tighter drawdown.",
    tool: TOOLS.challenges,
    age: 6,
    reads: 2600,
  },
  // Revealed by "Load more articles"
  {
    id: "how-to-read-a-prop-firm-review",
    art: "proof",
    category: "Firm research",
    tab: "Beginner guides",
    level: "Beginner",
    minutes: 9,
    title: "How to read a prop firm review",
    description: "Understand the evidence, context and trading details that make a review useful.",
    takeaway: "Trust patterns across many reviews more than one strong opinion.",
    tool: TOOLS.firms,
    age: 7,
    reads: 2400,
  },
  {
    id: "building-your-firm-shortlist",
    art: "split",
    category: "Firm research",
    tab: "Firm research",
    level: "Intermediate",
    minutes: 6,
    title: "Building your firm shortlist",
    description: "Turn what you learned into a fair comparison of 2–3 firms.",
    takeaway: "Compare the same account size and challenge type side by side.",
    tool: TOOLS.compare,
    age: 8,
    reads: 1700,
  },
  {
    id: "sizing-positions-for-a-5-daily-loss-limit",
    art: "drawdown",
    category: "Strategy",
    tab: "Strategy",
    level: "Intermediate",
    minutes: 8,
    title: "Sizing positions for a 5% daily loss limit",
    description: "Keep every trade small enough that one bad day never ends the account.",
    takeaway: "Risk a fraction of the daily limit per trade, not the whole limit.",
    tool: TOOLS.challenges,
    age: 9,
    reads: 1300,
  },
  {
    id: "what-proof-verified-really-means",
    art: "proof",
    category: "Firm research",
    tab: "Industry news",
    level: "Beginner",
    minutes: 4,
    title: "What “proof verified” really means",
    description: "How evidence on PropFirmScores reviews is checked.",
    takeaway: "Verified badge = evidence was checked.",
    tool: TOOLS.firms,
    age: 10,
    reads: 2000,
  },
  {
    id: "scaling-plans-explained-with-numbers",
    art: "split",
    category: "Rules & payouts",
    tab: "Rules & payouts",
    level: "Advanced",
    minutes: 7,
    title: "Scaling plans, explained with numbers",
    description: "Worked examples of how balances grow under common scaling rules.",
    takeaway: "Look at the profit target per step, not just the final account size.",
    tool: TOOLS.compare,
    age: 11,
    reads: 1200,
  },
  {
    id: "news-trading-rules",
    art: "drawdown",
    category: "Industry news",
    tab: "Industry news",
    level: "Intermediate",
    minutes: 5,
    title: "News trading rules",
    description: "Which firms restrict trading around high-impact news.",
    takeaway: "Check the restricted window before you hold trades through news.",
    tool: TOOLS.challenges,
    age: 12,
    reads: 900,
  },
];

export const CATEGORY_TABS: { label: "All" | Tab; count: number }[] = [
  { label: "All", count: 48 },
  { label: "Beginner guides", count: 12 },
  { label: "Firm research", count: 9 },
  { label: "Rules & payouts", count: 11 },
  { label: "Strategy", count: 8 },
  { label: "Industry news", count: 8 },
];

export const TOTAL_ARTICLES = 48;

export const POPULAR_TOPICS = ["Drawdown", "Profit split", "Payout proof", "Scaling plans", "News trading"];

export const LEARNING_PATHS = [
  { name: "New here", meta: "Beginner · 4 guides", progress: 100, status: "done" as const },
  { name: "Choosing a firm", meta: "Intermediate · 5 guides", progress: 40, status: "continue" as const },
  { name: "Passing the challenge", meta: "Intermediate · 6 guides", progress: 0, status: "start" as const },
];

export const CONTINUE_READING = [
  { pct: 62, eyebrow: "RULES & PAYOUTS", title: "Understanding profit splits", left: "3 min left" },
  { pct: 25, eyebrow: "FIRM RESEARCH", title: "Building your firm shortlist", left: "5 min left" },
  { pct: 10, eyebrow: "STRATEGY", title: "Sizing positions for a 5% daily loss limit", left: "8 min left" },
];

export const MOST_READ = [
  { title: "Daily loss vs. maximum drawdown", meta: "Trading rules · 6 min" },
  { title: "7 red flags in payout terms", meta: "Firm research · 8 min" },
  { title: "1-step vs. 2-step challenges", meta: "Beginner · 5 min" },
  { title: "What “proof verified” really means", meta: "Firm research · 4 min" },
  { title: "Scaling plans, explained with numbers", meta: "Rules & payouts · 7 min" },
];

/* ---------------- Article page ---------------- */

export const TOC = [
  { id: "in-30-seconds", label: "In 30 seconds" },
  { id: "start-with-the-proof", label: "1. Start with the proof" },
  { id: "read-the-context", label: "2. Read the context" },
  { id: "check-the-trading-details", label: "3. Check the trading details" },
  { id: "watch-for-red-flags", label: "4. Watch for red flags" },
  { id: "your-review-checklist", label: "Your review checklist" },
];

export const CHECKLIST = [
  "Does the review include proof?",
  "Do I know which challenge and account size?",
  "Is the review recent?",
  "Does it mention specific details?",
  "Do other reviews say the same thing?",
];

export const RELATED_IDS = ["proof-behind-the-review", "understanding-profit-splits", "daily-loss-and-maximum-drawdown"];

export const SHARE_URL = "https://propfirmscores.com/articles/how-to-read-a-prop-firm-review";

/* ---------------- Referrals ---------------- */

export const REFERRAL_LINK = "propfirmscores.com/r/martin";
export const REFERRAL_CODE = "MARTIN";
const enc = encodeURIComponent("https://" + REFERRAL_LINK);

export const SHARE_LINKS = {
  x: `https://x.com/intent/post?url=${enc}`,
  telegram: `https://t.me/share/url?url=${enc}`,
  whatsapp: `https://wa.me/?text=${encodeURIComponent("Join me on PropFirmScores https://" + REFERRAL_LINK)}`,
  email: `mailto:?subject=${encodeURIComponent("A better way to research prop firms")}&body=${enc}`,
};

export const QR_GRID = [
  "1110111",
  "1010101",
  "1110111",
  "0001000",
  "1101011",
  "1011101",
  "1110110",
];

export type RangeKey = "Last 7 days" | "Last 30 days" | "Last 90 days";
export const FUNNEL: Record<RangeKey, { visits: number; invites: number; joined: number; dv: string; di: string; dj: string }> = {
  "Last 7 days": { visits: 42, invites: 6, joined: 3, dv: "+42 this week", di: "+6 this week", dj: "+3 this week" },
  "Last 30 days": { visits: 248, invites: 36, joined: 12, dv: "+42 this week", di: "+6 this week", dj: "+3 this week" },
  "Last 90 days": { visits: 611, invites: 84, joined: 27, dv: "+42 this week", di: "+6 this week", dj: "+3 this week" },
};

export const VISITS = [
  { day: "Mon", v: 4, h: 56 },
  { day: "Tue", v: 6, h: 84 },
  { day: "Wed", v: 5, h: 70 },
  { day: "Thu", v: 9, h: 126, top: true },
  { day: "Fri", v: 7, h: 98 },
  { day: "Sat", v: 8, h: 112 },
  { day: "Sun", v: 3, h: 42 },
];

export const CHANNELS = [
  { name: "Telegram", pct: 42, x: false, top: true },
  { name: "/ Twitter", pct: 31, x: true },
  { name: "WhatsApp", pct: 19, x: false },
  { name: "Email", pct: 8, x: false },
];

export type ActivityStatus = "Joined" | "Invited" | "Clicked link";
export const RECENT = [
  { initial: "A", name: "A***d K.", channel: "Telegram", date: "Today, 10:24", status: "Joined" as ActivityStatus },
  { initial: "S", name: "S***a M.", channel: "/ Twitter", x: true, date: "Today, 08:51", status: "Invited" as ActivityStatus },
  { initial: "J", name: "J***n O.", channel: "WhatsApp", date: "Yesterday", status: "Joined" as ActivityStatus },
  { initial: "R", name: "R***i T.", channel: "Telegram", date: "2 days ago", status: "Clicked link" as ActivityStatus },
  { initial: "M", name: "M***e B.", channel: "Email", date: "3 days ago", status: "Joined" as ActivityStatus },
];

export const TEMPLATES = [
  {
    key: "x",
    title: "For X / Twitter",
    icon: "x-logo-f0f0f0",
    lines: ["Before buying a prop challenge I check proof-verified reviews on PropFirmScores. Worth a look 👇"],
    linkOnNewLine: true,
    chars: "124 characters",
  },
  {
    key: "tg",
    title: "For Telegram & WhatsApp",
    icon: "message-f0f0f0",
    lines: ["Hey! If you’re picking a prop firm, try PropFirmScores — real reviews with proof and side-by-side comparisons: "],
    linkOnNewLine: false,
    chars: "138 characters",
  },
  {
    key: "email",
    title: "For email",
    icon: "sms-f0f0f0",
    lines: [
      "Subject: A better way to research prop firms",
      "",
      "I’ve been using PropFirmScores to compare firms and read verified reviews before I buy a challenge. Thought it might help you too: ",
    ],
    linkOnNewLine: false,
    chars: "204 characters",
  },
];

export const BENEFITS = [
  { icon: "tick-circle-outline-00d26a", title: "Proof-verified reviews", body: "Real trader experiences backed by evidence." },
  { icon: "arrow-swap-horizontal-00d26a", title: "Side-by-side compare", body: "Trust scores, rules and payouts in one view." },
  { icon: null, title: "Offers & promo codes", body: "Discounts on challenges from listed firms." },
  { icon: "book-00d26a", title: "Plain-English guides", body: "Learn the rules before buying a challenge." },
];

export const FAQ = [
  {
    q: "How do I get my referral link?",
    a: "It’s already at the top of this page. Tap “Copy link”, or share your referral code MARTIN.",
  },
  {
    q: "Where can I see who joined?",
    a: "Your activity — link visits, invitations and joined traders — is shown in “Your referral activity” once you’re signed in.",
  },
  {
    q: "Are there rewards?",
    a: "Reward terms will appear when the programme launches. Until then, your link helps friends research firms with more confidence.",
  },
  {
    q: "Who can I invite?",
    a: "Anyone who trades or is thinking about buying a prop firm challenge — friends, community members or followers.",
  },
];
