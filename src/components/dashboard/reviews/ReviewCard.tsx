"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { FirmLogo } from "@/components/ui/FirmLogo";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Pill } from "@/components/dashboard/ui";
import type { MyReview, ReviewAction, StepState } from "./data";

/**
 * Figma "Review card / …" (372:2611 etc.).
 * Desktop: p24, r24, gap 18; Top row (48 logo · identity · actions); body + footer indented 64.
 * Tablet: p20, gap 16, body/footer indented 24, footer stacks (progress, then note/stats).
 * Mobile: p16, everything stacked, no indent.
 */

const STEP: Record<StepState, { icon: string; text: string }> = {
  done: { icon: "tick-circle-00d26a", text: "text-ink" },
  warning: { icon: "clock-16-f5a524", text: "text-warning" },
  danger: { icon: "danger-16-ff6b6b", text: "text-danger" },
  pending: { icon: "clock-16-898587", text: "text-muted" },
};

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span className="flex shrink-0 items-start gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name={i < full ? "star-00d26a" : "star-898587"} size={14} />
      ))}
    </span>
  );
}

function Dot() {
  return <span className="type-caption shrink-0 text-muted">·</span>;
}

function ShareButton() {
  const [done, setDone] = useState(false);
  return (
    <Pill
      variant="subtle"
      onClick={() => {
        const url = `${window.location.origin}/firms`;
        navigator.clipboard?.writeText(url).catch(() => {});
        setDone(true);
        window.setTimeout(() => setDone(false), 1600);
      }}
    >
      {done ? "Link copied" : "Share"}
    </Pill>
  );
}

function ActionButton({ action, onDelete }: { action: ReviewAction; onDelete?: () => void }) {
  if (action.kind === "share") return <ShareButton />;
  const inner = (
    <>
      {action.icon && <Icon name={action.icon} size={16} />}
      {action.label}
    </>
  );
  if (action.kind === "delete")
    return (
      <Pill variant={action.variant} onClick={onDelete}>
        {inner}
      </Pill>
    );
  return (
    <Pill variant={action.variant} href={action.href}>
      {inner}
    </Pill>
  );
}

export function ReviewCard({ review, onDelete }: { review: MyReview; onDelete?: () => void }) {
  const r = review;
  const urgent = r.status === "needs-proof";
  return (
    <article
      className={`flex w-full flex-col items-start gap-4 rounded-[24px] border bg-surface p-4 md:p-5 xl:gap-[18px] xl:p-6 ${
        urgent ? "border-danger" : "border-line"
      }`}
    >
      {/* Top */}
      <div className="flex w-full flex-col items-start gap-4 md:flex-row md:items-center">
        <div className="flex min-w-0 flex-col items-start gap-4 md:flex-1 md:flex-row md:items-center">
          <FirmLogo initials={r.initials} size={48} radius={14} textSize={15} className={r.logoClass} />
          <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2">
              <h3 className="text-[18px] font-extrabold leading-normal text-ink">{r.firm}</h3>
              <StatusBadge status={r.status} />
            </div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {r.rating != null && (
                <>
                  <Stars rating={r.rating} />
                  <span className="shrink-0 text-[12px] font-semibold leading-4 text-ink">{r.rating.toFixed(1)}</span>
                  <Dot />
                </>
              )}
              {r.meta.map((m, i) => (
                <span key={m} className="contents">
                  {i > 0 && <Dot />}
                  <span className="type-caption text-muted">{m}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {r.actions.map((a) => (
            <ActionButton key={a.label} action={a} onDelete={onDelete} />
          ))}
        </div>
      </div>

      {/* Review body */}
      <div className="flex w-full flex-col items-start gap-1.5 md:pl-6 xl:pl-16">
        <p className="text-[16px] font-bold leading-normal text-ink">{r.title}</p>
        <p className="type-body-sm w-full text-muted">{r.body}</p>
      </div>

      {/* Card footer */}
      <div className="flex w-full flex-col items-start gap-4 border-t border-line pt-3.5 md:gap-6 md:pl-6 xl:flex-row xl:items-center xl:pl-16">
        {r.steps && (
          <div className="flex flex-wrap items-center gap-2.5">
            {r.steps.map((s, i) => {
              const st = STEP[s.state];
              return (
                <span key={s.label} className="contents">
                  {i > 0 && (
                    <span
                      className={`h-0.5 w-8 shrink-0 rounded-[2px] ${
                        s.state === "done" || s.state === "warning" ? "bg-brand" : "bg-raised"
                      }`}
                    />
                  )}
                  <span className="flex shrink-0 items-center gap-1.5">
                    <Icon name={st.icon} size={16} />
                    <span className={`whitespace-nowrap text-[12px] font-semibold leading-4 ${st.text}`}>{s.label}</span>
                  </span>
                </span>
              );
            })}
          </div>
        )}
        {r.draftPercent != null && (
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-[200px] max-w-[50vw] shrink overflow-hidden rounded-full bg-raised">
              <span className="block h-full rounded-full bg-muted" style={{ width: `${r.draftPercent}%` }} />
            </span>
            <span className="type-caption whitespace-nowrap text-muted">{r.draftPercent}% complete</span>
          </div>
        )}
        <span className="hidden h-px min-w-0 flex-1 xl:block" />
        {r.note &&
          (r.note.tone === "danger" ? (
            <p className="text-[12px] font-semibold leading-4 text-danger">{r.note.text}</p>
          ) : (
            <p className="type-caption text-muted">{r.note.text}</p>
          ))}
        {r.stats && (
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="flex items-center gap-1.5">
              <Icon name="like-16-898587" size={14} />
              <span className="type-caption whitespace-nowrap text-muted">{r.stats.helpful}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="eye-898587" size={14} />
              <span className="type-caption whitespace-nowrap text-muted">{r.stats.views}</span>
            </span>
            <span className="whitespace-nowrap rounded-full bg-brand-tint px-2.5 py-[3px] text-[12px] font-semibold leading-4 text-brand">
              {r.stats.points}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
