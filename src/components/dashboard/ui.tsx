import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

/**
 * Small building blocks shared by the dashboard pages (/account, /account/welcome, /account/reviews,
 * /account/settings). Values follow the Figma "Dashboard" frames:
 *  - cards: surface bg, 1px line border, r24, padding 16 (mobile) / 20 (tablet) / 24 (desktop)
 *  - card header: ExtraBold 22/28 title, optional count pill, green link (h 40/44/48) with arrow-right
 *  - pill buttons: h 40 (mobile) / 44 (tablet) / 48 (desktop)
 */

export const CARD = "rounded-[24px] border border-line bg-surface p-4 md:p-5 xl:p-6";

/** Responsive pill height used by every dashboard button (Figma Button 343:8599 instances). */
export const PILL_H = "h-10 md:h-11 xl:h-12";

export type PillVariant = "primary" | "outline" | "white" | "ghost" | "tint" | "subtle";
const PILL: Record<PillVariant, string> = {
  primary: "bg-brand text-page hover:brightness-110",
  outline: "border border-brand bg-page text-ink hover:bg-brand-tint",
  white: "bg-ink text-page hover:bg-white",
  ghost: "border border-line text-brand hover:bg-brand-tint",
  tint: "border border-brand bg-brand-tint-raised text-ink hover:brightness-125",
  subtle: "bg-raised text-ink hover:brightness-125",
};

export function pillClass(variant: PillVariant = "primary", extra = "", height = PILL_H) {
  return `inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-4 py-1 type-label transition ${height} ${PILL[variant]} ${extra}`;
}

export function Pill({
  href,
  variant = "primary",
  className = "",
  height,
  children,
  ...rest
}: {
  href?: string;
  variant?: PillVariant;
  className?: string;
  height?: string;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">) {
  const cls = pillClass(variant, className, height);
  if (href)
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}

/** "Card header": title (+count pill) on the left, green text link with arrow on the right. */
export function CardHeader({
  title,
  count,
  link,
  href,
  className = "",
}: {
  title: string;
  count?: React.ReactNode;
  link?: string;
  href?: string;
  className?: string;
}) {
  return (
    <div className={`flex w-full items-center gap-3 ${className}`}>
      <div className="flex min-w-0 flex-1 items-center gap-2.5">
        <h2 className="min-w-0 text-[22px] font-extrabold leading-[28px] text-ink">{title}</h2>
        {count != null && <CountPill>{count}</CountPill>}
      </div>
      {link && href && (
        <Link
          href={href}
          className={`flex shrink-0 items-center justify-center gap-1.5 hover:brightness-125 ${PILL_H}`}
        >
          <span className="type-label whitespace-nowrap text-brand">{link}</span>
          <Icon name="arrow-right-16-00d26a" size={16} />
        </Link>
      )}
    </div>
  );
}

export function CountPill({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`shrink-0 whitespace-nowrap rounded-full bg-raised px-2.5 py-0.5 text-[12px] font-semibold leading-4 text-ink ${className}`}
    >
      {children}
    </span>
  );
}

/** Breadcrumb text exactly as Figma ("Home  /  Dashboard", whitespace preserved). */
export function Crumb({ children }: { children: string }) {
  return <span className="whitespace-pre">{children}</span>;
}
