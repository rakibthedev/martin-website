"use client";

import { Icon } from "@/components/ui/Icon";
import { TOC } from "../data";
import { useActiveSection, useReadingProgress } from "./progress";

const IDS = TOC.map((t) => t.id);

/** Figma "Table of contents" (432:13636): scroll-spy, click to jump, progress follows scroll. */
export function TableOfContents() {
  const active = useActiveSection(IDS);
  const pct = useReadingProgress();

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 24, behavior: "smooth" });
  };

  return (
    <nav
      aria-label="On this page"
      className="flex flex-col gap-1.5 rounded-3xl border border-line bg-surface p-4 md:p-5 xl:sticky xl:top-6 xl:p-6"
    >
      <p className="text-[10px] font-semibold leading-[14px] tracking-[1.5px] text-muted">ON THIS PAGE</p>
      <div className="flex flex-col gap-1.5 py-2">
        <div className="flex justify-between type-caption">
          <span className="text-muted">Your progress</span>
          <span className="text-brand">{pct}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-raised">
          <div className="h-full rounded-full bg-brand transition-[width] duration-150" style={{ width: `${pct}%` }} />
        </div>
      </div>
      {TOC.map((t, i) => {
        const done = i < active;
        const current = i === active;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => go(t.id)}
            aria-current={current ? "location" : undefined}
            className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition ${
              current ? "border border-brand bg-brand-tint" : "hover:bg-raised"
            }`}
          >
            {done ? (
              <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-brand">
                <Icon name="check-151513" size={14} />
              </span>
            ) : (
              <span className={`size-[18px] shrink-0 rounded-full border ${current ? "border-brand" : "border-line"}`} />
            )}
            <span
              className={`min-w-0 flex-1 ${
                current ? "type-label text-brand" : done ? "type-body-sm text-muted" : "type-body-sm text-ink"
              }`}
            >
              {t.label}
            </span>
          </button>
        );
      })}
      <div className="h-px w-full bg-line" />
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex items-center gap-1 self-start type-caption text-muted hover:text-ink"
      >
        <Icon name="arrow-up-898587" size={14} />
        Back to top
      </button>
    </nav>
  );
}
