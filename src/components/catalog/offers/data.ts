/** Mock data for /offers (Figma: Offers / Desktop 1920 — 379:14081). */

export type OfferLogo =
  | { kind: "image"; src: string; width: number; height: number; bg?: string }
  | { kind: "text"; initials: string; color: string; bg: string };

export type Offer = {
  id: string;
  firm: string;
  /** Percent off; null = "Exclusive deal" (amount shown at checkout). */
  discount: number | null;
  code: string;
  logo: OfferLogo;
  href: string;
};

export const FIRM_HREF = "/firms/fundingpips";

export const OFFERS: Offer[] = [
  {
    id: "aqua-funded",
    firm: "Aqua Funded",
    discount: 50,
    code: "6JO",
    logo: { kind: "image", src: "/images/catalog/offers/aquafunded-logo.svg", width: 56, height: 26.552 },
    href: FIRM_HREF,
  },
  {
    id: "equity-edge",
    firm: "Equity Edge",
    discount: 50,
    code: "PFS",
    logo: { kind: "text", initials: "EE", color: "#f0f0f0", bg: "#212121" },
    href: FIRM_HREF,
  },
  {
    id: "atlas-funded",
    firm: "Atlas Funded",
    discount: 50,
    code: "4SU",
    logo: { kind: "text", initials: "AF", color: "#00d26a", bg: "#212121" },
    href: FIRM_HREF,
  },
  {
    id: "blue-guardian",
    firm: "Blue Guardian",
    discount: 35,
    code: "1X5H",
    logo: { kind: "image", src: "/images/catalog/offers/blueguardian-logo.png", width: 24, height: 24 },
    href: FIRM_HREF,
  },
  {
    id: "alpha-capital",
    firm: "Alpha Capital",
    discount: 15,
    code: "XWGWC",
    logo: { kind: "image", src: "/images/catalog/offers/alphacapital-logo.svg", width: 20, height: 20 },
    href: FIRM_HREF,
  },
  {
    id: "fundingpips",
    firm: "FundingPips",
    discount: null,
    code: "D76151DB",
    logo: { kind: "image", src: "/images/catalog/offers/fundingpips-logo.svg", width: 24, height: 24 },
    href: FIRM_HREF,
  },
];

export const FEATURED_OFFER = OFFERS[0];

export type OfferFilter = "all" | "50plus" | "under50";
export type OfferSort = "biggest" | "smallest" | "az";

export const OFFER_FILTERS: { id: OfferFilter; label: string; test: (o: Offer) => boolean }[] = [
  { id: "all", label: "All", test: () => true },
  { id: "50plus", label: "50% off or more", test: (o) => (o.discount ?? 0) >= 50 },
  { id: "under50", label: "Under 50%", test: (o) => (o.discount ?? 0) < 50 },
];

export const OFFER_SORTS: { id: OfferSort; label: string; subtitle: string }[] = [
  { id: "biggest", label: "Biggest discount", subtitle: "sorted by biggest discount" },
  { id: "smallest", label: "Smallest discount", subtitle: "sorted by smallest discount" },
  { id: "az", label: "Firm A–Z", subtitle: "sorted by firm A–Z" },
];

export const OFFER_STEPS = [
  { n: 1, title: "Pick an offer", text: "Choose a firm and the discount you like." },
  { n: 2, title: "Copy the code", text: "Tap “Copy”. The code is saved to your clipboard." },
  { n: 3, title: "Paste at checkout", text: "Open the firm’s site and paste the code when you pay." },
];

export const OFFER_KEY_NUMBERS = [
  { value: "6", label: "active offers" },
  { value: "Up to 50%", label: "off challenge fees" },
  { value: "1 click", label: "to copy a code" },
];
