import type { Metadata } from "next";
import Link from "next/link";
import { ReferralHero } from "@/components/content/referrals/ReferralHero";
import { FriendsGet, HowItWorks, RecentActivity, ReferralInsights } from "@/components/content/referrals/sections";
import { ReadyToShare, ReferralActivity, ReferralFaq, ShareTemplates } from "@/components/content/referrals/interactive";

export const metadata: Metadata = { title: "Referrals · PropFirmScores" };

/** Figma "Referrals" — Desktop 379:14904 · Tablet 497:46911 · Mobile 497:47398. */
export default function ReferralsPage() {
  return (
    <div className="flex w-full flex-col gap-6 px-4 pb-8 pt-8 md:gap-8 md:px-6 md:pb-12 xl:gap-[72px] xl:px-12 xl:pb-24">
      <nav aria-label="Breadcrumb" className="type-body-sm text-muted">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        <span className="px-1.5">/</span>
        <span>Referrals</span>
      </nav>
      <ReferralHero />
      <HowItWorks />
      <ReferralActivity />
      <ReferralInsights />
      <RecentActivity />
      <ShareTemplates />
      <FriendsGet />
      <ReferralFaq />
      <ReadyToShare />
    </div>
  );
}
