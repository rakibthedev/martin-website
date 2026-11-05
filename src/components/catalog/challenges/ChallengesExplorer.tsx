"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import {
  ACCOUNT_SIZES,
  CHALLENGE_LOGOS,
  CHALLENGE_PLATFORMS,
  CHALLENGE_SORTS,
  CHALLENGES,
  CHALLENGES_PAGE_SIZE,
  DAILY_LOSS_OPTIONS,
  MAX_COMPARE,
  TARGET_SCALE,
  type Challenge,
  type ChallengeSort,
} from "../data";
import { ChallengeFilters, type ChallengeFilterState } from "./ChallengeFilters";
import { ChallengeHero } from "./ChallengeHero";
import { ChallengeRow } from "./ChallengeRow";

const INITIAL: ChallengeFilterState = { type: "All", size: 100, target: [5, 10], daily: 5, platforms: ["MT5"] };
const CLEARED: ChallengeFilterState = {
  type: "All",
  size: null,
  target: [TARGET_SCALE.min, TARGET_SCALE.max],
  daily: null,
  platforms: [],
};

function matches(c: Challenge, f: ChallengeFilterState, q: string) {
  if (f.type !== "All" && c.type !== f.type) return false;
  if (f.size !== null && c.size !== f.size) return false;
  if (Math.min(...c.targets) < f.target[0] || Math.max(...c.targets) > f.target[1]) return false;
  if (f.daily !== null && c.dailyLoss > f.daily) return false;
  if (f.platforms.length && !c.platforms.some((p) => f.platforms.includes(p))) return false;
  if (q) {
    const hay = `${c.firmName} ${c.type} ${c.phases} ${c.keywords} ${c.platforms.join(" ")}`.toLowerCase();
    return q
      .toLowerCase()
      .replace(/[“”"]/g, "")
      .split(/\s+/)
      .filter(Boolean)
      .every((w) => hay.includes(w));
  }
  return true;
}

const SORTERS: Record<ChallengeSort, (a: Challenge, b: Challenge) => number> = {
  target: (a, b) => a.targets[0] - b.targets[0],
  daily: (a, b) => b.dailyLoss - a.dailyLoss,
  maxloss: (a, b) => b.maxLoss - a.maxLoss,
  size: (a, b) => b.size - a.size,
  firm: (a, b) => a.firmName.localeCompare(b.firmName),
};

/** Close chip (Figma "Chip / … ✕"): Icon / close = add rotated 45°. */
function ActiveChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      type="button"
      onClick={onRemove}
      aria-label={`Remove filter ${label}`}
      className="inline-flex h-6 shrink-0 items-center justify-center gap-1 rounded-full border border-line bg-surface px-2.5 py-0.5 type-caption whitespace-nowrap text-muted transition hover:text-ink md:h-7 md:py-1 xl:h-auto xl:px-3 xl:py-1.5"
    >
      {label}
      <Icon name="add-14-898587" size={14} rotate={45} />
    </button>
  );
}

