"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { Firm } from "../data";
import { inter, manrope } from "../fonts";
import { FavouriteToggle, Platforms, PromoBox, Stars } from "./FirmBits";

/* eslint-disable @next/next/no-img-element */

/** Row tint by rank — Figma color/rank-first, rank-second, rank-third; the rest use neutral/card. */
const RANK_BG = ["bg-[#372d0f]", "bg-[#353032]", "bg-[#271811]"];
export const rankBg = (i: number) => RANK_BG[i] ?? "bg-card";

/** Shared desktop grid so the table headings line up with the row cells. */
export const FIRM_GRID =
  "min-[1680px]:grid min-[1680px]:grid-cols-[minmax(200px,250px)_148px_minmax(88px,148px)_minmax(0,476fr)_minmax(76px,250fr)_minmax(120px,180px)_auto] min-[1680px]:gap-4";

type RowProps = {
  firm: Firm;
  index: number;
  favourite: boolean;
  onToggleFavourite: () => void;
};

const pad = (n: number) => String(n).padStart(2, "0");

/** Figma "Firm row / FundedNext/Desktop" (379:11762) — desktop table row, ≥1680px (the 1920 column set needs that much room). */
export function FirmTableRow({ firm, index, favourite, onToggleFavourite }: RowProps) {
  return (
    <li className={`hidden items-center rounded-2xl border border-line p-6 ${FIRM_GRID} ${rankBg(index)}`}>
      {/* Firm identity */}
      <div className="flex min-w-0 items-center gap-3">
        <span className={`${inter.className} shrink-0 text-center text-[12px] leading-normal font-semibold text-ink`}>
          {pad(index + 1)}
        </span>
        <span className="shrink-0 rounded-lg bg-raised p-1">
          <img src="/images/catalog/fundednext-logo.svg" width={48} height={48} alt="" className="block size-12" />
        </span>
        <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5">
          <Link
            href={firm.href}
            className={`${manrope.className} max-w-full truncate text-[20px] leading-normal font-medium text-ink hover:text-brand`}
          >
            {firm.name}
          </Link>
          <span className="flex items-center gap-1.5">
            {firm.country === "EUA" && (
              <img src="/images/catalog/flag-uae.png" width={24} height={18} alt="" className="block h-[18px] w-6 shrink-0 object-cover" />
            )}
            <span className="type-caption whitespace-nowrap text-muted">
              <span className="text-ink">{firm.country} </span>({firm.years} years)
            </span>
          </span>
        </div>
      </div>

      {/* Rank and reviews */}
      <div className="flex flex-col items-center justify-center gap-1">
        <Stars rating={firm.rating} />
        <span className="type-body whitespace-nowrap text-brand">
          {firm.rating.toFixed(1)} ({firm.reviews} reviews)
        </span>
      </div>

      {/* Favourites */}
      <div className="flex justify-center">
        <FavouriteToggle count={firm.favorites} active={favourite} onToggle={onToggleFavourite} name={firm.name} />
      </div>

      {/* Supported assets */}
      <ul className="flex min-w-0 flex-wrap items-center justify-center gap-x-2 gap-y-1">
        {firm.assets.map((a) => (
          <li key={a} className="rounded-full bg-card px-3 py-2 type-caption whitespace-nowrap text-ink">
            {a}
          </li>
        ))}
      </ul>

      {/* Trading platforms */}
      <Platforms platforms={firm.platforms} className="justify-center" />

      {/* Maximum allocation */}
      <div className="flex flex-col gap-2">
        <span className="text-center type-label text-ink">{firm.maxAllocation}</span>
        <span className="block h-1 w-full rounded-full bg-raised">
          <span className="block h-1 w-[82%] rounded-full bg-brand" />
        </span>
      </div>

      {/* Promo + CTA */}
      <div className="flex items-center justify-center gap-4">
        <PromoBox discount={firm.discount} code={firm.code} />
        <Link
          href={firm.href}
          className="inline-flex h-12 shrink-0 items-center justify-center rounded-full border border-brand bg-page px-4 py-1 type-label whitespace-nowrap text-ink transition hover:bg-brand-tint"
        >
          View Firm
        </Link>
      </div>
    </li>
  );
}

/**
 * Figma "Firm card / Tablet" (544:23662) and "Firm card / Mobile" (544:34429) — the table row
 * collapsed into a card below 1680px. Mobile is the base, md: switches to the tablet layout.
 */
