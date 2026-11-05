"use client";

import {
  ACCOUNT_SIZES,
  CHALLENGE_PLATFORMS,
  DAILY_LOSS_OPTIONS,
  EVALUATION_TYPES,
  TARGET_SCALE,
  type ChallengePlatform,
  type EvaluationFilter,
} from "../data";
import { CheckBox } from "./ChallengeRow";

/* eslint-disable @next/next/no-img-element */

export type ChallengeFilterState = {
  type: EvaluationFilter;
  size: number | null;
  target: [number, number];
  daily: number | null;
  platforms: ChallengePlatform[];
};

/** Figma "Chip": 42px pill on desktop, 28px on tablet, 24px on mobile. */
export const filterChip = (active: boolean) =>
  `inline-flex h-6 shrink-0 items-center justify-center rounded-full border px-2.5 type-label whitespace-nowrap transition md:h-7 md:py-0.5 xl:h-auto xl:px-3.5 xl:py-2 ${
    active ? "border-brand bg-brand-tint text-brand" : "border-line bg-page text-ink hover:border-muted"
  }`;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div role="group" aria-label={title} className="flex w-full min-w-0 flex-col items-start gap-3">
      <p className="type-label whitespace-nowrap text-ink">{title}</p>
      {children}
    </div>
  );
}

const pct = (v: number) => ((v - TARGET_SCALE.min) / (TARGET_SCALE.max - TARGET_SCALE.min)) * 100;
const fmt = (v: number) => `${v % 1 ? v.toFixed(1) : v}%`;

/** Figma "Range": 6px track, green fill between two 18px thumbs (Ellipse), value labels below. */
function TargetRange({ value, onChange }: { value: [number, number]; onChange: (v: [number, number]) => void }) {
  const [lo, hi] = value;
  const input =
    "pointer-events-none absolute left-[-9px] top-1/2 w-[calc(100%+18px)] m-0 h-[18px] -translate-y-1/2 appearance-none bg-transparent opacity-0 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-[18px] [&::-moz-range-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-[18px] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none";
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="relative h-1.5 w-full rounded-full bg-raised">
        <span
          className="absolute top-0 h-1.5 rounded-full bg-brand"
          style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }}
        />
        {[lo, hi].map((v, i) => (
          <img
            key={i}
            src="/images/catalog/range-thumb.svg"
            width={18}
            height={18}
            alt=""
            className="pointer-events-none absolute top-[-6px] block size-[18px]"
            style={{ left: `calc(${pct(v)}% - 9px)` }}
          />
        ))}
        <input
          type="range"
          aria-label="Minimum profit target"
          min={TARGET_SCALE.min}
          max={TARGET_SCALE.max}
          step={TARGET_SCALE.step}
          value={lo}
          onChange={(e) => onChange([Math.min(Number(e.target.value), hi - TARGET_SCALE.step), hi])}
          className={input}
        />
        <input
          type="range"
          aria-label="Maximum profit target"
          min={TARGET_SCALE.min}
          max={TARGET_SCALE.max}
          step={TARGET_SCALE.step}
          value={hi}
          onChange={(e) => onChange([lo, Math.max(Number(e.target.value), lo + TARGET_SCALE.step)])}
          className={input}
        />
      </div>
      <div className="flex justify-between type-caption whitespace-nowrap text-muted">
        <span>{fmt(lo)}</span>
        <span>{fmt(hi)}</span>
      </div>
    </div>
  );
}

/** Figma "Filters" panel — desktop 379:13663, tablet 497:41062, mobile 497:41527. */
export function ChallengeFilters({
  value,
  onChange,
  onReset,
  count,
  onShow,
}: {
  value: ChallengeFilterState;
  onChange: (v: ChallengeFilterState) => void;
  onReset: () => void;
  count: number;
  onShow: () => void;
}) {
  const set = <K extends keyof ChallengeFilterState>(k: K, v: ChallengeFilterState[K]) => onChange({ ...value, [k]: v });

  return (
    <aside className="flex w-full flex-col items-start gap-6 rounded-[20px] border border-line bg-surface p-4 md:p-5 xl:w-[340px] xl:shrink-0 xl:self-start xl:p-6">
      <div className="flex w-full items-start justify-between whitespace-nowrap xl:items-center">
        <h2 className="type-h3 text-ink">Filters</h2>
        <button type="button" onClick={onReset} className="type-body-sm text-brand hover:underline">
          Reset all
        </button>
      </div>

      <Section title="Evaluation type">
        <div className="flex w-full gap-1 rounded-xl bg-page p-1" role="radiogroup" aria-label="Evaluation type">
          {EVALUATION_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={value.type === t}
              onClick={() => set("type", t)}
              className={`flex min-w-0 flex-1 justify-center rounded-lg py-2.5 type-label whitespace-nowrap transition ${
                value.type === t ? "bg-raised text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Account size">
        <div className="flex w-full flex-wrap gap-2">
          {ACCOUNT_SIZES.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={value.size === s}
              onClick={() => set("size", value.size === s ? null : s)}
              className={filterChip(value.size === s)}
            >
              ${s}K
            </button>
          ))}
        </div>
      </Section>

      <Section title="Profit target">
        <TargetRange value={value.target} onChange={(t) => set("target", t)} />
      </Section>

      <Section title="Max daily loss">
        <div className="flex w-full gap-2">
          {DAILY_LOSS_OPTIONS.map((d) => (
            <button
              key={d}
              type="button"
              aria-pressed={value.daily === d}
              onClick={() => set("daily", value.daily === d ? null : d)}
              className={filterChip(value.daily === d)}
            >
              ≤ {d}%
            </button>
          ))}
        </div>
      </Section>

      <Section title="Platform">
        {CHALLENGE_PLATFORMS.map((p) => {
          const on = value.platforms.includes(p);
          return (
            <button
              key={p}
              type="button"
              role="checkbox"
              aria-checked={on}
              onClick={() => set("platforms", on ? value.platforms.filter((x) => x !== p) : [...value.platforms, p])}
              className="flex w-full items-center gap-3 text-left"
            >
              <CheckBox checked={on} className="size-5" />
              <span className={`type-body-sm whitespace-nowrap ${on ? "text-ink" : "text-muted"}`}>{p}</span>
            </button>
          );
        })}
      </Section>

      <button
        type="button"
        onClick={onShow}
        className="inline-flex h-10 items-center justify-center rounded-full bg-brand px-4 py-1 type-label whitespace-nowrap text-page transition hover:brightness-110 md:h-11 xl:h-12 xl:w-full"
      >
        Show {count} challenge{count === 1 ? "" : "s"}
      </button>
    </aside>
  );
}
