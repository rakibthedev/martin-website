import type { Metadata } from "next";
import Link from "next/link";
import { ContextBar } from "@/components/catalog/ContextBar";
import { GoodToKnow } from "@/components/catalog/offers/GoodToKnow";
import { OffersView } from "@/components/catalog/offers/OffersView";

export const metadata: Metadata = { title: "Offers · PropFirmScores" };

/** Figma: Offers / Desktop 1920 (379:14081), Tablet 768 (497:41945), Mobile 393 (497:42305) — signed in. */
export default function OffersPage() {
  return (
    <>
      <ContextBar
        title="Member codes unlocked"
        text={"You have claimed 4 offers  ·  FundingPips 20% code expires in 3 days"}
        cta="My claimed offers"
        href="/account/claimed-offers"
      />
      <div className="flex w-full flex-col items-start gap-6 px-4 pb-8 pt-8 md:gap-8 md:px-6 md:pb-12 xl:px-12 xl:pb-24">
        <p className="type-body-sm text-muted">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>{" "}
          / Offers
        </p>
        <OffersView />
        <GoodToKnow />
      </div>
    </>
  );
}
