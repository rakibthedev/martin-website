import { Inter, Manrope } from "next/font/google";

/** Figma "Responsive / Manrope / Medium / 20|16" — firm names in the firm table/cards. */
export const manrope = Manrope({ subsets: ["latin"], weight: ["500"], display: "swap" });

/** Figma "Martin / Detail / Inter Semi Bold / 12–Auto" — rank numbers in the firm table/cards. */
export const inter = Inter({ subsets: ["latin"], weight: ["600"], display: "swap" });
