"use client";

import { useState } from "react";
import { FirmLogo } from "@/components/ui/FirmLogo";
import { Icon } from "@/components/ui/Icon";
import { CARD, Pill } from "./ui";
import { FIRM_COLORS } from "./data";
import { DEFAULT_MARKETS, EXPERIENCE, MARKETS, POPULAR_FIRMS, REVIEW_TIPS } from "./welcomeData";

/**
 * Figma "Onboarding steps" (376:3230 desktop / 497:11545 tablet / 497:11752 mobile).
 * Desktop: 3 equal-height cards, CTA pinned to the bottom (full width). Tablet: 3 top-aligned columns,
 * CTAs hug. Mobile: stacked. Step 1 is the active step (green border + filled number).
 */
function StepCard({
  n,
  title,
  text,
  active = false,
  children,
}: {
  n: number;
  title: string;
  text: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={`step-${n}`}
      className={`${CARD} flex min-w-0 scroll-mt-28 flex-col items-start gap-4 xl:self-stretch ${
        active ? "border-brand" : ""
      }`}
    >
      <div className="flex w-full items-center gap-2.5">
        <span
          className={`flex h-5 w-7 shrink-0 items-center justify-center rounded-full text-[14px] font-extrabold leading-5 xl:h-7 ${
            active ? "bg-brand text-page" : "bg-raised text-ink"
          }`}
        >
          {n}
        </span>
        <p
          className={`whitespace-nowrap text-[11px] font-bold leading-normal tracking-[1px] ${
            active ? "text-brand" : "text-muted"
          }`}
        >
          STEP {n}
        </p>
      </div>
      <h3 className="w-full text-[20px] font-extrabold leading-[26px] text-ink">{title}</h3>
      <p className="type-body-sm w-full text-muted">{text}</p>
      {children}
    </section>
  );
}

function TradeStep() {
  const [markets, setMarkets] = useState<string[]>(DEFAULT_MARKETS);
  const [experience, setExperience] = useState(EXPERIENCE[1]);
  const [saved, setSaved] = useState(false);
  const toggle = (m: string) => {
    setSaved(false);
    setMarkets((cur) => (cur.includes(m) ? cur.filter((x) => x !== m) : [...cur, m]));
  };
  return (
    <StepCard n={1} active title="Tell us how you trade" text="We use this to rank firms and offers that fit your style.">
      <div className="flex w-full flex-wrap items-start gap-2" role="group" aria-label="Markets you trade">
        {MARKETS.map((m) => {
          const on = markets.includes(m);
          return (
            <button
              key={m}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(m)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-[3px] transition md:py-[5px] xl:px-3 xl:py-[7px] ${
                on ? "border-brand bg-brand-tint" : "border-line bg-card hover:border-muted"
              }`}
            >
              {on && <Icon name="tick-circle-00d26a" size={12} />}
              <span
                className={`whitespace-nowrap text-[12px] font-semibold leading-4 ${on ? "text-brand" : "text-ink"}`}
              >
                {m}
              </span>
            </button>
          );
        })}
      </div>
      <label className="relative flex w-full items-center rounded-[14px] border border-line bg-card px-3.5 py-3 focus-within:border-brand md:p-5 xl:px-3.5 xl:py-3">
        <span className="type-body-sm min-w-0 flex-1 text-ink">Experience: {experience}</span>
        <Icon name="arrow-down-898587" size={16} />
        <select
          aria-label="Trading experience"
          value={experience}
          onChange={(e) => {
            setSaved(false);
            setExperience(e.target.value);
          }}
          className="absolute inset-0 size-full cursor-pointer appearance-none opacity-0"
        >
          {EXPERIENCE.map((x) => (
            <option key={x} value={x}>
              {x}
            </option>
          ))}
        </select>
      </label>
      <div className="hidden flex-1 xl:block" />
      <Pill variant="primary" className="xl:w-full" onClick={() => setSaved(true)}>
        {saved && <Icon name="tick-circle-151513" size={16} />}
        {saved ? "Preferences saved" : "Save preferences"}
      </Pill>
    </StepCard>
  );
}

function ShortlistStep() {
  const [saved, setSaved] = useState<string[]>([]);
  return (
    <StepCard
      n={2}
      title="Save firms to your shortlist"
      text="Tap the heart on any firm to track offers, rule changes and new reviews."
    >
      {POPULAR_FIRMS.map((f) => {
        const on = saved.includes(f.firm);
        return (
          <div key={f.firm} className="@container w-full">
            <div className="flex w-full flex-col items-start gap-2.5 rounded-2xl border border-line bg-card p-4 md:p-5 xl:p-6 @[300px]:flex-row @[300px]:items-center">
              <FirmLogo initials={f.initials} size={36} textSize={13} className={FIRM_COLORS[f.initials]} />
              <div className="flex w-full min-w-0 flex-col items-start gap-0.5 @[300px]:w-auto @[300px]:flex-1">
                <p className="type-label text-ink">{f.firm}</p>
                <div className="flex items-center gap-1">
                  <Icon name="star-00d26a" size={12} />
                  <p className="type-caption whitespace-nowrap text-muted">{f.score}</p>
                </div>
              </div>
              <Pill
                variant="outline"
                aria-pressed={on}
                onClick={() => setSaved((s) => (on ? s.filter((x) => x !== f.firm) : [...s, f.firm]))}
              >
                <Icon name={on ? "heart-bold-00d26a" : "heart-f0f0f0"} size={16} />
                {on ? "Saved" : "Save"}
              </Pill>
            </div>
          </div>
        );
      })}
    </StepCard>
  );
}

function ReviewStep() {
  return (
    <StepCard
      n={3}
      title="Share your first experience"
      text="Traded with a prop firm? A verified review earns 200 pts and helps others avoid bad firms."
    >
      <div className="flex w-full flex-col items-start gap-2.5 rounded-2xl border border-line bg-card p-4 md:p-5 xl:p-6">
        <p className="whitespace-nowrap text-[12px] font-semibold leading-4 text-muted">What you will need</p>
        {REVIEW_TIPS.map((t) => (
          <div key={t} className="flex items-center gap-2">
            <Icon name="tick-circle-00d26a" size={14} />
            <p className="type-body-sm text-ink">{t}</p>
          </div>
        ))}
      </div>
      <div className="hidden flex-1 xl:block" />
      <Pill href="/reviews/new" variant="outline" className="bg-card! max-w-full text-center md:h-auto! md:min-h-11 md:whitespace-normal! xl:h-12! xl:w-full">
        <Icon name="edit-2-16-f0f0f0" size={16} />
        Write your first review
      </Pill>
    </StepCard>
  );
}

export function OnboardingSteps() {
  return (
    <div className="grid w-full grid-cols-1 items-start gap-4 md:grid-cols-3">
      <TradeStep />
      <ShortlistStep />
      <ReviewStep />
    </div>
  );
}
