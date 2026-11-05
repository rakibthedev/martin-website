"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

const TIPS = [
  {
    icon: "copy-00d26a",
    title: "Paste it at checkout",
    text: "Codes are entered on the firm’s own website, in the promo or coupon field when you pay.",
  },
  {
    icon: "info-circle-00d26a",
    title: "Terms can change",
    text: "Firms update their offers often. Check the discount and rules on the firm’s site before you buy.",
  },
  {
    icon: "danger-00d26a",
    title: "Code not working?",
    text: "Let us know and we’ll check it with the firm.",
    report: true,
  },
];

function ReportCode() {
  const [sent, setSent] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setSent(true)}
      disabled={sent}
      className="flex items-center justify-center gap-1.5 type-body-sm text-brand hover:underline disabled:no-underline"
    >
      {sent ? "Thanks — we’ll look into it" : "Report a code"}
      {!sent && <Icon name="arrow-up-00d26a" size={16} rotate={45} />}
    </button>
  );
}

/** Figma "Good to know": desktop 379:14416, tablet 497:42258, mobile 497:42618. */
export function GoodToKnow() {
  return (
    <section className="flex w-full flex-col items-start gap-6 pt-8 md:pt-12">
      <p className="text-[10px] leading-[14px] font-semibold tracking-[1.5px] text-brand">GOOD TO KNOW</p>
      <h2 className="type-h2 text-ink">Tips for using promo codes</h2>
      <div className="grid w-full grid-cols-1 items-start gap-4 md:grid-cols-3">
        {TIPS.map((t) => (
          <div
            key={t.title}
            className="flex min-w-0 flex-col items-start gap-3 rounded-2xl border border-line bg-surface p-4 md:p-5 xl:p-6"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-brand-tint">
              <Icon name={t.icon} size={16} />
            </span>
            <p className="type-label text-ink">{t.title}</p>
            <p className="w-full type-body-sm text-muted">{t.text}</p>
            {t.report && <ReportCode />}
          </div>
        ))}
      </div>
    </section>
  );
}
