/* eslint-disable @next/next/no-img-element */
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { USER } from "@/lib/nav";
import { CopyCode } from "./CopyCode";
import { HeroAtmosphere } from "./HeroAtmosphere";
import { OFFERS, type Offer } from "./data";
import s from "./home.module.css";

const firstName = USER.name.split(" ")[0];
const CONTEXT_COPY = "1 review needs proof  ·  2 new offers from firms on your shortlist";

/** Figma "Offer / FundedNext" (379:9215) — 280×72 tablet, 306.67×72 desktop (mobile = tablet card scaled 0.375). */
function OfferCard({ offer }: { offer: Offer }) {
  return (
    <div className="mr-4 flex h-[72px] w-[280px] shrink-0 items-center gap-3 overflow-hidden rounded-xl border border-line bg-surface px-2 py-1.5 xl:w-[306.67px]">
      <span className="flex shrink-0 rounded-lg bg-raised p-1">
        <img alt="" src={offer.logo} width={40} height={40} className="block size-10" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="truncate type-label text-ink">{offer.firm}</span>
        <span className="type-caption text-brand">{offer.rating}</span>
      </span>
      <span className="flex shrink-0 flex-col items-center gap-1 rounded-[10px] border border-brand bg-brand-tint px-2.5 py-[5px]">
        <span className="type-caption whitespace-nowrap text-brand">{offer.discount}</span>
        <CopyCode code={offer.code} icon="/icons/copy-00d26a.svg" iconSize={12} className="gap-1" textClassName="type-caption text-ink" />
      </span>
    </div>
  );
}

function OfferTrack({ reverse, offset }: { reverse?: boolean; offset: string }) {
  const items = [...OFFERS, ...OFFERS];
  return (
    <div className={`flex w-max ${offset} ${reverse ? s.marqueeReverse : s.marquee}`}>
      {items.map((o, i) => (
        <OfferCard key={i} offer={o} />
      ))}
    </div>
  );
}

/** Figma "Firm offers / two marquee rows" + fades. */
function OfferMarquee() {
  return (
    <>
      {/* tablet + desktop: native size */}
      <div className="absolute inset-x-0 top-[219px] hidden flex-col gap-4 overflow-hidden md:flex xl:top-[245px]">
        <OfferTrack offset="-ml-6 xl:-ml-[53px]" />
        <OfferTrack offset="ml-[18px] xl:ml-[19px]" reverse />
      </div>
      {/* mobile: the same cards scaled 0.375 (Figma 103×29 cards) */}
      <div className="absolute inset-x-0 top-[110px] h-16 overflow-hidden md:hidden">
        <div className="flex w-[266.667%] origin-top-left scale-[0.375] flex-col gap-[21px]">
          <OfferTrack offset="-ml-12" />
          <OfferTrack offset="ml-8" reverse />
        </div>
      </div>
      {/* Marquee fade / left + right */}
      <div className="pointer-events-none absolute left-0 top-[109px] h-[66px] w-5 bg-gradient-to-r from-[rgba(4,5,5,0.97)] to-[rgba(4,5,5,0)] md:top-[218px] md:h-[162px] md:w-[60px] xl:top-[244px] xl:w-[115px]" />
      <div className="pointer-events-none absolute right-0 top-[109px] h-[66px] w-5 bg-gradient-to-l from-[rgba(4,5,5,0.97)] to-[rgba(4,5,5,0)] md:top-[218px] md:h-[162px] md:w-[60px] xl:top-[244px] xl:w-[115px]" />
    </>
  );
}

/** Figma "Account / Signed-in context bar" (380:4386) — desktop only, floats over the hero. */
function ContextBar() {
  return (
    <div className="absolute inset-x-12 top-3 z-10 hidden h-[98px] items-center gap-4 rounded-[20px] border border-brand bg-brand-tint p-6 xl:flex">
      <Avatar initials={USER.initials} size={40} textSize={14} />
      <div className="flex min-w-0 flex-1 items-center gap-2.5 overflow-hidden">
        <p className="shrink-0 whitespace-nowrap type-label text-ink">Welcome back, {firstName}.</p>
        <p className="shrink-0 type-body-sm text-muted">{"·"}</p>
        <p className="min-w-0 truncate whitespace-pre type-body-sm text-muted">{CONTEXT_COPY}</p>
      </div>
      <Button href="/account" variant="primary" size="lg" trailing="arrow-right-151513" iconSize={16}>
        Go to dashboard
      </Button>
    </div>
  );
}

