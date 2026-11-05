"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Noto_Color_Emoji } from "next/font/google";
import { Icon } from "@/components/ui/Icon";
import { ALL_FIRMS, INITIAL_SELECTION, MAX_PICK, MIN_PICK, NEW, RATED, type PickFirm } from "./data";

/** Flag emoji need a colour-emoji font — Windows has no flag glyphs in Segoe UI Emoji. */
const emoji = Noto_Color_Emoji({ weight: "400", subsets: ["emoji"], display: "swap", preload: false });

type Filter = "all" | "rated" | "new" | "futures";
type Sort = "rating" | "reviews" | "az";
const SORT_LABEL: Record<Sort, string> = { rating: "Highest rated", reviews: "Most reviewed", az: "Name A–Z" };

const BY_ID = new Map(ALL_FIRMS.map((f) => [f.id, f]));

function FirmMark({ firm, size, scale = 1 }: { firm: PickFirm; size: string; scale?: number }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-line ${size}`}
    >
      {firm.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={firm.logo.src}
          alt=""
          width={firm.logo.w}
          height={firm.logo.h}
          className={`block max-w-none ${firm.logo.cover ? "object-cover" : ""}`}
          style={{ width: firm.logo.w * scale, height: firm.logo.h * scale }}
        />
      ) : (
        <span className="type-caption text-brand" style={scale < 1 ? { fontSize: 10, lineHeight: "14px" } : undefined}>
          {firm.initials}
        </span>
      )}
    </span>
  );
}

const chipCls = (on: boolean) =>
  `inline-flex h-6 shrink-0 items-center gap-1.5 whitespace-pre rounded-full border px-2.5 type-label transition-colors md:h-7 xl:h-auto xl:px-4 xl:py-2.5 ${
    on ? "border-brand bg-brand-tint text-brand" : "border-line bg-page text-ink hover:border-muted"
  }`;

export function FirmPicker() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>(INITIAL_SELECTION);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("rating");
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sortOpen) return;
    const close = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setSortOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [sortOpen]);

  const full = selected.length >= MAX_PICK;
  const canCompare = selected.length >= MIN_PICK;

  const toggle = (id: string) =>
    setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : cur.length >= MAX_PICK ? cur : [...cur, id]));

  const compare = () => {
    if (canCompare) router.push(`/compare?firms=${selected.join(",")}`);
  };

  const counts = {
    all: ALL_FIRMS.length,
    rated: RATED.length,
    new: NEW.length,
    futures: ALL_FIRMS.filter((f) => f.futures).length,
  };

  const { rated, fresh } = useMemo(() => {
    const q = query.trim().toLowerCase();
    const keep = (f: PickFirm) => (!q || f.name.toLowerCase().includes(q)) && (filter !== "futures" || !!f.futures);
    const order = (list: PickFirm[]) => {
      const out = list.filter(keep);
      if (sort === "az") out.sort((a, b) => a.name.localeCompare(b.name));
      else if (sort === "reviews") out.sort((a, b) => b.reviews - a.reviews);
      return out; // "rating": data is already in Figma (highest rated) order
    };
    return {
      rated: filter === "new" ? [] : order(RATED),
      fresh: filter === "rated" ? [] : order(NEW),
    };
  }, [query, filter, sort]);

  const renderCard = (f: PickFirm) => {
    const on = selected.includes(f.id);
    const disabled = !on && full;
    return (
      <li key={f.id}>
        <button
          type="button"
          role="checkbox"
          aria-checked={on}
          aria-disabled={disabled}
          onClick={() => !disabled && toggle(f.id)}
          className={`flex h-full w-full items-center gap-3.5 rounded-[14px] border p-4 text-left transition md:p-5 xl:p-6 ${
            on ? "border-brand bg-brand-tint" : "border-line bg-page"
          } ${disabled ? "cursor-not-allowed" : on ? "" : "hover:border-muted"}`}
        >
          <span className="flex items-center">
            <FirmMark firm={f} size="size-11 bg-surface" />
          </span>
          <span className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="type-label text-ink">{f.name}</span>
            {f.rating != null ? (
              <span className="flex items-center gap-1 type-caption text-brand">
                <Icon name="star-00d26a" size={14} />
                {f.rating.toFixed(1)} · {f.reviews} verified {f.reviews === 1 ? "review" : "reviews"}
              </span>
            ) : (
              <span className="type-caption text-muted">New · no reviews yet</span>
            )}
            <span className="type-caption text-muted">
              <span className={emoji.className}>{f.flag}</span> {f.meta}
            </span>
          </span>
          <span
            aria-hidden
            className={`flex size-6 shrink-0 items-center justify-center rounded-full ${
              on ? "bg-brand" : "border border-line bg-surface"
            } ${disabled ? "opacity-50" : ""}`}
          >
            {on && <Icon name="tick-circle-151513" size={14} />}
          </span>
        </button>
      </li>
    );
  };

  const renderSection = (title: string, count: number, list: PickFirm[], desc?: string) => (
    <section className="flex w-full flex-col gap-3.5 pt-2">
      <div className="flex flex-col gap-3.5">
        <h2 className="flex items-center gap-3 type-h3 text-ink">
          {title}
          <span className="rounded-full bg-raised px-2.5 py-0.5 type-caption font-normal text-muted">{count}</span>
        </h2>
        {desc && <p className="type-body-sm text-muted">{desc}</p>}
      </div>
      <ul className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-3 xl:gap-y-3.5">
        {list.map(renderCard)}
      </ul>
    </section>
  );

  const slots = selected.map((id) => BY_ID.get(id)!).filter(Boolean);

  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 rounded-[28px] border border-line bg-surface p-4 shadow-[0_24px_80px_rgba(0,0,0,0.5)] md:p-5 xl:p-6">
      {/* Header */}
      <header className="flex w-full items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-1.5">
          <p className="text-[10px] font-semibold leading-[14px] tracking-[1.5px] text-brand">STEP 1 OF 2 · CHOOSE FIRMS</p>
          <h1 className="type-h1 text-ink">Choose firms to compare</h1>
          <p className="type-body text-muted">
            Pick 2 or 3 firms. Each card shows the trust score, reviews, country, platform, max allocation and profit split.
          </p>
        </div>
        <Link
          href="/compare"
          aria-label="Close"
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-raised hover:brightness-125 md:size-11 xl:size-12"
        >
          <Icon name="add-f0f0f0" size={16} rotate={45} />
        </Link>
      </header>

      {/* Selection tray */}
      <div className="flex w-full flex-col items-start gap-4 rounded-[20px] border border-brand bg-page p-4 md:flex-row md:p-5 xl:items-center xl:p-6">
        <div className="flex shrink-0 flex-col gap-0.5">
          <p className="type-caption text-muted">Selected</p>
          <p className="type-h3 text-brand">
            {selected.length} of {MAX_PICK}
          </p>
        </div>
        <ul className="flex min-w-0 flex-1 flex-col items-start gap-2 md:pt-1 xl:flex-row xl:flex-wrap xl:items-center xl:pt-0">
          {slots.map((f) => (
            <li
              key={f.id}
              className="flex max-w-full items-center gap-2.5 rounded-full bg-raised py-0.5 pl-1 pr-3.5 xl:py-1.5 xl:pl-1.5"
            >
              <FirmMark firm={f} size="size-5 bg-page md:size-6 xl:size-8" scale={0.74} />
              <span className="truncate type-label text-ink">{f.name}</span>
              <button
                type="button"
                aria-label={`Remove ${f.name}`}
                onClick={() => toggle(f.id)}
                className="shrink-0 rounded-full p-0.5 hover:bg-line"
              >
                <Icon name="add-898587" size={14} rotate={45} />
              </button>
            </li>
          ))}
          {slots.length === 0 && <li className="type-body-sm text-muted">No firms selected yet — pick from the list below.</li>}
        </ul>
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-3">
          <button
            type="button"
            onClick={() => setSelected([])}
            disabled={selected.length === 0}
            className="inline-flex h-10 items-center justify-center rounded-full bg-raised px-4 type-label text-ink hover:brightness-125 disabled:opacity-50 md:h-11 xl:h-12"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={compare}
            disabled={!canCompare}
            className="inline-flex h-10 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-brand px-4 type-label text-page hover:brightness-110 disabled:opacity-50 md:h-11 xl:h-12"
          >
            Compare {selected.length} firms
            <Icon name="arrow-right-151513" size={16} />
          </button>
        </div>
      </div>

      <p role="status" className={`flex items-start gap-1 type-caption ${full ? "text-brand" : "text-muted"}`}>
        <Icon name={full ? "info-circle-00d26a" : "info-circle-898587"} size={14} className="mt-[3px]" />
        <span>
          {full
            ? "Maximum reached — you’ve picked 3 firms. Remove one before adding another."
            : selected.length < MIN_PICK
              ? `Pick ${MIN_PICK - selected.length} more ${MIN_PICK - selected.length === 1 ? "firm" : "firms"} to compare.`
              : "You can add one more firm."}
        </span>
      </p>

      {/* Toolbar */}
      <div className="flex w-full flex-col gap-3 xl:flex-row xl:items-center">
        <label className="flex min-w-0 flex-1 items-center gap-3 rounded-full border border-line bg-page px-5 py-3 focus-within:border-brand">
          <Icon name="search-normal-898587" size={24} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${ALL_FIRMS.length} firms by name`}
            aria-label="Search firms by name"
            className="min-w-0 flex-1 bg-transparent type-body text-ink outline-none placeholder:text-muted"
          />
        </label>
        <div className="flex flex-col items-start gap-3 xl:flex-row xl:items-center">
          {(
            [
              ["all", "All"],
              ["rated", "Rated"],
              ["new", "New"],
              ["futures", "Futures"],
            ] as const
          ).map(([k, label]) => (
            <button key={k} type="button" aria-pressed={filter === k} onClick={() => setFilter(k)} className={chipCls(filter === k)}>
              {`${label}  ${counts[k]}`}
            </button>
          ))}
          <div ref={sortRef} className="relative">
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={sortOpen}
              onClick={() => setSortOpen((o) => !o)}
              className={`${chipCls(false)} !text-muted`}
            >
              Sort: {SORT_LABEL[sort]}
              <Icon name="arrow-down-898587" size={16} rotate={sortOpen ? 180 : undefined} />
            </button>
            {sortOpen && (
              <ul
                role="listbox"
                aria-label="Sort firms"
                className="absolute left-0 top-full z-20 mt-2 flex min-w-[200px] flex-col gap-1 rounded-2xl border border-line bg-card p-2 shadow-[0_16px_40px_rgba(0,0,0,0.45)] xl:left-auto xl:right-0"
              >
                {(Object.keys(SORT_LABEL) as Sort[]).map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={sort === s}
                      onClick={() => {
                        setSort(s);
                        setSortOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left type-body-sm hover:bg-raised ${
                        sort === s ? "text-brand" : "text-ink"
                      }`}
                    >
                      {SORT_LABEL[s]}
                      {sort === s && <Icon name="tick-circle-outline-00d26a" size={14} />}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {rated.length > 0 && renderSection("Top rated", rated.length, rated)}
      {fresh.length > 0 &&
        renderSection(
          "New on PropFirmScores",
          fresh.length,
          fresh,
          "These firms don’t have enough verified reviews for a trust score yet.",
        )}
      {rated.length === 0 && fresh.length === 0 && (
        <div className="flex w-full flex-col items-center gap-2 rounded-[20px] border border-line bg-page p-6 text-center">
          <p className="type-label text-ink">No firms match “{query}”</p>
          <p className="type-body-sm text-muted">Try a different name or clear the filters.</p>
        </div>
      )}

      {/* Footer */}
      <footer className="flex w-full flex-wrap items-center justify-end gap-3 border-t border-line pt-4">
        <p className="mr-auto type-label text-brand xl:mr-0">
          {selected.length} of {MAX_PICK} firms selected
        </p>
        <Link
          href="/compare"
          className="inline-flex h-10 items-center justify-center rounded-full border border-brand bg-page px-4 type-label text-ink hover:bg-brand-tint md:h-11 xl:h-12"
        >
          Cancel
        </Link>
        <button
          type="button"
          onClick={compare}
          disabled={!canCompare}
          className="inline-flex h-10 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-brand px-4 type-label text-page hover:brightness-110 disabled:opacity-50 md:h-11 xl:h-12"
        >
          Compare {selected.length} firms
          <Icon name="arrow-right-151513" size={16} />
        </button>
      </footer>
    </div>
  );
}
