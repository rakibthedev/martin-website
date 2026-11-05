"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { PageHead, Pill } from "../shared";
import { Toggle } from "../Toggle";
import { CHANNELS, NOTIFICATIONS, PREFS, type Notif, type NotifCategory } from "./data";

type Filter = "all" | "unread" | NotifCategory;
const GROUPS = ["TODAY", "THIS WEEK", "EARLIER"] as const;

/**
 * Figma: Notifications — Desktop 395:6162, Tablet 497:17869, Mobile 497:18108.
 * Desktop (feed + 420px preferences, tabs inside the feed) from 1720px; tablet two equal columns with the tabs
 * above them; mobile stacked with horizontally scrollable tabs.
 */
export function NotificationsView() {
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<Filter>("all");
  const [showOlder, setShowOlder] = useState(false);

  const isUnread = (n: Notif) => !!n.unread && !readIds.has(n.id);
  const unreadCount = NOTIFICATIONS.filter(isUnread).length;
  const count = (f: Filter) =>
    NOTIFICATIONS.filter((n) => (f === "all" ? true : f === "unread" ? isUnread(n) : n.category === f)).length;
  const visible = NOTIFICATIONS.filter(
    (n) =>
      (showOlder || !n.older) &&
      (filter === "all" ? true : filter === "unread" ? isUnread(n) : n.category === filter),
  );
  const markAll = () => setReadIds(new Set(NOTIFICATIONS.map((n) => n.id)));

  const tabs = (
    <FilterTabs
      value={filter}
      onChange={setFilter}
      items={[
        ["all", "All", count("all")],
        ["unread", "Unread", unreadCount],
        ["reviews", "Reviews", count("reviews")],
        ["offers", "Offers", count("offers")],
        ["referrals", "Referrals", count("referrals")],
        ["account", "Account", count("account")],
      ]}
    />
  );

  return (
    <>
      <PageHead
        title=""
        description="Everything that happened on your account. Items that need you are pinned to the top."
        align="md:items-start xl:items-end"
        titleSlot={
          <div className="flex flex-col items-start gap-3 md:flex-row md:items-center">
            <h1 className="text-[32px] font-semibold leading-[42px] text-ink md:text-[44px] md:font-extrabold md:leading-[52px]">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <span className="type-label whitespace-nowrap rounded-full bg-brand px-3 py-1 text-page">
                {unreadCount} unread
              </span>
            )}
          </div>
        }
      >
        <Pill variant="outline-page" leading="tick-circle-bold-16-f0f0f0" onClick={markAll}>
          Mark all as read
        </Pill>
      </PageHead>

      <div className="w-full min-[1720px]:hidden">{tabs}</div>

      <div className="grid w-full grid-cols-1 items-start gap-6 md:grid-cols-2 min-[1720px]:grid-cols-[minmax(0,1fr)_420px]">
        {/* Feed */}
        <div className="flex w-full min-w-0 flex-col items-start gap-5">
          <div className="hidden w-full min-[1720px]:block">{tabs}</div>
          {GROUPS.map((g) => {
            const items = visible.filter((n) => n.group === g);
            if (!items.length) return null;
            const featured = g === "TODAY";
            return (
              <section
                key={g}
                className={`flex w-full flex-col items-start rounded-[24px] border border-line bg-surface p-4 md:p-5 xl:p-6 ${
                  featured ? "gap-2" : ""
                }`}
              >
                <p className="type-overline px-4 pb-2 pt-3 text-muted">{g}</p>
                {items.map((n) => (
                  <NotificationItem key={n.id} n={n} unread={isUnread(n)} featured={featured} />
                ))}
              </section>
            );
          })}
          {!visible.length && (
            <p className="type-caption w-full rounded-[24px] border border-dashed border-line p-6 text-center text-muted">
              You are all caught up.
            </p>
          )}
          {!showOlder && (
            <div className="flex w-full items-start justify-center">
              <Pill variant="outline-page" onClick={() => setShowOlder(true)}>
                Show older notifications
              </Pill>
            </div>
          )}
        </div>

        {/* Preferences */}
        <div className="flex w-full min-w-0 flex-col items-start gap-6">
          <section className="flex w-full flex-col items-start gap-1 rounded-[24px] border border-line bg-surface p-4 md:p-5 xl:p-6">
            <h2 className="text-[20px] font-extrabold leading-normal text-ink">Notify me about</h2>
            <div className="size-2.5 shrink-0" />
            {PREFS.map((p, i) => (
              <div key={p.label} className="w-full">
                {i > 0 && <div className="h-px w-full bg-line" />}
                <div className="flex w-full items-center gap-3 py-3">
                  <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
                    <p className="type-label text-ink">{p.label}</p>
                    <p className="type-caption text-muted">{p.hint}</p>
                  </div>
                  <Toggle defaultOn={p.on} label={p.label} />
                </div>
              </div>
            ))}
          </section>
          <section className="flex w-full flex-col items-start gap-3 rounded-[24px] border border-line bg-surface p-4 md:p-5 xl:p-6">
            <h2 className="text-[20px] font-extrabold leading-normal text-ink">Delivery</h2>
            {CHANNELS.map((c) => (
              <div
                key={c.label}
                className="flex w-full items-center gap-2.5 rounded-[14px] border border-line bg-card p-4 md:p-5 xl:p-6"
              >
                <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
                  <p className="type-label text-ink">{c.label}</p>
                  <p className="type-caption truncate text-muted">{c.hint}</p>
                </div>
                <Toggle defaultOn={c.on} label={c.label} />
              </div>
            ))}
          </section>
          <Link href="/account/settings" className="flex items-center justify-center gap-1.5 hover:brightness-125">
            <Icon name="setting-16-00d26a" size={16} />
            <span className="type-label whitespace-nowrap text-brand">All notification settings</span>
            <Icon name="arrow-right-16-00d26a" size={16} />
          </Link>
        </div>
      </div>
    </>
  );
}

