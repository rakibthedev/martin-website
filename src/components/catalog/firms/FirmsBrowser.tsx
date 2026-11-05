"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import {
  FIRM_SORTS,
  FIRM_TABS,
  FIRMS,
  FIRMS_PAGE_SIZE,
  MAX_FAVOURITES,
  type FirmSort,
  type FirmTab,
} from "../data";
import { FIRM_GRID, FirmCard, FirmTableRow } from "./FirmRow";

const chip = (active: boolean) =>
  `inline-flex h-12 shrink-0 items-center justify-center gap-1.5 rounded-full px-4 py-1 type-label whitespace-nowrap text-ink transition ${
    active ? "border border-brand bg-page" : "bg-raised hover:brightness-125"
  }`;

const HEADINGS = ["RANK / REVIEWS", "FAVORITES", "ASSETS", "ASSETS", "MAX ALLOCATION", "PROMO"];

/** Browse Firms: filter + sorting options (379:11716) and the firm table / card list (379:11731). */
export function FirmsBrowser() {
  const [tab, setTab] = useState<FirmTab>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<FirmSort>("popularity");
  const [favourites, setFavourites] = useState<string[]>([]);
  const [visible, setVisible] = useState(FIRMS_PAGE_SIZE);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !menuRef.current?.contains(e.target as Node))
        setMenuOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [menuOpen]);

  const toggleFavourite = (id: string) =>
    setFavourites((f) => (f.includes(id) ? f.filter((x) => x !== id) : f.length >= MAX_FAVOURITES ? f : [...f, id]));

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = FIRMS.filter((f) => {
      if (tab === "favorites" && !favourites.includes(f.id)) return false;
      if (tab === "futures" && !f.markets.includes("futures")) return false;
      if (tab === "forex" && !f.markets.includes("forex")) return false;
      return !q || f.name.toLowerCase().includes(q) || f.country.toLowerCase().includes(q);
    });
    if (sort === "popularity") return list;
    const key = { rating: "rating", favorites: "favorites", allocation: "allocation", discount: "discount" } as const;
    return [...list].sort((a, b) => b[key[sort]] - a[key[sort]]);
  }, [tab, query, sort, favourites]);

  const shown = results.slice(0, visible);
  const sortLabel = FIRM_SORTS.find((s) => s.id === sort)!.label;

  return (
    <>
      {/* Filter and sorting options */}
      <div className="flex flex-col items-start gap-2 md:flex-row md:flex-wrap xl:items-center min-[1680px]:flex-nowrap">
        <div className="flex w-full flex-wrap items-start gap-2 md:w-auto md:gap-3 xl:min-w-max xl:flex-1 xl:flex-nowrap xl:items-center xl:gap-2">
          <div ref={menuRef} className="relative">
            <button
              type="button"
              className={chip(false)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <Icon name="filter-f0f0f0" size={16} />
              Filter
            </button>
            {menuOpen && (
              <div
                role="menu"
                className="absolute top-[calc(100%+8px)] left-0 z-20 flex w-60 flex-col gap-1 rounded-2xl border border-line bg-surface p-2 shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
              >
                <p className="px-3 pt-1 pb-1 type-overline text-muted">SORT BY</p>
                {FIRM_SORTS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    role="menuitemradio"
                    aria-checked={sort === s.id}
                    onClick={() => {
                      setSort(s.id);
                      setMenuOpen(false);
                    }}
                    className={`rounded-xl px-3 py-2 text-left type-body-sm transition ${
                      sort === s.id ? "bg-brand-tint text-brand" : "text-ink hover:bg-card"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          {FIRM_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={tab === t.id}
              onClick={() => {
                setTab(t.id);
                setVisible(FIRMS_PAGE_SIZE);
              }}
              className={chip(tab === t.id)}
            >
              {t.id === "favorites" ? `${t.label} ${favourites.length}/${MAX_FAVOURITES}` : t.label}
            </button>
          ))}
        </div>

        <span className="hidden h-px flex-1 2xl:block 2xl:max-w-[420px]" aria-hidden />

        <div className="flex flex-wrap items-start gap-x-6 gap-y-4 xl:min-w-[648px] xl:flex-1 xl:flex-nowrap xl:items-center xl:gap-6">
          <label className="flex w-[150px] items-start rounded-xl border border-line bg-card px-4 py-3 focus-within:border-brand xl:w-auto xl:min-w-[140px] xl:flex-1">
            <span className="sr-only">Search firms</span>
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisible(FIRMS_PAGE_SIZE);
              }}
              placeholder="Search firms…"
              className="w-full min-w-0 bg-transparent type-body text-ink outline-none placeholder:text-ink placeholder:opacity-60"
            />
          </label>
          <div className="flex flex-col items-start gap-2 xl:flex-row xl:items-center">
            <Link
              href="/articles/how-to-read-a-prop-firm-review"
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-full border border-brand bg-page px-4 py-1 type-label whitespace-nowrap text-ink transition hover:bg-brand-tint"
            >
              How We Verify and Rank Firms
            </Link>
            <span className="flex h-6 items-center rounded-full bg-brand-tint px-2.5 py-0.5 type-caption whitespace-nowrap text-brand md:h-7 md:py-1 xl:h-auto xl:px-2 xl:py-1">
              Live Data · updated 3 min ago
            </span>
          </div>
        </div>
      </div>

      {/* Firms list */}
      <div className="flex flex-col gap-3">
        <div
          className={`hidden px-6 py-3 type-table-heading text-muted ${FIRM_GRID}`}
          role="presentation"
        >
          <span className="w-[212px] max-w-full">POPULARITY / FIRM</span>
          {HEADINGS.map((h, i) => (
            <span key={i} className="text-center whitespace-nowrap">
              {h}
            </span>
          ))}
        </div>

        {sort !== "popularity" && (
          <p className="type-caption text-muted">
            Sorted by {sortLabel.toLowerCase()} ·{" "}
            <button type="button" className="text-brand hover:underline" onClick={() => setSort("popularity")}>
              Reset
            </button>
          </p>
        )}

        {shown.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {shown.map((firm, i) => {
              const props = {
                firm,
                index: i,
                favourite: favourites.includes(firm.id),
                onToggleFavourite: () => toggleFavourite(firm.id),
              };
              return [<FirmTableRow key={`${firm.id}-row`} {...props} />, <FirmCard key={`${firm.id}-card`} {...props} />];
            })}
          </ul>
        ) : (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-line bg-surface px-6 py-12 text-center">
            <p className="type-label text-ink">
              {tab === "favorites" && favourites.length === 0 ? "No favourite firms yet" : "No firms match your search"}
            </p>
            <p className="type-body-sm text-muted">
              {tab === "favorites" && favourites.length === 0
                ? "Tap ♡ on any firm to save it to your shortlist."
                : "Try another name or switch back to All Firms."}
            </p>
          </div>
        )}

        {results.length > visible && (
          <div className="flex justify-center pt-3">
            <button
              type="button"
              onClick={() => setVisible((v) => v + FIRMS_PAGE_SIZE)}
              className="inline-flex h-11 items-center justify-center rounded-full border border-brand bg-page px-4 type-label text-ink transition hover:bg-brand-tint"
            >
              Show more firms ({results.length - visible})
            </button>
          </div>
        )}
      </div>
    </>
  );
}
