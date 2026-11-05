import type { Metadata } from "next";
import Link from "next/link";
import { ContextBar } from "@/components/catalog/ContextBar";
import { ChallengeFaq } from "@/components/catalog/challenges/ChallengeFaq";
import { ChallengesExplorer } from "@/components/catalog/challenges/ChallengesExplorer";

export const metadata: Metadata = { title: "Challenges · PropFirmScores" };

/** Figma: Challenges — Desktop 379:13594 / Tablet 497:41015 / Mobile 497:41480. */
export default function ChallengesPage() {
  return (
    <>
      <ContextBar
        title="Matched to your trading profile"
        text="Showing challenges for Forex & Indices traders with 1–3 years of experience."
        cta="Edit preferences"
        href="/account/settings"
      />
      <div className="flex flex-col gap-6 px-4 pt-8 pb-8 md:gap-8 md:px-6 md:pb-12 xl:px-12 xl:pb-24">
        <nav aria-label="Breadcrumb" className="type-body-sm whitespace-pre text-muted">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          {"  /  "}
          <span aria-current="page">Challenges</span>
        </nav>
        <ChallengesExplorer />
        <ChallengeFaq />
      </div>
    </>
  );
}
