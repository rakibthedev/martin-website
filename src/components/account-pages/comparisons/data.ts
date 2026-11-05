export type Comparison = {
  id: string;
  title: string;
  subtitle: string;
  changed: string;
  firms: { initials: string; bg: string }[];
  rows: { label: string; firm: string; value: string }[];
};

export const STATS = [
  { label: "Saved comparisons", value: "2", hint: "Up to 10 saved", icon: "graph-22-00d26a" },
  { label: "Firms compared", value: "5", hint: "Across all comparisons", icon: "eye-22-00d26a" },
  { label: "Figures updated", value: "3", hint: "Since you last opened them", icon: "trend-up-22-00d26a" },
];

export const COMPARISONS: Comparison[] = [
  {
    id: "shortlist-final-3",
    title: "My shortlist — final 3",
    subtitle: "FundingPips vs Blue Guardian vs Aqua Funded  ·  Updated 2 days ago",
    changed: "2 figures changed",
    firms: [
      { initials: "FP", bg: "bg-fundingpips-navy" },
      { initials: "BG", bg: "bg-guardian-blue" },
      { initials: "AF", bg: "bg-funded-blue" },
    ],
    rows: [
      { label: "Best trust score", firm: "FundingPips", value: "4.4" },
      { label: "Best profit split", firm: "Aqua Funded", value: "95%" },
      { label: "Lowest fee ($100K)", firm: "Blue Guardian", value: "$499" },
      { label: "Largest allocation", firm: "FundingPips", value: "$800K" },
    ],
  },
  {
    id: "instant-funding",
    title: "Instant funding options",
    subtitle: "Blue Guardian vs Goat Funded  ·  Saved 12 Oct 2026",
    changed: "1 figure changed",
    firms: [
      { initials: "BG", bg: "bg-guardian-blue" },
      { initials: "GF", bg: "bg-card" },
    ],
    rows: [
      { label: "Best trust score", firm: "Blue Guardian", value: "4.3" },
      { label: "Best profit split", firm: "Goat Funded", value: "90%" },
      { label: "Lowest fee ($50K)", firm: "Goat Funded", value: "$329" },
      { label: "Fastest payout", firm: "Blue Guardian", value: "24h" },
    ],
  },
];
