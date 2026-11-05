import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { ClaimButton, FavouriteButton, ProfileTabs, ReviewsSection } from "./FirmInteractive";
import { DISTRIBUTION, FIRM, FIRM_DETAILS, HIGHLIGHTS, INSIGHTS, META_CHIPS, STATS } from "./data";

const HERO_BG =
  "linear-gradient(90deg, rgba(0, 209, 106, 0.15) 0%, rgba(0, 209, 106, 0) 60%), linear-gradient(90deg, #212121 0%, #212121 100%)";

const card = "flex w-full flex-col rounded-[20px] border border-line bg-surface p-4 md:p-5 xl:p-6";

/**
 * Figma: Account flow / FundingPips / Editorial profile — 432:12504 (desktop) · 497:23201 (tablet) · 497:23975 (mobile).
 * Desktop: hero spans the full 1824 content width; everything below sits in a centred 1380 column.
 */
export function FirmProfile() {
  return (
    <div className="flex w-full flex-col gap-6 px-4 pb-8 pt-8 md:gap-8 md:px-6 md:pb-12 xl:px-12 xl:pb-24">
      <nav aria-label="Breadcrumb" className="type-body-sm text-muted xl:text-center">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        {" / "}
        <Link href="/firms" className="hover:text-ink">
          Browse Firms
        </Link>
        {" / "}
        <span>{FIRM.name}</span>
      </nav>

      {/* ───────── Hero / Firm overview (432:12528) ───────── */}
      <section
        id="overview"
        className="flex w-full scroll-mt-6 flex-col gap-6 rounded-3xl border border-line p-4 md:flex-row md:items-start md:gap-8 md:p-5 xl:items-center xl:gap-12 xl:p-6"
        style={{ backgroundImage: HERO_BG }}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <div className="flex w-full items-start gap-4 md:flex-col xl:flex-row xl:items-center xl:gap-6">
            <span className="flex size-16 shrink-0 items-center justify-center rounded-[20px] border border-line bg-page xl:size-24">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={FIRM.logo} alt={`${FIRM.name} logo`} width={42} height={42} className="block size-8 xl:size-[42px]" />
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <div className="flex flex-col items-start gap-4 xl:flex-row xl:items-center">
                <h1 className="type-h1 text-ink xl:type-display">{FIRM.name} Review</h1>
                <span className="flex h-6 shrink-0 items-center gap-1.5 rounded-full border border-brand bg-brand-tint px-2.5 type-label text-brand xl:h-auto xl:px-3 xl:py-1.5">
                  <Icon name="tick-circle-outline-00d26a" size={16} />
                  Proof-verified firm
                </span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {META_CHIPS.map((c) => (
                  <li
                    key={c}
                    className="flex h-6 items-center rounded-full bg-raised px-2.5 type-caption text-ink xl:h-auto xl:px-3 xl:py-1.5"
                  >
                    {c}
                  </li>
                ))}
                <li>
                  <a
                    href={FIRM.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-6 items-center rounded-full bg-raised px-2.5 type-caption text-brand hover:underline xl:h-auto xl:px-3 xl:py-1.5"
                  >
                    fundingpips.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <p className="type-body text-muted">
            A closer look at FundingPips: firm details, trading access and proof-verified trader experiences.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={FIRM.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full bg-brand px-4 type-label text-page hover:brightness-110"
            >
              Visit Site
            </a>
            <FavouriteButton />
            <Link
              href="/reviews/new"
              className="inline-flex h-12 items-center justify-center gap-1.5 rounded-full border border-brand bg-page px-4 type-label text-ink hover:bg-brand-tint"
            >
              Leave a Review
              <Icon name="arrow-up-f0f0f0" size={16} rotate={45} />
            </Link>
          </div>
        </div>

        <div className="flex w-full shrink-0 flex-col items-start gap-3 rounded-[20px] border border-line bg-page p-4 md:w-[344px] md:p-5 xl:w-[360px] xl:items-center xl:p-6">
          <p className="text-[10px] font-semibold leading-[14px] tracking-[1.5px] text-muted">TRUST SCORE</p>
          <p className="flex items-start gap-1.5 font-semibold xl:items-baseline">
            <span className="type-h1 text-brand xl:type-display">{FIRM.score}</span>
            <span className="type-h3 text-muted">/ 5</span>
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/flows/stars-22.svg" alt="4.4 out of 5 stars" width={126} height={22} className="block h-[22px] w-[126px]" />
          <span className="flex h-6 items-center rounded-full bg-brand px-2.5 type-label text-page xl:h-auto xl:px-3 xl:py-1.5">
            {FIRM.scoreLabel}
          </span>
          <p className="type-caption text-muted">Based on 16 proof-verified reviews</p>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-[1380px] flex-col gap-6 md:gap-8">
        {/* ───────── Review statistics (432:12599) ───────── */}
        <ul className="grid w-full grid-cols-1 gap-4 xl:grid-cols-4">
          {STATS.map((s) => (
            <li key={s.label} className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-4 md:p-5 xl:p-6">
              <div className="flex w-full items-center justify-between">
                <p className="type-body-sm text-muted">{s.label}</p>
                <span className="flex size-9 items-center justify-center rounded-full bg-brand-tint">
                  <Icon name={s.icon} size={16} />
                </span>
              </div>
              <p className={`type-h1 ${s.tone === "muted" ? "text-muted" : "text-ink"}`}>{s.value}</p>
              <p className={`type-caption ${s.tone === "muted" ? "text-muted" : "text-brand"}`}>{s.sub}</p>
            </li>
          ))}
        </ul>

        <ProfileTabs />

        {/* ───────── Reviews and firm information (432:12639) ───────── */}
        <div className="grid w-full grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-[minmax(0,948fr)_minmax(0,400fr)]">
          <div className="flex min-w-0 flex-col gap-8">
            <section className={`${card} gap-4`}>
              <h2 className="type-h2 text-ink">{FIRM.name}: at a glance</h2>
              <p className="type-body text-muted">
                FundingPips is based in the UAE and was established in 2022. The supplied firm profile lists MT5 access,
                maximum allocation of $800K and a profit split of up to 90%.
              </p>
              <ul className="flex w-full flex-col gap-4 xl:flex-row">
                {HIGHLIGHTS.map((h) => (
                  <li
                    key={h.label}
                    className="flex min-w-0 flex-1 flex-col gap-1 rounded-xl border border-line bg-card p-4 md:p-5 xl:p-6"
                  >
                    <p className="type-caption text-muted">{h.label}</p>
                    <p className="type-h3 text-brand">{h.value}</p>
                  </li>
                ))}
              </ul>
              <div className="flex w-full flex-col gap-2 pt-2">
                <h2 className="type-h3 text-ink">What traders are saying</h2>
                <p className="type-body text-muted">
                  This profile brings together 16 proof-verified reviews. Traders describe their experiences with payouts,
                  trading rules and support. Read the individual accounts below to see the detail behind the 4.4 trust
                  score.
                </p>
              </div>
            </section>
            <ReviewsSection />
          </div>

          <aside className="flex min-w-0 flex-col gap-5">
            <section className={`${card} gap-6`}>
              <h2 className="type-h3 text-ink">Reviews (16)</h2>
              <div className="flex w-full flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <p className="type-h1 text-ink xl:type-display">{FIRM.score}</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/flows/stars-20.svg" alt="4.4 out of 5 stars" width={116} height={20} className="block h-5 w-[116px]" />
                  <p className="type-body-sm text-muted">Based on 16 reviews</p>
                </div>
                <ul className="flex w-full flex-col gap-2">
                  {DISTRIBUTION.map((d) => (
                    <li key={d.stars} className="flex w-full items-center gap-2">
                      <span className="flex shrink-0 items-center gap-1.5 type-label text-ink">
                        {d.stars}
                        <Icon name="star-f0f0f0" size={16} />
                      </span>
                      <span className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-raised">
                        <span className="block h-full rounded-full bg-brand" style={{ width: `${d.pct}%` }} />
                      </span>
                      <span className={`min-w-14 shrink-0 text-right type-body-sm ${d.pct ? "text-ink" : "text-muted"}`}>
                        {d.pct}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section id="firm-details" className={`${card} scroll-mt-6 gap-4`}>
              <h2 className="type-h3 text-ink">Firm Details</h2>
              <dl className="flex w-full flex-col">
                {FIRM_DETAILS.map((d, i) => (
                  <div
                    key={d.label}
                    className={`flex w-full items-center justify-between gap-4 py-3.5 ${i < FIRM_DETAILS.length - 1 ? "border-b border-line" : ""}`}
                  >
                    <dt className="type-body-sm text-muted">{d.label}</dt>
                    <dd
                      className={`text-right type-label ${d.tone === "brand" ? "text-brand" : d.tone === "muted" ? "text-muted" : "text-ink"}`}
                    >
                      {d.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <a
                href={FIRM.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-1.5 self-start rounded-full bg-brand px-4 type-label text-page hover:brightness-110 xl:self-stretch"
              >
                Visit Official Website
                <Icon name="arrow-up-151513" size={16} rotate={45} />
              </a>
            </section>

            <section id="trust-insights" className={`${card} scroll-mt-6 gap-4`}>
              <h2 className="type-h3 text-ink">Trust Insights</h2>
              {INSIGHTS.map((it) => (
                <div key={it.title} className="flex w-full items-center gap-3 rounded-xl bg-page p-4 md:p-5 xl:p-6">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-tint">
                    <Icon name={it.icon} size={16} />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <p className="type-label text-ink">{it.title}</p>
                    <p className="type-caption text-muted">{it.sub}</p>
                  </div>
                </div>
              ))}
            </section>

            <section className={`${card} gap-4`}>
              <h2 className="type-h3 text-ink">Compare this firm</h2>
              <p className="type-body-sm text-muted">See how FundingPips stacks up against other firms side by side.</p>
              <Link
                href="/compare"
                className="inline-flex h-12 items-center justify-center gap-1.5 self-start rounded-full border border-brand bg-page px-4 type-label text-ink hover:bg-brand-tint"
              >
                Compare Firms
                <Icon name="arrow-up-f0f0f0" size={16} rotate={45} />
              </Link>
            </section>

            <section
              className="flex w-full flex-col gap-4 rounded-[20px] border border-brand p-4 md:p-5 xl:p-6"
              style={{ backgroundImage: HERO_BG }}
            >
              <p className="type-table-heading text-brand">FOR FIRMS</p>
              <h2 className="type-h3 text-ink">Do you represent FundingPips?</h2>
              <p className="type-body-sm text-muted">
                Claim your firm&apos;s page to respond to reviews, manage complaints and access your analytics dashboard.
              </p>
              <ClaimButton />
              <Link href="/account" className="flex items-center gap-1 self-start type-caption text-brand hover:underline">
                Already claimed? Sign in
                <Icon name="arrow-up-00d26a" size={14} rotate={45} />
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
