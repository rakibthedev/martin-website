"use client";

import { Fragment, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { FAQ, FUNNEL, REFERRAL_LINK, TEMPLATES, type RangeKey } from "../data";
import { Dropdown, useCopy } from "../hooks";
import { SectionHeader, btnClass } from "../ui";
import { Connector } from "./sections";

const RANGES = ["Last 7 days", "Last 30 days", "Last 90 days"] as const satisfies readonly RangeKey[];

/** Figma "Your referral activity" (379:15096 · tablet 497:47079 · mobile 497:47566). */
export function ReferralActivity() {
  const [range, setRange] = useState<RangeKey>("Last 30 days");
  const f = FUNNEL[range];
  const pct = (a: number, b: number) => {
    const x = (a / b) * 100;
    return `${x >= 20 ? Math.round(x) : Math.round(x * 10) / 10}%`;
  };
  const cards = [
    { label: "Link visits", icon: "eye-00d26a", value: f.visits, caption: "People who opened your link", fill: 100, delta: f.dv },
    {
      label: "Invitations",
      icon: "sms-00d26a",
      value: f.invites,
      caption: "Traders you invited directly",
      fill: (f.invites / f.visits) * 100,
      delta: f.di,
    },
    {
      label: "Joined traders",
      icon: "tick-circle-outline-00d26a",
      value: f.joined,
      caption: "People who created an account",
      fill: (f.joined / f.visits) * 100,
      delta: f.dj,
      brand: true,
    },
  ];
  const conv = [pct(f.invites, f.visits), pct(f.joined, f.invites)];

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4 xl:items-end">
        <SectionHeader
          overline="YOUR ACTIVITY"
          title="Your referral activity"
          body="See how your link is doing — from first click to joined trader."
          className="flex-1"
        />
        <Dropdown
          value={range}
          options={RANGES}
          onChange={setRange}
          render={(v) => <span>{v}</span>}
          triggerClass="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-raised px-4 type-label whitespace-nowrap transition hover:brightness-125 md:h-11 xl:h-12"
        />
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        {cards.map((c, i) => (
          <Fragment key={c.label}>
            {i > 0 && <Connector label={conv[i - 1]} />}
            <div className="flex min-w-0 flex-1 flex-col gap-3.5 rounded-3xl border border-line bg-surface p-4 md:p-5 xl:p-6">
              <div className="flex items-center justify-between gap-2 md:flex-col-reverse md:items-start xl:flex-row xl:items-center">
                <p className="type-label">{c.label}</p>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-tint">
                  <Icon name={c.icon} size={16} />
                </span>
              </div>
              <p
                className={`text-[36px] font-semibold leading-[1.1] xl:text-[56px] xl:font-extrabold ${c.brand ? "text-brand" : ""}`}
              >
                {c.value}
              </p>
              <p className="type-caption text-muted">{c.caption}</p>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-raised">
                <div className="h-full rounded-full bg-brand" style={{ width: `${Math.max(4, c.fill)}%` }} />
              </div>
              <p className="flex items-center gap-1 type-caption text-brand">
                <Icon name="arrow-up-bold-00d26a" size={14} />
                {c.delta}
              </p>
            </div>
          </Fragment>
        ))}
      </div>
      <div className="flex items-center gap-3.5 rounded-2xl border border-dashed border-line bg-page p-4 md:p-5 xl:p-6">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-raised">
          <Icon name="info-circle-f0f0f0" size={16} />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <p className="type-label">Sample data shown</p>
          <p className="type-caption text-muted">
            These numbers are example values for the design. Connect live referral data here. Reward terms will appear when the
            programme launches.
          </p>
        </div>
      </div>
    </section>
  );
}

