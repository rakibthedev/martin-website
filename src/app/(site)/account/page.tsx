import { AccountLayout } from "@/components/account/AccountLayout";
import { AccountStats, OffersAndActivity, ReviewsAndShortlist } from "@/components/dashboard/Overview";
import { HeroActions, ProfileStrength, WelcomeHero } from "@/components/dashboard/WelcomeHero";
import { Crumb } from "@/components/dashboard/ui";

export const metadata = { title: "Dashboard · PropFirmScores" };

/** Figma: Dashboard Overview — Desktop 370:98 / Tablet 501:20433 / Mobile 486:8949. */
export default function DashboardOverviewPage() {
  return (
    <AccountLayout active="overview" breadcrumb={<Crumb>{"Home  /  Dashboard"}</Crumb>}>
      <WelcomeHero
        eyebrow="SIGNED IN · LAST VISIT 2 DAYS AGO"
        title="Welcome back,"
        accent="Alex."
        text="You have 1 review waiting for proof and 2 new offers from firms on your shortlist. Pick up where you left off."
        actions={<HeroActions />}
        aside={<ProfileStrength />}
      />
      <AccountStats />
      <ReviewsAndShortlist />
      <OffersAndActivity />
    </AccountLayout>
  );
}
