"use client";
/* eslint-disable @next/next/no-img-element -- static Figma logo assets sized per breakpoint via classes */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import {
  FAVOURITES_DEFAULT,
  FAVOURITE_SUGGESTIONS,
  SHORTLIST_MAX,
  SORTS,
  firmById,
  fmtAlloc,
  type Firm,
  type SortId,
} from "../data";
import { manrope } from "../fonts";
import { FirmMark, Flag, IconBadge, Img, RESP_BTN } from "../ui";

const HERO_BG = "linear-gradient(90deg, rgba(0, 209, 106, 0.15) 0%, rgba(0, 209, 106, 0) 60%), #212121";
const XB = "font-extrabold leading-[1.06]";

function sortFirms(firms: Firm[], sort: SortId) {
  const out = [...firms];
  if (sort === "trust") out.sort((a, b) => b.trust - a.trust);
  if (sort === "discount") out.sort((a, b) => b.offer.discount - a.offer.discount);
  if (sort === "alloc") out.sort((a, b) => b.maxAlloc - a.maxAlloc);
  if (sort === "split") out.sort((a, b) => b.split - a.split);
  return out;
}

function topBy(firms: Firm[], get: (f: Firm) => number): Firm | undefined {
  return firms.reduce<Firm | undefined>((best, f) => (!best || get(f) > get(best) ? f : best), undefined);
}

/** Only flag a value as "Best" when there is something to beat. */
function isBest(firms: Firm[], f: Firm, get: (f: Firm) => number) {
  if (firms.length < 2) return false;
  const vals = firms.map(get);
  const max = Math.max(...vals);
  return get(f) === max && !vals.every((v) => v === max);
}

