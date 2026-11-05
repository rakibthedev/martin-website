import type { Metadata } from "next";
import { FirmProfile } from "@/components/flows/firm/FirmProfile";

export const metadata: Metadata = { title: "FundingPips Review · PropFirmScores" };

export default function FundingPipsPage() {
  return <FirmProfile />;
}
