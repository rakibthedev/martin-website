"use client";

import Link from "next/link";
import { Fragment, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { COMPARE_DEFAULT, COMPARE_SUGGESTED, FIRMS, POPULAR_COMPARISONS, firmById, fmtAlloc, type Firm } from "../data";
import { BestChip, FirmMark, Flag, RESP_BTN } from "../ui";

const MAX = 3;
/** Figma label "+  Add to compare" (two spaces) — keep the gap inside a nowrap button. */
const NBSP = "  ";

type Best = { trust: boolean; reviews: boolean; alloc: boolean; split: boolean };

function bestFlags(firms: Firm[]): Map<string, Best> {
  const out = new Map<string, Best>();
  const top = (get: (f: Firm) => number) => {
    const vals = firms.map(get);
    const max = Math.max(...vals);
    const allSame = vals.every((v) => v === max);
    return (f: Firm) => firms.length >= 2 && !allSame && get(f) === max;
  };
  const t = top((f) => f.trust);
  const r = top((f) => f.reviews);
  const a = top((f) => f.maxAlloc);
  const s = top((f) => f.split);
  firms.forEach((f) => out.set(f.id, { trust: t(f), reviews: r(f), alloc: a(f), split: s(f) }));
  return out;
}

function leaderOf(firms: Firm[], get: (f: Firm) => number) {
  return firms.reduce((best, f) => (get(f) > get(best) ? f : best), firms[0]);
}

function quickTake(firms: Firm[]): string {
  if (firms.length < 2)
    return "Add at least two firms to see which one leads on trust score, verified reviews, max allocation and profit split.";
  const t = leaderOf(firms, (f) => f.trust);
  const r = leaderOf(firms, (f) => f.reviews);
  const a = leaderOf(firms, (f) => f.maxAlloc);
  const s = leaderOf(firms, (f) => f.split);
  let text: string;
  if (t === r && r === a && a === s) {
    text = `${t.name} leads on all four scores: trust (${t.trust}), verified reviews (${t.reviews}), max allocation (${fmtAlloc(t.maxAlloc)}) and profit split (up to ${t.split}%).`;
  } else {
    text = `${t.name} has the highest trust score (${t.trust}), ${r.name} the most verified reviews (${r.reviews}), ${a.name} the largest allocation (${fmtAlloc(a.maxAlloc)}) and ${s.name} the best profit split (up to ${s.split}%).`;
  }
  const mt4 = firms.find((f) => f !== t && f.platforms.includes("MT4") && !t.platforms.includes("MT4"));
  if (mt4) text += ` ${mt4.name} is the better pick if you trade on MT4.`;
  if (firms.length < MAX) text += " Add a third firm to widen the comparison.";
  return text;
}

const SUBTITLE = [
  "Pick up to three firms to compare them side by side.",
  "Add at least one more firm to compare.",
  "You can add one more firm, or compare these two now.",
  "Your comparison is full. Compare these three now.",
];

export function CompareView({ criteria }: { criteria: React.ReactNode }) {
  const [sel, setSel] = useState<string[]>(COMPARE_DEFAULT);
  const [query, setQuery] = useState("");
  const builderRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const tableRef = useRef<HTMLHeadingElement>(null);

  const firms = sel.map(firmById);
  const n = firms.length;
  const best = bestFlags(firms);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    const pool = q
      ? FIRMS.filter((f) => f.name.toLowerCase().includes(q))
      : [...COMPARE_SUGGESTED.map(firmById), ...FIRMS.filter((f) => !COMPARE_SUGGESTED.includes(f.id))];
    return pool.filter((f) => !sel.includes(f.id)).slice(0, 3);
  }, [query, sel]);

  const add = (id: string) => {
    setSel((s) => (s.includes(id) || s.length >= MAX ? s : [...s, id]));
    setQuery("");
  };
  const remove = (id: string) => setSel((s) => s.filter((x) => x !== id));
  const focusSearch = () => {
    builderRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => searchRef.current?.focus({ preventScroll: true }), 300);
  };
  const toTable = () => tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const columns: (Firm | null)[] = [...firms, ...Array<null>(MAX - n).fill(null)];
  const slotsLeft = MAX - n;

  return (
    <>
      {/* ------------------------------------------------ Comparison builder */}
      <section
        ref={builderRef}
        className="flex w-full scroll-mt-6 flex-col gap-6 rounded-3xl border border-line bg-surface p-4 md:p-5 xl:p-6"
      >
        <div className="flex w-full flex-col md:flex-row md:flex-wrap md:items-start md:gap-y-2 xl:items-center xl:justify-between">
          <div className="flex min-w-0 flex-col gap-1 md:flex-1 xl:flex-none">
            <h2 className="type-h2 text-ink">Your comparison</h2>
            <p className="type-body-sm text-muted">{SUBTITLE[n]}</p>
          </div>
          <div className="flex items-center gap-3 md:flex-1 xl:flex-none">
            <span className="flex shrink-0 gap-1.5" aria-hidden>
              {Array.from({ length: MAX }, (_, i) => (
                <span key={i} className={`size-[10px] rounded-full ${i < n ? "bg-brand" : "bg-line"}`} />
              ))}
            </span>
            <p className="type-label text-brand">
              {n} of {MAX} firms selected
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-4 xl:flex-row xl:items-stretch">
          {firms.map((f, i) => (
            <Fragment key={f.id}>
              {i > 0 && <VsBadge />}
              <FilledSlot firm={f} onRemove={() => remove(f.id)} />
            </Fragment>
          ))}
          {n < MAX && (
            <>
              {n > 0 && <VsBadge />}
              <div className="flex min-w-0 flex-col gap-[14px] rounded-[20px] border border-dashed border-brand bg-page p-4 md:p-5 xl:flex-1 xl:p-6">
                <div className="flex w-full items-center gap-3 md:flex-col md:items-start xl:flex-row xl:items-center">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand">
                    <Icon name="add-151513" size={24} />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <p className="type-h3 text-ink">Add a firm to compare</p>
                    <p className="type-caption text-muted">
                      {slotsLeft} slot{slotsLeft > 1 ? "s" : ""} left{n >= 2 ? " · optional" : ""}
                    </p>
                  </div>
                </div>
                <label className="flex w-full cursor-text items-center gap-[10px] rounded-full border border-line bg-surface px-4 py-3 focus-within:border-brand">
                  <Icon name="search-normal-898587" size={16} />
                  <input
                    ref={searchRef}
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search 36 firms…"
                    aria-label="Search firms to compare"
                    className="min-w-0 flex-1 bg-transparent type-body-sm text-ink outline-none placeholder:text-muted"
                  />
                </label>
                <p className="text-[10px] font-semibold leading-[14px] tracking-[1.2px] text-muted">SUGGESTED FOR YOU</p>
                <ul className="flex w-full flex-col gap-2">
                  {suggestions.length === 0 && <li className="type-caption text-muted">No firms match “{query}”.</li>}
                  {suggestions.map((f, i) => (
                    <li
                      key={f.id}
                      className="flex w-full items-center gap-3 rounded-[14px] border border-line bg-surface p-4 md:flex-col md:items-start md:p-5 xl:flex-row xl:items-center xl:p-4 2xl:p-6"
                    >
                      <FirmMark firm={f} size={36} logoW={21.6} />
                      <div className="flex min-w-0 flex-1 flex-col gap-0.5 md:w-full xl:w-auto">
                        <p className="truncate type-label text-ink md:whitespace-normal xl:truncate">{f.name}</p>
                        <p className="flex items-center gap-1 whitespace-nowrap type-caption text-brand">
                          <Icon name="star-00d26a" size={14} />
                          {f.trust.toFixed(1)} · {f.reviews} reviews
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant={i === 0 ? "primary" : "outline"}
                        className={RESP_BTN}
                        onClick={() => add(f.id)}
                      >
                        + Add
                      </Button>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/firms"
                  className="flex h-10 w-full items-center justify-center gap-1.5 pt-1 type-body-sm text-brand hover:underline md:h-12"
                >
                  Browse all 36 firms
                  <Icon name="arrow-right-00d26a" size={16} />
                </Link>
              </div>
            </>
          )}
        </div>

        <div className="flex w-full flex-col items-start gap-3 xl:flex-row xl:items-center">
          <Button size="sm" className={RESP_BTN} trailing="arrow-right-151513" onClick={toTable} disabled={n < 2}>
            Compare {n} firm{n === 1 ? "" : "s"}
          </Button>
          <Button size="sm" variant="outline" className={RESP_BTN} onClick={focusSearch} disabled={n >= MAX}>
            +{NBSP}Add to compare
          </Button>
          <div className="flex items-center gap-3 md:contents">
            <Button size="sm" variant="outline" className={RESP_BTN} onClick={focusSearch}>
              Change firms
            </Button>
            <Button size="sm" variant="subtle" className={RESP_BTN} onClick={() => setSel([])} disabled={n === 0}>
              Clear all
            </Button>
          </div>
          <p className="flex items-start gap-1 type-caption text-muted xl:items-center">
            <Icon name="info-circle-898587" size={14} className="mt-[3px] xl:mt-0" />
            Tip: comparing 3 firms gives you a clearer picture.
          </p>
        </div>
      </section>

      {criteria}

      <h2 ref={tableRef} id="comparison" className="scroll-mt-6 type-h2 text-ink">
        Side-by-side comparison
      </h2>

      {/* ------------------------------------------------ Desktop table */}
      <div className="hidden w-full flex-col rounded-[20px] border border-line bg-surface p-6 xl:flex">
        <Row className="border-b border-line bg-raised py-[18px]" label={<span className="type-table-heading">FIRM</span>}>
          {columns.map((f, i) =>
            f ? (
              <div key={f.id} className="flex min-w-0 flex-1 items-center gap-3">
                <FirmMark firm={f} size={40} logoW={24} />
                <p className="truncate type-h3 text-ink">{f.name}</p>
              </div>
            ) : (
              <div key={`e${i}`} className="flex min-w-0 flex-1">
                <AddPill onClick={focusSearch} className="h-12" />
              </div>
            ),
          )}
        </Row>
        <Row className="border-b border-line py-6" label="Trust score">
          {columns.map((f, i) => (
            <Cell key={f?.id ?? `e${i}`} empty={!f} first>
              {f && <TrustValue firm={f} best={best.get(f.id)!.trust} />}
            </Cell>
          ))}
        </Row>
        <Row className="border-b border-line py-6" label="Verified reviews">
          {columns.map((f, i) => (
            <Cell key={f?.id ?? `e${i}`} empty={!f}>
              {f && <Metric best={best.get(f.id)!.reviews}>{f.reviews} reviews</Metric>}
            </Cell>
          ))}
        </Row>
        <Row className="border-b border-line py-6" label="Country">
          {columns.map((f, i) => (
            <Cell key={f?.id ?? `e${i}`} empty={!f}>
              {f && <CountryValue firm={f} />}
            </Cell>
          ))}
        </Row>
        <Row className="border-b border-line py-6" label="Platform">
          {columns.map((f, i) => (
            <Cell key={f?.id ?? `e${i}`} empty={!f}>
              {f && <Metric best={false}>{f.platforms}</Metric>}
            </Cell>
          ))}
        </Row>
        <Row className="border-b border-line py-6" label="Max allocation">
          {columns.map((f, i) => (
            <Cell key={f?.id ?? `e${i}`} empty={!f}>
              {f && <Metric best={best.get(f.id)!.alloc}>{fmtAlloc(f.maxAlloc)}</Metric>}
            </Cell>
          ))}
        </Row>
        <Row className="border-b border-line py-6" label="Profit split">
          {columns.map((f, i) => (
            <Cell key={f?.id ?? `e${i}`} empty={!f}>
              {f && <Metric best={best.get(f.id)!.split}>Up to {f.split}%</Metric>}
            </Cell>
          ))}
        </Row>
        <Row className="py-[18px]" label="">
          {columns.map((f, i) => (
            <div key={f?.id ?? `e${i}`} className="flex min-w-0 flex-1">
              {f ? <ViewFirm firm={f} className="h-12" /> : <AddButton onClick={focusSearch} className="h-12" />}
            </div>
          ))}
        </Row>
      </div>

      {/* ------------------------------------------------ Tablet / mobile cards */}
      <div className="flex w-full flex-col gap-4 xl:hidden">
        {columns.map((f, i) => (
          <article key={f?.id ?? `e${i}`} className="flex w-full flex-col gap-2 rounded-2xl border border-line bg-surface p-4 md:p-5">
            {f ? (
              <div className="flex items-center gap-3">
                <FirmMark firm={f} size={40} logoW={24} />
                <p className="min-w-0 type-h3 text-ink">{f.name}</p>
              </div>
            ) : (
              <div className="flex">
                <AddPill onClick={focusSearch} className="h-10 md:h-11" gap="gap-3" />
              </div>
            )}
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
              <CardMetric label="Trust score">
                {f ? <TrustValue firm={f} best={best.get(f.id)!.trust} /> : <Empty first />}
              </CardMetric>
              <CardMetric label="Verified reviews">
                {f ? <Metric best={best.get(f.id)!.reviews}>{f.reviews} reviews</Metric> : <Empty />}
              </CardMetric>
              <CardMetric label="Country">{f ? <CountryValue firm={f} /> : <Empty />}</CardMetric>
              <CardMetric label="Platform">{f ? <Metric best={false}>{f.platforms}</Metric> : <Empty />}</CardMetric>
              <CardMetric label="Max allocation">
                {f ? <Metric best={best.get(f.id)!.alloc}>{fmtAlloc(f.maxAlloc)}</Metric> : <Empty />}
              </CardMetric>
              <CardMetric label="Profit split">
                {f ? <Metric best={best.get(f.id)!.split}>Up to {f.split}%</Metric> : <Empty />}
              </CardMetric>
            </div>
            <div className="flex py-3">
              {f ? <ViewFirm firm={f} className="h-10 md:h-11" /> : <AddButton onClick={focusSearch} className="h-10 md:h-11" />}
            </div>
          </article>
        ))}
      </div>

      {/* ------------------------------------------------ Quick take */}
      <section className="flex w-full items-start gap-4 rounded-2xl border border-brand bg-brand-tint p-4 md:items-center md:p-5 xl:p-6">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand">
          <Icon name="tick-circle-151513" size={16} />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className="type-label text-ink">Quick take</p>
          <p className="type-body-sm text-muted">{quickTake(firms)}</p>
        </div>
      </section>

      {/* ------------------------------------------------ Popular comparisons */}
      <section className="flex w-full flex-col gap-5 pt-4">
        <div className="flex w-full items-start justify-between gap-0 xl:items-center">
          <h2 className="min-w-0 flex-1 type-h2 text-ink">Popular comparisons</h2>
          <p className="shrink-0 whitespace-nowrap type-body-sm text-muted">Start with one tap</p>
        </div>
        <ul className="grid w-full grid-cols-1 gap-4 xl:grid-cols-4">
          {POPULAR_COMPARISONS.map((p) => {
            const a = firmById(p.a);
            const b = firmById(p.b);
            return (
              <li key={p.a + p.b} className="flex min-w-0 flex-col items-start gap-4 rounded-2xl border border-line bg-surface p-4 md:p-5 xl:p-6">
                <div className="flex items-center gap-2">
                  <FirmMark firm={a} size={44} logoW={26.4} textClass="type-label" />
                  <span className="type-caption text-muted">vs</span>
                  <FirmMark firm={b} size={44} logoW={26.4} textClass="type-label" />
                </div>
                <p className="w-full type-label text-ink">
                  {a.name} vs {b.name}
                </p>
                <p className="type-caption text-muted">{p.caption}</p>
                <button
                  type="button"
                  onClick={() => {
                    setSel([p.a, p.b]);
                    builderRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="flex h-10 items-center gap-1.5 type-body-sm text-brand hover:underline md:h-11 xl:h-12"
                >
                  Compare now
                  <Icon name="arrow-right-00d26a" size={16} />
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

/* ---------------------------------------------------------------- pieces */

function VsBadge() {
  return (
    <span className="flex size-11 shrink-0 items-center justify-center self-start rounded-full bg-raised type-caption text-muted md:self-center">
      VS
    </span>
  );
}

function FilledSlot({ firm, onRemove }: { firm: Firm; onRemove: () => void }) {
  const rating = (
    <span className="flex shrink-0 items-center gap-1 rounded-full bg-brand-tint px-[10px] py-1 type-caption text-brand">
      <Icon name="star-00d26a" size={14} />
      {firm.trust.toFixed(1)} trust score
    </span>
  );
  return (
    <div className="flex min-w-0 flex-col items-start justify-center gap-[14px] rounded-[20px] border border-brand bg-card p-4 md:p-5 xl:flex-1 xl:items-center xl:p-6">
      {/* desktop: centred stack */}
      <div className="hidden flex-col items-center gap-[14px] xl:flex">
        <FirmMark firm={firm} size={114} logoW={38.4} radius={14} />
        <p className="type-h2 text-ink">{firm.name}</p>
        {rating}
      </div>
      {/* tablet / mobile: logo + rating, then name */}
      <div className="flex w-full flex-col gap-2 xl:hidden">
        <div className="flex w-full items-start justify-between gap-2">
          <FirmMark firm={firm} size={48} logoW={38.4} radius={14} />
          {rating}
        </div>
        <p className="type-h2 text-ink">{firm.name}</p>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="flex h-10 items-center gap-1.5 type-body-sm text-muted hover:text-ink md:h-12"
      >
        <Icon name="add-898587" size={16} rotate={45} />
        Remove
      </button>
    </div>
  );
}

function Row({ label, className, children }: { label: React.ReactNode; className: string; children: React.ReactNode }) {
  return (
    <div className={`flex w-full items-center px-6 ${className}`}>
      <div className="w-[300px] shrink-0 type-body-sm text-muted">{label}</div>
      {children}
    </div>
  );
}

function Cell({ empty, first, children }: { empty: boolean; first?: boolean; children?: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-[10px]">{empty ? <Empty first={first} /> : children}</div>
  );
}

function Empty({ first }: { first?: boolean }) {
  return <p className="type-caption text-muted">{first ? "Add a firm to see its data" : "—"}</p>;
}

function Metric({ best, children }: { best: boolean; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-[10px]">
      <span className={best ? "type-h3 text-ink" : "type-label text-ink"}>{children}</span>
      {best && <BestChip />}
    </span>
  );
}

function TrustValue({ firm, best }: { firm: Firm; best: boolean }) {
  return (
    <span className="flex items-center gap-[10px]">
      <span className="flex items-center gap-1.5 type-h3 text-ink">
        <Icon name="star-f0f0f0" size={24} />
        {firm.trust.toFixed(1)} / 5
      </span>
      {best && <BestChip />}
    </span>
  );
}

function CountryValue({ firm }: { firm: Firm }) {
  return (
    <span className="flex items-center gap-2 type-label text-ink">
      <Flag flag={firm.flag} code={firm.countryCode} h={12} />
      {firm.countryCode}
    </span>
  );
}

function CardMetric({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-2 py-3">
      <p className="type-body-sm text-muted">{label}</p>
      <div className="flex min-h-5 items-center">{children}</div>
    </div>
  );
}

function AddPill({ onClick, className, gap = "gap-[10px]" }: { onClick: () => void; className: string; gap?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center ${gap} rounded-full border border-dashed border-brand py-1.5 pl-1.5 pr-4 type-label text-brand hover:bg-brand-tint ${className}`}
    >
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand">
        <Icon name="add-151513" size={16} />
      </span>
      Add to compare
    </button>
  );
}

function AddButton({ onClick, className }: { onClick: () => void; className: string }) {
  return (
    <Button size="sm" className={className} onClick={onClick}>
      +{NBSP}Add to compare
    </Button>
  );
}

function ViewFirm({ firm, className }: { firm: Firm; className: string }) {
  return (
    <Button href={firm.href} size="sm" variant="outline" className={className} trailing="arrow-up-f0f0f0" trailingRotate={45}>
      View {firm.name}
    </Button>
  );
}

