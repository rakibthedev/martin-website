"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { PageHead, Pill } from "../shared";
import { BREAKDOWN, FUNNEL, LEDGER, LEVEL_PROGRESS, PERKS, REFERRAL_LINK, SHARE } from "./data";

/**
 * Figma: Referrals & Rewards — Desktop 394:6640, Tablet 497:17419, Mobile 497:17644.
 * Desktop columns (flex-1 + 520px) and the ledger table need ~1720px; below that both rows use the tablet
 * two-column layout (md) and stack on mobile.
 */
export function ReferralsView() {
  const [copied, setCopied] = useState(false);
  const [requested, setRequested] = useState(false);

  const copyLink = () => {
    navigator.clipboard?.writeText(`https://${REFERRAL_LINK}`).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const downloadCsv = () => {
    const rows = [["Activity", "Date", "Status", "Amount"], ...LEDGER.map((l) => [l.activity, l.date, l.status, l.amount])];
    const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "rewards-history.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <PageHead
        title="Referrals & rewards"
        description="Your earnings, invite link and trust-point level. Rewards are paid once a referred trader publishes a verified review."
      >
        <Pill variant="ghost" href="/referrals" trailing="arrow-up-00d26a" trailingRotate={45} iconSize={20}>
          How referrals work
        </Pill>
      </PageHead>

      {/* Wallet row */}
      <div className="grid w-full grid-cols-1 items-start gap-6 md:grid-cols-2 min-[1720px]:grid-cols-[minmax(0,1fr)_520px]">
        <section
          className="flex w-full min-w-0 flex-col items-start gap-5 rounded-[28px] border border-line p-4 md:p-5 xl:p-6"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(0, 209, 106, 0.15) 0%, rgba(0, 209, 106, 0) 60%), linear-gradient(90deg, #212121 0%, #212121 100%)",
          }}
        >
          <div className="flex items-center gap-2">
            <Icon name="wallet-18-00d26a" size={18} />
            <p className="whitespace-nowrap text-[11px] font-bold leading-normal tracking-[1px] text-brand">
              AVAILABLE TO WITHDRAW
            </p>
          </div>
          <div className="flex items-end gap-3 whitespace-nowrap">
            <p className="text-[36px] font-extrabold leading-[46px] text-ink xl:text-[56px] xl:leading-[64px]">$190.00</p>
            <p className="type-body text-muted">USD</p>
          </div>
          <div className="flex w-full flex-col gap-3 2xl:flex-row">
            {BREAKDOWN.map((b) => (
              <div
                key={b.label}
                className="flex min-w-0 flex-1 flex-col items-start gap-0.5 whitespace-nowrap rounded-[16px] border border-line bg-brand-tint p-4 md:p-5 xl:p-6"
              >
                <p className="type-caption text-muted">{b.label}</p>
                <p className={`text-[20px] font-extrabold leading-normal ${b.tone}`}>{b.value}</p>
              </div>
            ))}
          </div>
          <div className="flex w-full flex-col items-start gap-4 2xl:flex-row 2xl:items-center">
            <Pill trailing={requested ? undefined : "arrow-right-151513"} onClick={() => setRequested(true)}>
              {requested ? "Withdrawal requested" : "Withdraw $190"}
            </Pill>
            <div className="flex flex-wrap items-center gap-1.5">
              <p className="type-caption text-muted">Payout to</p>
              <p className="text-[12px] font-semibold leading-4 text-ink">USDT (TRC-20) •••• 8F2a</p>
              <Link href="/account/settings" className="text-[12px] font-bold leading-4 text-brand hover:underline">
                Change
              </Link>
            </div>
          </div>
        </section>

        <section className="flex w-full min-w-0 flex-col items-start gap-4 rounded min-[1720px]:self-stretch-[28px] border border-line bg-surface p-4 md:p-5 xl:p-6">
          <h2 className="text-[22px] font-extrabold leading-7 text-ink">Invite traders</h2>
          <p className="type-body-sm w-full text-muted">
            You get $50 and they get 10% off their first challenge when they publish a verified review.
          </p>
          <div className="flex w-full items-center justify-center gap-2.5 rounded-[14px] border border-line bg-card py-2 pl-4 pr-2 min-[1720px]:w-auto">
            <p className="type-label min-w-0 flex-1 truncate text-ink">{REFERRAL_LINK}</p>
            <Pill leading="copy-16-151513" onClick={copyLink}>
              {copied ? "Copied" : "Copy link"}
            </Pill>
          </div>
          <div className="flex w-full items-start gap-2">
            {SHARE.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 min-w-0 flex-1 items-center justify-center rounded-full border border-line px-3 py-2 text-[12px] font-semibold leading-4 text-ink hover:border-muted md:h-11 xl:h-12"
              >
                {s.label}
              </a>
            ))}
          </div>
          <div className="flex w-full items-start gap-2 whitespace-nowrap">
            {FUNNEL.map((f) => (
              <div key={f.label} className="flex min-w-0 flex-1 flex-col items-center rounded-[14px] bg-card px-2 py-2.5">
                <p className="text-[20px] font-extrabold leading-normal text-ink">{f.value}</p>
                <p className="type-caption text-muted">{f.label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Ledger row */}
      <div className="grid w-full grid-cols-1 items-start gap-6 p-4 md:grid-cols-2 md:p-5 xl:p-6 min-[1720px]:grid-cols-[minmax(0,1fr)_520px]">
        <section className="flex w-full min-w-0 flex-col items-start gap-4 rounded-[24px] border border-line bg-surface p-4 md:p-5 xl:gap-[18px] xl:p-6">
          <div className="flex w-full items-center gap-2.5">
            <h2 className="min-w-0 flex-1 text-[22px] font-extrabold leading-7 text-ink">Rewards history</h2>
            <button
              type="button"
              onClick={downloadCsv}
              className="flex h-10 shrink-0 items-center justify-center gap-1.5 hover:brightness-125 md:h-11 xl:h-12"
            >
              <span className="type-label whitespace-nowrap text-brand">Download CSV</span>
              <Icon name="arrow-right-16-00d26a" size={16} />
            </button>
          </div>
          <div className="hidden w-full items-start gap-4 px-1 min-[1720px]:flex">
            <p className="type-overline min-w-0 flex-1 text-muted">ACTIVITY</p>
            <p className="type-overline w-[130px] shrink-0 text-muted">DATE</p>
            <p className="type-overline w-[110px] shrink-0 text-muted">STATUS</p>
            <p className="type-overline w-[90px] shrink-0 text-right text-muted">AMOUNT</p>
          </div>
          {LEDGER.map((l) => (
            <div key={l.activity} className="flex w-full flex-col gap-4 xl:gap-[18px]">
              <div className="h-px w-full bg-line" />
              <div className="flex w-full items-start gap-2.5 px-0 min-[1720px]:items-center min-[1720px]:gap-4 min-[1720px]:px-1">
                <div className="flex min-w-0 flex-1 items-start gap-2.5 min-[1720px]:items-center">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-raised">
                    <Icon name={l.icon === "gift" ? "gift-16-00d26a" : "people-16-00d26a"} size={16} />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col items-start gap-2 min-[1720px]:contents">
                    <p className="type-body-sm text-ink min-[1720px]:mr-1.5 min-[1720px]:min-w-0 min-[1720px]:flex-1">{l.activity}</p>
                    <p className="type-caption whitespace-nowrap text-muted min-[1720px]:order-1 min-[1720px]:mr-1.5 min-[1720px]:w-[130px] min-[1720px]:shrink-0">
                      {l.date}
                    </p>
                    <p className="type-label whitespace-nowrap text-brand min-[1720px]:order-3 min-[1720px]:w-[90px] min-[1720px]:shrink-0 min-[1720px]:text-right">
                      {l.amount}
                    </p>
                    <div className="hidden min-[1720px]:order-2 min-[1720px]:mr-1.5 min-[1720px]:flex min-[1720px]:w-[110px] min-[1720px]:shrink-0">
                      <StatusChip status={l.status} />
                    </div>
                  </div>
                </div>
                <div className="shrink-0 min-[1720px]:hidden">
                  <StatusChip status={l.status} />
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="flex w-full min-w-0 flex-col items-start gap-4 rounded min-[1720px]:self-stretch-[24px] border border-line bg-surface p-4 md:p-5 xl:p-6">
          <div className="flex w-full items-center gap-3">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand">
              <Icon name="medal-22-151513" size={22} />
            </span>
            <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
              <p className="text-[18px] font-extrabold leading-normal text-ink">Level 3 · Trusted reviewer</p>
              <p className="type-caption text-muted">1,240 trust points · 260 to Level 4</p>
            </div>
          </div>
          <div
            className="flex h-2 w-full items-start rounded-full bg-raised"
            role="progressbar"
            aria-valuenow={1240}
            aria-valuemin={0}
            aria-valuemax={1500}
            aria-label="Trust points"
          >
            <div className="h-2 rounded-full bg-brand" style={{ width: `${LEVEL_PROGRESS * 100}%` }} />
          </div>
          <p className="type-overline text-muted">YOUR PERKS</p>
          {PERKS.map((p) => (
            <div key={p.label} className="flex items-center gap-2.5">
              <Icon name={p.unlocked ? "tick-circle-bold-16-00d26a" : "lock-16-898587"} size={16} />
              <p className={`type-body-sm ${p.unlocked ? "text-ink" : "text-muted"}`}>{p.label}</p>
            </div>
          ))}
          <div className="flex w-full flex-col items-start gap-1.5 rounded-[16px] border border-line bg-card p-4 md:p-5 xl:p-6">
            <p className="type-label text-ink">How to earn points</p>
            <p className="type-caption text-muted">
              Verified review +200 · Payout proof +40 · Helpful vote +5 · Finish a guide +10
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

function StatusChip({ status }: { status: "Pending" | "Available" }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center whitespace-nowrap rounded-full px-2.5 py-1 text-[12px] font-semibold leading-4 md:py-1.5 xl:py-1 ${
        status === "Pending" ? "bg-warning-bg text-warning" : "bg-brand-tint text-brand"
      }`}
    >
      {status}
    </span>
  );
}
