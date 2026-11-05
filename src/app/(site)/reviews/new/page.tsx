import type { Metadata } from "next";
import Link from "next/link";
import { ReviewHero } from "@/components/flows/review/ReviewHero";
import { SubmitReviewForm } from "@/components/flows/review/SubmitReviewForm";

export const metadata: Metadata = { title: "Submit a review · PropFirmScores" };

/** Figma: Account flow / Submit Review — 432:11730 (desktop) · 497:22335 (tablet) · 497:22768 (mobile). */
export default function SubmitReviewPage() {
  return (
    <div className="flex w-full flex-col gap-6 px-4 pb-8 pt-8 md:gap-8 md:px-6 md:pb-12 xl:px-12 xl:pb-24">
      <p className="type-body-sm text-muted">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        {" / "}
        <span>Submit Review</span>
      </p>
      <ReviewHero />
      <SubmitReviewForm />
      <p className="type-caption text-muted">Account screens are design previews · sample content shown.</p>
    </div>
  );
}
