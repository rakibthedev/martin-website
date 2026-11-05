import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "./ui";
import { PROFILE_STEPS } from "./data";

/**
 * Figma "Welcome hero" (370:387 desktop / 501:20469 tablet / 486:8985 mobile).
 * Gradient surface card r32: mobile = stacked (p16, gap 24); tablet = 2 equal columns (p20, gap 32,
 * top aligned); desktop = intro + fixed 440px profile-strength panel (p24, gap 40, centred).
 * Title: Heading 1 36/46 SemiBold on mobile/tablet, ExtraBold 56/64 on desktop.
 */
export const HERO_BG =
  "linear-gradient(90deg, rgba(0, 209, 106, 0.15) 0%, rgba(0, 209, 106, 0) 60%), linear-gradient(90deg, #212121 0%, #212121 100%)";

export function WelcomeHero({
  eyebrow,
  title,
  accent,
  text,
  actions,
  aside,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  text: string;
  actions: React.ReactNode;
  aside: React.ReactNode;
}) {
  return (
    <section
      className="flex w-full flex-col gap-6 rounded-[32px] border border-line p-4 md:flex-row md:items-start md:gap-8 md:p-5 xl:items-center xl:gap-10 xl:p-6"
      style={{ backgroundImage: HERO_BG }}
    >
      <div className="flex w-full min-w-0 flex-col items-start gap-4 md:flex-1">
        <div className="flex w-full items-center gap-2">
          <Icon name="live-dot-00d26a" size={8} />
          <p className="min-w-0 flex-1 text-[11px] font-bold leading-normal tracking-[1px] text-brand">{eyebrow}</p>
        </div>
        {/* Desktop 56/64 ExtraBold from 1536px; between 1280–1535 the intro column is too narrow for it. */}
        <h1 className="flex max-w-full flex-col text-[36px] font-semibold leading-[46px] [overflow-wrap:anywhere] xl:font-extrabold 2xl:text-[56px] 2xl:leading-[64px]">
          <span className="text-ink">{title}</span>
          <span className="text-brand">{accent}</span>
        </h1>
        <p className="type-body w-full text-muted">{text}</p>
        <div className="flex flex-wrap items-start gap-3 pt-2">{actions}</div>
      </div>
      {aside}
    </section>
  );
}

/** The two hero CTAs (Button / Pill — White + Ghost, trailing arrow-up-right). */
export function HeroActions({
  primary = { label: "Submit a review", href: "/reviews/new" },
  secondary = { label: "Browse firms", href: "/firms" },
}: {
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <>
      <Pill href={primary.href} variant="white">
        {primary.label}
        <Icon name="arrow-up-151513" size={20} rotate={45} />
      </Pill>
      <Pill href={secondary.href} variant="ghost">
        {secondary.label}
        <Icon name="arrow-up-00d26a" size={20} rotate={45} />
      </Pill>
    </>
  );
}

/**
 * "Profile strength" panel (370:427) — also the new-user "Getting started" panel (376:2506), which
 * differs only in copy, progress and background (card instead of page).
 */
export function ProfileStrength({
  label = "Profile strength",
  value = "70%",
  unit = "complete",
  percent = 70,
  level = "Level 3",
  steps = PROFILE_STEPS,
  tone = "page",
}: {
  label?: string;
  value?: string;
  unit?: string;
  percent?: number;
  level?: string;
  steps?: typeof PROFILE_STEPS;
  tone?: "page" | "card";
}) {
  return (
    <div
      className={`flex w-full min-w-0 flex-col items-start gap-4 rounded-[24px] border border-line p-4 md:flex-1 md:p-5 xl:w-[440px] xl:flex-none xl:p-6 ${
        tone === "card" ? "bg-card" : "bg-page"
      }`}
    >
      <div className="flex w-full flex-wrap items-start gap-y-2 xl:items-end">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5 whitespace-nowrap">
          <p className="type-caption text-muted">{label}</p>
          <div className="flex items-start gap-1.5 xl:items-end">
            <p className="text-[28px] font-extrabold leading-[34px] text-ink">{value}</p>
            <p className="type-body-sm text-muted">{unit}</p>
          </div>
        </div>
        <span className="flex shrink-0 items-center gap-1 rounded-full border border-brand px-2.5 py-1">
          <Icon name="medal-14-00d26a" size={14} />
          <span className="whitespace-nowrap text-[12px] font-semibold leading-4 text-brand">{level}</span>
        </span>
      </div>
      <div
        className="h-2 w-full rounded-full bg-raised"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div className="h-2 rounded-full bg-brand" style={{ width: `${percent}%` }} />
      </div>
      <ul className="flex w-full flex-col gap-2.5">
        {steps.map((s) => (
          <li key={s.label} className="flex w-full items-center gap-2.5">
            <Icon name={s.done ? "tick-circle-00d26a" : "todo-44423e"} size={18} />
            <Link
              href={s.href}
              className={`type-body-sm min-w-0 hover:underline ${s.done ? "text-muted" : "flex-1 text-ink"}`}
            >
              {s.label}
            </Link>
            {s.points && (
              <span className="ml-auto shrink-0 whitespace-nowrap text-[12px] font-semibold leading-4 text-brand">
                {s.points}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
