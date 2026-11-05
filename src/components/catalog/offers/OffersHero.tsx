"use client";

import { Icon } from "@/components/ui/Icon";
import { OFFER_KEY_NUMBERS, OFFER_STEPS } from "./data";

const GRADIENT =
  "linear-gradient(90deg, rgba(0, 209, 106, 0.15) 0%, rgba(0, 209, 106, 0) 60%), linear-gradient(90deg, rgb(33, 33, 33) 0%, rgb(33, 33, 33) 100%)";

/** Per-tile padding from Figma "Key numbers" (the middle tile is taller on tablet/desktop; last tile is full width on mobile). */
const KEY_TILE = [
  "px-4 py-3.5 md:px-5",
  "px-4 py-3.5 md:p-5 xl:p-6",
  "w-full p-4 md:w-auto md:px-5 md:py-3.5",
];

/**
 * Figma "Hero / Offers intro": desktop 379:14109, tablet 497:41951, mobile 497:42311.
 * The search field filters the offer grid (state lives in OffersView).
 */
export function OffersHero({
  query,
  onQuery,
  onSubmit,
}: {
  query: string;
  onQuery: (q: string) => void;
  onSubmit: () => void;
}) {
  return (
    <section
      className="flex w-full flex-col items-start gap-6 overflow-hidden rounded-3xl border border-line p-4 md:flex-row md:gap-8 md:p-5 xl:items-center xl:gap-12 xl:p-6"
      style={{ backgroundImage: GRADIENT }}
    >
      {/* Intro */}
      <div className="flex w-full min-w-0 flex-col items-start gap-5 md:flex-1">
        <p className="text-[10px] leading-[14px] font-semibold tracking-[1.5px] text-brand">OFFERS</p>
        <h1 className="w-full type-h1 text-ink xl:type-display">Your next firm. A better offer.</h1>
        <p className="w-full type-body text-muted">
          Save on your next challenge. Find a firm, copy its promo code and paste it at checkout on the firm’s website.
        </p>

        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="flex w-full flex-wrap items-center gap-3 rounded-full border border-line bg-page p-4 md:p-5 xl:max-w-[760px] xl:flex-nowrap xl:py-2 xl:pl-6 xl:pr-2"
        >
          <Icon name="search-normal-898587" size={24} />
          <label className="relative flex min-w-0 flex-1 cursor-text">
            <span className="sr-only">Search a firm or promo code</span>
            {/* Visual placeholder: wraps onto two lines on small screens like the Figma field. */}
            <span
              aria-hidden
              className={`type-body text-muted ${query ? "invisible" : ""} xl:whitespace-nowrap xl:overflow-hidden xl:text-ellipsis`}
            >
              Search a firm or promo code
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              className="absolute inset-0 w-full min-w-0 bg-transparent type-body text-ink outline-none [&::-webkit-search-cancel-button]:hidden"
            />
          </label>
          <button
            type="submit"
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-brand px-4 py-1 type-label whitespace-nowrap text-page transition hover:brightness-110"
          >
            Find offers
          </button>
        </form>

        <div className="flex w-full flex-wrap items-start gap-4 whitespace-nowrap">
          {OFFER_KEY_NUMBERS.map((k, i) => (
            <div
              key={k.label}
              className={`flex shrink-0 flex-col items-start gap-0.5 rounded-[14px] border border-line bg-page ${KEY_TILE[i]}`}
            >
              <p className="type-h3 text-brand">{k.value}</p>
              <p className="type-caption text-muted">{k.label}</p>
            </div>
          ))}
        </div>

        <p className="w-full type-caption text-muted">
          Design preview · figures and offers are sample content from the supplied directory, not a live feed.
        </p>
      </div>

      {/* How it works */}
      <div className="flex w-full min-w-0 flex-col items-start gap-5 rounded-[20px] border border-line bg-page p-4 md:flex-1 md:p-5 xl:w-[480px] xl:flex-none xl:shrink-0 xl:p-6">
        <p className="text-[10px] leading-[14px] font-semibold tracking-[1.5px] text-brand">HOW IT WORKS</p>
        <h2 className="w-full type-h3 text-ink">Use a code in 3 easy steps</h2>
        {OFFER_STEPS.map((s) => (
          <div key={s.n} className="flex w-full items-start gap-4">
            <span className="flex w-9 shrink-0 items-center justify-center rounded-full border border-brand bg-brand-tint type-label text-brand xl:h-9">
              {s.n}
            </span>
            <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
              <p className="type-label text-ink">{s.title}</p>
              <p className="w-full type-body-sm text-muted">{s.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
