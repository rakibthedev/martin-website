import type { Metadata } from "next";
import { LeaderboardView } from "@/components/insights/leaderboard/LeaderboardView";
import { ContextBar } from "@/components/insights/ui";

export const metadata: Metadata = { title: "Leaderboard · PropFirmScores" };

/** Figma: Leaderboard / Desktop 1920 (379:15415), Tablet 768 (497:47885), Mobile 393 (497:50029). */
export default function LeaderboardPage() {
  return (
    <>
      <ContextBar
        title="You have reviewed 3 of the top 20 firms"
        text="Firms you reviewed are highlighted. Your reviews count towards their trust score."
        cta="Review another firm"
        href="/reviews/new"
      />
      <div className="w-full px-4 pb-8 pt-8 md:px-6 md:pb-12 md:pt-12 xl:px-12 xl:pb-20 xl:pt-20">
        <div className="mx-auto w-full max-w-[1638px]">
          <LeaderboardView />
        </div>
      </div>
    </>
  );
}
