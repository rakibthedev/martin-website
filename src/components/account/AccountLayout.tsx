import { AccountSidebar } from "./AccountSidebar";
import type { AccountSection } from "@/lib/nav";

/**
 * Shared frame for every signed-in account page ("Dashboard content" in Figma):
 *  - Desktop 1920: px 48, pt 32, pb 96; breadcrumb, then Body = 288px sidebar + 32 gap + main column.
 *  - Tablet 768: px 24; Mobile 393: px 16 — sidebar hidden (lives in the nav drawer), main column full width.
 */
export function AccountLayout({
  active,
  breadcrumb,
  children,
}: {
  active: AccountSection;
  breadcrumb: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col gap-6 px-4 pb-8 pt-8 md:px-6 md:pb-12 xl:px-12 xl:pb-24">
      <p className="type-body-sm text-muted">{breadcrumb}</p>
      <div className="flex w-full items-start gap-8">
        <div className="hidden w-[288px] shrink-0 xl:block">
          <AccountSidebar active={active} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-6">{children}</div>
      </div>
    </div>
  );
}
