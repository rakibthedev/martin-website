"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { SHARE_URL } from "../data";
import { useCopy } from "../hooks";
import { btnClass } from "../ui";

const box = "flex flex-col gap-3.5 rounded-3xl border border-line bg-surface p-4 md:p-5 xl:p-6";
const enc = encodeURIComponent(SHARE_URL);

/** Figma "Sidebar" (432:13869 · tablet 497:25018 · mobile 497:25505). */
export function ArticleSidebar() {
  const { copied, copy } = useCopy();
  return (
    <aside className="flex min-w-0 flex-col gap-5">
      <div className="flex flex-col gap-4 rounded-3xl border border-brand bg-[linear-gradient(90deg,rgba(0,209,106,0.15)_0%,rgba(0,209,106,0)_60%),linear-gradient(90deg,#212121_0%,#212121_100%)] p-4 md:p-5 xl:border-line xl:p-6">
        <p className="text-[22px] font-extrabold leading-[1.15] tracking-[-0.5px]">Key takeaways</p>
        {["Proof first — it shows the experience was real.", "Context changes what a review means.", "Patterns beat single opinions."].map(
          (t, i) => (
            <div key={t} className="flex items-start gap-3">
              <span className="text-[16px] font-extrabold leading-[1.15] text-brand">{String(i + 1).padStart(2, "0")}</span>
              <p className="min-w-0 flex-1 type-body-sm">{t}</p>
            </div>
          ),
        )}
      </div>

      <div className={box}>
        <p className="text-[10px] font-semibold leading-[14px] tracking-[1.5px] text-muted">GUIDE DETAILS</p>
        {[
          ["Topic", "Firm research"],
          ["Level", "Intermediate"],
          ["Read time", "6 minutes"],
          ["Reading path", "Step 3 of 3 · New here"],
        ].map(([k, v], i) => (
          <div key={k} className="flex items-start justify-between gap-2 py-1">
            <span className="shrink-0 type-body-sm text-muted">{k}</span>
            <span className={`min-w-0 text-right type-label ${i === 3 ? "text-brand" : ""}`}>{v}</span>
          </div>
        ))}
      </div>

      <div className={box}>
        <p className="text-[22px] font-extrabold leading-[1.15] tracking-[-0.5px]">Put it into practice</p>
        <p className="type-body-sm text-muted">Apply what you learned to real reviews and firms.</p>
        {[
          { href: "/firms/fundingpips", icon: "star-00d26a", t: "Read verified reviews", d: "See proof-backed reviews on firm profiles." },
          { href: "/compare", icon: "arrow-swap-horizontal-00d26a", t: "Compare firms side by side", d: "Check scores, reviews and rules together." },
        ].map((l) => (
          <Link key={l.t} href={l.href} className="group flex items-center gap-3 rounded-2xl bg-page p-4 transition hover:bg-raised xl:p-6">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-tint">
              <Icon name={l.icon} size={16} />
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="type-label group-hover:text-brand">{l.t}</span>
              <span className="type-caption text-muted">{l.d}</span>
            </span>
            <Icon name="arrow-right-00d26a" size={16} />
          </Link>
        ))}
      </div>

      <div className={box}>
        <p className="type-body-sm text-muted">Found it useful? Share it with a trader friend.</p>
        <div className="flex flex-wrap gap-2">
          <a href={`https://x.com/intent/post?url=${enc}`} target="_blank" rel="noreferrer" className={btnClass("subtle", undefined, "xl:px-3.5")}>
            X
          </a>
          <a href={`https://t.me/share/url?url=${enc}`} target="_blank" rel="noreferrer" className={btnClass("subtle", undefined, "xl:px-3.5")}>
            Telegram
          </a>
          <a href={`https://wa.me/?text=${enc}`} target="_blank" rel="noreferrer" className={btnClass("subtle", undefined, "xl:px-3.5")}>
            WhatsApp
          </a>
          <button
            type="button"
            aria-label={copied ? "Link copied" : "Copy link"}
            title={copied ? "Link copied" : "Copy link"}
            onClick={() => copy(SHARE_URL)}
            className={btnClass("subtle", undefined, "border border-line xl:px-3.5")}
          >
            <Icon name={copied ? "tick-circle-outline-00d26a" : "link-f0f0f0"} size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