/** Figma "Share it your way" (379:15297 · tablet 497:47280 · mobile 497:47767). */
export function ShareTemplates() {
  const { copied, copy } = useCopy();
  return (
    <section className="flex flex-col gap-6">
      <SectionHeader
        overline="READY-MADE MESSAGES"
        title="Not sure what to say? Copy one of these."
        body="Pick a message and tap copy — your link is already included."
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:min-h-[284px]">
        {TEMPLATES.map((t) => {
          const text = t.lines.join("\n") + (t.linkOnNewLine ? "\n" : "") + REFERRAL_LINK;
          return (
            <div key={t.key} className="flex min-w-0 flex-col gap-4 rounded-3xl border border-line bg-surface p-4 md:p-5 xl:p-6">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-page">
                  <Icon name={t.icon} size={16} />
                </span>
                <p className="type-label">{t.title}</p>
              </div>
              <div className="flex flex-1 flex-col rounded-2xl bg-page px-4 py-4 type-body-sm xl:px-[18px]">
                {t.lines.slice(0, -1).map((l, i) => (
                  <p key={i} className="min-h-[22px]">
                    {l}
                  </p>
                ))}
                <p>
                  {t.lines[t.lines.length - 1]}
                  {t.linkOnNewLine && <br />}
                  <span className="break-all text-brand">{REFERRAL_LINK}</span>
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="type-caption text-muted">{t.chars}</span>
                <button type="button" onClick={() => copy(text, t.key)} className={btnClass("outline")}>
                  <Icon name={copied === t.key ? "tick-circle-outline-00d26a" : "copy-f0f0f0"} size={16} />
                  {copied === t.key ? "Copied" : "Copy message"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/** Figma "FAQ" (379:15359 · tablet 497:47342 · mobile 497:47829). */
export function ReferralFaq() {
  const [open, setOpen] = useState<boolean[]>([true, true, false, false]);
  return (
    <section className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8 xl:gap-16">
      <div className="flex shrink-0 flex-col items-start gap-3 md:flex-1 xl:w-[520px] xl:flex-none">
        <p className="text-[10px] font-semibold leading-[14px] tracking-[1.5px] text-brand">QUESTIONS</p>
        <h2 className="text-[36px] font-semibold leading-[1.1] xl:text-[48px] xl:font-extrabold xl:tracking-[-1.5px]">
          Referral FAQ
        </h2>
        <p className="type-body text-muted">Can’t find your answer? Contact our team and we’ll help.</p>
        <a href="mailto:support@propfirmscores.com" className={btnClass("outline")}>
          Contact us
        </a>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        {FAQ.map((f, i) => (
          <div
            key={f.q}
            className={`flex flex-col gap-2.5 rounded-[20px] border bg-surface px-4 py-[22px] md:px-5 xl:px-6 ${
              open[i] ? "border-brand" : "border-line"
            }`}
          >
            <button
              type="button"
              aria-expanded={open[i]}
              onClick={() => setOpen((o) => o.map((v, j) => (j === i ? !v : v)))}
              className="flex w-full items-center justify-between gap-3 text-left"
            >
              <span className="min-w-0 flex-1 type-label">{f.q}</span>
              <Icon name={open[i] ? "minus-00d26a" : "add-898587"} size={24} />
            </button>
            {open[i] && <p className="type-body-sm text-muted">{f.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

/** Figma "Ready to share" (379:15384 · tablet 497:47367 · mobile 497:47854). */
export function ReadyToShare() {
  const { copied, copy } = useCopy();
  return (
    <section className="flex flex-col gap-6 rounded-[32px] bg-brand p-4 text-page md:flex-row md:items-start md:gap-0 md:p-5 xl:items-center xl:gap-12 xl:p-6">
      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        <h2 className="text-[36px] font-semibold leading-[1.25] xl:text-[52px] xl:font-extrabold xl:leading-[1.1] xl:tracking-[-2px]">
          Ready to share better research?
        </h2>
        <p className="text-[18px] leading-6 opacity-75">Your link is ready: {REFERRAL_LINK}</p>
      </div>
      <div className="flex md:flex-1 xl:flex-none">
        <button type="button" onClick={() => copy("https://" + REFERRAL_LINK)} className={btnClass("subtle")}>
          <Icon name={copied ? "tick-circle-outline-00d26a" : "copy-f0f0f0"} size={16} />
          {copied ? "Link copied" : "Copy my link"}
        </button>
      </div>
    </section>
  );
}
