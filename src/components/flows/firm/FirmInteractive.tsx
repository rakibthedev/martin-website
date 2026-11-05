"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { LOAD_STEP, PAGE_SIZE, REVIEWS, type FirmReview } from "./data";

/* ───────────────────────── Favourite toggle (hero) ───────────────────────── */

export function FavouriteButton() {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => setOn((v) => !v)}
      className={`inline-flex h-12 shrink-0 items-center justify-center gap-1.5 rounded-full px-4 type-label transition ${
        on ? "border border-brand bg-brand-tint text-brand" : "bg-raised text-ink hover:brightness-125"
      }`}
    >
      <Icon name={on ? "heart-00d26a" : "heart-f0f0f0"} size={16} />
      {on ? "Favourited" : "Favourite"}
    </button>
  );
}

/* ───────────────────────── "On this page" tabs ───────────────────────── */

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "firm-details", label: "Firm details" },
  { id: "verified-reviews", label: "Verified reviews", count: 16 },
  { id: "trust-insights", label: "Trust insights" },
];

export function ProfileTabs() {
  const [active, setActive] = useState("overview");
  const clicked = useRef(0);

  useEffect(() => {
    const els = TABS.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        if (Date.now() - clicked.current < 800) return;
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label="On this page"
      className="flex w-full flex-wrap gap-x-8 gap-y-4 border-b border-line px-4 pt-4 md:px-5 md:pt-5 xl:px-0 xl:pt-0"
    >
      {TABS.map((t) => {
        const on = active === t.id;
        return (
          <a
            key={t.id}
            href={`#${t.id}`}
            onClick={() => {
              clicked.current = Date.now();
              setActive(t.id);
            }}
            aria-current={on ? "location" : undefined}
            className={`-mb-px flex items-center gap-2 whitespace-nowrap pb-3.5 type-label transition-colors ${
              on ? "border-b-2 border-brand text-ink" : "border-b-2 border-transparent text-muted hover:text-ink"
            }`}
          >
            {t.label}
            {t.count != null && (
              <span className="rounded-full bg-raised px-3 py-1.5 type-caption font-normal text-muted">{t.count}</span>
            )}
          </a>
        );
      })}
    </nav>
  );
}

/* ───────────────────────── Reviews list ───────────────────────── */

type Filter = "all" | "positive" | "complaints" | "proof";
type Sort = "newest" | "oldest" | "highest";
const SORT_LABEL: Record<Sort, string> = { newest: "Newest first", oldest: "Oldest first", highest: "Highest rated" };

function ReviewCard({ r }: { r: FirmReview }) {
  const [vote, setVote] = useState<"yes" | "no" | null>(null);
  const btn = (v: "yes" | "no") =>
    `inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full px-4 type-label transition md:h-11 xl:h-12 ${
      vote === v ? "border border-brand bg-brand-tint text-brand" : "bg-raised text-ink hover:brightness-125"
    }`;
  return (
    <article className="flex w-full flex-col gap-4 rounded-[20px] border border-line bg-surface p-4 md:p-5 xl:p-6">
      <header className="flex w-full items-start justify-between gap-3 xl:items-center">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-raised type-label text-brand">
            {r.initials}
          </span>
          <div className="flex min-w-0 flex-col gap-0.5">
            <p className="type-label text-ink">{r.name}</p>
            <p className="type-caption text-muted">{r.ago}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/flows/stars-5-16.svg"
            alt={`${r.rating} out of 5 stars`}
            width={92}
            height={16}
            className="block h-4 w-[92px]"
            style={r.rating < 5 ? { clipPath: `inset(0 ${(5 - r.rating) * 19}px 0 0)` } : undefined}
          />
          <span className="type-label text-ink">{r.rating.toFixed(1)}</span>
        </div>
      </header>
      <div className="flex flex-wrap gap-2">
        {r.proof && (
          <span className="flex items-center gap-1 rounded-full bg-brand-tint px-3 py-1.5 type-caption text-brand">
            <Icon name="tick-circle-outline-00d26a" size={14} />
            Proof verified
          </span>
        )}
        <span className="rounded-full bg-raised px-3 py-1.5 type-caption text-ink">{r.sentiment}</span>
      </div>
      <h3 className="type-h3 text-ink">{r.title}</h3>
      <p className={`type-body ${r.bodyInk ? "text-ink" : "text-muted"}`}>{r.body}</p>
      <ul className="flex w-full flex-wrap gap-2">
        {r.tags.map((t) => (
          <li key={t} className="rounded-full border border-line px-3 py-1.5 type-caption text-muted">
            {t}
          </li>
        ))}
      </ul>
      <div className="h-px w-full bg-line" />
      <footer className="flex w-full items-center justify-between gap-2">
        <p className="min-w-0 type-body-sm text-muted">
          {vote ? "Thanks for your feedback" : "Was this review helpful?"}
        </p>
        <div className="flex shrink-0 gap-2">
          <button type="button" aria-pressed={vote === "yes"} onClick={() => setVote(vote === "yes" ? null : "yes")} className={btn("yes")}>
            <Icon name={vote === "yes" ? "like-00d26a" : "like-f0f0f0"} size={16} />
            Yes
          </button>
          <button type="button" aria-pressed={vote === "no"} onClick={() => setVote(vote === "no" ? null : "no")} className={btn("no")}>
            No
          </button>
        </div>
      </footer>
    </article>
  );
}

export function ReviewsSection() {
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sortOpen) return;
    const close = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setSortOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [sortOpen]);

  const counts = {
    all: REVIEWS.length,
    positive: REVIEWS.filter((r) => r.sentiment === "Positive").length,
    complaints: REVIEWS.filter((r) => r.sentiment === "Complaint").length,
    proof: REVIEWS.filter((r) => r.proof).length,
  };

  const list = useMemo(() => {
    const f = REVIEWS.filter((r) =>
      filter === "all" ? true : filter === "positive" ? r.sentiment === "Positive" : filter === "complaints" ? r.sentiment === "Complaint" : r.proof,
    );
    return [...f].sort((a, b) => (sort === "newest" ? a.age - b.age : sort === "oldest" ? b.age - a.age : b.rating - a.rating || a.age - b.age));
  }, [filter, sort]);

  const shown = list.slice(0, visible);
  const remaining = list.length - shown.length;

  const chip = (on: boolean) =>
    `inline-flex h-6 items-center whitespace-pre rounded-full border px-2.5 type-label transition-colors md:h-7 xl:h-auto xl:px-4 xl:py-2.5 ${
      on ? "border-brand bg-brand-tint text-brand" : "border-line bg-surface text-ink hover:border-muted"
    }`;

  return (
    <div id="verified-reviews" className="flex w-full scroll-mt-6 flex-col gap-8">
      <div className="flex w-full items-start justify-between gap-4">
        <div role="tablist" aria-label="Filter reviews" className="flex flex-col items-start gap-2 xl:flex-row">
          {(
            [
              ["all", "All reviews"],
              ["positive", "Positive"],
              ["complaints", "Complaints"],
              ["proof", "With proof"],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={filter === k}
              onClick={() => {
                setFilter(k);
                setVisible(PAGE_SIZE);
              }}
              className={chip(filter === k)}
            >
              {`${label}  ${counts[k]}`}
            </button>
          ))}
        </div>
        <div ref={sortRef} className="relative shrink-0">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={sortOpen}
            onClick={() => setSortOpen((o) => !o)}
            className="inline-flex h-6 items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-surface px-2.5 type-label text-muted hover:border-muted md:h-7 xl:h-auto xl:px-4 xl:py-2.5"
          >
            Sort: {SORT_LABEL[sort]}
            <Icon name="arrow-down-898587" size={16} rotate={sortOpen ? 180 : undefined} />
          </button>
          {sortOpen && (
            <ul
              role="listbox"
              aria-label="Sort reviews"
              className="absolute right-0 top-full z-20 mt-2 flex min-w-[200px] flex-col gap-1 rounded-2xl border border-line bg-card p-2 shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
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

      <div className="flex w-full flex-col gap-4">
        {shown.length === 0 && (
          <div className="flex w-full flex-col items-center gap-2 rounded-[20px] border border-line bg-surface p-6 text-center">
            <p className="type-label text-ink">No complaints yet</p>
            <p className="type-body-sm text-muted">Traders haven’t filed any complaints about FundingPips.</p>
          </div>
        )}
        {shown.map((r) => (
          <ReviewCard key={r.id} r={r} />
        ))}
      </div>

      {remaining > 0 && (
        <div className="flex w-full justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + LOAD_STEP)}
            className="inline-flex h-12 items-center justify-center rounded-full border border-brand bg-page px-4 type-label text-ink hover:bg-brand-tint"
          >
            Load {Math.min(LOAD_STEP, remaining)} more reviews
          </button>
        </div>
      )}
    </div>
  );
}

/* ───────────────────────── Claim this page ───────────────────────── */

export function ClaimButton() {
  const [sent, setSent] = useState(false);
  return (
    <button
      type="button"
      disabled={sent}
      onClick={() => setSent(true)}
      className="inline-flex h-12 w-full items-center justify-center gap-1.5 rounded-full bg-brand px-4 type-label text-page transition hover:brightness-110 disabled:cursor-default disabled:opacity-80"
    >
      {sent && <Icon name="tick-circle-151513" size={16} />}
      {sent ? "Claim request sent" : "Claim This Page"}
    </button>
  );
}
