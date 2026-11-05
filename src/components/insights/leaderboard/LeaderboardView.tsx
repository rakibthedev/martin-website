"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import {
  ASSET_CLASSES,
  LEADERBOARD,
  LEADERBOARD_PAGE,
  MAX_FAVOURITES,
  PLATFORM_ICONS,
  type AssetClass,
  type LeaderboardFirm,
} from "../data";
import { inter, manrope } from "../fonts";
import { Flag, Img, RESP_BTN } from "../ui";

type Tab = "popular" | "favorite" | "new" | "all";

/** Figma colour/rank/first|second|third */
const RANK_BG = ["bg-[#372d0f]", "bg-[#353032]", "bg-[#271811]"];

/**
 * Desktop columns. From 1734px (content at its 1638px max) the Figma widths 250 / 148 / 148 / flex / 250 / 180 /
 * promo apply exactly; between 1280 and 1734 a compact template keeps every column readable.
 */
const GRID =
  "grid-cols-[minmax(200px,1.5fr)_minmax(140px,1fr)_88px_minmax(150px,1.4fr)_80px_minmax(100px,0.8fr)_236px] min-[1734px]:grid-cols-[250px_148px_148px_minmax(0,1fr)_250px_180px_236px]";

const HEADINGS = ["POPULARITY / FIRM", "RANK / REVIEWS", "FAVORITES", "ASSETS", "ASSETS", "MAX ALLOCATION", "PROMO"];

