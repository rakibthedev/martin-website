import Link from "next/link";
import { Fragment } from "react";
import { Icon } from "@/components/ui/Icon";
import { BENEFITS, CHANNELS, RECENT, VISITS, type ActivityStatus } from "../data";
import { SectionHeader } from "../ui";

/** Small arrow connector between cards: pill on mobile, circle on tablet, 44px circle on desktop. */
export function Connector({ label }: { label?: string }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center gap-1.5 self-start rounded-full bg-raised md:self-center ${
        label ? "h-6 w-[92px] md:size-[92px] xl:h-11 xl:w-[92px]" : "h-4 w-11 md:size-11"
      }`}
    >
      <Icon name="arrow-right-00d26a" size={16} />
      {label && <span className="type-label text-brand">{label}</span>}
    </span>
  );
}

const STEPS = [
  { n: "01", icon: "user-00d26a", title: "Create your account", body: "Keep your referrals and saved firms together.", time: "~1 min" },
  { n: "02", icon: "link-00d26a", title: "Share your link", body: "Invite traders who want to research their next firm.", time: "1 tap" },
  { n: "03", icon: "chart-00d26a", title: "Follow your activity", body: "View your invitations from your account.", time: "Any time" },
];

/** Figma "How it works" (379:15048 · tablet 497:47031 · mobile 497:47518). */
export function HowItWorks() {
  return (
    <section className="flex flex-col gap-6 md:gap-8">
      <div className="flex flex-col items-start gap-2 md:flex-row md:justify-between md:gap-4 xl:items-end">
        <SectionHeader
          overline="HOW IT WORKS"
          title="Three steps. That’s it."
          body="From sign-up to your first shared link in a few minutes."
          className="md:flex-1"
        />
        <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-0 type-label md:py-1 xl:py-2.5">
          <Icon name="timer-f0f0f0" size={16} />
          About 3 minutes in total
        </span>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        {STEPS.map((s, i) => (
          <Fragment key={s.n}>
            {i > 0 && <Connector />}
            <div
              className={`flex min-w-0 flex-1 flex-col gap-[18px] rounded-[28px] border p-4 md:p-5 xl:p-6 ${
                i === 0
                  ? "border-brand bg-[linear-gradient(90deg,rgba(0,209,106,0.15)_0%,rgba(0,209,106,0)_60%),linear-gradient(90deg,#212121_0%,#212121_100%)]"
                  : "border-line bg-surface"
              }`}
            >
              <div className="flex items-center justify-between md:flex-col-reverse md:items-start md:gap-4 xl:flex-row xl:items-center xl:gap-0">
                <span
                  className={`text-[36px] font-semibold leading-[1.06] xl:text-[56px] xl:font-extrabold xl:tracking-[-2px] ${
                    i === 0 ? "text-brand" : "text-muted"
                  }`}
                >
                  {s.n}
                </span>
                <span className="flex size-14 items-center justify-center rounded-full bg-page">
                  <Icon name={s.icon} size={24} />
                </span>
              </div>
              <h3 className="text-[28px] font-extrabold leading-[1.06] tracking-[-0.8px]">{s.title}</h3>
              <p className="type-body text-muted">{s.body}</p>
              <span
                className={`inline-flex items-center gap-1 self-start rounded-full px-3 py-0.5 type-caption text-brand xl:py-1.5 ${
                  i === 0 ? "bg-brand-tint" : "bg-card"
                }`}
              >
                <Icon name="timer-00d26a" size={14} />
                {s.time}
              </span>
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}

/** Figma "Referral insights" (379:15154 · tablet 497:47137 · mobile 497:47624). */
export function ReferralInsights() {
  return (
    <section className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_480px] xl:items-stretch">
      <div className="flex min-w-0 flex-col gap-4 rounded-3xl border border-line bg-surface p-4 md:p-5 xl:p-6">
        <div className="flex flex-wrap items-start justify-between gap-2 xl:items-center">
          <div className="flex flex-col gap-0.5">
            <p className="type-label">Link visits this week</p>
            <p className="text-[28px] font-extrabold leading-[1.1] tracking-[-0.5px]">42 visits</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-tint px-3 py-0.5 type-caption text-brand xl:py-1.5">
            <Icon name="arrow-up-bold-00d26a" size={14} />
            18% vs last week
          </span>
        </div>
        <div className="flex items-end gap-2 md:gap-2.5 xl:gap-3.5" role="img" aria-label="Link visits per day this week">
          {VISITS.map((d) => (
            <div key={d.day} className="flex min-w-0 flex-1 flex-col items-center gap-2">
              <span className={`type-caption ${d.top ? "text-brand" : "text-muted"}`}>{d.v}</span>
              <span
                className={`w-full rounded-[10px] ${d.top ? "bg-brand" : "bg-raised"}`}
                style={{ height: d.h }}
              />
              <span className="type-caption text-muted">{d.day}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex min-w-0 flex-col gap-3.5 rounded-3xl border border-line bg-surface p-4 md:p-5 xl:p-6">
        <p className="type-label">Where your visits come from</p>
        {CHANNELS.map((c) => (
          <div key={c.name} className="flex flex-col gap-1.5">
            <div className="flex items-start justify-between">
              <span className="flex items-center gap-1.5 type-body-sm">
                {c.x && <Icon name="x-logo-f0f0f0" size={16} />}
                {c.name}
              </span>
              <span className={`type-label ${c.top ? "text-brand" : ""}`}>{c.pct}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-raised">
              <div className={`h-full rounded-full ${c.top ? "bg-brand" : "bg-muted"}`} style={{ width: `${c.pct}%` }} />
            </div>
          </div>
        ))}
        <p className="type-caption text-brand">Tip: Telegram works best for you — share there first.</p>
      </div>
    </section>
  );
}

const STATUS: Record<ActivityStatus, { cls: string; icon: string }> = {
  Joined: { cls: "border border-brand bg-brand-tint text-brand", icon: "tick-circle-outline-00d26a" },
  Invited: { cls: "bg-raised text-ink", icon: "sms-f0f0f0" },
  "Clicked link": { cls: "bg-raised text-ink", icon: "eye-f0f0f0" },
};

/** Figma "Recent activity" (379:15222 · tablet 497:47205 · mobile 497:47692). */
export function RecentActivity() {
  return (
    <section className="flex flex-col rounded-3xl border border-line bg-surface p-4 md:p-5 xl:p-6">
      <div className="flex items-center justify-between gap-4 px-4 pb-5 pt-6 md:px-6 xl:px-7">
        <div className="flex min-w-0 flex-col gap-0.5">
          <h2 className="type-h3">Recent activity</h2>
          <p className="type-caption text-muted">Names are partly hidden to protect privacy.</p>
        </div>
        <Link href="/account/referrals" className="flex h-12 shrink-0 items-center gap-1.5 type-label text-brand hover:underline">
          View all
          <Icon name="arrow-right-00d26a" size={16} />
        </Link>
      </div>
      <div className="flex flex-col bg-raised px-4 py-3 text-[10px] font-semibold leading-[14px] tracking-[1.2px] text-muted md:flex-row md:px-6 xl:px-7">
        <span className="md:flex-1">TRADER</span>
        <span className="md:flex-1">CHANNEL</span>
        <span className="md:flex-1">DATE</span>
        <span className="md:flex-1">STATUS</span>
      </div>
      {RECENT.map((r, i) => (
        <div
          key={r.name}
          className={`flex flex-col items-start gap-1 px-4 py-4 md:flex-row md:items-center md:gap-0 md:px-5 xl:p-6 ${
            i < RECENT.length - 1 ? "border-b border-line" : "xl:px-7 xl:py-4"
          }`}
        >
          <div className="flex items-center gap-3 md:flex-1">
            <span className="flex size-8 items-center justify-center rounded-full bg-raised type-caption text-brand">{r.initial}</span>
            <span className="type-label">{r.name}</span>
          </div>
          <span className="flex items-center gap-1.5 type-body-sm md:flex-1">
            {r.x && <Icon name="x-logo-f0f0f0" size={16} />}
            {r.channel}
          </span>
          <span className="type-body-sm text-muted md:flex-1">{r.date}</span>
          <span className="md:flex-1">
            <span className={`inline-flex items-center gap-1 rounded-full px-3 py-0.5 type-caption xl:py-1.5 ${STATUS[r.status].cls}`}>
              <Icon name={STATUS[r.status].icon} size={14} />
              {r.status}
            </span>
          </span>
        </div>
      ))}
    </section>
  );
}

/** Figma "What your friends get" (379:15333 · tablet 497:47316 · mobile 497:47803). */
export function FriendsGet() {
  return (
    <section className="flex flex-col gap-6">
      <SectionHeader
        overline="WHY IT’S WORTH SHARING"
        title="What your friends get"
        body="Everything they need to choose a firm with more confidence."
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {BENEFITS.map((b) => (
          <div key={b.title} className="flex flex-col gap-3 rounded-3xl border border-line bg-surface p-4 md:p-5 xl:p-6">
            <span className="flex size-12 items-center justify-center rounded-full bg-brand-tint">
              {b.icon ? (
                <Icon name={b.icon} size={20} />
              ) : (
                <span className="text-[20px] font-extrabold leading-[1.1] text-brand">%</span>
              )}
            </span>
            <p className="type-label">{b.title}</p>
            <p className="type-body-sm text-muted">{b.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
