"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { StatCard } from "@/components/dashboard/StatCard";
import { Chip, PageHead, Pill } from "../shared";
import { COMPARISONS, STATS, type Comparison } from "./data";

/** Figma: Comparisons — Desktop 386:6042, Tablet 497:16547, Mobile 497:16790. */
export function ComparisonsView() {
  const [items, setItems] = useState<Comparison[]>(COMPARISONS);

  const duplicate = (c: Comparison) =>
    setItems((list) => {
      const i = list.findIndex((x) => x.id === c.id);
      const copy = { ...c, id: `${c.id}-${Date.now()}`, title: `${c.title} · Copy` };
      return [...list.slice(0, i + 1), copy, ...list.slice(i + 1)];
    });
  const remove = (id: string) => setItems((list) => list.filter((x) => x.id !== id));

  return (
    <>
      <PageHead
        title="Comparisons"
        description="Side-by-side comparisons you have saved. Reopen them any time — figures update automatically when firms change their rules."
        align="md:items-start xl:items-end"
      >
        <Pill href="/choose-firms" leading="add-16-151513">
          New comparison
        </Pill>
      </PageHead>

      {/* Summary */}
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
        {STATS.map((s, i) => (
          <StatCard
            key={s.label}
            label={s.label}
            value={i === 0 ? String(items.length) : s.value}
            hint={s.hint}
            icon={s.icon}
            padding="p-4 md:p-5 xl:p-6"
          />
        ))}
      </div>

      {/* Saved comparisons */}
      <div className="grid w-full grid-cols-1 items-start gap-6 md:grid-cols-2">
        {items.map((c) => (
          <ComparisonCard key={c.id} c={c} onDuplicate={() => duplicate(c)} onDelete={() => remove(c.id)} />
        ))}
      </div>

      {/* New comparison card */}
      <div className="flex w-full flex-col items-start gap-4 rounded-[24px] border border-dashed border-line p-4 md:flex-row md:items-center md:gap-3 md:p-5 xl:gap-4 xl:p-6">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-tint">
          <Icon name="add-22-00d26a" size={22} />
        </span>
        <div className="flex w-full min-w-0 flex-col items-start gap-0.5 md:w-auto md:flex-1">
          <p className="text-[18px] font-extrabold leading-normal text-ink">Start a new comparison</p>
          <p className="type-body-sm text-muted">
            Pick 2–3 firms. Tip: start from your shortlist to compare in one click.
          </p>
        </div>
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-3 xl:gap-4">
          <Pill variant="ghost" href="/favourite-firms" trailing="arrow-up-00d26a" trailingRotate={45} iconSize={20}>
            Use my shortlist
          </Pill>
          <Pill variant="white" href="/choose-firms" trailing="arrow-up-20-151513" trailingRotate={45} iconSize={20}>
            Choose firms
          </Pill>
        </div>
      </div>
    </>
  );
}

function ComparisonCard({
  c,
  onDuplicate,
  onDelete,
}: {
  c: Comparison;
  onDuplicate: () => void;
  onDelete: () => void;
}) {
  return (
    <article className="flex w-full min-w-0 flex-col items-start gap-4 rounded-[24px] border border-line bg-surface p-4 md:p-5 xl:gap-[18px] xl:p-6">
      {/* Head: stacked on mobile/tablet, one row on wide desktop */}
      <div className="flex w-full flex-col items-start gap-3 2xl:flex-row 2xl:items-center">
        <div className="flex shrink-0 items-start">
          {c.firms.map((f, i) => (
            <span
              key={f.initials}
              className={`flex size-10 shrink-0 items-center justify-center rounded-[12px] border-[3px] border-surface text-[12px] font-extrabold leading-normal text-white ${f.bg} ${
                i < c.firms.length - 1 ? "xl:-mr-2.5" : ""
              }`}
            >
              {f.initials}
            </span>
          ))}
        </div>
        <div className="flex w-full min-w-0 flex-col items-start gap-0.5 2xl:w-auto 2xl:flex-1">
          <h3 className="text-[18px] font-extrabold leading-normal text-ink">{c.title}</h3>
          <p className="type-caption whitespace-pre-wrap text-muted min-[1800px]:whitespace-pre">{c.subtitle}</p>
        </div>
        <Chip tone="warning" className="md:py-1.5 xl:py-1">
          {c.changed}
        </Chip>
      </div>

      {/* Highlights */}
      <div className="flex w-full flex-col items-start rounded-[16px] border border-line bg-card p-4 md:p-5 xl:p-6">
        {c.rows.map((r, i) => (
          <div key={r.label} className="w-full">
            {i > 0 && <div className="h-px w-full bg-line" />}
            <div className="flex w-full flex-wrap items-start gap-3 px-4 py-3 xl:flex-nowrap xl:items-center">
              <p className="type-body-sm min-w-min flex-[1_1_0%] text-muted">{r.label}</p>
              <p className="type-label shrink-0 whitespace-nowrap text-ink">{r.firm}</p>
              <span className="shrink-0 whitespace-nowrap rounded-full bg-brand-tint px-2.5 py-0.5 text-[12px] font-bold leading-4 text-brand">
                {r.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex w-full flex-wrap items-start gap-2">
        <Pill href="/compare" trailing="arrow-right-151513" className="xl:grow">
          Open comparison
        </Pill>
        <Pill variant="outline-page" leading="copy-f0f0f0" onClick={onDuplicate}>
          Duplicate
        </Pill>
        <Pill variant="subtle" onClick={onDelete}>
          Delete
        </Pill>
      </div>
    </article>
  );
}