export function LeaderboardView() {
  const [tab, setTab] = useState<Tab>("popular");
  const [favs, setFavs] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [assets, setAssets] = useState<AssetClass[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const favCount = (f: LeaderboardFirm) => f.favourites + (favs.includes(f.id) ? 1 : 0);

  const list = useMemo(() => {
    let rows = LEADERBOARD.filter((f) => assets.length === 0 || assets.some((a) => f.assets.includes(a)));
    if (tab === "favorite") rows = rows.filter((f) => favs.includes(f.id));
    const pop = (f: LeaderboardFirm) => f.favourites + (favs.includes(f.id) ? 1 : 0);
    const sorted = [...rows];
    if (tab === "popular" || tab === "favorite") sorted.sort((a, b) => pop(b) - pop(a));
    if (tab === "new") sorted.sort((a, b) => a.years - b.years || pop(b) - pop(a));
    if (tab === "all") sorted.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    return sorted;
  }, [tab, favs, assets]);

  const visible = expanded ? list : list.slice(0, LEADERBOARD_PAGE);

  const toggleFav = (id: string) =>
    setFavs((s) => (s.includes(id) ? s.filter((x) => x !== id) : s.length >= MAX_FAVOURITES ? s : [...s, id]));
  const toggleAsset = (a: AssetClass) => setAssets((s) => (s.includes(a) ? s.filter((x) => x !== a) : [...s, a]));
  const copy = (f: LeaderboardFirm) => {
    navigator.clipboard?.writeText(f.code).catch(() => {});
    setCopied(f.id);
    window.setTimeout(() => setCopied((c) => (c === f.id ? null : c)), 1500);
  };

  const rowProps = { favCount, isFav: (id: string) => favs.includes(id), toggleFav, copy, copied };

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Filter and sorting options */}
      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full flex-col items-start gap-2 md:flex-row md:flex-wrap md:items-center md:gap-3 xl:gap-2">
          <Pill active={filterOpen} onClick={() => setFilterOpen((o) => !o)} aria-expanded={filterOpen}>
            <Icon name="filter-f0f0f0" size={16} />
            Filter
            {assets.length > 0 && <span className="type-caption text-brand">({assets.length})</span>}
          </Pill>
          <Pill active={tab === "popular"} onClick={() => setTab("popular")}>
            <span className="flex size-4 items-center justify-center">
              <Img src="/images/insights/fire.svg" w={11.2} h={13.6} />
            </span>
            Popular
          </Pill>
          <Pill active={tab === "favorite"} onClick={() => setTab("favorite")}>
            Favorite {favs.length}/{MAX_FAVOURITES}
          </Pill>
          <Pill active={tab === "new"} onClick={() => setTab("new")}>
            New
          </Pill>
          <Pill active={tab === "all"} onClick={() => setTab("all")}>
            All
          </Pill>
          <div className="hidden h-px min-w-px flex-1 xl:block" />
          <Button href="/articles/how-to-read-a-prop-firm-review" size="sm" variant="outline" className={RESP_BTN}>
            How We Verify and Rank Firms
          </Button>
          <span className="rounded-full bg-brand-tint px-2 py-0.5 type-caption text-brand md:py-1">
            Live Data · updated 3 min ago
          </span>
        </div>
        {filterOpen && (
          <div className="flex w-full flex-wrap items-center gap-2 rounded-2xl border border-line bg-surface p-4">
            <span className="mr-1 type-body-sm text-muted">Assets</span>
            {ASSET_CLASSES.map((a) => {
              const on = assets.includes(a);
              return (
                <button
                  key={a}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleAsset(a)}
                  className={`rounded-full border px-3 py-1.5 type-caption transition ${
                    on ? "border-brand bg-brand-tint text-brand" : "border-transparent bg-card text-ink hover:border-line"
                  }`}
                >
                  {a}
                </button>
              );
            })}
            {assets.length > 0 && (
              <button type="button" onClick={() => setAssets([])} className="ml-1 type-caption text-muted underline hover:text-ink">
                Clear
              </button>
            )}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="flex w-full flex-col gap-2">
        <div className={`hidden h-10 items-center gap-4 px-[25px] xl:grid ${GRID}`}>
          {HEADINGS.map((h, i) => (
            <p key={i} className={`whitespace-nowrap type-table-heading text-muted ${i === 0 ? "text-left" : "text-center"}`}>
              {h}
            </p>
          ))}
        </div>
        {visible.length === 0 && (
          <p className="rounded-2xl border border-dashed border-line p-6 type-body-sm text-muted">
            {tab === "favorite"
              ? `No favourites yet — tap ♡ on any firm to add it (up to ${MAX_FAVOURITES}).`
              : "No firms match these filters."}
          </p>
        )}
        {visible.map((f, i) => (
          <FirmRow key={f.id} firm={f} rank={i + 1} {...rowProps} />
        ))}
      </div>

      {!expanded && list.length > LEADERBOARD_PAGE && (
        <div className="flex w-full pt-6 xl:justify-center">
          <Button size="sm" variant="outline" className={RESP_BTN} onClick={() => setExpanded(true)}>
            View All
          </Button>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ pieces */

function Pill({ active, children, ...rest }: { active: boolean; children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`inline-flex h-10 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border px-4 type-label text-ink transition md:h-11 xl:h-12 ${
        active ? "border-brand bg-page" : "border-transparent bg-raised hover:brightness-125"
      }`}
      {...rest}
    >
      {children}
    </button>
  );
}

type RowProps = {
  firm: LeaderboardFirm;
  rank: number;
  favCount: (f: LeaderboardFirm) => number;
  isFav: (id: string) => boolean;
  toggleFav: (id: string) => void;
  copy: (f: LeaderboardFirm) => void;
  copied: string | null;
};

function RowFlag({ firm, h }: { firm: LeaderboardFirm; h: number }) {
  return (
    <span className="flex shrink-0 items-center justify-center" style={{ height: h }}>
      <Flag flag={firm.flag} code={firm.countryCode} h={h} />
    </span>
  );
}

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span className="flex" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Img key={i} src={i < full ? "/images/insights/star-filled.svg" : "/images/insights/star-empty.svg"} w={14} h={14} />
      ))}
    </span>
  );
}

function FavButton({ firm, favCount, isFav, toggleFav }: Pick<RowProps, "firm" | "favCount" | "isFav" | "toggleFav">) {
  const on = isFav(firm.id);
  return (
    <button
      type="button"
      onClick={() => toggleFav(firm.id)}
      aria-pressed={on}
      aria-label={on ? `Remove ${firm.name} from favourites` : `Add ${firm.name} to favourites`}
      className="flex items-center gap-1 type-caption text-brand hover:opacity-80"
    >
      {on ? <Icon name="heart-bold-00d26a" size={14} /> : <Img src="/images/insights/heart-outline.svg" w={14} h={14} />}
      {favCount(firm)}
    </button>
  );
}

