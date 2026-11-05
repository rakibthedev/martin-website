/** Mock data for the signed-in Home page (Figma 379:9118 / 497:32137 / 497:34690). */

export type Offer = { firm: string; rating: string; discount: string; code: string; logo: string };

/** Hero marquee — every Figma card is "Offer / FundedNext". */
export const OFFERS: Offer[] = Array.from({ length: 7 }, () => ({
  firm: "FundedNext",
  rating: "4.3 / 5",
  discount: "7% OFF",
  code: "MATCH",
  logo: "/images/home/fundednext.svg",
}));

export type Firm = {
  rank: string;
  name: string;
  slug: string;
  country: string;
  countryShort: string;
  age: string;
  ageShort: string;
  rating: number;
  reviews: string;
  reviewsShort: string;
  favorites: string;
  assets: string[];
  maxAllocation: string;
  /** Allocation fill in % of the bar (Figma: 148/180 desktop, 311/311 tablet, 143/143 mobile → visually "full") */
  allocationPct: number;
  discount: string;
  code: string;
  /** Row background (Figma: rank-first / second / third, then neutral card) */
  bg: string;
};

const ROW_BG = ["#372d0f", "#353032", "#271811"];

export const FIRMS: Firm[] = Array.from({ length: 15 }, (_, i) => ({
  rank: String(i + 1).padStart(2, "0"),
  name: "FundedNext",
  slug: "fundingpips",
  country: "EUA",
  countryShort: "EUA",
  age: "(4 years)",
  ageShort: "(4y)",
  rating: 4,
  reviews: "4.3 (914 reviews)",
  reviewsShort: "4.3 (914)",
  favorites: "38393",
  assets: ["FX", "Indices", "Crypto", "Other Commodities", "Stocks"],
  maxAllocation: "$1.43M",
  allocationPct: 82,
  discount: "12% OFF",
  code: "23d4e3",
  bg: ROW_BG[i] ?? "#2b2a27",
}));

export const FIRM_FILTERS = ["Popular", "Favorite", "New", "All"] as const;
export type FirmFilter = (typeof FIRM_FILTERS)[number];

export const STEPS = [
  {
    n: "01",
    title: "Submit Your Review",
    body: "Every review goes through a clear verification process to help traders make informed decisions.",
    icon: "how-review-document",
    iconBox: "bottom-[12.5%] left-1/4 right-1/4 top-[12.5%]",
    iconBleed: "inset-[-4.44%_-6.67%]",
  },
  {
    n: "02",
    title: "Human Verification",
    body: "Our team carefully checks the submitted evidence to confirm the review is genuine.",
    icon: "how-evidence-shield",
    iconBox: "inset-[12.5%_16.67%]",
    iconBleed: "inset-[-4.44%_-5%]",
  },
  {
    n: "03",
    title: "Trust Score Updates",
    body: "Verified reviews help update each firm's trust score, giving traders a clearer picture of its reliability.",
    icon: "how-trust-chart",
    iconBox: "inset-[16.67%]",
    iconBleed: "inset-[-5%]",
  },
] as const;

export type Testimonial = { name: string; role: string; avatar: string; quote: string };

export const TESTIMONIALS: Testimonial[] = Array.from({ length: 3 }, () => ({
  name: "Mehidy Hasan",
  role: "Student",
  avatar: "/images/home/testimonial-avatar.png",
  quote:
    "“The trading rules were clear, and the platform was easy to use. Overall, a smooth experience from start to finish.”",
}));
