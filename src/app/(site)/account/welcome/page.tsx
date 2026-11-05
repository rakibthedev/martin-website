import { AccountLayout } from "@/components/account/AccountLayout";
import { AccountStats } from "@/components/dashboard/Overview";
import { OnboardingSteps } from "@/components/dashboard/Onboarding";
import { EmptyStates, SectionHead } from "@/components/dashboard/Welcome";
import { HeroActions, ProfileStrength, WelcomeHero } from "@/components/dashboard/WelcomeHero";
import { Crumb } from "@/components/dashboard/ui";
import { GETTING_STARTED, WELCOME_STATS } from "@/components/dashboard/welcomeData";

export const metadata = { title: "Welcome · PropFirmScores" };

/** Figma: Dashboard / First login (new user) — Desktop 376:2458 / Tablet 497:11461 / Mobile 497:11668. */
export default function DashboardWelcomePage() {
  return (
    <AccountLayout active="overview" breadcrumb={<Crumb>{"Home  /  Dashboard"}</Crumb>}>
      <WelcomeHero
        eyebrow="ACCOUNT CREATED · WELCOME ABOARD"
        title="Welcome to PropFirmScores,"
        accent="Alex."
        text="Three quick steps and your dashboard is ready: tell us how you trade, save firms you are considering, and share your first experience to start earning trust points."
        actions={
          <HeroActions
            primary={{ label: "Start setup", href: "#step-1" }}
            secondary={{ label: "Explore firms first", href: "/firms" }}
          />
        }
        aside={
          <ProfileStrength
            label="Getting started"
            value="1 of 4"
            unit="steps done"
            percent={25}
            level="+50 welcome pts"
            steps={GETTING_STARTED}
            tone="card"
          />
        }
      />
      <AccountStats stats={WELCOME_STATS} />
      <SectionHead title="Set up your account" note="Takes about 3 minutes" />
      <OnboardingSteps />
      <EmptyStates />
    </AccountLayout>
  );
}