function Logo({ firm, size, pad, radius }: { firm: LeaderboardFirm; size: number; pad: number; radius: number }) {
  return (
    <span className="flex shrink-0 bg-raised" style={{ padding: pad, borderRadius: radius }}>
      {firm.logo ? (
        <Img src={firm.logo.src} w={size} h={size} alt={firm.name} className="object-contain" />
      ) : (
        <span
          className="flex items-center justify-center rounded-[6px] bg-page font-extrabold text-ink"
          style={{ width: size, height: size, fontSize: size * 0.36 }}
        >
          {firm.initials}
        </span>
      )}
    </span>
  );
}

function Platforms({ firm }: { firm: LeaderboardFirm }) {
  return (
    <>
      {firm.platforms.map((p) => (
        <Img key={p} src={PLATFORM_ICONS[p].src} w={20} h={21.304} alt={PLATFORM_ICONS[p].label} />
      ))}
    </>
  );
}

function Alloc({ firm, align }: { firm: LeaderboardFirm; align: "center" | "left" }) {
  return (
    <div className="flex w-full flex-col gap-2">
      <p className={`type-label text-ink ${align === "center" ? "text-center" : ""}`}>{firm.maxAlloc}</p>
      <div className="h-1 w-full rounded-full bg-raised">
        <div className="h-1 rounded-full bg-brand" style={{ width: `${firm.allocFill * 100}%` }} />
      </div>
    </div>
  );
}

function Promo({ firm, copy, copied }: Pick<RowProps, "firm" | "copy" | "copied">) {
  return (
    <div className="flex shrink-0 flex-col gap-0.5 rounded-lg bg-raised px-4 py-1">
      <p className="text-center type-body text-brand">{firm.promo}</p>
      <button
        type="button"
        onClick={() => copy(firm)}
        aria-label={`Copy code ${firm.code}`}
        className="flex items-center gap-1 type-body-sm text-ink hover:text-brand"
      >
        {copied === firm.id ? "Copied!" : firm.code}
        <Img src="/images/insights/copy.svg" w={16} h={16} />
      </button>
    </div>
  );
}

