"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { SITE_NAV, USER } from "@/lib/nav";
import { useShellUI } from "./ShellUI";
import { MobileNav } from "./MobileNav";
import { AccountMenu } from "@/components/overlays/AccountMenu";
import { NotificationsPanel } from "@/components/overlays/NotificationsPanel";
import { LogoutDialog } from "@/components/overlays/LogoutDialog";
import { Toast } from "@/components/overlays/Toast";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
}

function UnreadBadge({ count }: { count: number }) {
  return (
    <span className="absolute left-[26px] top-[-2px] flex items-center justify-center rounded-full border-2 border-page bg-brand px-[5px] py-px text-[10px] font-extrabold leading-none text-page">
      {count}
    </span>
  );
}

/**
 * Figma: Header / PropFirmScores / Signed in (369:171) — desktop ≥1536px
 *        Header / Responsive signed in (491:9281 mobile, 501:20434 tablet) — below 1536px
 */
export function Header() {
  const pathname = usePathname();
  const { overlay, toggle, open } = useShellUI();

  return (
    <header className="relative z-40 w-full bg-page">
      {/* ---------- Desktop (1920 design) ---------- */}
      <div className="mx-auto hidden w-full items-center justify-between gap-6 px-12 py-5 2xl:flex">
        <Link href="/" className="type-h3 shrink-0 whitespace-nowrap text-brand">
          PropFirmScores
        </Link>
        <nav aria-label="Primary" className="shrink-0 rounded-full bg-raised p-2.5">
          <ul className="flex items-center gap-1">
            {SITE_NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-center rounded-full py-2 text-[16px] leading-6 text-ink transition-colors hover:text-brand ${
                      active ? "px-5 font-semibold" : "px-2 font-normal"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="relative flex shrink-0 items-center gap-3">
          <button
            type="button"
            aria-label="Search"
            className="flex size-12 items-center justify-center rounded-full bg-raised hover:brightness-125"
          >
            <Icon name="search-normal-f0f0f0" size={20} />
          </button>
          <button
            type="button"
            aria-label="Notifications, 3 unread"
            aria-expanded={overlay === "notifications"}
            onClick={() => toggle("notifications")}
            className="relative flex size-12 items-center justify-center rounded-full bg-raised hover:brightness-125"
          >
            <Icon name="notification-bing-f0f0f0" size={20} />
            <UnreadBadge count={3} />
          </button>
          <Link
            href="/reviews/new"
            className="flex h-12 items-center justify-center gap-1.5 rounded-full bg-ink px-4 py-1 hover:bg-white"
          >
            <span className="type-label whitespace-nowrap text-page">Submit Review</span>
            <Icon name="arrow-up-151513" size={20} rotate={45} />
          </Link>
          <button
            type="button"
            aria-label="Account menu"
            aria-expanded={overlay === "account"}
            onClick={() => toggle("account")}
            className="flex h-12 items-center gap-2.5 rounded-full bg-raised py-1 pl-1 pr-3.5 hover:brightness-125"
          >
            <Avatar initials={USER.initials} size={36} />
            <span className="flex flex-col items-start whitespace-nowrap text-left">
              <span className="type-label text-ink">{USER.name}</span>
              <span className="text-[11px] leading-normal text-muted">{USER.role}</span>
            </span>
            <Icon name="arrow-down-898587" size={16} />
          </button>
        </div>
      </div>

      {/* ---------- Tablet / mobile (768 & 393 designs) ---------- */}
      <div className="flex w-full items-start justify-between gap-3 p-4 2xl:hidden">
        <Link href="/" className="type-h3 min-w-0 flex-1 text-brand">
          PropFirmScores
        </Link>
        <div className="flex shrink-0 items-start gap-2 md:gap-3">
          <button
            type="button"
            aria-label="Open navigation"
            aria-expanded={overlay === "nav"}
            onClick={() => open("nav")}
            className="flex size-10 items-center justify-center rounded-full bg-raised md:size-11"
          >
            <Icon name="menu-f0f0f0" size={20} />
          </button>
          <button
            type="button"
            aria-label="Notifications, 3 unread"
            aria-expanded={overlay === "notifications"}
            onClick={() => toggle("notifications")}
            className="relative flex size-10 items-center justify-center rounded-full bg-raised md:size-11"
          >
            <Icon name="notification-bing-f0f0f0" size={20} />
            <UnreadBadge count={3} />
          </button>
          <button
            type="button"
            aria-label="Account menu"
            aria-expanded={overlay === "account"}
            onClick={() => toggle("account")}
            className="flex size-10 items-center justify-center overflow-clip rounded-full bg-raised md:size-11"
          >
            <Avatar initials={USER.initials} size={36} />
          </button>
        </div>
      </div>

      <AccountMenu />
      <NotificationsPanel />
      <LogoutDialog />
      <Toast />
      <MobileNav />
    </header>
  );
}
