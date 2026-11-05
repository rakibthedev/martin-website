import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { ARTICLE_HREF, CONTINUE_READING } from "../data";
import { btnClass } from "../ui";

/** Figma "Continue reading" (381:4907 · tablet 497:45963 · mobile 497:46468). */
export function ContinueReading() {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex min-w-0 flex-1 flex-col gap-2.5 md:flex-row md:items-center">
          <h2 className="type-h2">Continue reading</h2>
          <p className="type-body-sm text-muted">Only you can see this</p>
        </div>
        <Link
          href="/account/favourites"
          className="flex h-10 shrink-0 items-center gap-1.5 self-start type-label text-brand hover:underline md:h-11 md:self-auto xl:h-12"
        >
          <Icon name="bookmark-filled-00d26a" size={16} />
          Saved articles (5)
          <Icon name="arrow-right-00d26a" size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {CONTINUE_READING.map((c) => (
          <div
            key={c.title}
            className="flex min-w-0 items-start gap-4 rounded-3xl border border-line bg-surface p-4 md:flex-col md:p-5 xl:flex-row xl:items-center xl:p-6"
          >
            <div className="flex h-[23px] shrink-0 items-center justify-center rounded-2xl text-[18px] font-extrabold leading-none text-brand md:w-[72px] xl:size-[72px] bg-[linear-gradient(90deg,rgba(0,209,106,0.15)_0%,rgba(0,209,106,0)_60%),linear-gradient(90deg,#052116_0%,#052116_100%)]">
              <span className="leading-[23px]">{c.pct}%</span>
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1.5 md:w-full xl:w-auto">
              <p className="text-[10px] font-bold leading-[13px] tracking-[1px] text-brand">{c.eyebrow}</p>
              <p className="text-[16px] font-extrabold leading-[22px]">{c.title}</p>
              <div className="flex items-center gap-2.5">
                <div className="h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-raised xl:w-[140px] xl:flex-none">
                  <div className="h-full rounded-full bg-brand" style={{ width: `${c.pct}%` }} />
                </div>
                <span className="type-caption whitespace-nowrap text-muted">{c.left}</span>
              </div>
            </div>
            <Link href={ARTICLE_HREF} className={btnClass("outline")}>
              Resume
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
