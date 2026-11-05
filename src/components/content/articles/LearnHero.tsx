"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { ARTICLE_HREF, LEARNING_PATHS, POPULAR_TOPICS } from "../data";
import { useArticlesFilter } from "./FilterContext";

export const heroGradient: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(90deg, rgba(0, 209, 106, 0.15) 0%, rgba(0, 209, 106, 0) 60%), linear-gradient(90deg, #212121 0%, #212121 100%)",
};

/** Figma "Hero / Learn" (381:4827 · tablet 497:45905 · mobile 497:46410). */
export function LearnHero() {
  const { setQuery } = useArticlesFilter();
  const [value, setValue] = useState("");

  const run = (q: string) => {
    setQuery(q.trim());
    document.getElementById("all-articles")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      style={heroGradient}
      className="flex flex-col gap-6 rounded-[32px] border border-line p-4 md:flex-row md:items-start md:gap-8 md:p-5 xl:items-center xl:gap-12 xl:p-6"
    >
      {/* Intro */}
      <div className="flex min-w-0 flex-1 flex-col gap-5">
        <div className="flex items-center gap-2">
          <span className="size-2 shrink-0 rounded-full bg-brand" />
          <p className="text-[11px] font-bold leading-none tracking-[1px] text-brand">PROPFIRMSCORES LEARN · 48 GUIDES</p>
        </div>
        <h1 className="type-h1 xl:type-display">
          <span className="block">Learn the rules</span>
          <span className="block text-brand">before you pay.</span>
        </h1>
        <p className="type-body text-muted">
          Plain-English guides on challenges, payouts, drawdown and firm research — written by traders and checked against
          real reviews.
        </p>
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            run(value);
          }}
          className="flex h-[54px] w-full max-w-[760px] items-center gap-3 rounded-full border border-line bg-brand-tint py-1.5 pl-4 pr-1.5 md:h-[58px] xl:h-[60px] xl:pl-[22px]"
        >
          <Icon name="search-normal-898587" size={20} className="hidden md:block" />
          <input
            type="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search guides, e.g. “daily drawdown” or “payout proof”"
            aria-label="Search guides"
            className="min-w-0 flex-1 truncate bg-transparent type-body text-ink outline-none placeholder:text-muted"
          />
          <button
            type="submit"
            aria-label="Search"
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-tint-raised transition hover:brightness-125 md:hidden"
          >
            <Icon name="search-normal-f0f0f0" size={20} />
          </button>
          <button
            type="submit"
            className="hidden h-11 shrink-0 items-center justify-center gap-1.5 rounded-full bg-ink px-4 type-label text-page transition hover:bg-white md:inline-flex xl:h-12"
          >
            Search
            <Icon name="arrow-up-151513" size={20} rotate={45} />
          </button>
        </form>
        <div className="flex flex-wrap items-center gap-2">
          <span className="type-body-sm text-muted">Popular:</span>
          {POPULAR_TOPICS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setValue(t);
                run(t);
              }}
              className="flex h-6 items-center rounded-full bg-raised px-2.5 text-[12px] font-semibold leading-4 transition hover:bg-line xl:h-[26px] xl:px-3"
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Learning paths */}
      <div className="flex w-full shrink-0 flex-col gap-4 rounded-[28px] border border-line bg-page p-4 md:w-[344px] md:p-5 xl:w-[520px] xl:p-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-2 gap-y-0.5 xl:items-center">
          <p className="text-[20px] font-extrabold leading-tight">Your learning paths</p>
          <p className="col-span-2 row-start-2 type-caption text-muted xl:col-span-1">Pick up where you left off</p>
          <span className="col-start-2 row-start-1 flex shrink-0 items-center gap-1 rounded-full border border-brand px-2.5 py-1 xl:row-span-2">
            <Icon name="medal-00d26a" size={14} />
            <span className="text-[12px] font-semibold leading-4 text-brand">+10 pts / guide</span>
          </span>
        </div>
        {LEARNING_PATHS.map((p) => (
          <div
            key={p.name}
            className={`flex flex-col gap-2.5 rounded-[18px] border bg-surface p-4 md:p-5 xl:p-6 ${
              p.status === "done" ? "border-brand" : "border-line"
            }`}
          >
            <div className="flex items-start gap-2.5 xl:items-center">
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <p className="type-label">{p.name}</p>
                <p className="type-caption text-muted">{p.meta}</p>
              </div>
              {p.status === "done" && (
                <span className="flex shrink-0 items-center gap-1 pt-1 xl:pt-0">
                  <Icon name="tick-circle-bold-00d26a" size={16} />
                  <span className="text-[12px] font-semibold leading-4 text-brand">Completed</span>
                </span>
              )}
              {p.status === "continue" && (
                <Link href={ARTICLE_HREF} className="shrink-0 pt-1 text-[12px] font-bold leading-4 text-brand hover:underline xl:pt-0">
                  Continue
                </Link>
              )}
              {p.status === "start" && (
                <Link href={ARTICLE_HREF} className="shrink-0 pt-1 text-[12px] font-bold leading-4 text-brand hover:underline xl:pt-0">
                  Start
                </Link>
              )}
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-raised">
              <div className="h-full rounded-full bg-brand" style={{ width: `${p.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
