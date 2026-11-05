"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { BrowseFirmsPill, Card, CardHeader, Chip, FirmTile, PageHead, Pill } from "../shared";
import { Toggle } from "../Toggle";
import { CHANGES, SAVED_FIRMS, SHORTLIST_MAX, type SavedFirm } from "./data";

/**
 * Figma: Favourite Firms / Account — Desktop 386:5026, Tablet 497:16123, Mobile 497:16335.
 * The desktop saved-firms table needs ~1720px of viewport (1504px main column in the 1920 frame); below that
 * each saved firm uses the tablet/mobile card layout so nothing overflows.
 */
export function FavouritesView() {
  const [firms, setFirms] = useState<SavedFirm[]>(SAVED_FIRMS);
  const remove = (id: string) => setFirms((f) => f.filter((x) => x.id !== id));
  const left = SHORTLIST_MAX - firms.length;

  return (
    <>
      <PageHead
        title="Favourite firms"
        description="Your shortlist of up to 5 firms. We watch them for you and flag rule changes, new offers and new reviews."
      >
        <BrowseFirmsPill />
        <Pill href="/compare" trailing="arrow-right-151513">
          Compare {firms.length} firms
        </Pill>
      </PageHead>

      {/* Overview row */}
      <div className="flex w-full flex-col gap-6 md:gap-4 xl:gap-6 2xl:flex-row 2xl:items-stretch">
        <Card className="gap-4 2xl:w-[420px] 2xl:shrink-0">
          <p className="type-caption whitespace-nowrap text-muted">Shortlist space</p>
          <div className="flex items-center gap-2 whitespace-nowrap md:items-end">
            <p className="text-[32px] font-semibold leading-[42px] text-ink md:font-extrabold md:leading-[38px]">
              {firms.length} of {SHORTLIST_MAX}
            </p>
            <p className="type-body-sm text-muted">slots used</p>
          </div>
          <div className="flex w-full items-start gap-2">
            {firms.map((f) => (
              <span
                key={f.id}
                className={`flex h-14 min-w-0 flex-1 items-center justify-center rounded-[12px] text-[14px] font-extrabold leading-normal text-white ${f.bg}`}
              >
                {f.initials}
              </span>
            ))}
            {Array.from({ length: left }, (_, i) => (
              <Link
                key={i}
                href="/firms"
                aria-label="Add a firm"
                className="flex h-12 min-w-0 flex-1 items-center justify-center rounded-[12px] border border-dashed border-line hover:border-muted"
              >
                <Icon name="add-18-898587" size={18} />
              </Link>
            ))}
          </div>
          <p className="type-caption w-full text-muted">
            Tip: remove a firm you have ruled out to make room — your notes are kept for 30 days.
          </p>
        </Card>

        <Card className="gap-4 xl:gap-[18px] 2xl:flex-1">
          <CardHeader title="What changed since you saved" count="3 new" />
          {CHANGES.map((c) => (
            <div
              key={c.title}
              className="flex w-full items-start gap-[14px] rounded-[16px] border border-line bg-card p-4 md:items-center md:p-5 xl:p-6"
            >
              <span className={`flex size-10 shrink-0 items-center justify-center rounded-full ${c.iconBg}`}>
                <Icon name={c.icon} size={18} />
              </span>
              <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
                <p className="type-label text-ink">{c.title}</p>
                <p className="type-caption text-muted">{c.detail}</p>
              </div>
              <p className="type-caption shrink-0 whitespace-nowrap text-muted">{c.when}</p>
            </div>
          ))}
        </Card>
      </div>

      {/* Saved firms */}
      <Card className="gap-4 xl:gap-[18px]">
        <CardHeader title="Saved firms" count={firms.length} />
        <div className="hidden w-full items-start gap-4 px-4 min-[1720px]:flex">
          {[
            ["FIRM", "min-w-0 flex-1"],
            ["TRUST SCORE", "w-[110px]"],
            ["MAX ALLOCATION", "w-[120px]"],
            ["PROFIT SPLIT", "w-[110px]"],
            ["YOUR NOTE", "w-[240px]"],
            ["ALERTS", "w-[60px]"],
            ["", "w-[230px]"],
          ].map(([label, w], i) => (
            <p key={i} className={`type-overline shrink-0 whitespace-nowrap text-muted ${w}`}>
              {label}
            </p>
          ))}
        </div>
        {firms.map((f) => (
          <SavedFirmRow key={f.id} firm={f} onRemove={() => remove(f.id)} />
        ))}
        {left > 0 && (
          <Link
            href="/firms"
            className="flex w-full items-center gap-2.5 rounded-[16px] border border-dashed border-line p-4 hover:border-muted md:p-5 xl:justify-center xl:p-6"
          >
            <Icon name="add-18-898587" size={18} />
            <span className="type-body-sm min-w-0 flex-1 text-muted xl:flex-none">
              {left} slots left — add a firm from Browse Firms or the Leaderboard
            </span>
          </Link>
        )}
      </Card>
    </>
  );
}

