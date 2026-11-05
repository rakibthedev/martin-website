import type { Metadata } from "next";
import { AccountLayout } from "@/components/account/AccountLayout";
import { Crumb } from "@/components/dashboard/ui";
import { ActionRequiredBanner, ReviewsHead } from "@/components/dashboard/reviews/ReviewsHead";
import { ReviewsBoard } from "@/components/dashboard/reviews/ReviewsBoard";

export const metadata: Metadata = { title: "My reviews · PropFirmScores" };

/** Figma "My Reviews" — Desktop 372:1761, Tablet 497:10481, Mobile 497:10746. */
export default function Page() {
  return (
    <AccountLayout active="reviews" breadcrumb={<Crumb>{"Home  /  Dashboard  /  My reviews"}</Crumb>}>
      <ReviewsHead />
      <ActionRequiredBanner />
      <ReviewsBoard />
    </AccountLayout>
  );
}
