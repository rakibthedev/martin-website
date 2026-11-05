export type ActiveOffer = {
  id: string;
  firm: string;
  initials: string;
  bg: string;
  claimed: string;
  discount: string;
  scope: string;
  code: string;
  expires: string;
  urgent?: boolean;
  /** estimated saving when marked as used */
  saving: number;
};

export type HistoryItem = {
  id: string;
  firm: string;
  when: string;
  discount: string;
  status: "used" | "expired";
  saved?: string;
};

export const STATS = {
  activeHint: "Ready to use",
  savingsHint: "From 1 used code",
  expiringHint: "FundingPips in 3 days",
};

export const ACTIVE_OFFERS: ActiveOffer[] = [
  {
    id: "fundingpips",
    firm: "FundingPips",
    initials: "FP",
    bg: "bg-fundingpips-navy",
    claimed: "Claimed 01 Nov 2026",
    discount: "20% OFF",
    scope: "All challenges",
    code: "PFS-ALEX20",
    expires: "Expires in 3 days",
    urgent: true,
    saving: 119,
  },
  {
    id: "blue-guardian",
    firm: "Blue Guardian",
    initials: "BG",
    bg: "bg-guardian-blue",
    claimed: "Claimed 30 Oct 2026",
    discount: "35% OFF",
    scope: "Instant funding",
    code: "1X5H",
    expires: "Expires 30 Nov",
    saving: 175,
  },
  {
    id: "aqua-funded",
    firm: "Aqua Funded",
    initials: "AF",
    bg: "bg-funded-blue",
    claimed: "Claimed 22 Oct 2026",
    discount: "50% OFF",
    scope: "1-step challenge",
    code: "6JO",
    expires: "Expires 15 Nov",
    saving: 150,
  },
];

export const HISTORY: HistoryItem[] = [
  { id: "equity-edge", firm: "Equity Edge", when: "Used 12 Oct 2026", discount: "50% OFF", status: "used", saved: "Saved $186" },
  { id: "alpha-capital", firm: "Alpha Capital", when: "Expired 01 Oct 2026", discount: "15% OFF", status: "expired" },
  { id: "atlas-funded", firm: "Atlas Funded", when: "Expired 20 Sep 2026", discount: "50% OFF", status: "expired" },
];
