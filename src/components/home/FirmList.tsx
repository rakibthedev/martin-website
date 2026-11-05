/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { CopyCode } from "./CopyCode";
import { FirmFilters, ViewAllFirms } from "./FirmFilters";
import { FIRMS, type Firm } from "./data";
import { inter, manrope } from "./fonts";

/* ---------- shared bits ---------- */

function Stars({ value }: { value: number }) {
  return (
    <span className="flex" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <img key={i} alt="" src={i < value ? "/images/home/star-full.svg" : "/images/home/star-empty.svg"} className="block size-3.5" />
      ))}
    </span>
  );
}

function Favorites({ count }: { count: string }) {
  return (
    <span className="flex items-center gap-1">
      <img alt="" src="/images/home/heart-green.svg" className="block size-3.5" />
      <span className="type-caption text-brand">{count}</span>
    </span>
  );
}

/** cTrader / MT5 / TradingView marks (Figma "Trading platforms"). */
function Platforms({ className = "" }: { className?: string }) {
  return (
    <span className={`flex flex-wrap items-center gap-2 ${className}`}>
      <img alt="cTrader" src="/images/home/ctrader.svg" className="block h-[21.304px] w-5" />
      <span className="relative block h-[21.304px] w-5" role="img" aria-label="MetaTrader 5">
        <img alt="" src="/images/home/mt5-base.svg" className="absolute left-0 top-[0.51%] block h-[97.96%] w-full max-w-none" />
        <span
          className="absolute inset-[17.44%_14.42%_18.45%_14.43%]"
          style={{
            maskImage: "url(/images/home/mt5-mask.svg)",
            WebkitMaskImage: "url(/images/home/mt5-mask.svg)",
            maskSize: "14.229px 13.657px",
            WebkitMaskSize: "14.229px 13.657px",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <img alt="" src="/images/home/mt5-group.svg" className="absolute inset-0 block size-full max-w-none" />
        </span>
      </span>
      <img alt="TradingView" src="/images/home/tradingview.svg" className="block h-[21.304px] w-5" />
    </span>
  );
}

function Logo({ small }: { small?: boolean }) {
  return small ? (
    <span className="flex shrink-0 rounded-[5.714px] bg-raised p-[2.857px]">
      <img alt="" src="/images/home/fundednext-34.svg" className="block size-[34.286px]" />
    </span>
  ) : (
    <span className="flex shrink-0 rounded-lg bg-raised p-1">
      <img alt="" src="/images/home/fundednext-48.svg" className="block size-12" />
    </span>
  );
}

function Promo({ firm }: { firm: Firm }) {
  return (
    <span className="flex shrink-0 flex-col gap-0.5 rounded-lg bg-raised px-4 py-1">
      <span className="text-center type-body text-brand">{firm.discount}</span>
      <CopyCode code={firm.code} icon="/images/home/bi-copy.svg" iconSize={16} className="gap-1" textClassName="type-body-sm text-ink" />
    </span>
  );
}

function Allocation({ firm, center }: { firm: Firm; center?: boolean }) {
  return (
    <span className="flex w-full flex-col gap-2">
      <span className={`type-label text-ink ${center ? "text-center" : ""}`}>{firm.maxAllocation}</span>
      <span className="block h-1 w-full rounded-full bg-raised">
        <span className="block h-1 rounded-full bg-brand" style={{ width: center ? `${firm.allocationPct}%` : "100%" }} />
      </span>
    </span>
  );
}

const ROW = "rounded-2xl border border-line";
const RANK = `${inter.className} shrink-0 text-center text-[12px] font-semibold leading-normal text-ink`;
const FIRM_HREF = "/firms/fundingpips";

/* ---------- desktop row (Figma "Firm row / FundedNext/Desktop" 379:9472) ---------- */

const COL = {
  identity: "flex-[0_1_250px] min-w-[224px]",
  rank: "flex-[0_1_148px] min-w-[128px]",
  favorites: "flex-[0_2_148px] min-w-[84px]",
  assets: "flex-1 min-w-[180px]",
  platforms: "flex-[0_4_250px] min-w-[76px]",
  allocation: "flex-[0_1_180px] min-w-[110px]",
  promo: "w-[229px] shrink-0",
};

function TableHeadings() {
  const h = "type-table-heading whitespace-nowrap text-muted";
  return (
    <div className="hidden items-start gap-4 px-6 py-3 xl:flex">
      <p className={`${COL.identity} ${h}`}>POPULARITY / FIRM</p>
      <p className={`${COL.rank} text-center ${h}`}>RANK / REVIEWS</p>
      <p className={`${COL.favorites} text-center ${h}`}>FAVORITES</p>
      <p className={`${COL.assets} text-center ${h}`}>ASSETS</p>
      <p className={`${COL.platforms} text-center ${h}`}>ASSETS</p>
      <p className={`${COL.allocation} text-center ${h}`}>MAX ALLOCATION</p>
      <p className={`${COL.promo} text-center ${h}`}>PROMO</p>
    </div>
  );
}

function FirmRowDesktop({ firm }: { firm: Firm }) {
  return (
    <div className={`${ROW} hidden items-center gap-4 p-6 xl:flex`} style={{ background: firm.bg }}>
      <div className={`${COL.identity} flex items-center justify-center gap-3`}>
        <span className={RANK}>{firm.rank}</span>
        <Logo />
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <Link href={FIRM_HREF} className={`${manrope.className} truncate text-[20px] font-medium leading-normal text-ink hover:text-brand`}>
            {firm.name}
          </Link>
          <span className="flex items-center gap-1.5">
            <img alt="" src="/images/home/flag-uae.png" className="block h-[18px] w-6 object-cover" />
            <span className="whitespace-nowrap type-caption text-muted">
              <span className="text-ink">{firm.country} </span>
              {firm.age}
            </span>
          </span>
        </div>
      </div>
      <div className={`${COL.rank} flex flex-col items-center justify-center gap-1`}>
        <Stars value={firm.rating} />
        <span className="whitespace-nowrap type-body text-brand">{firm.reviews}</span>
      </div>
      <div className={`${COL.favorites} flex justify-center`}>
        <Favorites count={firm.favorites} />
      </div>
      <div className={`${COL.assets} flex flex-wrap items-center justify-center gap-x-2 gap-y-1`}>
        {firm.assets.map((a) => (
          <span key={a} className="whitespace-nowrap rounded-full bg-card px-3 py-2 type-caption text-ink">
            {a}
          </span>
        ))}
      </div>
      <Platforms className={`${COL.platforms} justify-center`} />
      <div className={COL.allocation}>
        <Allocation firm={firm} center />
      </div>
      <div className={`${COL.promo} flex items-center justify-center gap-4`}>
        <Promo firm={firm} />
        <Link
          href={FIRM_HREF}
          className="inline-flex h-12 shrink-0 items-center rounded-full border border-brand bg-page px-4 type-label whitespace-nowrap text-ink transition hover:bg-brand-tint"
        >
          View Firm
        </Link>
      </div>
    </div>
  );
}

/* ---------- tablet card (Figma "Firm card / Tablet" 544:21161) ---------- */

function FirmCardTablet({ firm }: { firm: Firm }) {
  return (
    <div className={`${ROW} hidden flex-col gap-3 p-5 md:flex xl:hidden`} style={{ background: firm.bg }}>
      <div className="flex w-full items-center justify-center gap-3">
        <span className={RANK}>{firm.rank}</span>
        <Logo />
        <div className="flex shrink-0 flex-col gap-1.5">
          <Link href={FIRM_HREF} className={`${manrope.className} whitespace-nowrap text-[20px] font-medium leading-normal text-ink hover:text-brand`}>
            {firm.name}
          </Link>
          <span className="flex items-start gap-3">
            <span className="flex items-center gap-1.5">
              <img alt="" src="/images/home/flag-uae.png" className="block h-[18px] w-6 object-cover" />
              <span className="whitespace-nowrap type-caption text-ink">
                {firm.country} {firm.age}
              </span>
            </span>
            <Favorites count={firm.favorites} />
          </span>
        </div>
        <Platforms className="min-w-0 flex-1 justify-center" />
        <div className="flex min-w-0 flex-1 flex-col items-end justify-center gap-1">
          <Stars value={firm.rating} />
          <span className="text-right type-body text-brand">{firm.reviews}</span>
        </div>
      </div>
      <div className="flex w-full flex-wrap gap-x-2 gap-y-1">
        {firm.assets.map((a) => (
          <span key={a} className="flex h-7 items-center whitespace-nowrap rounded-full bg-card px-2.5 py-1 type-caption text-ink">
            {a}
          </span>
        ))}
      </div>
      <div className="flex w-full items-center gap-4">
        <div className="min-w-0 flex-1">
          <Allocation firm={firm} />
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-end gap-4">
          <Promo firm={firm} />
          <Link
            href={FIRM_HREF}
            className="inline-flex h-11 shrink-0 items-center rounded-full border border-brand bg-page px-4 type-label whitespace-nowrap text-ink transition hover:bg-brand-tint"
          >
            View Firm
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ---------- mobile card (Figma "Firm card / Mobile" 544:21303) ---------- */

function FirmCardMobile({ firm }: { firm: Firm }) {
  const shown = firm.assets.slice(0, 4);
  const more = firm.assets.length - shown.length;
  return (
    <div className={`${ROW} flex flex-col gap-3 p-4 md:hidden`} style={{ background: firm.bg }}>
      <div className="flex w-full items-start justify-center gap-2">
        <span className={RANK}>{firm.rank}</span>
        <Logo small />
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <Link href={FIRM_HREF} className={`${manrope.className} truncate text-[16px] font-medium leading-normal text-ink hover:text-brand`}>
            {firm.name}
          </Link>
          <span className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <img alt="" src="/images/home/flag-uae-sm.png" className="block h-[15px] w-5 object-cover" />
              <span className="whitespace-nowrap text-[12px] leading-4 text-ink">
                {firm.countryShort} {firm.ageShort}
              </span>
            </span>
            <Favorites count={firm.favorites} />
          </span>
        </div>
        <div className="flex shrink-0 flex-col items-end justify-center gap-1">
          <Stars value={firm.rating} />
          <span className="whitespace-nowrap text-right type-body text-brand">{firm.reviewsShort}</span>
        </div>
      </div>
      <div className="h-px w-full bg-line" />
      <div className="flex w-full items-start gap-5">
        <div className="flex min-w-0 flex-1 flex-wrap gap-2">
          {shown.map((a) => (
            <span key={a} className="flex h-6 items-center whitespace-nowrap rounded-full bg-card px-2.5 py-0.5 type-caption text-ink">
              {a}
            </span>
          ))}
          {more > 0 && (
            <span className="flex h-6 items-center rounded-full bg-card px-2.5 py-0.5 type-caption text-ink">+{more}</span>
          )}
        </div>
        <Platforms className="shrink-0 flex-nowrap items-start" />
      </div>
      <div className="h-px w-full bg-line" />
      <div className="flex w-full items-center gap-4">
        <div className="min-w-0 flex-1">
          <Allocation firm={firm} />
        </div>
        <Promo firm={firm} />
        <Link
          href={FIRM_HREF}
          aria-label={`View ${firm.name}`}
          className="inline-flex h-10 shrink-0 items-center justify-center rounded-full border border-brand bg-page px-4 transition hover:bg-brand-tint"
        >
          <Icon name="arrow-right-f0f0f0" size={16} />
        </Link>
      </div>
    </div>
  );
}

/** Figma "Frame 49 / Frame 47": filters, ranked firm list, View All. */
export function FirmList() {
  return (
    <section className="px-4 pt-8 md:px-12 md:pb-12 md:pt-24 xl:pb-20 xl:pt-36">
      <div className="mx-auto flex w-full max-w-[1638px] flex-col gap-6">
        <FirmFilters />
        <div className="flex flex-col gap-2">
          <TableHeadings />
          {FIRMS.map((f) => (
            <div key={f.rank} className="contents">
              <FirmRowDesktop firm={f} />
              <FirmCardTablet firm={f} />
              <FirmCardMobile firm={f} />
            </div>
          ))}
        </div>
        <ViewAllFirms />
      </div>
    </section>
  );
}
