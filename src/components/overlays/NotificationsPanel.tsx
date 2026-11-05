"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { useShellUI } from "@/components/layout/ShellUI";
import { OverlayFrame } from "./OverlayFrame";
import { NOTIFICATIONS, NOTIFICATION_TABS, type NotificationItem } from "./data";

type Tab = (typeof NOTIFICATION_TABS)[number]["id"];

const caption12 = "text-[12px] font-semibold leading-4";

function NotificationRow({ n, unread, onOpen }: { n: NotificationItem; unread: boolean; onOpen: () => void }) {
  return (
    <Link
      href={n.href}
      onClick={onOpen}
      className={`flex w-full shrink-0 gap-3 rounded-[16px] transition-colors ${
        unread
          ? "items-start bg-page p-4 md:items-center md:p-5 2xl:p-3"
          : "items-center p-3 hover:bg-page/50"
      }`}
    >
      <span
        className={`flex size-10 shrink-0 items-center justify-center rounded-full ${
          n.tone === "brand" ? "bg-brand-tint" : "bg-raised"
        }`}
      >
        <Icon name={n.icon} size={18} />
      </span>

      <span className="flex min-w-0 flex-1 flex-col items-start gap-1">
        <span className="flex w-full items-start gap-2 2xl:items-center">
          <span className="type-label min-w-0 flex-1 text-ink">{n.title}</span>
          <span
            className={`shrink-0 whitespace-nowrap text-[11px] leading-normal text-muted ${unread ? "hidden md:inline" : ""}`}
          >
            {n.time}
          </span>
        </span>
        <span className="type-caption w-full text-muted">{n.body}</span>
        {n.action ? (
          <span className="flex items-center gap-1 pt-1">
            <span className={`${caption12} whitespace-nowrap text-brand`}>{n.action}</span>
            <Icon name="arrow-right-00d26a" size={14} />
          </span>
        ) : null}
      </span>

      {unread ? (
        <>
          {/* Mobile: dot + time column (545:28790) */}
          <span className="flex shrink-0 items-center gap-1 md:hidden">
            <Icon name="unread-dot-00d26a" size={8} />
            <span className="whitespace-nowrap text-[11px] leading-normal text-muted">{n.time}</span>
          </span>
          {/* Tablet / desktop: dot only */}
          <span className="hidden shrink-0 md:block">
            <Icon name="unread-dot-00d26a" size={8} />
          </span>
          <span className="sr-only">Unread</span>
        </>
      ) : null}
    </Link>
  );
}

/**
 * Figma: Overlay / Notifications panel (371:649) — desktop 440px card at x=1252 (371:1181).
 * Responsive: 503:20463 (tablet, p20, unread items p20) · 503:20675 (mobile, p16, unread items p16 with
 * the dot + time stacked on the right).
 */
export function NotificationsPanel() {
  const { overlay, close } = useShellUI();
  // Lives outside the conditional render so read state survives closing / reopening the panel.
  const [unread, setUnread] = useState<Set<string>>(
    () => new Set(NOTIFICATIONS.filter((n) => n.unread).map((n) => n.id)),
  );
  const [tab, setTab] = useState<Tab>("all");

  if (overlay !== "notifications") return null;

  const visible = NOTIFICATIONS.filter((n) => tab === "all" || n.category === tab);
  const groups = (["TODAY", "EARLIER"] as const)
    .map((g) => ({ g, items: visible.filter((n) => n.group === g) }))
    .filter((x) => x.items.length > 0);

  const markRead = (id: string) =>
    setUnread((cur) => {
      if (!cur.has(id)) return cur;
      const next = new Set(cur);
      next.delete(id);
      return next;
    });

  return (
    <OverlayFrame
      label="Notifications"
      desktopClassName="2xl:right-[228px] 2xl:w-[440px]"
      className="flex flex-col items-start gap-3 p-4 md:p-5 2xl:px-3 2xl:pb-3 2xl:pt-5"
    >
      {/* Header */}
      <div className="flex w-full shrink-0 items-start gap-2.5 px-2 2xl:items-center">
        <div className="flex min-w-0 flex-1 items-start gap-2 2xl:items-center">
          <h2 className="min-w-0 flex-1 text-[20px] font-extrabold leading-[26px] text-ink 2xl:flex-none 2xl:whitespace-nowrap">
            Notifications
          </h2>
          {unread.size > 0 ? (
            <span className="shrink-0 whitespace-nowrap rounded-full bg-brand px-2 py-0.5 text-[12px] font-bold leading-4 text-page">
              {unread.size} new
            </span>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => setUnread(new Set())}
          disabled={unread.size === 0}
          className={`${caption12} shrink-0 whitespace-nowrap text-brand hover:underline disabled:cursor-default disabled:text-muted disabled:no-underline`}
        >
          Mark all as read
        </button>
      </div>

      {/* Tabs */}
      <div role="tablist" aria-label="Filter notifications" className="flex w-full shrink-0 items-start gap-1 rounded-full bg-page p-1">
        {NOTIFICATION_TABS.map((t) => {
          const active = t.id === tab;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.id)}
              className={`${caption12} flex min-w-0 items-start justify-center whitespace-nowrap rounded-full px-3.5 py-2 transition-colors 2xl:flex-1 ${
                active ? "bg-raised text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {groups.length === 0 ? (
        <p className="type-caption w-full px-2 py-4 text-muted">No notifications here yet.</p>
      ) : (
        groups.map(({ g, items }) => (
          <div key={g} className="contents">
            <div className="flex shrink-0 items-start px-2 py-1">
              <p className="type-overline whitespace-nowrap text-muted">{g}</p>
            </div>
            {items.map((n) => (
              <NotificationRow
                key={n.id}
                n={n}
                unread={unread.has(n.id)}
                onOpen={() => {
                  markRead(n.id);
                  close();
                }}
              />
            ))}
          </div>
        ))
      )}

      <div className="h-px w-full shrink-0 bg-line" />

      {/* Footer */}
      <div className="flex w-full shrink-0 items-start px-2 py-1 2xl:items-center">
        <div className="flex min-w-0 flex-1 items-start">
          <Link href="/account/settings" onClick={close} className="flex items-center gap-1.5 hover:brightness-125">
            <Icon name="setting-16-898587" size={16} />
            <span className={`${caption12} whitespace-nowrap text-muted`}>Notification settings</span>
          </Link>
        </div>
        <Link
          href="/account/notifications"
          onClick={close}
          className="flex h-10 shrink-0 items-center justify-center gap-1 hover:underline md:h-11 2xl:h-12"
        >
          <span className={`${caption12} whitespace-nowrap text-brand`}>View all</span>
          <Icon name="arrow-right-00d26a" size={14} />
        </Link>
      </div>
    </OverlayFrame>
  );
}
