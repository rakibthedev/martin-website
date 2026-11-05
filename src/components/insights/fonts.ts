import { Inter, Manrope } from "next/font/google";

/** Figma "Martin / Detail / Inter Semi Bold / 12–Auto" (leaderboard rank numbers). */
export const inter = Inter({ subsets: ["latin"], weight: ["600"], display: "swap" });

/** Figma "Responsive / Manrope / Medium|Semibold / 16–20" (leaderboard firm names, compare bar). */
export const manrope = Manrope({ subsets: ["latin"], weight: ["500", "600"], display: "swap" });
