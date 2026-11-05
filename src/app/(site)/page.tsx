import { FirmList } from "@/components/home/FirmList";
import { HomeCta } from "@/components/home/HomeCta";
import { HomeHero } from "@/components/home/HomeHero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { MissionStatement } from "@/components/home/MissionStatement";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyPropFirmScores } from "@/components/home/WhyPropFirmScores";

/** Home (signed in) — Figma 379:9118 (desktop) / 497:32137 (tablet) / 497:34690 (mobile). */
export default function Page() {
  return (
    <>
      <HomeHero />
      <FirmList />
      <MissionStatement />
      <HowItWorks />
      <WhyPropFirmScores />
      <Testimonials />
      <HomeCta />
    </>
  );
}
