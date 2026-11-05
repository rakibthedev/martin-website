import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { USER } from "@/lib/nav";

/**
 * Figma "Signed-in context" section: Account / Signed-in context bar (desktop, 380:4305) and
 * Account / Responsive context (tablet 502:20465, mobile 502:20481).
 * Desktop: one row — avatar · title · text · button. Tablet/mobile: identity row stacked over the button.
 */
export function ContextBar({
  title,
  text,
  cta,
  href,
}: {
  title: string;
  text: string;
  cta: string;
  href: string;
}) {
  return (
    <section className="px-4 pt-6 md:px-6 xl:px-12">
      <div className="flex flex-col items-start gap-3 rounded-[20px] border border-brand bg-brand-tint p-4 md:p-5 xl:flex-row xl:items-center xl:gap-4 xl:p-6">
        <div className="flex w-full min-w-0 items-center gap-3 xl:contents">
          <Avatar initials={USER.initials} />
          <div className="flex min-w-0 flex-1 flex-col gap-1 xl:flex-row xl:items-center xl:gap-2.5 xl:overflow-hidden xl:whitespace-nowrap">
            <p className="type-label text-ink xl:shrink-0">{title}</p>
            <p className="hidden type-body-sm text-muted xl:block xl:shrink-0">·</p>
            <p className="type-body-sm text-muted xl:min-w-0 xl:truncate">{text}</p>
          </div>
        </div>
        <Link
          href={href}
          className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full bg-brand px-4 py-1 type-label whitespace-nowrap text-page transition hover:brightness-110 md:h-11 xl:h-12"
        >
          {cta}
          <Icon name="arrow-right-151513" size={16} />
        </Link>
      </div>
    </section>
  );
}
