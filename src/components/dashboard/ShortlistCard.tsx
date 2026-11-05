"use client";

import Link from "next/link";
import { useState } from "react";
import { FirmLogo } from "@/components/ui/FirmLogo";
import { Icon } from "@/components/ui/Icon";
import { CARD, CardHeader, Pill } from "./ui";
import { FIRM_COLORS, SHORTLIST } from "./data";

const MAX_SLOTS = 5;

/**
 * Figma "Your shortlist" (370:734). Saved-firm rows with a heart toggle (removing frees a slot),
 * dashed "Add a firm" empty slots and the "Compare N firms" CTA.
 * Desktop: fixed side column, CTA full width pinned to the bottom. Tablet/mobile: CTA hugs its label.
 */
export function ShortlistCard({ className = "" }: { className?: string }) {
  const [saved, setSaved] = useState(() => SHORTLIST.map((f) => f.firm));
  const firms = SHORTLIST.filter((f) => saved.includes(f.firm));
  const empty = Math.max(0, Math.min(2, MAX_SLOTS - firms.length));

  return (
    <section className={`${CARD} flex flex-col gap-5 ${className}`}>
      <CardHeader
        title="Your shortlist"
        count={`${firms.length} / ${MAX_SLOTS}`}
        link="Manage"
        href="/account/favourites"
      />
      <div className="flex w-full flex-col gap-2.5">
        {firms.map((f) => (
          <div
            key={f.firm}
            className="flex w-full items-center gap-3 rounded-2xl border border-line bg-card p-4 md:p-5 xl:p-6"
          >
            <FirmLogo initials={f.initials} size={40} textSize={12} className={FIRM_COLORS[f.initials]} />
            <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
              <p className="type-label truncate text-ink">{f.firm}</p>
              <div className="flex items-center gap-1.5">
                <Icon name="star-00d26a" size={12} />
                <p className="type-caption whitespace-pre text-muted">{`${f.rating}  ·  ${f.max}`}</p>
              </div>
            </div>
            <button
              type="button"
              aria-pressed
              aria-label={`Remove ${f.firm} from shortlist`}
              onClick={() => setSaved((s) => s.filter((n) => n !== f.firm))}
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-tint transition hover:brightness-150 md:size-11 xl:size-12"
            >
              <Icon name="heart-bold-00d26a" size={16} />
            </button>
          </div>
        ))}
        {empty > 0 && (
          <div className="flex w-full flex-col gap-2.5 md:flex-row">
            {Array.from({ length: empty }, (_, i) => (
              <Link
                key={i}
                href="/firms"
                className="flex h-10 min-w-0 flex-1 items-center justify-center gap-2 rounded-2xl border border-dashed border-line p-3 transition hover:border-muted md:h-11 xl:h-12"
              >
                <Icon name="add-16-898587" size={16} />
                <span className="type-caption whitespace-nowrap text-muted">Add a firm</span>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="hidden flex-1 2xl:block" />
      <Pill href="/compare" variant="primary" className="self-start 2xl:w-full 2xl:self-stretch">
        {`Compare ${firms.length} firm${firms.length === 1 ? "" : "s"}`}
        <Icon name="arrow-right-151513" size={16} />
      </Pill>
    </section>
  );
}
