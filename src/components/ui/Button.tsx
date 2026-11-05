import Link from "next/link";
import { Icon } from "./Icon";

/**
 * Figma: Button (343:8599) + Button / Pill (361:3274).
 * Pill, h 40/44/48, px 16, gap 6, label = Martin/Label (16/24 SemiBold).
 *  primary  -> bg brand,  text page   (icons *-151513)
 *  outline  -> bg page, 1px brand border, text ink (icons *-f0f0f0)
 *  subtle   -> bg raised, text ink   (icons *-f0f0f0)
 *  white    -> bg ink,   text page   (icons *-151513)
 * Pass `leading` / `trailing` as icon file names (see components/ui/Icon.tsx).
 */
export type ButtonVariant = "primary" | "outline" | "subtle" | "white";
const VARIANT: Record<ButtonVariant, string> = {
  primary: "bg-brand text-page hover:brightness-110",
  outline: "border border-brand bg-page text-ink hover:bg-brand-tint",
  subtle: "bg-raised text-ink hover:brightness-125",
  white: "bg-ink text-page hover:bg-white",
};
const SIZE = { sm: "h-10", md: "h-11", lg: "h-12" } as const;

type Common = {
  variant?: ButtonVariant;
  size?: keyof typeof SIZE;
  leading?: string;
  trailing?: string;
  /** rotate trailing icon (45 for arrow-up-right) */
  trailingRotate?: number;
  iconSize?: number;
  className?: string;
  children?: React.ReactNode;
};

export function Button({
  variant = "primary",
  size = "lg",
  leading,
  trailing,
  trailingRotate,
  iconSize = 16,
  className = "",
  children,
  href,
  ...rest
}: Common & ({ href: string } | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>))) {
  const cls = `inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full px-4 py-1 type-label whitespace-nowrap transition ${SIZE[size]} ${VARIANT[variant]} ${className}`;
  const inner = (
    <>
      {leading && <Icon name={leading} size={iconSize} />}
      {children}
      {trailing && <Icon name={trailing} size={iconSize} rotate={trailingRotate} />}
    </>
  );
  if (href)
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  return (
    <button type="button" className={cls} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {inner}
    </button>
  );
}
