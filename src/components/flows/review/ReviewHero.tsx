import { Icon } from "@/components/ui/Icon";

const FACTS = [
  { icon: "timer-00d26a", title: "~5 min", sub: "to complete", pad: "p-4 md:p-6" },
  { icon: "tick-circle-outline-00d26a", title: "Verified", sub: "reviews get a badge", pad: "py-3.5 pl-3.5 pr-4 md:pr-[18px]" },
  { icon: "save-2-00d26a", title: "Auto-saved", sub: "as you type", pad: "p-4 md:p-6" },
];

/** Figma "Hero" (432:11758 desktop · 497:22339 tablet · 497:22772 mobile). */
export function ReviewHero() {
  return (
    <section className="flex w-full flex-col gap-6 p-4 md:flex-row md:items-start md:gap-0 md:p-5 xl:flex-wrap xl:items-end xl:justify-between xl:gap-x-12 xl:gap-y-6 xl:p-6">
      <div className="flex min-w-0 flex-1 flex-col gap-4 xl:min-w-[680px]">
        <p className="text-[10px] font-semibold leading-[14px] tracking-[1.5px] text-brand">SUBMIT A REVIEW</p>
        <h1 className="type-h1 text-ink xl:type-display xl:tracking-[-3px]">
          Your experience. <span className="text-brand">Backed by proof.</span>
        </h1>
        <p className="text-[20px] leading-6 text-muted">
          Help other traders understand a firm through a clear, honest account of your experience. Takes about 5 minutes.
        </p>
      </div>
      <ul className="flex w-full shrink-0 flex-col gap-3 p-4 md:w-[360px] md:p-5 xl:w-auto xl:flex-row xl:items-start xl:p-6">
        {FACTS.map((f) => (
          <li
            key={f.title}
            className={`flex items-center gap-3 rounded-[18px] border border-line bg-surface ${f.pad}`}
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-tint">
              <Icon name={f.icon} size={20} />
            </span>
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="type-label text-ink">{f.title}</span>
              <span className="type-caption text-muted">{f.sub}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
