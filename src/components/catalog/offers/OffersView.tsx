"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { FeaturedOffer } from "./FeaturedOffer";
import { OfferCard } from "./OfferCard";
import { OffersHero } from "./OffersHero";
import { OFFERS, OFFER_FILTERS, OFFER_SORTS, type Offer, type OfferFilter, type OfferSort } from "./data";

function sortOffers(list: Offer[], sort: OfferSort) {
  const out = [...list];
  if (sort === "az") return out.sort((a, b) => a.firm.localeCompare(b.firm));
  // Undisclosed ("Exclusive deal") discounts always go last.
  const val = (o: Offer) => o.discount ?? (sort === "biggest" ? -1 : Number.POSITIVE_INFINITY);
  return out.sort((a, b) => (sort === "biggest" ? val(b) - val(a) : val(a) - val(b)));
}

const CHIP =
  "inline-flex h-6 shrink-0 items-center justify-center gap-1.5 rounded-full border px-2.5 py-0.5 type-label whitespace-pre transition md:h-7 xl:h-auto xl:px-4 xl:py-2.5";

/** Hero search + featured offer + "All offers" toolbar and grid, sharing search / filter / sort state. */
export function OffersView() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<OfferFilter>("all");
  const [sort, setSort] = useState<OfferSort>("biggest");
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sortOpen) return;
    const close = (e: MouseEvent) => {
      if (!sortRef.current?.contains(e.target as Node)) setSortOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setSortOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [sortOpen]);

  const searched = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return OFFERS;
    return OFFERS.filter((o) => o.firm.toLowerCase().includes(q) || o.code.toLowerCase().includes(q));
  }, [query]);

  const visible = useMemo(() => {
    const test = OFFER_FILTERS.find((f) => f.id === filter)!.test;
    return sortOffers(searched.filter(test), sort);
  }, [searched, filter, sort]);

  const rows: Offer[][] = [];
  for (let i = 0; i < visible.length; i += 3) rows.push(visible.slice(i, i + 3));

  const sortMeta = OFFER_SORTS.find((s) => s.id === sort)!;

  return (
    <>
      <OffersHero
        query={query}
        onQuery={setQuery}
        onSubmit={() => listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
      />

      <FeaturedOffer />

      <section ref={listRef} id="all-offers" className="flex w-full scroll-mt-6 flex-col gap-6 md:gap-8">
        {/* Offers toolbar */}
        <div className="flex w-full flex-col items-start pt-4 md:gap-3 xl:flex-row xl:items-center xl:justify-between xl:gap-6">
          <div className="flex flex-col items-start gap-1">
            <h2 className="type-h2 text-ink">All offers</h2>
            <p className="type-body-sm text-muted">
              {visible.length} {visible.length === 1 ? "offer" : "offers"} · {sortMeta.subtitle}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 md:flex-row md:flex-wrap xl:items-center xl:justify-end">
            {OFFER_FILTERS.map((f) => {
              const active = f.id === filter;
              const count = searched.filter(f.test).length;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f.id)}
                  className={`${CHIP} ${
                    active ? "border-brand bg-brand-tint text-brand" : "border-line bg-surface text-ink hover:border-muted"
                  }`}
                >
                  {`${f.label}  ${count}`}
                </button>
              );
            })}
            <div ref={sortRef} className="relative">
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={sortOpen}
                onClick={() => setSortOpen((o) => !o)}
                className={`${CHIP} border-line bg-surface text-muted hover:border-muted`}
              >
                Sort: {sortMeta.label}
                <Icon name="arrow-down-898587" size={16} className={sortOpen ? "rotate-180" : ""} />
              </button>
              {sortOpen && (
                <ul
                  role="listbox"
                  aria-label="Sort offers"
                  className="absolute left-0 top-full z-20 mt-2 flex min-w-full flex-col gap-1 rounded-xl border border-line bg-surface p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.45)] xl:left-auto xl:right-0"
                >
                  {OFFER_SORTS.map((s) => (
                    <li key={s.id}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={s.id === sort}
                        onClick={() => {
                          setSort(s.id);
                          setSortOpen(false);
                        }}
                        className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left type-body-sm whitespace-nowrap hover:bg-raised ${
                          s.id === sort ? "text-brand" : "text-ink"
                        }`}
                      >
                        {s.label}
                        {s.id === sort && <Icon name="tick-circle-00d26a" size={16} />}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Offer grid: rows of three, as in Figma "Offer row 1 / 2" */}
        {rows.length > 0 ? (
          <div className="flex w-full flex-col gap-6">
            {rows.map((row, i) => (
              <div key={i} className="grid w-full grid-cols-1 items-start gap-3 p-4 md:p-5 xl:grid-cols-3 xl:gap-6 xl:p-6">
                {row.map((o) => (
                  <OfferCard key={o.id} offer={o} />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex w-full flex-col items-start gap-3 rounded-[20px] border border-line bg-surface p-6">
            <p className="type-label text-ink">No offers match your search.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setFilter("all");
              }}
              className="inline-flex h-10 items-center rounded-full border border-brand bg-page px-4 type-label text-ink hover:bg-brand-tint"
            >
              Show all offers
            </button>
          </div>
        )}
      </section>
    </>
  );
}
