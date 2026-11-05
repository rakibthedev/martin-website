"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { ArticleCard } from "../ArticleCard";
import { ARTICLES, CATEGORY_TABS, TOTAL_ARTICLES, type Tab } from "../data";
import { btnClass } from "../ui";
import { Dropdown } from "../hooks";
import { useArticlesFilter } from "./FilterContext";

const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"] as const;
const SORTS = ["Newest", "Most read", "Shortest"] as const;
const PAGE = 6;

const dropdownTrigger =
  "flex w-full items-center gap-2 rounded-full border border-line bg-surface px-4 py-3 type-label whitespace-nowrap transition hover:border-muted xl:w-auto";

/** Figma "All articles" (381:5138 · tablet 497:46082 · mobile 497:46587). */
export function AllArticles() {
  const { query, setQuery } = useArticlesFilter();
  const [tab, setTab] = useState<"All" | Tab>("All");
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("All");
  const [sort, setSort] = useState<(typeof SORTS)[number]>("Newest");
  const [shown, setShown] = useState(PAGE);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    const list = ARTICLES.filter(
      (a) =>
        (tab === "All" || a.tab === tab) &&
        (level === "All" || a.level === level) &&
        (!q || `${a.title} ${a.description} ${a.takeaway} ${a.category}`.toLowerCase().includes(q.split(" ")[0])),
    );
    return [...list].sort((a, b) =>
      sort === "Newest" ? a.age - b.age : sort === "Most read" ? b.reads - a.reads : a.minutes - b.minutes,
    );
  }, [tab, level, sort, query]);

  const isDefault = tab === "All" && level === "All" && !query;
  const visible = filtered.slice(0, shown);
  const total = isDefault ? TOTAL_ARTICLES : filtered.length;
  const canLoadMore = shown < filtered.length;

  return (
    <section id="all-articles" className="flex scroll-mt-28 flex-col gap-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <h2 className="type-h2 md:flex-1">All articles</h2>
        <div className="grid grid-cols-1 gap-3 md:flex-[2.3] md:grid-cols-2 xl:flex xl:flex-none">
          <Dropdown
            value={level}
            options={LEVELS}
            onChange={(v) => {
              setLevel(v);
              setShown(PAGE);
            }}
            render={(v) => <span>Level: {v}</span>}
            triggerClass={dropdownTrigger}
          />
          <Dropdown
            value={sort}
            options={SORTS}
            onChange={setSort}
            render={(v) => <span>Sort: {v}</span>}
            triggerClass={dropdownTrigger}
          />
        </div>
      </div>

      <div
        role="tablist"
        aria-label="Article categories"
        className="flex flex-wrap gap-x-1 gap-y-2 rounded-full border border-line bg-surface p-4 md:p-5 xl:flex-nowrap xl:gap-1 xl:self-start xl:p-1"
      >
        {CATEGORY_TABS.map((t) => {
          const active = tab === t.label;
          return (
            <button
              key={t.label}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => {
                setTab(t.label);
                setShown(PAGE);
              }}
              className={`flex items-center gap-2 rounded-full px-2.5 type-label whitespace-nowrap transition md:py-0.5 xl:px-4 xl:py-[9px] ${
                active ? "bg-brand text-page" : "text-ink hover:bg-raised"
              }`}
            >
              {t.label}
              <span
                className={`rounded-full px-[7px] py-px text-[11px] font-bold leading-[14px] ${
                  active ? "bg-page text-brand" : "bg-raised text-ink"
                }`}
              >
                {t.count}
              </span>
            </button>
          );
        })}
      </div>

      {query && (
        <div className="flex flex-wrap items-center gap-2 type-body-sm text-muted">
          Showing results for <span className="text-ink">“{query}”</span>
          <button type="button" onClick={() => setQuery("")} className="text-brand hover:underline">
            Clear search
          </button>
        </div>
      )}

      {visible.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {visible.map((a) => (
            <ArticleCard key={a.id} a={a} />
          ))}
        </div>
      ) : (
        <div className="rounded-[28px] border border-dashed border-line p-10 text-center type-body text-muted">
          No guides match these filters yet.
        </div>
      )}

      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
        <p className="type-body-sm text-muted md:flex-1">
          Showing {Math.min(visible.length, total)} of {total} articles
        </p>
        <button
          type="button"
          disabled={!canLoadMore}
          onClick={() => setShown((n) => n + PAGE)}
          className={btnClass("ghost", undefined, "disabled:cursor-not-allowed disabled:opacity-50")}
        >
          Load more articles
          <Icon name="arrow-up-00d26a" size={20} rotate={45} />
        </button>
      </div>
    </section>
  );
}