/** Figma "Account / Responsive context" (502:20433 tablet, 502:20449 mobile). */
function ResponsiveContext() {
  return (
    <div className="flex flex-col items-start gap-3 rounded-[20px] border border-brand bg-brand-tint p-4 md:p-5 xl:hidden">
      <div className="flex w-full items-center gap-3">
        <Avatar initials={USER.initials} size={40} textSize={14} />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className="type-label text-ink">Welcome back, {firstName}.</p>
          <p className="whitespace-pre-wrap type-body-sm text-muted">{CONTEXT_COPY}</p>
        </div>
      </div>
      <Button href="/account" variant="primary" size="sm" trailing="arrow-right-151513" iconSize={16} className="md:h-11">
        Go to dashboard
      </Button>
    </div>
  );
}

/** Figma "Frame 102" (379:9119 / 497:32138 / 497:34691): starfield hero + signed-in context. */
export function HomeHero() {
  return (
    <>
      <section className="relative isolate flex h-[550px] flex-col overflow-hidden rounded-3xl bg-[linear-gradient(180deg,#040505_0%,#040505_66%,#151513_100%)] pt-5 md:h-[729px] md:rounded-[32px] md:pt-[58px] xl:h-[920px] xl:rounded-[48px] xl:pt-[136px]">
        <HeroAtmosphere />
        <ContextBar />

        {/* Hero content */}
        <div className="relative flex flex-col items-center gap-[18px] px-4 md:gap-7 md:px-5 xl:gap-8">
          <div className="flex w-full flex-col items-center gap-[9px] text-center text-ink md:gap-4">
            <p className="flex items-center justify-center gap-1.5 md:gap-3">
              <span className="relative size-4 shrink-0 overflow-hidden">
                <img alt="" src="/images/home/circle-tick.svg" className="absolute left-px top-px block size-[14px] max-w-none" />
              </span>
              <span className="whitespace-nowrap text-[12px] font-semibold leading-4 md:type-body-sm">
                INDEPENDENT, PROOF-VERIFIED REVIEWS
              </span>
            </p>
            <h1 className="type-h2 md:type-h1 xl:max-w-[1040px] xl:type-display">
              Read real reviews. Spot
              <br className="md:hidden xl:inline" /> <span className="text-brand">trustworthy</span>
              <br className="hidden md:inline xl:hidden" /> firms.
              <br className="md:hidden" /> Before you pay
            </h1>
            <p className="type-body opacity-[0.78] xl:max-w-[791px] xl:type-h3">
              Independent prop firm reviews backed by real evidence. Compare trust scores and find your next firm with confidence.
            </p>
          </div>
          <div className="flex w-full flex-col items-center gap-2 md:w-auto md:flex-row md:gap-3 xl:gap-6">
            <Button
              href="/reviews/new"
              variant="white"
              size="sm"
              trailing="arrow-up-151513"
              trailingRotate={45}
              iconSize={20}
              className="w-full md:h-11 md:w-auto xl:h-12"
            >
              Submit Review
            </Button>
            <Button
              href="/firms"
              variant="subtle"
              size="sm"
              trailing="arrow-up-20-f0f0f0"
              trailingRotate={45}
              iconSize={20}
              className="w-full md:h-11 md:w-auto xl:h-12"
            >
              Browse Prop Firms
            </Button>
          </div>
        </div>

        {/* Emerald globe and offer marquee */}
        <div className="relative mt-2.5 h-[182px] shrink-0 overflow-hidden md:mt-4 md:h-[389px] xl:mt-[27px] xl:h-[415px]">
          <img
            alt=""
            aria-hidden
            src="/images/home/hero-globe-sm.svg"
            className="absolute left-1/2 top-0 block h-auto w-[max(100%,393px)] max-w-none -translate-x-1/2 md:hidden"
          />
          <img
            alt=""
            aria-hidden
            src="/images/home/hero-globe-md.svg"
            className="absolute inset-x-0 top-0 hidden h-auto w-full max-w-none md:block xl:hidden"
          />
          <img
            alt=""
            aria-hidden
            src="/images/home/hero-globe-xl.svg"
            className="absolute left-1/2 top-0 hidden h-[415px] w-[1920px] max-w-none -translate-x-1/2 xl:block"
          />
          {/* Globe horizon fade */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,5,5,0)_0%,rgba(4,5,5,0)_36%,rgba(4,5,5,0.76)_100%)]" />
          <OfferMarquee />
        </div>
      </section>
      <ResponsiveContext />
    </>
  );
}
