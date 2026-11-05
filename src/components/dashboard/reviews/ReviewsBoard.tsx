"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { pillClass } from "@/components/dashboard/ui";
import { ReviewCard } from "./ReviewCard";
import { FILTERS, MY_REVIEWS, PAGE_SIZE, SORTS, type SortId } from "./data";

type FilterId = (typeof FILTERS)[number]["id"];

/**
 * Figma Toolbar (372:2572) + Review list (372:2610) + Pagination (372:3067).
 * Toolbar — desktop: [status filter] … [search 320] [sort]; tablet: [search | sort] then full-width
 * filter; mobile: filter (scrolls horizontally), search, sort stacked.
 */
export function ReviewsBoard() {
  const [reviews, setReviews] = useState(MY_REVIEWS);
  const [filter, setFilter] = useState<FilterId>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortId>("recent");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: reviews.length };
    for (const r of reviews) c[r.status] = (c[r.status] ?? 0) + 1;
    return c;
  }, [reviews]);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const out = reviews.filter(
      (r) => (filter === "all" || r.status === filter) && (!q || r.firm.toLowerCase().includes(q)),
    );
    // "Most recent" keeps the Figma order (action-needed first, then by date).
    if (sort === "oldest") out.sort((a, b) => a.date.localeCompare(b.date));
    if (sort === "rating") out.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    return out;
  }, [reviews, filter, query, sort]);

  const shown = list.slice(0, visible);

  return (
    <>
      {/* Toolbar */}
      <div className="flex w-full flex-col gap-4 xl:flex-row xl:flex-wrap xl:items-center">
        <div
          role="tablist"
          aria-label="Filter reviews by status"
          className="order-1 flex w-full gap-1 overflow-x-auto rounded-full border border-line bg-surface p-1 [scrollbar-width:none] md:order-2 xl:order-1 xl:w-auto"
        >
          {FILTERS.map((f) => {
            const active = f.id === filter;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setFilter(f.id);
                  setVisible(PAGE_SIZE);
                }}
                className={`flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 transition-colors md:px-3 xl:px-3.5 ${
                  active ? "bg-brand" : "hover:bg-raised/60"
                }`}
              >
                <span className={`type-label whitespace-nowrap ${active ? "text-page" : "text-ink"}`}>{f.label}</span>
                <span
                  className={`rounded-full px-[7px] py-px text-[11px] font-bold leading-normal ${
                    active ? "bg-page text-brand" : "bg-raised text-ink"
                  }`}
                >
                  {counts[f.id] ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        <div className="order-2 flex w-full flex-col gap-4 md:order-1 md:flex-row xl:order-2 xl:ml-auto xl:w-auto">
          <label className="flex h-12 min-w-0 items-center gap-2.5 rounded-full border border-line bg-surface px-4 focus-within:border-brand md:flex-1 xl:h-[46px] xl:w-[320px] xl:flex-none xl:px-[18px]">
            <Icon name="search-normal-18-898587" size={18} />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisible(PAGE_SIZE);
              }}
              placeholder="Search by firm name"
              aria-label="Search by firm name"
              className="type-body-sm min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-muted"
            />
          </label>
          <SortMenu value={sort} onChange={setSort} />
        </div>
      </div>

      {/* Review list */}
      <div className="flex w-full flex-col gap-4">
        {shown.map((r) => (
          <ReviewCard
            key={r.id}
            review={r}
            onDelete={() => setReviews((prev) => prev.filter((x) => x.id !== r.id))}
          />
        ))}
        {shown.length === 0 && (
          <div className="rounded-[24px] border border-line bg-surface p-6 text-center">
            <p className="type-body text-muted">No reviews match your filters.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex w-full flex-col items-start gap-4 md:flex-row md:items-center md:pt-2">
        <p className="type-body-sm min-w-0 flex-1 text-muted">
          Showing {shown.length} of {list.length} reviews
        </p>
        {visible < list.length ? (
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className={pillClass("ghost")}
          >
            Load more reviews
            <Icon name="arrow-up-00d26a" size={20} rotate={45} />
          </button>
        ) : null}
      </div>
    </>
  );
}

function SortMenu({ value, onChange }: { value: SortId; onChange: (v: SortId) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);
  const label = SORTS.find((s) => s.id === value)?.label;
  return (
    <div ref={ref} className="relative md:flex-1 xl:flex-none">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex h-[50px] w-full items-center gap-2 rounded-full border border-line bg-surface px-4 hover:border-muted"
      >
        <span className="type-label min-w-0 flex-1 truncate text-left text-ink">Sort: {label}</span>
        <Icon name="arrow-down-f0f0f0" size={16} className={open ? "rotate-180" : ""} />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-[calc(100%+8px)] z-20 flex w-full min-w-[200px] flex-col gap-1 rounded-[16px] border border-line bg-surface p-1.5 shadow-xl"
        >
          {SORTS.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                role="option"
                aria-selected={s.id === value}
                onClick={() => {
                  onChange(s.id);
                  setOpen(false);
                }}
                className={`type-body-sm w-full rounded-[12px] px-3 py-2 text-left ${
                  s.id === value ? "bg-brand-tint text-brand" : "text-ink hover:bg-raised/60"
                }`}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
