import { Fragment } from "react";
import { Icon } from "@/components/ui/Icon";
import { CRITERIA } from "../data";
import { IconBadge } from "../ui";

const HERO_BG = "linear-gradient(90deg, rgba(0, 209, 106, 0.15) 0%, rgba(0, 209, 106, 0) 60%), #212121";
const STEPS = ["Pick up to 3 firms", "See them side by side", "Choose with confidence"];

/** Figma "Hero" (379:14491 / 497:45069 / 497:45488). */
export function CompareHero() {
  return (
    <section
      className="flex w-full flex-col items-start gap-5 overflow-hidden rounded-3xl border border-line p-4 md:p-5 xl:gap-8 xl:p-6"
      style={{ backgroundImage: HERO_BG }}
    >
      <p className="text-[10px] font-semibold leading-[14px] tracking-[1.5px] text-brand">COMPARE FIRMS</p>
      <h1 className="type-h1 text-ink xl:type-display">See the difference. Choose with confidence.</h1>
      <p className="type-body text-muted">
        Put up to three prop firms side by side and compare trust scores, reviews and trading details — without
        switching between pages.
      </p>
      <ol className="flex w-full flex-col items-start gap-3 pt-2 md:flex-row md:flex-wrap md:items-center xl:flex-nowrap">
        {STEPS.map((step, i) => (
          <Fragment key={step}>
            {i > 0 && <Icon name="arrow-right-898587" size={16} />}
            <li className="flex w-full items-center gap-[10px] rounded-full border border-line bg-brand-tint py-[10px] pl-[10px] pr-4 md:w-auto">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-brand bg-brand-tint type-label text-brand">
                {i + 1}
              </span>
              <span className="type-label text-ink">{step}</span>
            </li>
          </Fragment>
        ))}
      </ol>
      <p className="type-caption text-muted">
        Design preview · figures and offers are sample content from the supplied directory, not a live feed.
      </p>
    </section>
  );
}

/** Figma "What you will compare" (379:14634 / 497:45212 / 497:45631). */
export function CompareCriteria() {
  return (
    <section className="flex w-full flex-col gap-5 pt-4">
      <h2 className="type-h2 text-ink">What you’ll compare</h2>
      <ul className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
        {CRITERIA.map((c) => (
          <li
            key={c.label}
            className="flex min-w-0 items-start gap-3 rounded-2xl border border-line bg-surface p-4 md:flex-col md:p-5 xl:p-6"
          >
            <IconBadge size={36} icon={c.icon} glyph={c.glyph} />
            <div className="flex min-w-0 flex-col gap-1 md:gap-3">
              <p className="type-label text-ink">{c.label}</p>
              <p className="type-caption text-muted">{c.caption}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
