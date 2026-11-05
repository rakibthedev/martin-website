import { Inter, Manrope, Playfair_Display } from "next/font/google";

/** Extra Figma families used only on the Home page ("Responsive / Manrope / …", rank numbers in Inter, "traders." in Playfair). */
export const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });
export const inter = Inter({ subsets: ["latin"], weight: ["600"], display: "swap" });
export const playfair = Playfair_Display({ subsets: ["latin"], weight: ["500"], style: ["italic"], display: "swap" });
