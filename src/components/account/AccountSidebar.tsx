"use client";

import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { useShellUI } from "@/components/layout/ShellUI";
import { ACCOUNT_NAV, USER, type AccountSection } from "@/lib/nav";

/**
 * Figma: Account sidebar (370:162) — desktop 288px column.
 * Also reused inside the tablet/mobile navigation drawer (503:20391 / 503:20603) via `variant="drawer"`.
 */
export function AccountSidebarItem({
  label,
  icon,
  href,
  count,
  active,
  onClick,
}: {
  label: string;
  icon: string;
  href?: string;
  count?: number;
  active?: boolean;
  onClick?: () => void;
}) {
  const cls = `flex h-11 w-full shrink-0 items-center gap-3 rounded-[14px] px-3.5 py-3 text-left transition-colors ${
    active ? "border border-brand bg-brand-tint" : "border border-transparent hover:bg-raised/40"
  }`;
  const inner = (
    <>
      <Icon name={`${icon}-${active ? "00d26a" : "898587"}`} size={20} />
      <span className={`type-label min-w-0 flex-1 ${active ? "text-ink" : "text-muted"}`}>{label}</span>
      {count !== undefined ? (
        <span className="type-caption shrink-0 rounded-full bg-raised px-2 py-0.5 text-ink">{count}</span>
      ) : null}
    </>
  );
  if (href)
    return (
      <Link href={href} className={cls} aria-current={active ? "page" : undefined} onClick={onClick}>
        {inner}
      </Link>
    );
  return (
    <button type="button" className={cls} onClick={onClick}>
      {inner}
    </button>
  );
}

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start px-3.5 pb-2 pt-4">
      <p className="type-overline whitespace-nowrap text-muted">{children}</p>
    </div>
  );
}

export function ReferralPromo({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`flex w-full flex-col items-start gap-3 rounded-[20px] border border-brand bg-brand-tint ${
        compact ? "p-4 md:p-5" : "p-6"
      }`}
    >
      <span className="flex size-9 items-center justify-center rounded-full bg-brand">
        <Icon name="gift-promo-151513" size={18} />
      </span>
      <p className="text-[16px] font-extrabold leading-[22px] text-ink">Invite a trader, earn $50</p>
      <p className="type-caption w-full text-muted">
        You both get rewarded when they publish their first verified review.
      </p>
      <button
        type="button"
        onClick={() => navigator.clipboard?.writeText("https://propfirmscores.com/r/alex-carter")}
        className={`flex h-12 items-center justify-center gap-1.5 rounded-full bg-brand px-4 py-1 hover:brightness-110 ${
          compact ? "" : "w-full"
        }`}
      >
        <Icon name="copy-151513" size={16} />
        <span className="type-label whitespace-nowrap text-page">Copy invite link</span>
      </button>
    </div>
  );
}

export function AccountSidebar({
  active,
  variant = "sidebar",
  onNavigate,
}: {
  active?: AccountSection;
  variant?: "sidebar" | "drawer";
  onNavigate?: () => void;
}) {
  const { openLogout } = useShellUI();
  const drawer = variant === "drawer";
  return (
    <aside
      className={`flex w-full flex-col items-start gap-1 rounded-[24px] border border-line bg-surface ${
        drawer ? "p-4" : "p-6"
      }`}
    >
      <div className="flex w-full items-center gap-3 px-2 pb-4 pt-2">
        <Avatar initials={USER.initials} size={48} />
        <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
          <p className="whitespace-nowrap text-[16px] font-extrabold leading-normal text-ink">{USER.name}</p>
          <p className="type-caption truncate text-muted">{USER.email}</p>
          <div className="flex items-center gap-1">
            <Icon name="verify-00d26a" size={14} />
            <p className="whitespace-nowrap text-[11px] font-semibold leading-normal text-brand">Verified trader</p>
          </div>
        </div>
      </div>
      <div className="h-px w-full bg-line" />
      <GroupLabel>MY ACCOUNT</GroupLabel>
      {ACCOUNT_NAV.filter((i) => i.group === "account").map((item) => (
        <AccountSidebarItem key={item.id} {...item} active={item.id === active} onClick={onNavigate} />
      ))}
      <GroupLabel>SETTINGS</GroupLabel>
      {ACCOUNT_NAV.filter((i) => i.group === "settings").map((item) => (
        <AccountSidebarItem key={item.id} {...item} active={item.id === active} onClick={onNavigate} />
      ))}
      <AccountSidebarItem
        label="Log out"
        icon="logout"
        onClick={() => {
          onNavigate?.();
          openLogout();
        }}
      />
      {!drawer && <div className="h-3 w-2.5 shrink-0" />}
      <ReferralPromo compact={drawer} />
    </aside>
  );
}
