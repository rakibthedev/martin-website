import type { Metadata } from "next";
import { ContextBar } from "@/components/catalog/ContextBar";
import { FirmsBrowser } from "@/components/catalog/firms/FirmsBrowser";
import { FIRMS } from "@/components/catalog/data";

export const metadata: Metadata = { title: "Browse Prop Firms · PropFirmScores" };

/** Figma: Browse Firms — Desktop 379:11690 / Tablet 497:37243 / Mobile 497:39129. */
export default function FirmsPage() {
  return (
    <>
      <ContextBar
        title="Your shortlist: 3 of 5 saved"
        text="Tap ♡ on any firm to save it. Firms you have reviewed are marked “Reviewed”."
        cta="Compare 3 firms"
        href="/compare"
      />
      <section className="flex flex-col gap-6 px-4 pt-8 pb-8 md:gap-8 md:px-6 md:pt-12 md:pb-12 xl:px-12">
        <div className="flex flex-col gap-3 text-ink">
          <h1 className="type-h2">Browse Prop Firms</h1>
          <p className="type-body opacity-70">{FIRMS.length} firms · Find your next firm with proof-verified reviews.</p>
        </div>
        <FirmsBrowser />
      </section>
    </>
  );
}