export function FirmCard({ firm, index, favourite, onToggleFavourite }: RowProps) {
  const mobileAssets = firm.assets.slice(0, 4);
  const extra = firm.assets.length - mobileAssets.length;
  return (
    <li
      className={`flex flex-col gap-3 rounded-2xl border border-line p-4 md:p-5 min-[1680px]:hidden ${rankBg(index)}`}
    >
      {/* Firm identity */}
      <div className="flex w-full items-start gap-2 md:items-center md:gap-3">
        <span className={`${inter.className} shrink-0 text-center text-[12px] leading-normal font-semibold text-ink`}>
          {pad(index + 1)}
        </span>
        <span className="shrink-0 rounded-[5.714px] bg-raised p-[2.857px] md:rounded-lg md:p-1">
          <img
            src="/images/catalog/fundednext-logo.svg"
            width={48}
            height={48}
            alt=""
            className="block size-[34.286px] md:size-12"
          />
        </span>
        <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5 md:flex-none md:shrink-0">
          <Link
            href={firm.href}
            className={`${manrope.className} max-w-full truncate text-[16px] leading-normal font-medium text-ink hover:text-brand md:text-[20px]`}
          >
            {firm.name}
          </Link>
          <span className="flex flex-wrap items-center gap-2 md:gap-3">
            <span className="flex items-center gap-1 md:gap-1.5">
              {firm.country === "EUA" && (
                <img
                  src="/images/catalog/flag-uae.png"
                  width={24}
                  height={18}
                  alt=""
                  className="block h-[15px] w-5 shrink-0 object-cover md:h-[18px] md:w-6"
                />
              )}
              <span className="text-[12px] leading-4 whitespace-nowrap text-ink md:hidden">
                {firm.country} ({firm.years}y)
              </span>
              <span className="hidden type-caption whitespace-nowrap text-ink md:inline">
                {firm.country} ({firm.years} years)
              </span>
            </span>
            <FavouriteToggle count={firm.favorites} active={favourite} onToggle={onToggleFavourite} name={firm.name} />
          </span>
        </div>
        <Platforms platforms={firm.platforms} className="hidden min-w-0 flex-1 justify-center md:flex" />
        <div className="flex shrink-0 flex-col items-end justify-center gap-1 md:min-w-0 md:flex-1">
          <Stars rating={firm.rating} />
          <span className="text-right type-body whitespace-nowrap text-brand">
            {firm.rating.toFixed(1)} ({firm.reviews}
            <span className="hidden md:inline"> reviews</span>)
          </span>
        </div>
      </div>

      <span className="block h-px w-full bg-line md:hidden" />

      {/* Assets (+ platforms on mobile) */}
      <div className="flex w-full items-start gap-5 md:items-center">
        <ul className="flex min-w-0 flex-1 flex-wrap content-start items-start gap-2 md:gap-x-2 md:gap-y-1">
          {firm.assets.map((a, i) => (
            <li
              key={a}
              className={`h-6 items-center justify-center rounded-full bg-card px-2.5 py-0.5 type-caption whitespace-nowrap text-ink md:flex md:h-7 md:py-1 ${
                i < 4 ? "flex" : "hidden"
              }`}
            >
              {a}
            </li>
          ))}
          {extra > 0 && (
            <li className="flex h-6 items-center justify-center rounded-full bg-card px-2.5 py-0.5 type-caption whitespace-nowrap text-ink md:hidden">
              +{extra}
            </li>
          )}
        </ul>
        <Platforms platforms={firm.platforms} className="shrink-0 flex-nowrap md:hidden" />
      </div>

      <span className="block h-px w-full bg-line md:hidden" />

      {/* Allocation, promo and CTA */}
      <div className="flex w-full items-center gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <span className="type-label text-ink">{firm.maxAllocation}</span>
          <span className="block h-1 w-full rounded-full bg-raised">
            <span className="block h-1 w-full rounded-full bg-brand" />
          </span>
        </div>
        <div className="flex shrink-0 items-center justify-end gap-4 md:min-w-0 md:flex-1">
          <PromoBox discount={firm.discount} code={firm.code} />
          <Link
            href={firm.href}
            aria-label={`View ${firm.name}`}
            className="inline-flex h-12 shrink-0 items-center justify-center gap-1.5 rounded-full border border-brand bg-page px-4 py-1 type-label whitespace-nowrap text-ink transition hover:bg-brand-tint"
          >
            <Icon name="arrow-right-f0f0f0" size={16} className="md:hidden" />
            <span className="hidden md:inline">View Firm</span>
          </Link>
        </div>
      </div>
    </li>
  );
}