export function FavouritesView() {
  const [saved, setSaved] = useState<string[]>(FAVOURITES_DEFAULT);
  const [compare, setCompare] = useState<string[]>(FAVOURITES_DEFAULT);
  const [sort, setSort] = useState<SortId>("trust");
  const [sortOpen, setSortOpen] = useState(false);
  const [view, setView] = useState<"cards" | "table">("cards");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<string | null>(null);
  const addRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sortOpen) return;
    const close = (e: MouseEvent) => {
      if (!sortRef.current?.contains(e.target as Node)) setSortOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [sortOpen]);

  const firms = saved.map(firmById);
  const sorted = sort === "saved" ? firms : sortFirms(firms, sort);
  const left = SHORTLIST_MAX - saved.length;
  const suggestions = FAVOURITE_SUGGESTIONS.filter((id) => !saved.includes(id)).slice(0, 3).map(firmById);
  const compareFirms = compare.map(firmById);

  const save = (id: string) => {
    setSaved((s) => (s.includes(id) || s.length >= SHORTLIST_MAX ? s : [...s, id]));
    setCompare((c) => (c.includes(id) || c.length >= 3 ? c : [...c, id]));
  };
  const unsave = (id: string) => {
    setSaved((s) => s.filter((x) => x !== id));
    setCompare((c) => c.filter((x) => x !== id));
  };
  const toggleCompare = (id: string) =>
    setCompare((c) => (c.includes(id) ? c.filter((x) => x !== id) : c.length >= 3 ? c : [...c, id]));
  const copy = (f: Firm) => {
    navigator.clipboard?.writeText(f.offer.code).catch(() => {});
    setCopied(f.id);
    window.setTimeout(() => setCopied((c) => (c === f.id ? null : c)), 1500);
  };
  const toAdd = () => addRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

  const insights = [
    { label: "Highest trust score", icon: "/icons/star-00d26a.svg", get: (f: Firm) => f.trust, fmt: (f: Firm) => `${f.trust} / 5` },
    { label: "Biggest discount", glyph: "%", get: (f: Firm) => f.offer.discount, fmt: (f: Firm) => (f.offer.discount ? `${f.offer.discount}% OFF` : f.offer.title) },
    { label: "Best profit split", arrow: true, get: (f: Firm) => f.split, fmt: (f: Firm) => `Up to ${f.split}%` },
    { label: "Largest allocation", glyph: "$", get: (f: Firm) => f.maxAlloc, fmt: (f: Firm) => fmtAlloc(f.maxAlloc) },
  ];

  const sortLabel = SORTS.find((s) => s.id === sort)!.label;
  const cardProps = { all: firms, compare, notes, copied, setNotes, copy, toggleCompare, unsave };

  return (
    <>
      {/* ------------------------------------------------------------ Hero */}
      <section
        className="flex w-full flex-col gap-6 overflow-hidden rounded-3xl border border-line p-4 md:flex-row md:items-start md:gap-8 md:p-5 xl:items-center xl:justify-between xl:p-6"
        style={{ backgroundImage: HERO_BG }}
      >
        <div className="flex min-w-0 flex-1 flex-col items-start gap-5">
          <p className="flex items-center gap-1 text-[10px] font-semibold leading-[14px] tracking-[1.5px] text-brand">
            <Icon name="heart-bold-00d26a" size={14} />
            FAVOURITE FIRMS
          </p>
          <h1 className="text-[36px] font-semibold leading-[46px] text-ink xl:text-[64px] xl:leading-[72px] xl:tracking-[-3px]">
            Your shortlist.
            <br />
            <span className="text-brand">All in one place.</span>
          </h1>
          <p className="text-[20px] leading-6 text-muted">
            Keep the firms you want to revisit together, then compare the details side by side.
          </p>
          <div className="flex flex-col items-start gap-3 xl:flex-row">
            <Button href="/compare" size="sm" className={RESP_BTN} trailing="arrow-right-151513">
              Compare {compare.length} favourite{compare.length === 1 ? "" : "s"}
            </Button>
            <Button href="/firms" size="sm" variant="outline" className={RESP_BTN}>
              ＋{"  "}Browse more firms
            </Button>
          </div>
        </div>

        <div className="flex w-full flex-col gap-4 rounded-[28px] border border-line bg-page p-4 md:w-[344px] md:shrink-0 md:p-5 xl:w-[560px] xl:gap-[18px] xl:p-6">
          <div className="flex w-full items-start justify-between gap-2 xl:items-center">
            <div className="flex flex-col gap-0.5">
              <p className="type-caption text-muted">Shortlist space</p>
              <p className={`text-[30px] tracking-[-1px] text-ink ${XB}`}>
                <span className="text-brand">{saved.length}</span> of {SHORTLIST_MAX} saved
              </p>
            </div>
            <span className="shrink-0 rounded-full border border-brand bg-brand-tint px-3 py-0.5 type-caption text-brand md:py-[3px] xl:py-1.5">
              {left} slot{left === 1 ? "" : "s"} left
            </span>
          </div>
          <div className="flex w-full gap-[10px]">
            {Array.from({ length: SHORTLIST_MAX }, (_, i) => {
              const f = firms[i];
              return f ? (
                <span
                  key={f.id}
                  title={f.name}
                  className="flex h-[38px] min-w-0 flex-1 items-center justify-center overflow-hidden rounded-2xl border border-brand bg-surface xl:h-[76px]"
                >
                  {f.logo ? (
                    <img src={f.logo.src} alt={f.name} className="block h-auto w-6 xl:w-9" />
                  ) : (
                    <span className="type-label text-brand">{f.initials}</span>
                  )}
                </span>
              ) : (
                <button
                  key={`empty-${i}`}
                  type="button"
                  onClick={toAdd}
                  aria-label="Add a firm to your shortlist"
                  className="flex h-[38px] min-w-0 flex-1 items-center justify-center rounded-2xl border border-dashed border-line hover:border-brand xl:h-[76px]"
                >
                  <Icon name="add-898587" size={24} />
                </button>
              );
            })}
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-raised">
            <div className="h-2 rounded-full bg-brand transition-[width]" style={{ width: `${(saved.length / SHORTLIST_MAX) * 100}%` }} />
          </div>
          <p className="type-caption text-muted">Sample saved state · tap ♡ on any firm to save it here.</p>
        </div>
      </section>

      {/* ------------------------------------------------------------ At a glance */}
      <section className="flex w-full flex-col gap-4">
        <div className="flex w-full items-start gap-[10px] xl:items-center">
          <h2 className={`flex-1 text-[28px] tracking-[-0.8px] text-ink xl:flex-none ${XB}`}>At a glance</h2>
          <p className="flex-1 type-body-sm text-muted xl:flex-none">What stands out in your shortlist</p>
        </div>
        <ul className="grid w-full grid-cols-1 gap-4 xl:grid-cols-4">
          {insights.map((it) => {
            const top = topBy(firms, it.get);
            return (
              <li key={it.label} className="flex min-w-0 items-center gap-[14px] rounded-[20px] border border-line bg-surface p-4 md:p-5 xl:p-6">
                {it.arrow ? (
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-tint">
                    <Icon name="arrow-up-00d26a" size={16} rotate={45} />
                  </span>
                ) : (
                  <IconBadge size={44} icon={it.icon} glyph={it.glyph} />
                )}
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <p className="type-caption text-muted">{it.label}</p>
                  <p className="truncate type-label text-ink">{top ? top.name : "—"}</p>
                  <p className={`text-[20px] tracking-[-0.3px] text-brand ${XB}`}>{top ? it.fmt(top) : "Save a firm"}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ------------------------------------------------------------ Toolbar */}
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <h2 className={`text-[28px] tracking-[-0.8px] text-ink ${XB}`}>Saved firms</h2>
          <span className="rounded-full bg-raised px-3 py-0.5 type-caption text-ink md:py-1 xl:py-1.5">{saved.length}</span>
        </div>
        <div className="flex shrink-0 items-center gap-[10px]">
          <div ref={sortRef} className="relative">
            <button
              type="button"
              onClick={() => setSortOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={sortOpen}
              className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-[10px] type-label text-ink hover:border-muted md:py-[1px] xl:px-4 xl:py-[9px]"
            >
              <span className="md:hidden">Sort:</span>
              <span className="hidden md:inline">Sort: {sortLabel}</span>
              <Icon name="arrow-down-f0f0f0" size={16} className={sortOpen ? "rotate-180" : ""} />
            </button>
            {sortOpen && (
              <ul role="listbox" className="absolute right-0 top-full z-20 mt-2 w-[240px] rounded-2xl border border-line bg-surface p-2 shadow-xl">
                {SORTS.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={s.id === sort}
                      onClick={() => {
                        setSort(s.id);
                        setSortOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left type-body-sm hover:bg-raised ${
                        s.id === sort ? "text-brand" : "text-ink"
                      }`}
                    >
                      {s.label}
                      {s.id === sort && <Img src="/images/insights/tick-circle-00d26a.svg" w={16} h={16} />}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <ViewToggle view={view} setView={setView} className="hidden md:flex" />
        </div>
      </div>
      <ViewToggle view={view} setView={setView} className="flex md:hidden" />

      {/* ------------------------------------------------------------ Saved grid / table */}
      {view === "table" && (
        <div className="hidden w-full overflow-hidden rounded-[20px] border border-line bg-surface xl:block">
          <div className="grid grid-cols-[minmax(220px,1.6fr)_1fr_1fr_1fr_1fr_1.2fr_auto] items-center gap-4 border-b border-line bg-raised px-6 py-[18px] type-table-heading text-muted">
            <span>FIRM</span>
            <span>TRUST SCORE</span>
            <span>PLATFORM</span>
            <span>MAX ALLOCATION</span>
            <span>PROFIT SPLIT</span>
            <span>OFFER</span>
            <span className="w-[260px]" />
          </div>
          {sorted.map((f) => (
            <div
              key={f.id}
              className="grid grid-cols-[minmax(220px,1.6fr)_1fr_1fr_1fr_1fr_1.2fr_auto] items-center gap-4 border-b border-line px-6 py-4 last:border-b-0"
            >
              <div className="flex min-w-0 items-center gap-3">
                <FirmMark firm={f} size={40} logoW={24} />
                <div className="min-w-0">
                  <p className="truncate type-label text-ink">{f.name}</p>
                  <p className="flex items-center gap-1.5 type-caption text-muted">
                    <Flag flag={f.flag} code={f.countryCode} h={11} /> {f.countryName} · {f.years} years
                  </p>
                </div>
              </div>
              <p className="type-label text-ink">
                {f.trust} <span className="type-caption text-muted">· {f.reviews} reviews</span>
              </p>
              <p className="type-label text-ink">{f.platforms}</p>
              <p className={`type-label ${isBest(firms, f, (x) => x.maxAlloc) ? "text-brand" : "text-ink"}`}>{fmtAlloc(f.maxAlloc)}</p>
              <p className={`type-label ${isBest(firms, f, (x) => x.split) ? "text-brand" : "text-ink"}`}>Up to {f.split}%</p>
              <p className="type-label text-brand">
                {f.offer.title} <span className="type-caption tracking-[1px] text-ink">· {f.offer.code}</span>
              </p>
              <div className="flex w-[260px] items-center justify-end gap-2">
                <CompareToggle on={compare.includes(f.id)} onClick={() => toggleCompare(f.id)} />
                <Button href={f.href} size="sm" className="h-11" trailing="arrow-right-151513">
                  View firm
                </Button>
              </div>
            </div>
          ))}
          {sorted.length === 0 && <p className="px-6 py-6 type-body-sm text-muted">Your shortlist is empty.</p>}
        </div>
      )}
      <div className={`grid w-full grid-cols-1 gap-6 xl:grid-cols-3 min-[1800px]:grid-cols-4 ${view === "table" ? "xl:hidden" : ""}`}>
        {sorted.map((f, i) => (
          <SavedCard key={f.id} firm={f} index={i + 1} {...cardProps} />
        ))}
        {left > 0 && (
          <div ref={addRef} className="flex min-w-0 flex-col items-start gap-4 rounded-[28px] border border-dashed border-line p-4 md:p-5 xl:p-6">
            <span className="flex size-14 items-center justify-center rounded-full bg-brand">
              <Icon name="add-151513" size={24} />
            </span>
            <p className={`text-[24px] tracking-[-0.5px] text-ink ${XB}`}>
              {left} slot{left === 1 ? "" : "s"} left
            </p>
            <p className="type-body-sm text-muted">Save up to 5 firms. Here are popular ones you haven’t saved yet:</p>
            {suggestions.map((f) => (
              <div key={f.id} className="flex w-full items-center gap-3 rounded-2xl bg-surface p-4 md:p-5 xl:p-6">
                <FirmMark firm={f} size={36} logoW={21.6} textClass="type-label" />
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <p className="type-label text-ink">{f.name}</p>
                  <p className="flex items-center gap-1 type-caption text-brand">
                    <Icon name="star-00d26a" size={14} />
                    {f.trust.toFixed(1)} · {f.reviews} reviews
                  </p>
                </div>
                <Button size="sm" variant="outline" className={RESP_BTN} leading="heart-f0f0f0" onClick={() => save(f.id)}>
                  Save
                </Button>
              </div>
            ))}
            <Link href="/firms" className="flex items-center gap-1.5 type-label text-brand hover:underline">
              Browse all firms
              <Icon name="arrow-right-00d26a" size={16} />
            </Link>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------ Compare bar */}
      {compareFirms.length > 0 && (
        <div className="flex w-full flex-col gap-6 rounded-[20px] border border-brand bg-raised p-4 md:flex-row md:items-start md:p-5 xl:w-fit xl:items-center xl:p-6">
          <div className="flex min-w-0 flex-col gap-4 md:flex-1 md:flex-row md:items-start xl:flex-none xl:items-center">
            <div className="flex shrink-0">
              {compareFirms.map((f, i) => (
                <span key={f.id} className={i < compareFirms.length - 1 ? "-mr-[10px]" : ""}>
                  <FirmMark firm={f} size={40} logoW={24} />
                </span>
              ))}
            </div>
            <div className="flex min-w-0 flex-col gap-0.5">
              <p className={`${manrope.className} text-[20px] font-semibold leading-normal text-ink`}>
                {compareFirms.length} firm{compareFirms.length === 1 ? "" : "s"} selected for comparison
              </p>
              <p className="type-caption text-muted">See trust scores, rules and offers side by side</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button size="sm" variant="subtle" className={RESP_BTN} onClick={() => setCompare([])}>
              Clear
            </Button>
            <Button href="/compare" size="sm" className={RESP_BTN} trailing="arrow-right-151513">
              Compare now
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ pieces */

function ViewToggle({ view, setView, className }: { view: "cards" | "table"; setView: (v: "cards" | "table") => void; className: string }) {
  const opt = (id: "cards" | "table", label: string, icon: string) => (
    <button
      type="button"
      aria-pressed={view === id}
      onClick={() => setView(id)}
      className={`flex h-10 items-center gap-1.5 rounded-full px-[14px] type-label ${view === id ? "bg-raised text-ink" : "text-muted hover:text-ink"}`}
    >
      <Img src={icon} w={16} h={16} />
      {label}
    </button>
  );
  return (
    <div className={`w-full items-start gap-1 rounded-full border border-line bg-surface p-1 md:w-auto ${className}`}>
      {opt("cards", "Cards", view === "cards" ? "/icons/element-3-f0f0f0.svg" : "/icons/element-3-898587.svg")}
      {opt("table", "Table", view === "table" ? "/images/insights/menu-f0f0f0.svg" : "/icons/menu-898587.svg")}
    </div>
  );
}

function CompareToggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      title={on ? "Remove from comparison" : "Add to comparison"}
      className={`flex h-10 shrink-0 items-center rounded-full border px-[14px] type-label transition md:h-11 xl:h-12 ${
        on ? "border-brand bg-page text-ink" : "border-transparent bg-card text-muted hover:text-ink"
      }`}
    >
      Compare
    </button>
  );
}

type CardProps = {
  firm: Firm;
  index: number;
  all: Firm[];
  compare: string[];
  notes: Record<string, string>;
  copied: string | null;
  setNotes: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  copy: (f: Firm) => void;
  toggleCompare: (id: string) => void;
  unsave: (id: string) => void;
};

function SavedCard({ firm: f, index, all, compare, notes, copied, setNotes, copy, toggleCompare, unsave }: CardProps) {
  const details = [
    { label: "Platform", value: f.platforms, best: false },
    { label: "Max allocation", value: fmtAlloc(f.maxAlloc), best: isBest(all, f, (x) => x.maxAlloc) },
    { label: "Profit split", value: `Up to ${f.split}%`, best: isBest(all, f, (x) => x.split) },
  ];
  return (
    <article className="flex min-w-0 flex-col gap-3 rounded-[28px] border border-brand bg-surface p-4 md:p-5 xl:gap-[18px] xl:p-6">
      <div className="flex w-full items-center gap-[14px]">
        <p className={`shrink-0 text-[18px] text-muted ${XB}`}>{String(index).padStart(2, "0")}</p>
        <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-line bg-page md:size-14">
          {f.logo ? (
            <img src={f.logo.src} alt={f.name} className="block h-auto w-6 md:w-[33.6px]" />
          ) : (
            <span className="type-label text-brand">{f.initials}</span>
          )}
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className={`truncate text-[22px] tracking-[-0.5px] text-ink ${XB}`}>{f.name}</p>
          <p className="flex items-center gap-1 whitespace-nowrap type-caption text-muted">
            <Flag flag={f.flag} code={f.countryCode} h={10.5} />
            <span className="truncate">
              {f.countryName} · {f.years} years in business
            </span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => unsave(f.id)}
          aria-label={`Remove ${f.name} from shortlist`}
          className="flex size-10 shrink-0 items-center justify-center rounded-full border border-brand bg-brand-tint hover:brightness-125"
        >
          <Icon name="heart-bold-00d26a" size={16} />
        </button>
      </div>

      <div className="flex w-full items-start justify-between gap-2 rounded-[14px] bg-card p-4 md:items-center md:gap-[10px] md:px-[14px] md:py-3 xl:items-start xl:p-4 min-[1800px]:items-center min-[1800px]:p-6">
        <div className="flex min-w-0 flex-col gap-[10px] md:flex-1 md:flex-row md:items-center xl:flex-col xl:items-start min-[1800px]:flex-row min-[1800px]:items-center">
          <p className={`text-[24px] tracking-[-0.5px] text-ink ${XB}`}>{f.trust.toFixed(1)}</p>
          <Img src="/images/insights/stars-4.svg" w={92} h={16} alt={`${f.trust} out of 5 stars`} />
          <p className="min-w-0 type-caption text-muted md:flex-1">{f.reviews} verified reviews</p>
        </div>
        <span className="shrink-0 rounded-full bg-raised px-[10px] py-0.5 type-caption text-ink md:py-1 xl:px-3 xl:py-1.5">{f.market}</span>
      </div>

      <div className="flex w-full flex-col rounded-[14px] bg-card">
        {details.map((d, i) => (
          <div
            key={d.label}
            className={`flex w-full items-start justify-between gap-2 px-[14px] py-3 ${i < details.length - 1 ? "border-b border-line" : ""}`}
          >
            <p className="type-body-sm text-muted">{d.label}</p>
            {d.best ? (
              <p className="flex items-center gap-1.5 whitespace-nowrap type-label text-brand">
                {d.value}
                <Icon name="star-00d26a" size={16} />
                Best
              </p>
            ) : (
              <p className="text-right type-label text-ink">{d.value}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex w-full items-center gap-3 rounded-2xl border border-dashed border-brand bg-brand-tint p-4 md:p-5 xl:p-6">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <p className="type-label text-brand">{f.offer.title}</p>
          <p className="type-body-sm tracking-[1px] text-ink">Code: {f.offer.code}</p>
        </div>
        <Button size="sm" variant="outline" className={RESP_BTN} leading="copy-f0f0f0" onClick={() => copy(f)}>
          {copied === f.id ? "Copied" : "Copy"}
        </Button>
      </div>

      <label className="flex w-full cursor-text items-center gap-[10px] rounded-[14px] border border-dashed border-line px-[14px] py-3 focus-within:border-muted">
        <Icon name="edit-2-898587" size={16} />
        <textarea
          rows={1}
          value={notes[f.id] ?? ""}
          onChange={(e) => setNotes((n) => ({ ...n, [f.id]: e.target.value }))}
          placeholder="Add a private note, e.g. “check payout rules”"
          aria-label={`Private note for ${f.name}`}
          className="field-sizing-content min-w-0 flex-1 resize-none bg-transparent type-caption text-ink outline-none placeholder:text-muted"
        />
      </label>

      <div className="flex w-full items-center gap-2">
        <Button href={f.href} size="sm" className={`${RESP_BTN} md:flex-1`} trailing="arrow-right-151513">
          View firm
        </Button>
        <CompareToggle on={compare.includes(f.id)} onClick={() => toggleCompare(f.id)} />
      </div>

      <button
        type="button"
        onClick={() => unsave(f.id)}
        className="flex items-center gap-1 self-start type-caption text-muted hover:text-ink"
      >
        <Icon name="heart-898587" size={14} />
        Remove from shortlist
      </button>
    </article>
  );
}
