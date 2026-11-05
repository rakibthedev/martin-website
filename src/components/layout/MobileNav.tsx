"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { ACCOUNT_NAV, SITE_NAV } from "@/lib/nav";
import { useShellUI } from "./ShellUI";

/** Figma: Navigation / Mobile 393 (503:20573) · Navigation / Tablet 768 (503:20361) */
export function MobileNav() {
  const pathname = usePathname();
  const { overlay, close } = useShellUI();
  if (overlay !== "nav") return null;

  const accountActive = ACCOUNT_NAV.find((i) =>
    i.href === "/account" ? pathname === "/account" : pathname.startsWith(i.href),
  )?.id;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation"
      className="fixed inset-0 z-50 flex flex-col items-center overflow-y-auto bg-page px-4 pb-6 pt-4 2xl:hidden"
    >
      <div className="flex w-full flex-col items-start gap-6">
        <div className="flex w-full items-start justify-between">
          <Link href="/" onClick={close} className="type-h3 min-w-0 flex-1 text-brand">
            PropFirmScores
          </Link>
          <button
            type="button"
            aria-label="Close navigation"
            onClick={close}
            className="flex size-12 shrink-0 items-center justify-center"
          >
            <Icon name="add-f0f0f0" size={20} rotate={45} />
          </button>
        </div>

        <nav aria-label="Primary" className="flex w-full flex-col items-start gap-1">
          {SITE_NAV.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                aria-current={active ? "page" : undefined}
                className={`flex w-full items-start justify-center rounded-full py-2 text-[16px] leading-6 text-ink hover:text-brand ${
                  active ? "px-4 font-semibold md:px-5" : "px-2 font-normal"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <AccountSidebar variant="drawer" active={accountActive} onNavigate={close} />
      </div>
    </div>
  );
}
