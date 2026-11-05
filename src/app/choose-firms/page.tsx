import type { Metadata } from "next";
import { FirmPicker } from "@/components/flows/choose/FirmPicker";

export const metadata: Metadata = { title: "Choose firms to compare · PropFirmScores" };

/**
 * Figma: Account flow / Choose firms — 432:14454 (desktop) · 497:29055 (tablet) · 497:30596 (mobile).
 * A standalone "Picker panel" (no site header/footer at any breakpoint), 64px from the top and bottom,
 * 1280 wide and centred on desktop, full width on tablet / mobile.
 */
export default function ChooseFirmsPage() {
  return (
    <main className="mx-auto min-h-dvh w-full max-w-[1920px] bg-page py-16 xl:px-12">
      <FirmPicker />
    </main>
  );
}
