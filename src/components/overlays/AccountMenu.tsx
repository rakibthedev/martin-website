"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { useShellUI } from "@/components/layout/ShellUI";
import { USER } from "@/lib/nav";
import { OverlayFrame } from "./OverlayFrame";
import { ACCOUNT_MENU_MAIN, ACCOUNT_MENU_SUPPORT, type AccountMenuItem } from "./data";

/**
 * Figma: Overlay / Account menu (371:554) — desktop dropdown 320px, right-aligned 48px from the edge (371:778).
 * Responsive: Overlay / Account menu / Responsive (503:20422 tablet p20, 503:20634 mobile p16, gap 12).
 */
export function AccountMenu() {
  const { overlay, close, openLogout } = useShellUI();
  const pathname = usePathname();
  if (overlay !== "account") return null;

  const isActive = (href: string) =>
    href === "/account" ? pathname === "/account" : pathname === href || pathname.startsWith(href + "/");

  const row = (item: AccountMenuItem) => {
    const active = isActive(item.href);
    return (
      <Link
        key={item.label}
        href={item.href}
        onClick={close}
        aria-current={active ? "page" : undefined}
        className={`flex w-full shrink-0 items-center gap-3 rounded-[12px] px-3 py-2.5 transition-colors ${
          active ? "bg-raised" : "hover:bg-raised/60"
        }`}
      >
        <Icon name={`${item.icon}-${active ? "f0f0f0" : "898587"}`} size={18} />
        <span className="type-label min-w-0 flex-1 text-ink">{item.label}</span>
        {item.meta ? <span className="type-caption shrink-0 whitespace-nowrap text-muted">{item.meta}</span> : null}
      </Link>
    );
  };

  return (
    <OverlayFrame
      label="Account menu"
      desktopClassName="2xl:right-12 2xl:w-[320px]"
      className="flex flex-col items-start gap-3 p-4 md:p-5 2xl:gap-0.5 2xl:p-2"
    >
      {/* Identity */}
      <div className="flex w-full shrink-0 items-center gap-3 px-3 pb-3.5 pt-3">
        <Avatar initials={USER.initials} size={44} />
        <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
          <p className="whitespace-nowrap text-[16px] font-extrabold leading-normal text-ink">{USER.name}</p>
          <p className="type-caption w-full truncate text-muted">{USER.email}</p>
        </div>
      </div>

      {/* Points */}
      <Link
        href="/account"
        onClick={close}
        className="flex w-full shrink-0 items-center gap-2 rounded-[14px] bg-brand-tint px-3 py-2.5 hover:bg-brand-tint-raised"
      >
        <Icon name="medal-16-00d26a" size={16} />
        <span className="min-w-0 flex-1 text-[12px] font-semibold leading-4 text-brand">Level 3 · 1,240 trust points</span>
        <span className="shrink-0 whitespace-nowrap text-[12px] font-semibold leading-4 text-ink">View</span>
      </Link>

      {/* Spacer — desktop component only */}
      <div className="hidden h-1.5 w-2.5 shrink-0 2xl:block" />

      {ACCOUNT_MENU_MAIN.map(row)}
      <div className="h-px w-full shrink-0 bg-line" />
      {ACCOUNT_MENU_SUPPORT.map(row)}
      <div className="h-px w-full shrink-0 bg-line" />

      <button
        type="button"
        onClick={openLogout}
        className="flex w-full shrink-0 items-center gap-3 rounded-[12px] px-3 py-2.5 text-left transition-colors hover:bg-danger-bg"
      >
        <Icon name="logout-18-ff6b6b" size={18} />
        <span className="type-label min-w-0 flex-1 text-danger">Log out</span>
      </button>
    </OverlayFrame>
  );
}