/** Challenges page body: hero (search + matchmaker), filters, results toolbar, list, compare bar, show more. */
export function ChallengesExplorer() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<ChallengeFilterState>(INITIAL);
  const [sort, setSort] = useState<ChallengeSort>("target");
  // Until the visitor picks a sort, keep the curated directory order shown in the design.
  const [sortTouched, setSortTouched] = useState(false);
  const [view, setView] = useState<"list" | "grid">("list");
  const [visible, setVisible] = useState(CHALLENGES_PAGE_SIZE);
  const [selected, setSelected] = useState<string[]>(["ch-1", "ch-2"]);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [sortOpen, setSortOpen] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sortOpen) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !sortRef.current?.contains(e.target as Node))
        setSortOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [sortOpen]);

  const results = useMemo(
    () => {
      const list = CHALLENGES.filter((c) => matches(c, filters, query.trim()));
      return sortTouched ? list.sort(SORTERS[sort]) : list;
    },
    [filters, query, sort, sortTouched],
  );
  const shown = results.slice(0, visible);
  const selectedItems = selected.map((id) => CHALLENGES.find((c) => c.id === id)!).filter(Boolean);

  const updateFilters = (f: ChallengeFilterState) => {
    setFilters(f);
    setVisible(CHALLENGES_PAGE_SIZE);
  };
  const scrollToResults = () => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const toggle = (list: string[], id: string, max = Infinity) =>
    list.includes(id) ? list.filter((x) => x !== id) : list.length >= max ? list : [...list, id];

  const chips = [
    filters.size !== null && { label: `$${filters.size}K`, clear: () => updateFilters({ ...filters, size: null }) },
    ...filters.platforms.map((p) => ({
      label: p,
      clear: () => updateFilters({ ...filters, platforms: filters.platforms.filter((x) => x !== p) }),
    })),
    filters.daily !== null && {
      label: `≤ ${filters.daily}% daily loss`,
      clear: () => updateFilters({ ...filters, daily: null }),
    },
    filters.type !== "All" && { label: filters.type, clear: () => updateFilters({ ...filters, type: "All" }) },
  ].filter(Boolean) as { label: string; clear: () => void }[];

  const showMore = () => {
    if (results.length > visible) return setVisible((v) => v + CHALLENGES_PAGE_SIZE);
    // Everything matching is already listed — widen the search to show more challenges.
    setFilters(CLEARED);
    setQuery("");
    setVisible((v) => v + CHALLENGES_PAGE_SIZE);
  };

  const onMatch = (a: number[]) => {
    updateFilters({
      ...filters,
      daily: DAILY_LOSS_OPTIONS[a[1]] ?? null,
      size: ACCOUNT_SIZES[a[2]] ?? null,
      platforms: [CHALLENGE_PLATFORMS[a[3]]],
    });
    scrollToResults();
  };

  const sortLabel = CHALLENGE_SORTS.find((s) => s.id === sort)!.label;
  const n = selectedItems.length;

  return (
    <>
      <ChallengeHero query={query} onQuery={setQuery} onSearch={scrollToResults} onMatch={onMatch} />

      <div className="flex flex-col gap-6 md:gap-4 xl:flex-row xl:items-start xl:gap-8">
        <ChallengeFilters
          value={filters}
          onChange={updateFilters}
          onReset={() => updateFilters(CLEARED)}
          count={results.length}
          onShow={scrollToResults}
        />

        <div ref={resultsRef} className="flex min-w-0 flex-1 scroll-mt-6 flex-col gap-4">
          {/* Results toolbar */}
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="w-full type-h3 whitespace-nowrap text-ink xl:w-auto">
              {results.length} challenge{results.length === 1 ? "" : "s"} found
            </h2>
            {chips.length > 0 && (
              <div className="flex flex-wrap items-center gap-3 md:gap-2 xl:gap-3">
                {chips.map((c) => (
                  <ActiveChip key={c.label} label={c.label} onRemove={c.clear} />
                ))}
              </div>
            )}
            <div className="mt-1 flex w-full items-center gap-3 md:mt-0 md:w-auto md:flex-1 md:justify-end xl:ml-auto xl:flex-none">
              <div ref={sortRef} className="relative min-w-0">
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={sortOpen}
                  onClick={() => setSortOpen((o) => !o)}
                  className="inline-flex h-6 max-w-full items-center justify-center gap-1.5 rounded-full border border-line bg-surface px-2.5 type-label text-muted transition hover:text-ink md:h-7 md:py-0.5 xl:h-auto xl:px-4 xl:py-2.5"
                >
                  <span className="truncate">Sort: {sortLabel}</span>
                  <Icon name="arrow-down-898587" size={16} />
                </button>
                {sortOpen && (
                  <div
                    role="menu"
                    className="absolute top-[calc(100%+8px)] left-0 z-20 flex w-60 flex-col gap-1 rounded-2xl border border-line bg-surface p-2 shadow-[0_16px_40px_rgba(0,0,0,0.45)] md:right-0 md:left-auto"
                  >
                    {CHALLENGE_SORTS.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        role="menuitemradio"
                        aria-checked={sort === s.id}
                        onClick={() => {
                          setSort(s.id);
                          setSortTouched(true);
                          setSortOpen(false);
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
              <div className="flex shrink-0 gap-1 rounded-full border border-line bg-surface p-1" role="radiogroup" aria-label="View">
                {(
                  [
                    { id: "list", label: "List", icon: { on: "menu-f0f0f0", off: "menu-898587" } },
                    { id: "grid", label: "Grid", icon: { on: "element-3-f0f0f0", off: "element-3-898587" } },
                  ] as const
                ).map((v) => {
                  const on = view === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      aria-label={`${v.label} view`}
                      onClick={() => setView(v.id)}
                      className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 transition ${on ? "bg-raised" : "hover:bg-card"}`}
                    >
                      <Icon name={on ? v.icon.on : v.icon.off} size={16} />
                      <span className={`hidden type-label xl:inline ${on ? "text-ink" : "text-muted"}`}>{v.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column labels (single-line desktop rows only) */}
          {view === "list" && (
            <div className="hidden items-center gap-6 px-6 text-[10px] leading-[14px] font-semibold tracking-[1.2px] whitespace-nowrap text-muted min-[1680px]:flex">
              <span className="w-5 shrink-0" />
              <span className="w-[280px] shrink-0">FIRM &amp; PROGRAMME</span>
              <span className="flex min-w-0 flex-1">
                {["ACCOUNT SIZE", "PROFIT TARGET", "DAILY LOSS", "MAXIMUM LOSS"].map((l) => (
                  <span key={l} className="min-w-0 flex-1 pl-6">
                    {l}
                  </span>
                ))}
              </span>
              <span className="w-[232px] shrink-0 text-right">ACTIONS</span>
            </div>
          )}

          {/* Challenge list */}
          {shown.length > 0 ? (
            <ul
              className={
                view === "list" ? "flex flex-col gap-3" : "grid grid-cols-1 gap-3 md:grid-cols-2 min-[1680px]:grid-cols-3"
              }
            >
              {shown.map((c) => (
                <ChallengeRow
                  key={c.id}
                  challenge={c}
                  view={view}
                  selected={selected.includes(c.id)}
                  favourite={favourites.includes(c.id)}
                  onToggleSelect={() => setSelected((s) => toggle(s, c.id, MAX_COMPARE))}
                  onToggleFavourite={() => setFavourites((f) => toggle(f, c.id))}
                />
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-line bg-surface px-6 py-12 text-center">
              <p className="type-label text-ink">No challenges match these filters</p>
              <button type="button" onClick={() => updateFilters(CLEARED)} className="type-body-sm text-brand hover:underline">
                Reset all filters
              </button>
            </div>
          )}

          {/* Compare bar */}
          {n > 0 && (
            <div className="flex flex-col items-start rounded-2xl border border-brand bg-raised p-4 md:p-5 xl:flex-row xl:items-center xl:justify-between xl:gap-6 xl:p-6">
              <div className="flex w-full flex-wrap items-start gap-4 xl:w-auto xl:flex-nowrap xl:items-center">
                <div className="flex shrink-0 xl:pr-2">
                  {selectedItems.map((c) => {
                    const logo = CHALLENGE_LOGOS[c.firm];
                    const h = (logo.h * 22) / logo.w;
                    return (
                      <span
                        key={c.id}
                        className="flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-page xl:-mr-2 xl:size-10"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={logo.src} width={22} height={h} alt="" className="block shrink-0" style={{ width: 22, height: h }} />
                      </span>
                    );
                  })}
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <p className="type-label text-ink">
                    {n} challenge{n === 1 ? "" : "s"} selected
                  </p>
                  <p className="type-caption text-muted">
                    {n >= MAX_COMPARE ? "That’s the maximum — compare them now" : "Add up to 4 to compare rules side by side"}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelected([])}
                  className="inline-flex h-10 items-center justify-center rounded-full bg-raised px-4 type-label text-ink transition hover:brightness-125 md:h-11 xl:h-12"
                >
                  Clear
                </button>
                <Link
                  href="/compare"
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-brand px-4 type-label whitespace-nowrap text-page transition hover:brightness-110 md:h-11 xl:h-12"
                >
                  Compare now
                  <Icon name="arrow-right-151513" size={16} />
                </Link>
              </div>
            </div>
          )}

          {/* Show more */}
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={showMore}
              className="inline-flex h-10 items-center justify-center rounded-full border border-brand bg-page px-4 type-label whitespace-nowrap text-ink transition hover:bg-brand-tint md:h-11 xl:h-12"
            >
              Show more challenges
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