function FilterTabs({
  value,
  onChange,
  items,
}: {
  value: Filter;
  onChange: (f: Filter) => void;
  items: [Filter, string, number][];
}) {
  return (
    <div className="max-w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div role="tablist" className="flex w-max items-start gap-1 rounded-full border border-line bg-surface p-1">
        {items.map(([id, label, n]) => {
          const on = value === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => onChange(id)}
              className={`flex shrink-0 items-center gap-2 rounded-full px-[14px] py-2 transition-colors ${
                on ? "bg-brand" : "hover:bg-raised/50"
              }`}
            >
              <span className={`type-label whitespace-nowrap ${on ? "text-page" : "text-ink"}`}>{label}</span>
              <span
                className={`rounded-full px-[7px] py-px text-[11px] font-bold leading-normal ${
                  on ? "bg-page text-ink" : "bg-raised text-ink"
                }`}
              >
                {n}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function NotificationItem({ n, unread, featured }: { n: Notif; unread: boolean; featured: boolean }) {
  const [copied, setCopied] = useState(false);
  return (
    <article
      className={`flex w-full items-start gap-[14px] rounded-[16px] md:items-center ${
        featured ? "bg-card p-4 md:p-5 xl:p-6" : "p-4"
      } ${n.urgent ? "border border-danger" : ""}`}
    >
      <span className={`flex size-11 shrink-0 items-center justify-center rounded-full ${n.iconBg}`}>
        <Icon name={n.icon} size={20} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5">
        <div className="flex w-full items-start gap-2.5">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2.5">
            <p className="type-label min-w-0 text-ink">{n.title}</p>
            {n.urgent && (
              <span className="shrink-0 whitespace-nowrap rounded-full bg-danger-bg px-2 py-0.5 text-[11px] font-bold leading-normal text-danger">
                Action needed
              </span>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-2.5 pt-0.5">
            <p className="type-caption whitespace-nowrap text-muted">{n.when}</p>
            {unread && <Icon name="unread-dot-8-00d26a" size={8} alt="Unread" />}
          </div>
        </div>
        <p className="type-body-sm w-full text-muted">{n.body}</p>
        {n.actions && (
          <div className="flex flex-wrap items-start gap-2 pt-1">
            {n.actions.map((a) =>
              a.copy ? (
                <Pill
                  key={a.label}
                  variant={a.variant}
                  onClick={() => {
                    navigator.clipboard?.writeText(a.copy!).catch(() => {});
                    setCopied(true);
                    window.setTimeout(() => setCopied(false), 1600);
                  }}
                >
                  {copied ? "Copied" : a.label}
                </Pill>
              ) : (
                <Pill key={a.label} variant={a.variant} href={a.href}>
                  {a.label}
                </Pill>
              ),
            )}
          </div>
        )}
      </div>
    </article>
  );
}