function FirmRow(props: RowProps) {
  const { firm, rank } = props;
  const bg = RANK_BG[rank - 1] ?? "bg-card";
  const rankNo = <p className={`${inter.className} shrink-0 text-center text-[12px] font-semibold leading-none text-ink`}>{String(rank).padStart(2, "0")}</p>;
  const extra = firm.assets.length - 4;

  return (
    <article className={`w-full rounded-2xl border border-line ${bg}`}>
      {/* ---------------- Desktop (xl) */}
      <div className={`hidden min-h-[124px] items-center gap-4 p-6 xl:grid ${GRID}`}>
        <div className="flex min-w-0 items-center gap-3">
          {rankNo}
          <Logo firm={firm} size={48} pad={4} radius={8} />
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <p className={`${manrope.className} truncate text-[20px] font-medium leading-normal text-ink`}>{firm.name}</p>
            <div className="flex items-center gap-1.5">
              <RowFlag firm={firm} h={18} />
              <p className="whitespace-nowrap type-caption text-muted">
                <span className="text-ink">{firm.countryLabel} </span>({firm.years} years)
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <Stars rating={firm.rating} />
          <p className="text-center type-body text-brand">
            {firm.rating.toFixed(1)} ({firm.reviews} reviews)
          </p>
        </div>
        <div className="flex justify-center">
          <FavButton {...props} />
        </div>
        <div className="flex min-w-0 flex-wrap content-center items-center justify-center gap-x-2 gap-y-1">
          {firm.assets.map((a) => (
            <span key={a} className="whitespace-nowrap rounded-full bg-card px-2.5 py-1 type-caption text-ink min-[1734px]:px-3 min-[1734px]:py-2">
              {a}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Platforms firm={firm} />
        </div>
        <Alloc firm={firm} align="center" />
        <div className="flex items-center justify-end gap-4">
          <Promo {...props} />
          <Button href={firm.href} variant="outline" size="lg">
            View Firm
          </Button>
        </div>
      </div>

      {/* ---------------- Tablet (md) */}
      <div className="hidden flex-col gap-3 p-5 md:flex xl:hidden">
        <div className="flex w-full items-center gap-3">
          {rankNo}
          <Logo firm={firm} size={48} pad={4} radius={8} />
          <div className="flex min-w-0 shrink-0 flex-col gap-1.5">
            <p className={`${manrope.className} text-[20px] font-medium leading-normal text-ink`}>{firm.name}</p>
            <div className="flex items-start gap-3">
              <div className="flex items-center gap-1.5">
                <RowFlag firm={firm} h={18} />
                <p className="whitespace-nowrap type-caption text-ink">
                  {firm.countryLabel} ({firm.years} years)
                </p>
              </div>
              <FavButton {...props} />
            </div>
          </div>
          <div className="flex min-w-0 flex-1 flex-wrap items-center justify-center gap-2">
            <Platforms firm={firm} />
          </div>
          <div className="flex min-w-0 flex-1 flex-col items-end justify-center gap-1">
            <Stars rating={firm.rating} />
            <p className="text-right type-body text-brand">
              {firm.rating.toFixed(1)} ({firm.reviews} reviews)
            </p>
          </div>
        </div>
        <div className="flex w-full flex-wrap gap-x-2 gap-y-1">
          {firm.assets.map((a) => (
            <span key={a} className="flex h-7 items-center rounded-full bg-card px-2.5 type-caption text-ink">
              {a}
            </span>
          ))}
        </div>
        <div className="flex w-full items-center gap-4">
          <div className="min-w-0 flex-1">
            <Alloc firm={firm} align="left" />
          </div>
          <div className="flex min-w-0 flex-1 items-center justify-end gap-4">
            <Promo {...props} />
            <Button href={firm.href} variant="outline" size="lg">
              View Firm
            </Button>
          </div>
        </div>
      </div>

      {/* ---------------- Mobile */}
      <div className="flex flex-col gap-3 p-4 md:hidden">
        <div className="flex w-full items-start gap-2">
          {rankNo}
          <Logo firm={firm} size={34.286} pad={2.857} radius={5.714} />
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <p className={`${manrope.className} text-[16px] font-medium leading-normal text-ink`}>{firm.name}</p>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <div className="flex items-center gap-1">
                <RowFlag firm={firm} h={15} />
                <p className="whitespace-nowrap text-[12px] leading-4 text-ink">
                  {firm.countryLabel} ({firm.years}y)
                </p>
              </div>
              <FavButton {...props} />
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-end justify-center gap-1">
            <Stars rating={firm.rating} />
            <p className="whitespace-nowrap text-right type-body text-brand">
              {firm.rating.toFixed(1)} ({firm.reviews})
            </p>
          </div>
        </div>
        <div className="h-px w-full bg-line" />
        <div className="flex w-full items-start gap-5">
          <div className="flex min-w-0 flex-1 flex-wrap gap-2">
            {firm.assets.slice(0, 4).map((a) => (
              <span key={a} className="flex h-6 items-center whitespace-nowrap rounded-full bg-card px-2.5 type-caption text-ink">
                {a}
              </span>
            ))}
            {extra > 0 && (
              <span className="flex h-6 items-center rounded-full bg-card px-2.5 type-caption text-ink">+{extra}</span>
            )}
          </div>
          <div className="flex shrink-0 gap-2">
            <Platforms firm={firm} />
          </div>
        </div>
        <div className="h-px w-full bg-line" />
        <div className="flex w-full items-center gap-4">
          <div className="min-w-0 flex-1">
            <Alloc firm={firm} align="left" />
          </div>
          <Promo {...props} />
          <Link
            href={firm.href}
            aria-label={`View ${firm.name}`}
            className="flex h-12 shrink-0 items-center justify-center rounded-full border border-brand bg-page px-4 hover:bg-brand-tint"
          >
            <Icon name="arrow-right-f0f0f0" size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
