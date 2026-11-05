import type { Metadata } from "next";
import { CompareCriteria, CompareHero } from "@/components/insights/compare/CompareStatic";
import { CompareView } from "@/components/insights/compare/CompareView";
import { Breadcrumb, ContextBar } from "@/components/insights/ui";

export const metadata: Metadata = { title: "Compare firms · PropFirmScores" };

/** Figma: Compare / Desktop 1920 (379:14463), Tablet 768 (497:45063), Mobile 393 (497:45482). */
export default function ComparePage() {
  return (
    <>
      <ContextBar
        title="Start from your shortlist"
        text="FundingPips, Blue Guardian and Aqua Funded are ready to compare."
        cta="Load my shortlist"
        href="/favourite-firms"
      />
      <div className="flex w-full flex-col gap-6 px-4 pb-8 pt-8 md:gap-8 md:px-6 md:pb-12 xl:px-12 xl:pb-24">
        <Breadcrumb current="Compare" />
        <CompareHero />
        <CompareView criteria={<CompareCriteria />} />
      </div>
    </>
  );
}
