import Link from "next/link";

import { Icon } from "@/components/ui/Icon";

/**
 * Local primitives for the content pages (articles, article, referrals).
 * Figma "Button" (343:8599): pill, px 16, gap 6, Martin/Label. Heights follow the three frames:
 * mobile 40 / tablet 44 / desktop 48 (the shared Button has a fixed height, hence this local variant).
 */
export type BtnVariant = "primary" | "outline" | "subtle" | "white" | "tint" | "ghost";
const BTN: Record<BtnVariant, string> = {
  primary: "bg-brand text-page hover:brightness-110",
  outline: "border border-brand bg-page text-ink hover:bg-brand-tint",
  subtle: "bg-raised text-ink hover:brightness-125",
  white: "bg-ink text-page hover:bg-white",
  tint: "bg-brand-tint text-ink hover:bg-brand-tint-raised",
  ghost: "border border-line text-brand hover:bg-surface",
};

export const btnClass = (variant: BtnVariant, fixed?: "lg" | "sm", extra = "") =>
  `inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full px-4 py-1 type-label whitespace-nowrap transition ${
    fixed === "lg" ? "h-12" : fixed === "sm" ? "h-10" : "h-10 md:h-11 xl:h-12"
  } ${BTN[variant]} ${extra}`;

type BtnProps = {
  variant?: BtnVariant;
  fixed?: "lg" | "sm";
  leading?: string;
  trailing?: string;
  trailingRotate?: number;
  iconSize?: number;
  className?: string;
  children?: React.ReactNode;
};

export function Btn({
  variant = "primary",
  fixed,
  leading,
  trailing,
  trailingRotate,
  iconSize = 16,
  className = "",
  children,
  href,
  ...rest
}: BtnProps & ({ href: string; target?: string } | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>))) {
  const cls = btnClass(variant, fixed, className);
  const inner = (
    <>
      {leading && <Icon name={leading} size={iconSize} />}
      {children}
      {trailing && <Icon name={trailing} size={iconSize} rotate={trailingRotate} />}
    </>
  );
  if (href) {
    const external = /^(https?:|mailto:)/.test(href);
    if (external)
      return (
        <a href={href} target="_blank" rel="noreferrer" className={cls}>
          {inner}
        </a>
      );
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {inner}
    </button>
  );
}

/** Green 10/14 SemiBold overline with 1.5px tracking ("Martin / Detail / Mulish SemiBold / 10–14 · 45d85"). */
export function Overline({ children, className = "text-brand" }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-[10px] font-semibold leading-[14px] tracking-[1.5px] ${className}`}>{children}</p>;
}

/** Figma "Pill": px 12, py 6 (desktop) / 4 (tablet) / 2 (mobile), Martin/Caption. */
export const pillClass = "inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-0.5 md:py-1 xl:py-1.5 type-caption whitespace-nowrap";

export function BrandPill({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`${pillClass} border border-brand bg-brand-tint text-brand ${className}`}>{children}</span>;
}

export function LevelPill({ level, className = "" }: { level: string; className?: string }) {
  return (
    <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full bg-raised px-3 py-1.5 type-caption whitespace-nowrap text-ink ${className}`}>
      <span className="size-1.5 rounded-full bg-brand" />
      {level}
    </span>
  );
}

/** Section header used on /referrals: overline, H2 (32/42) and body copy. */
export function SectionHeader({
  overline,
  title,
  body,
  className = "",
}: {
  overline: string;
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <div className={`flex min-w-0 flex-col gap-2.5 ${className}`}>
      <Overline>{overline}</Overline>
      <h2 className="type-h2">{title}</h2>
      <p className="type-body text-muted">{body}</p>
    </div>
  );
}

