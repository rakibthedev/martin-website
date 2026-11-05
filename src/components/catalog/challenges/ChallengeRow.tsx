"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { CHALLENGE_LOGOS, type Challenge } from "../data";

/* eslint-disable @next/next/no-img-element */

export const money = (k: number) => `$${(k * 1000).toLocaleString("en-US")}`;
export const targetLabel = (t: number[]) => t.map((v) => `${v}%`).join(" / ");

/** Figma "Logo" tile: 52px, page bg, 1px border, 12px radius, firm artwork centred. */
export function ChallengeLogo({ firm, size = 52 }: { firm: Challenge["firm"]; size?: number }) {
  const logo = CHALLENGE_LOGOS[firm];
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-xl border border-line bg-page"
      style={{ width: size, height: size }}
    >
      <img src={logo.src} width={logo.w} height={logo.h} alt="" className="block" style={{ width: logo.w, height: logo.h }} />
    </span>
  );
}

/** Figma "Compare checkbox" — 20px (24px on tablet cards), 6px radius. */
export function CheckBox({ checked, className = "" }: { checked: boolean; className?: string }) {
  return (
    <span
      aria-hidden
      className={`flex shrink-0 items-center justify-center rounded-md border ${
        checked ? "border-brand bg-brand" : "border-line bg-page"
      } ${className}`}
    >
      {checked && <Icon name="check-151513" size={14} />}
    </span>
  );
}

const METRICS = [
  { label: "ACCOUNT SIZE", get: (c: Challenge) => money(c.size) },
  { label: "PROFIT TARGET", get: (c: Challenge) => targetLabel(c.targets) },
  { label: "DAILY LOSS", get: (c: Challenge) => `${c.dailyLoss}%` },
  { label: "MAXIMUM LOSS", get: (c: Challenge) => `${c.maxLoss}%` },
];

type Props = {
  challenge: Challenge;
  selected: boolean;
  favourite: boolean;
  onToggleSelect: () => void;
  onToggleFavourite: () => void;
  /** "list" turns into the single-line desktop row from 1680px; "grid" always uses the stacked card. */
  view: "list" | "grid";
};

/**
 * Figma "Challenge row / v2": desktop row (379:13773), tablet card (497:41172), mobile card (497:41637).
 * The one-line desktop row needs ~1680px of viewport; below that the stacked tablet card is used.
 */
export function ChallengeRow({ challenge: c, selected, favourite, onToggleSelect, onToggleFavourite, view }: Props) {
  const list = view === "list";
  return (
    <li
      className={`flex flex-col items-start gap-6 rounded-2xl border bg-surface p-4 md:p-5 ${
        selected ? "border-brand" : "border-line"
      } ${list ? "min-[1680px]:flex-row min-[1680px]:items-center min-[1680px]:p-6" : ""}`}
    >
      <div className={`flex w-full items-center gap-3 ${list ? "min-[1680px]:contents" : ""}`}>
        <button
          type="button"
          role="checkbox"
          aria-checked={selected}
          aria-label={`Compare ${c.firmName} ${c.type}`}
          onClick={onToggleSelect}
          className="shrink-0 rounded-md"
        >
          <CheckBox checked={selected} className={`size-5 md:size-6 ${list ? "min-[1680px]:size-5" : ""}`} />
        </button>
        <div
          className={`flex min-w-0 flex-1 items-center gap-2 ${
            list ? "min-[1680px]:w-[280px] min-[1680px]:flex-none min-[1680px]:gap-4" : ""
          }`}
        >
          <ChallengeLogo firm={c.firm} />
          <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5">
            <Link href="/firms/fundingpips" className="max-w-full truncate type-h3 text-ink hover:text-brand">
              {c.firmName}
            </Link>
            <div className="flex items-center gap-2">
              <span className="flex h-7 items-center rounded-full bg-brand-tint px-2.5 py-1 type-caption whitespace-nowrap text-brand">
                {c.type}
              </span>
              <span className="type-caption whitespace-nowrap text-muted">{c.phases}</span>
            </div>
          </div>
        </div>
      </div>

      <dl
        className={`grid w-full grid-cols-2 gap-3 font-semibold whitespace-nowrap ${
          list ? "md:grid-cols-4 min-[1680px]:flex min-[1680px]:min-w-0 min-[1680px]:flex-1 min-[1680px]:gap-0" : ""
        }`}
      >
        {METRICS.map((m, i) => (
          <div
            key={m.label}
            className={`flex min-w-0 flex-col gap-1 ${
              list ? `min-[1680px]:flex-1 min-[1680px]:pl-6 ${i > 0 ? "min-[1680px]:border-l min-[1680px]:border-line" : ""}` : ""
            }`}
          >
            <dt className={`text-[10px] leading-[14px] tracking-[1.2px] text-muted ${list ? "min-[1680px]:sr-only" : ""}`}>
              {m.label}
            </dt>
            <dd className="type-h3 text-ink">{m.get(c)}</dd>
          </div>
        ))}
      </dl>

      <div className={`flex w-full items-center gap-2 md:gap-3 ${list ? "min-[1680px]:w-auto min-[1680px]:gap-2" : ""}`}>
        <button
          type="button"
          onClick={onToggleFavourite}
          aria-pressed={favourite}
          aria-label={favourite ? `Remove ${c.firmName} from favourites` : `Save ${c.firmName} to favourites`}
          className={`inline-flex h-10 shrink-0 items-center justify-center rounded-full border px-4 transition md:h-11 ${
            list ? "min-[1680px]:h-12" : ""
          } ${favourite ? "border-brand bg-brand-tint" : "border-line bg-raised hover:brightness-125"}`}
        >
          <Icon name={favourite ? "heart-00d26a" : "heart-f0f0f0"} size={16} />
        </button>
        <Link
          href="/firms/fundingpips"
          className={`inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full bg-brand px-4 py-1 type-label whitespace-nowrap text-page transition hover:brightness-110 md:h-11 ${
            list ? "min-[1680px]:h-12" : ""
          }`}
        >
          View Challenge
          <Icon name="arrow-up-16-151513" size={16} rotate={45} />
        </Link>
      </div>
    </li>
  );
}
