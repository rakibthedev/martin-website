import type { ChipTone } from "../shared";

export const SHORTLIST = [
  { initials: "FP", bg: "bg-fundingpips-navy" },
  { initials: "BG", bg: "bg-guardian-blue" },
  { initials: "AF", bg: "bg-funded-blue" },
];
export const SHORTLIST_MAX = 5;

export const CHANGES: {
  title: string;
  detail: string;
  when: string;
  icon: string;
  iconBg: string;
}[] = [
  {
    title: "FundingPips raised its profit split to 90%",
    detail: "Applies to new accounts from 1 Nov 2026",
    when: "Today",
    icon: "trend-up-00d26a",
    iconBg: "bg-brand-tint",
  },
  {
    title: "Blue Guardian added a 35% members-only code",
    detail: "Code 1X5H · expires 30 Nov",
    when: "2 days ago",
    icon: "ticket-18-00d26a",
    iconBg: "bg-brand-tint",
  },
  {
    title: "Aqua Funded changed its news-trading rule",
    detail: "High-impact news now restricted 2 min before/after",
    when: "4 days ago",
    icon: "info-circle-f5a524",
    iconBg: "bg-warning-bg",
  },
];

export type SavedFirm = {
  id: string;
  name: string;
  initials: string;
  bg: string;
  chip: { label: string; tone: ChipTone };
  meta: string;
  score: string;
  allocation: string;
  split: string;
  splitHighlight?: boolean;
  note: string;
  alerts: boolean;
  href: string;
};

export const SAVED_FIRMS: SavedFirm[] = [
  {
    id: "fundingpips",
    name: "FundingPips",
    initials: "FP",
    bg: "bg-fundingpips-navy",
    chip: { label: "Split ↑", tone: "brand" },
    meta: "UAE · 4 yrs",
    score: "4.4 / 5",
    allocation: "$800K",
    split: "Up to 90%",
    note: "Check payout rules for news",
    alerts: true,
    href: "/firms/fundingpips",
  },
  {
    id: "blue-guardian",
    name: "Blue Guardian",
    initials: "BG",
    bg: "bg-guardian-blue",
    chip: { label: "New code", tone: "brand" },
    meta: "UK · 5 yrs",
    score: "4.3 / 5",
    allocation: "$200K",
    split: "Up to 85%",
    note: "Weekend support slow?",
    alerts: true,
    href: "/firms",
  },
  {
    id: "aqua-funded",
    name: "Aqua Funded",
    initials: "AF",
    bg: "bg-funded-blue",
    chip: { label: "Rule change", tone: "warning" },
    meta: "UAE · 3 yrs",
    score: "4.3 / 5",
    allocation: "$200K",
    split: "Up to 95%",
    splitHighlight: true,
    note: "",
    alerts: false,
    href: "/firms",
  },
];
