"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { StatCard } from "@/components/dashboard/StatCard";
import { manrope } from "../fonts";
import { CardHeader, PageHead, Pill } from "../shared";
import { ACTIVE_OFFERS, HISTORY, STATS, type ActiveOffer, type HistoryItem } from "./data";

type Tab = "active" | "used" | "expired";

/**
 * Figma: Claimed Offers — Desktop 394:5564, Tablet 497:17033, Mobile 497:17226.
 * Offer rows use the single-row desktop layout from 1720px (where the 1504px main column fits it);
 * below that they use the tablet layout (wrapping row + actions underneath) and stack on mobile.
 */
export function ClaimedOffersView() {
  const [offers, setOffers] = useState<ActiveOffer[]>(ACTIVE_OFFERS);
  const [history, setHistory] = useState<HistoryItem[]>(HISTORY);
  const [tab, setTab] = useState<Tab>("active");
  const [query, setQuery] = useState("");

  const used = history.filter((h) => h.status === "used");
  const expired = history.filter((h) => h.status === "expired");
  // $186 already saved (Equity Edge) + the estimate of every code marked as used here
  const savings =
    186 + ACTIVE_OFFERS.filter((o) => !offers.some((x) => x.id === o.id)).reduce((s, o) => s + o.saving, 0);

  const markUsed = (o: ActiveOffer) => {
    setOffers((list) => list.filter((x) => x.id !== o.id));
    setHistory((h) => [
      { id: o.id, firm: o.firm, when: "Used today", discount: o.discount, status: "used", saved: `Saved $${o.saving}` },
      ...h,
    ]);
  };

  const q = query.trim().toLowerCase();
  const match = (name: string) => !q || name.toLowerCase().includes(q);
  const visibleOffers = useMemo(() => offers.filter((o) => match(o.firm)), [offers, q]); // eslint-disable-line react-hooks/exhaustive-deps
  const tabHistory = (tab === "used" ? used : expired).filter((h) => match(h.firm));
  const urgent = offers.find((o) => o.urgent);

  return (
    <>
      <PageHead
        title="Claimed offers"
        description="Every promo code you have copied, in one place. Mark a code as used to track how much you have saved."
      >
        <Pill variant="ghost" href="/offers" trailing="arrow-up-00d26a" trailingRotate={45} iconSize={20}>
          Browse all offers
        </Pill>
      </PageHead>

      {/* Summary */}
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          label="Active codes"
          value={String(offers.length)}
          hint={STATS.activeHint}
          icon="ticket-22-00d26a"
          padding="p-4 md:p-5 xl:p-6"
        />
        <StatCard
          label="Estimated savings"
          value={`$${savings}`}
          hint={used.length === 1 ? STATS.savingsHint : `From ${used.length} used codes`}
          icon="savings-glyph-22-00d26a"
          padding="p-4 md:p-5 xl:p-6"
        />
        <StatCard
          label="Expiring soon"
          value={urgent ? "1" : "0"}
          hint={urgent ? STATS.expiringHint : "Nothing expiring this week"}
          icon="clock-22-00d26a"
          padding="p-4 md:p-5 xl:p-6"
        />
      </div>

      {/* Expiring banner */}
      {urgent && (
        <div className="flex w-full items-start gap-[14px] rounded-[20px] border border-warning bg-warning-bg p-4 md:items-center md:p-5 xl:max-w-[997px] xl:p-6">
          <span className="block md:hidden">
            <Icon name="clock-20-f5a524" size={28} />
          </span>
          <span className="hidden md:block">
            <Icon name="clock-20-f5a524" size={20} />
          </span>
          <div className="flex min-w-0 flex-1 flex-col items-start gap-3 md:flex-row md:items-center md:gap-[14px]">
            <div className="flex min-w-0 flex-col items-start gap-0.5 md:flex-1">
              <p className="type-label text-ink">Your FundingPips 20% code expires in 3 days</p>
              <p className="type-caption text-muted">Use it before Fri 6 Nov to save about $119 on a $100K challenge.</p>
            </div>
            <Pill href="/offers" trailing="arrow-right-151513">
              Get deal now
            </Pill>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex w-full flex-col items-start gap-4 md:flex-row md:items-center">
        <div role="tablist" className="flex shrink-0 items-start gap-1 rounded-full border border-line bg-surface p-1">
          {(
            [
              ["active", "Active", offers.length],
              ["used", "Used", used.length],
              ["expired", "Expired", expired.length],
            ] as const
          ).map(([id, label, count]) => {
            const on = tab === id;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={on}
                type="button"
                onClick={() => setTab(id)}
                className={`flex items-center gap-2 rounded-full px-[14px] py-2 transition-colors ${
                  on ? "bg-brand" : "hover:bg-raised/50"
                }`}
              >
                <span className={`type-label whitespace-nowrap ${on ? "text-page" : "text-ink"}`}>{label}</span>
                <span
                  className={`rounded-full px-[7px] py-px text-[11px] font-bold leading-normal ${
                    on ? "bg-page text-ink" : "bg-raised text-ink"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        <div className="hidden h-px flex-1 xl:block" />
        <label className="flex h-12 w-full items-center gap-2.5 rounded-full border border-line bg-surface px-4 focus-within:border-muted md:flex-1 xl:w-[300px] xl:flex-none xl:px-[18px]">
          <Icon name="search-normal-18-898587" size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by firm"
            aria-label="Search by firm"
            className="type-body-sm min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-muted"
          />
        </label>
      </div>

      {/* Offer list */}
      {tab === "active" ? (
        <div className="flex w-full flex-col items-start gap-3">
          {visibleOffers.map((o) => (
            <OfferRow key={o.id} o={o} onUsed={() => markUsed(o)} />
          ))}
          {visibleOffers.length === 0 && <Empty>No active codes match your search.</Empty>}
        </div>
      ) : (
        <div className="flex w-full flex-col items-start rounded-[20px] border border-line bg-surface p-4 md:p-5 xl:p-6">
          {tabHistory.map((h, i) => (
            <div key={h.id} className="w-full">
              {i > 0 && <div className="my-4 h-px w-full bg-line xl:my-[18px]" />}
              <HistoryRow h={h} />
            </div>
          ))}
          {tabHistory.length === 0 && <p className="type-caption text-muted">Nothing here yet.</p>}
        </div>
      )}

      {/* History */}
      <section className="flex w-full flex-col items-start gap-4 rounded-[24px] border border-line bg-surface p-4 md:p-5 xl:gap-[18px] xl:p-6">
        <CardHeader title="History" count={history.length} inline />
        {history.map((h, i) => (
          <div key={h.id} className="flex w-full flex-col gap-4 xl:gap-[18px]">
            {i > 0 && <div className="h-px w-full bg-line" />}
            <HistoryRow h={h} />
          </div>
        ))}
      </section>

      {/* Tip */}
      <div className="flex w-full items-center gap-2.5">
        <Icon name="info-circle-16-898587" size={16} />
        <p className="type-caption min-w-0 flex-1 text-muted xl:flex-none">
          Always confirm the final price at checkout — firms can change or end offers without notice.
        </p>
      </div>
    </>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <p className="type-caption w-full rounded-[20px] border border-dashed border-line p-6 text-center text-muted">
      {children}
    </p>
  );
}

function OfferRow({ o, onUsed }: { o: ActiveOffer; onUsed: () => void }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(o.code).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  return (
    <article
      className={`flex w-full flex-col items-start gap-5 rounded-[20px] border bg-surface p-4 md:flex-row md:flex-wrap md:items-center md:gap-x-5 md:gap-y-3 md:p-5 xl:p-6 min-[1720px]:flex-nowrap min-[1720px]:gap-5 ${
        o.urgent ? "border-warning" : "border-line"
      }`}
    >
      {/* Logo + firm */}
      <div className="flex w-full items-center gap-5 md:contents">
        <span
          className={`flex size-12 shrink-0 items-center justify-center rounded-[12px] text-[14px] font-extrabold leading-normal text-white ${o.bg}`}
        >
          {o.initials}
        </span>
        <div className="flex min-w-0 flex-1 flex-col items-start gap-1 md:max-w-[128px] md:flex-none xl:max-w-none min-[1720px]:w-[200px]">
          <p className={`${manrope.className} text-[24px] font-medium leading-8 text-ink md:font-sans md:text-[16px] md:font-extrabold md:leading-normal`}>
            {o.firm}
          </p>
          <p className="type-caption text-muted">{o.claimed}</p>
        </div>
      </div>

      {/* Discount */}
      <div className="flex shrink-0 flex-col items-start gap-0.5 whitespace-nowrap min-[1720px]:w-[160px]">
        <p className="text-[24px] font-extrabold leading-[30px] text-brand">{o.discount}</p>
        <p className="type-caption text-muted">{o.scope}</p>
      </div>

      {/* Code */}
      <div className="flex w-full min-w-0 items-center gap-3 rounded-[14px] border border-dashed border-brand bg-brand-tint py-2 pl-4 pr-2 md:w-auto md:min-w-[181px] md:flex-1 md:basis-0">
        <p className="min-w-0 flex-1 truncate text-[16px] font-bold leading-normal tracking-[2px] text-ink">{o.code}</p>
        <button
          type="button"
          onClick={copy}
          aria-label={`Copy code ${o.code}`}
          className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-brand bg-brand-tint-raised px-4 py-1 type-label text-ink transition hover:brightness-125 md:h-11 xl:h-12"
        >
          <Icon name="copy-f0f0f0" size={16} />
          {copied ? (
            "Copied"
          ) : (
            <>
              <span className="md:hidden xl:inline">Copy code</span>
              <span className="hidden md:inline xl:hidden">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Expiry chip */}
      <span
        className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[12px] font-semibold leading-4 md:py-1.5 xl:py-1 ${
          o.urgent ? "bg-warning-bg text-warning" : "bg-card text-muted"
        }`}
      >
        <Icon name={o.urgent ? "clock-12-f5a524" : "clock-12-898587"} size={12} />
        {o.expires}
      </span>

      {/* Actions */}
      <div className="flex w-full items-start gap-2 md:gap-3 xl:gap-2 min-[1720px]:w-auto min-[1720px]:shrink-0">
        <Pill variant="subtle" onClick={onUsed}>
          Mark as used
        </Pill>
        <Pill href="/offers" trailing="arrow-right-151513">
          Get deal
        </Pill>
      </div>
    </article>
  );
}

function HistoryRow({ h }: { h: HistoryItem }) {
  return (
    <div className="flex w-full flex-col items-start gap-4 p-1">
      <div className="flex w-full flex-col items-start gap-2">
        <div className="flex w-full items-center justify-between gap-2">
          <p className={`${manrope.className} min-w-0 text-[20px] font-semibold leading-normal text-ink`}>{h.firm}</p>
          <p className={`type-label shrink-0 whitespace-nowrap ${h.saved ? "text-brand" : "text-muted"}`}>
            {h.saved ?? "—"}
          </p>
        </div>
        <p className="type-caption text-muted">{h.when}</p>
      </div>
      <div className="flex w-full items-center gap-4">
        <p className="type-label whitespace-nowrap text-muted">{h.discount}</p>
        {h.status === "used" ? (
          <span className="inline-flex h-6 shrink-0 items-center justify-center gap-1.5 rounded-full bg-brand-tint px-2.5 text-[12px] font-semibold leading-4 text-brand md:h-7 xl:h-6">
            <Icon name="tick-circle-bold-12-00d26a" size={12} />
            Used
          </span>
        ) : (
          <span className="inline-flex h-6 shrink-0 items-center justify-center rounded-full bg-card px-2.5 text-[12px] font-semibold leading-4 text-muted md:h-7 xl:h-6">
            Expired
          </span>
        )}
      </div>
    </div>
  );
}
