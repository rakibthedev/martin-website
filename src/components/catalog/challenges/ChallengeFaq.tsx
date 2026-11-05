"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { CHALLENGE_FAQ } from "../data";

/** Figma "Challenge basics / FAQ" — desktop 379:14032, tablet 497:41431, mobile 497:41896. Two accordion columns. */
export function ChallengeFaq() {
  const [open, setOpen] = useState<number | null>(0);
  const columns = [CHALLENGE_FAQ.slice(0, 2), CHALLENGE_FAQ.slice(2)];

  return (
    <section className="flex flex-col items-start gap-6 pt-8 md:pt-12">
      <p className="text-[10px] leading-[14px] font-semibold tracking-[1.5px] text-brand">CHALLENGE BASICS</p>
      <h2 className="type-h2 text-ink xl:whitespace-nowrap">Understand the rules before you pay</h2>
      <p className="type-body text-muted">
        Quick answers to the questions traders ask most when choosing a challenge.
      </p>
      <div className="flex w-full flex-col items-start gap-4 md:flex-row">
        {columns.map((col, c) => (
          <div key={c} className="flex w-full min-w-0 flex-col gap-4 md:flex-1">
            {col.map((item, j) => {
              const i = c * 2 + j;
              const isOpen = open === i;
              return (
                <div
                  key={item.q}
                  className={`flex w-full flex-col gap-3 rounded-2xl border bg-surface p-4 md:p-5 xl:p-6 ${
                    isOpen ? "border-brand" : "border-line"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <span className="min-w-0 flex-1 type-label text-ink">{item.q}</span>
                    <Icon name={isOpen ? "minus-00d26a" : "add-24-898587"} size={24} />
                  </button>
                  {isOpen && <p className="type-body-sm text-muted">{item.a}</p>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