function SavedFirmRow({ firm: f, onRemove }: { firm: SavedFirm; onRemove: () => void }) {
  const [note, setNote] = useState(f.note);
  return (
    <div
      className={`flex w-full flex-col items-start gap-4 rounded-[16px] border border-line bg-card p-4 md:p-5 xl:p-6 min-[1720px]:flex-row min-[1720px]:items-center`}
    >
      {/* Firm */}
      <div className={`flex w-full min-w-0 items-center gap-3 min-[1720px]:w-auto min-[1720px]:flex-1`}>
        <FirmTile initials={f.initials} bg={f.bg} />
        <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
          <div className="flex flex-wrap items-center gap-2">
            <Link href={f.href} className="type-label whitespace-nowrap text-ink hover:text-brand">
              {f.name}
            </Link>
            <Chip tone={f.chip.tone} className={`md:py-1.5 min-[1720px]:py-1`}>
              {f.chip.label}
            </Chip>
          </div>
          <p className="type-caption whitespace-nowrap text-muted">{f.meta}</p>
        </div>
      </div>

      {/* Metrics: equal thirds on mobile/tablet, fixed table columns on desktop */}
      <div className={`flex w-full items-center gap-3 min-[1720px]:contents`}>
        <div className={`flex min-w-0 flex-1 items-center gap-1.5 min-[1720px]:w-[110px] min-[1720px]:flex-none min-[1720px]:shrink-0`}>
          <Icon name="star-14-00d26a" size={14} />
          <p className="type-label whitespace-nowrap text-ink">{f.score}</p>
        </div>
        <p className={`type-label min-w-0 flex-1 whitespace-nowrap text-ink min-[1720px]:w-[120px] min-[1720px]:flex-none min-[1720px]:shrink-0`}>
          {f.allocation}
        </p>
        <p
          className={`type-label min-w-0 flex-1 whitespace-nowrap ${f.splitHighlight ? "text-brand" : "text-ink"} min-[1720px]:w-[110px] min-[1720px]:flex-none min-[1720px]:shrink-0`}
        >
          {f.split}
        </p>
      </div>

      {/* Note */}
      <label
        className={`flex w-full min-w-0 cursor-text items-center gap-1.5 rounded-[10px] border border-dashed border-line px-2.5 py-1.5 focus-within:border-muted min-[1720px]:w-[240px] min-[1720px]:shrink-0`}
      >
        <Icon name="edit-2-898587" size={14} />
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a private note…"
          aria-label={`Private note for ${f.name}`}
          className="type-caption h-5 min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-muted"
        />
      </label>

      {/* Alerts + actions */}
      <div className={`flex w-full items-center justify-between gap-2 md:gap-3 min-[1720px]:contents`}>
        <div className={`flex items-center min-[1720px]:w-[60px] min-[1720px]:shrink-0`}>
          <Toggle defaultOn={f.alerts} label={`Alerts for ${f.name}`} />
        </div>
        <div className={`flex items-center gap-2 md:gap-3 min-[1720px]:w-[230px] min-[1720px]:shrink-0 min-[1720px]:justify-end min-[1720px]:gap-1.5`}>
          <Pill variant="outline" href={f.href}>
            View firm
          </Pill>
          <Pill variant="subtle" onClick={onRemove}>
            Remove
          </Pill>
        </div>
      </div>
    </div>
  );
}
