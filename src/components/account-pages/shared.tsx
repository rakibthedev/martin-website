import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

/**
 * Building blocks shared by the account sub-pages (favourites, comparisons, claimed offers,
 * referrals, notifications). Values come from the Figma frames:
 *   mobile 393 / tablet 768 (md:) / desktop 1920 (xl:).
 */

/** "Home / Dashboard / <page>" breadcrumb (Martin/Body small, muted). */
export function Crumbs({ page }: { page: string }) {
  return (
    <>
      <Link href="/" className="hover:text-ink">
        Home
      </Link>
      <span className="whitespace-pre">{"  /  "}</span>
      <Link href="/account" className="hover:text-ink">
        Dashboard
      </Link>
      <span className="whitespace-pre">{"  /  "}</span>
      <span>{page}</span>
    </>
  );
}

/** Page head: mobile = column (gap 24) with SemiBold 32/42 title; md+ = row, ExtraBold 44/52 title. */
export function PageHead({
  title,
  description,
  children,
  align = "md:items-center",
}: {
  title: string;
  description: React.ReactNode;
  children?: React.ReactNode;
  /** vertical alignment of the actions on md+ (Figma varies per page/breakpoint) */
  align?: string;
}) {
  return (
    <div className={`flex w-full flex-col items-start gap-6 md:flex-row md:flex-wrap md:gap-3 xl:gap-6 ${align}`}>
      <div className="flex w-full min-w-0 flex-col items-start gap-2 md:w-auto md:min-w-[280px] md:flex-1">
        <h1 className="text-[32px] font-semibold leading-[42px] text-ink md:text-[44px] md:font-extrabold md:leading-[52px]">
          {title}
        </h1>
        <p className="type-body w-full text-muted">{description}</p>
      </div>
      {children}
    </div>
  );
}

export type PillVariant = "primary" | "ghost" | "outline" | "subtle" | "white";
const PILL: Record<PillVariant, string> = {
  primary: "bg-brand text-page hover:brightness-110",
  /** Figma "Button / Pill" Ghost — 1px border, green label */
  ghost: "border border-line text-brand hover:bg-brand-tint",
  /** Figma "Button" Outline on surface — green border, ink label */
  outline: "border border-brand bg-surface text-ink hover:bg-brand-tint",
  subtle: "bg-raised text-ink hover:brightness-125",
  white: "bg-ink text-page hover:bg-white",
};

/**
 * Pill button with breakpoint heights (Figma uses 40 on mobile, 44 on tablet, 48 on desktop for the same
 * instance). `heights` overrides the default height classes.
 */
export function Pill({
  variant = "primary",
  href,
  onClick,
  heights = "h-10 md:h-11 xl:h-12",
  className = "",
  leading,
  trailing,
  trailingRotate,
  iconSize = 16,
  children,
  ariaLabel,
}: {
  variant?: PillVariant;
  href?: string;
  onClick?: () => void;
  heights?: string;
  className?: string;
  leading?: string;
  trailing?: string;
  trailingRotate?: number;
  iconSize?: number;
  children?: React.ReactNode;
  ariaLabel?: string;
}) {
  const cls = `inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-4 py-1 type-label transition ${heights} ${PILL[variant]} ${className}`;
  const inner = (
    <>
      {leading && <Icon name={leading} size={iconSize} />}
      {children}
      {trailing && <Icon name={trailing} size={iconSize} rotate={trailingRotate} />}
    </>
  );
  if (href)
    return (
      <Link href={href} className={cls} aria-label={ariaLabel}>
        {inner}
      </Link>
    );
  return (
    <button type="button" className={cls} onClick={onClick} aria-label={ariaLabel}>
      {inner}
    </button>
  );
}

/** "Browse firms ↗" — Button / Pill, Ghost (green arrow-up rotated 45°, 20px). */
export function BrowseFirmsPill({ heights }: { heights?: string }) {
  return (
    <Pill variant="ghost" href="/firms" trailing="arrow-up-00d26a" trailingRotate={45} iconSize={20} heights={heights}>
      Browse firms
    </Pill>
  );
}

/** Dark surface card (radius 24, 1px border). Padding: 16 mobile / 20 tablet / 24 desktop. */
export function Card({
  className = "",
  children,
  as: Tag = "section",
}: {
  className?: string;
  children: React.ReactNode;
  as?: "section" | "div";
}) {
  return (
    <Tag
      className={`flex w-full min-w-0 flex-col items-start rounded-[24px] border border-line bg-surface p-4 md:p-5 xl:p-6 ${className}`}
    >
      {children}
    </Tag>
  );
}

/** Count chip — raised pill, SemiBold 12/16. */
export function CountChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="shrink-0 whitespace-nowrap rounded-full bg-raised px-2.5 py-0.5 text-[12px] font-semibold leading-4 text-ink">
      {children}
    </span>
  );
}

/**
 * Card header: ExtraBold 22/28 title + count chip. Mobile/tablet the title fills the row and the chip sits right;
 * desktop the chip follows the title (gap 10).
 */
export function CardHeader({
  title,
  count,
  right,
  className = "",
}: {
  title: string;
  count?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex w-full items-start gap-2.5 xl:items-center ${className}`}>
      <h2 className={`min-w-0 flex-1 text-[22px] font-extrabold leading-7 text-ink ${right ? "" : "xl:flex-none"}`}>
        {title}
      </h2>
      {count !== undefined && <CountChip>{count}</CountChip>}
      {right}
    </div>
  );
}

export type ChipTone = "brand" | "warning" | "danger" | "neutral";
const CHIP: Record<ChipTone, string> = {
  brand: "bg-brand-tint text-brand",
  warning: "bg-warning-bg text-warning",
  danger: "bg-danger-bg text-danger",
  neutral: "bg-raised text-ink",
};

/** Status chip — SemiBold 12/16, px 10, py 4. */
export function Chip({ tone = "brand", children, className = "" }: { tone?: ChipTone; children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full px-2.5 py-1 text-[12px] font-semibold leading-4 ${CHIP[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/** Square firm tile with white ExtraBold initials. */
export function FirmTile({
  initials,
  bg,
  size = 40,
  radius = 12,
  textSize = 12,
  className = "",
}: {
  initials: string;
  bg: string;
  size?: number;
  radius?: number;
  textSize?: number;
  className?: string;
}) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center font-extrabold leading-normal text-white ${bg} ${className}`}
 