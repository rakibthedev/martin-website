import { FirmLogo } from "@/components/ui/FirmLogo";
import { Icon } from "@/components/ui/Icon";
import { CopyButton } from "./CopyButton";
import { ShortlistCard } from "./ShortlistCard";
import { StatCard } from "./StatCard";
import { StatusBadge } from "./StatusBadge";
import { CARD, CardHeader, Pill } from "./ui";
import { ACTIVITY, FIRM_COLORS, OFFERS, OVERVIEW_REVIEWS, OVERVIEW_STATS, type OverviewReview } from "./data";

/** Side column used next to a flexible card on desktop (Figma: fixed 480px of a 1504px main column). */
export const SIDE_COL = "2xl:w-[32%] 2xl:min-w-[320px] 2xl:max-w-[480px] 2xl:shrink-0 2xl:self-stretch";

/** Figma "Account stats" (370:476): 1 / 2 / 4 columns, gap 16. */
export function AccountStats({ stats = OVERVIEW_STATS }: { stats?: typeof OVERVIEW_STATS }) {
  return (
    <section className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
      {stats.map((s) => (
        <StatCard key={s.label} {...s} padding="p-4 md:p-5 xl:p-6" />
      ))}
    </section>
  );
}

function ReviewRow({ r }: { r: OverviewReview }) {
  return (
    <div className="flex w-full flex-col items-start gap-3 p-4 md:flex-row md:p-5 xl:items-center xl:gap-4 xl:p-6">
      <div className="flex w-full min-w-0 items-center gap-3 md:flex-1 xl:gap-4">
        <FirmLogo initials={r.initials} size={44} textSize={14} className={FIRM_COLORS[r.initials]} />
        <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
          <div className="flex w-full flex-wrap items-center gap-x-2.5 gap-y-3 md:gap-y-0">
            <p className="whitespace-nowrap text-[16px] font-extrabold leading-normal text-ink">{r.firm}</p>
            <StatusBadge status={r.status} className="md:w-[123px]" />
          </div>
          {r.rating ? (
            <div className="flex w-full flex-wrap items-center gap-2">
              <Icon name="star-00d26a" size={14} />
              <span className="text-[12px] font-semibold leading-4 text-ink">{r.rating}</span>
              <span className="type-caption text-muted">·</span>
              <span className="type-caption min-w-0 text-muted">{r.meta}</span>
            </div>
          ) : (
            <p className="type-caption text-muted">{r.meta}</p>
          )}
          {r.note && (
            <div className="flex w-full items-center gap-1.5 pt-1">
              <Icon name="info-circle-ff6b6b" size={14} />
              <p className="type-caption min-w-0 flex-1 text-danger">{r.note}</p>
            </div>
          )}
        </div>
      </div>
      <Pill href={r.action.href} variant={r.action.primary ? "primary" : "outline"}>
        {r.action.label}
      </Pill>
    </div>
  );
}

/** Figma "Reviews and shortlist" (370:554). */
export function ReviewsAndShortlist() {
  return (
    <div className="flex w-full flex-col gap-6 2xl:flex-row 2xl:items-start">
      <section className={`${CARD} flex w-full min-w-0 flex-col gap-5 2xl:flex-1`}>
        <CardHeader title="My reviews" count="7" link="View all reviews" href="/account/reviews" />
        <div className="flex w-full flex-col">
          {OVERVIEW_REVIEWS.map((r, i) => (
            <div key={r.firm} className="w-full">
              {i > 0 && <div className="h-px w-full bg-line" />}
              <ReviewRow r={r} />
            </div>
          ))}
        </div>
      </section>
      <ShortlistCard className={SIDE_COL} />
    </div>
  );
}

/** Figma "Offers and activity" (370:835). */
export function OffersAndActivity() {
  return (
    <div className="flex w-full flex-col gap-6 2xl:flex-row 2xl:items-start">
      <section className={`${CARD} flex w-full min-w-0 flex-col gap-5 2xl:flex-1`}>
        <CardHeader title="Offers picked for you" link="All offers" href="/offers" />
        <p className="type-body-sm w-full text-muted">
          Based on firms you saved and reviewed. Codes are exclusive to signed-in members.
        </p>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
          {OFFERS.map((o) => (
            <div
              key={o.firm}
              className={`@container flex min-w-0 flex-col items-start gap-[14px] self-start rounded-[20px] border bg-card p-4 md:p-5 xl:p-6 ${
                o.urgent ? "border-brand" : "border-line"
              }`}
            >
              <div className="flex w-full items-center gap-2.5">
                <FirmLogo initials={o.initials} size={36} textSize={12} className={FIRM_COLORS[o.initials]} />
                <p className="type-label truncate text-ink">{o.firm}</p>
              </div>
              <p className="whitespace-nowrap text-[28px] font-extrabold leading-[34px] text-brand">{o.discount}</p>
              <div className="flex w-full flex-col items-start gap-3 rounded-[14px] border border-dashed border-brand bg-brand-tint p-5 @[240px]:flex-row @[240px]:items-center @[240px]:gap-0 @[240px]:py-2 @[240px]:pl-3.5 @[240px]:pr-2">
                <p className="type-label min-w-0 text-ink @[240px]:flex-1">Code: {o.code}</p>
                <CopyButton text={o.code} />
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name={o.urgent ? "clock-f5a524" : "clock-898587"} size={14} />
                <p className={`type-caption whitespace-nowrap ${o.urgent ? "text-warning" : "text-muted"}`}>
                  {o.expiry}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className={`${CARD} flex w-full flex-col gap-5 ${SIDE_COL}`}>
        <CardHeader title="Recent activity" link="See all" href="/account/notifications" />
        <ul className="flex w-full flex-col gap-4 xl:gap-[18px]">
          {ACTIVITY.map((a) => (
            <li key={a.text} className="flex w-full items-start gap-3 md:items-center">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-raised">
                <Icon name={a.icon} size={16} />
              </span>
              <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
                <p className="type-body-sm w-full text-ink">{a.text}</p>
                <p className="type-caption whitespace-nowrap text-muted">{a.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
