/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { USER } from "@/lib/nav";
import type { Logo } from "./data";

/** Figma button heights per breakpoint: mobile 40 / tablet 44 / desktop 48. Use with <Button size="sm">. */
export const RESP_BTN = "md:h-11 xl:h-12 disabled:cursor-not-allowed disabled:opacity-50";

/** Plain image that keeps the Figma asset size. */
export function Img({ src, w, h, alt = "", className = "" }: { src: string; w: number; h: number; alt?: string; className?: string }) {
  return (
    <img
      src={src}
      width={w}
      height={h}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      draggable={false}
      className={`block shrink-0 select-none ${className}`}
      style={{ width: w, height: h }}
    />
  );
}

/**
 * Country flag. Figma's AE flag artwork is used where available; other countries fall back to the flag
 * emoji from the Figma copy (Windows renders these as letters — no colour emoji font is bundled).
 */
export function Flag({ flag, code, h = 12 }: { flag: string; code: string; h?: number }) {
  if (code === "AE")
    return <Img src="/images/insights/flag-ae.png" w={(h * 4) / 3} h={h} alt="" className="inline-block object-cover align-[-1px]" />;
  return <span style={{ fontSize: h, lineHeight: 1 }}>{flag}</span>;
}

type MarkFirm = { name: string; initials: string; logo?: Logo };

/**
 * Figma "Logo" frame: circle/tile (bg page, 1px border) holding either the firm's logo asset at
 * `logoW` px wide or its initials in brand green.
 */
export function FirmMark({
  firm,
  size,
  logoW,
  radius = 999,
  textClass = "text-[14px] leading-[20px]",
  className = "bg-page border border-line",
}: {
  firm: MarkFirm;
  size: number;
  logoW: number;
  radius?: number;
  textClass?: string;
  className?: string;
}) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center overflow-hidden ${className}`}
      style={{ width: size, height: size, borderRadius: radius }}
    >
      {firm.logo ? (
        <img
          src={firm.logo.src}
          alt={firm.name}
          draggable={false}
          className="block shrink-0 object-cover"
          style={{ width: logoW, height: logoW / firm.logo.aspect }}
        />
      ) : (
        <span className={`whitespace-nowrap text-brand ${textClass}`}>{firm.initials}</span>
      )}
    </span>
  );
}

export function Breadcrumb({ current }: { current: string }) {
  return (
    <p className="type-body-sm text-muted">
      <Link href="/" className="hover:text-ink">
        Home
      </Link>{" "}
      / {current}
    </p>
  );
}

/** Figma "Account / Signed-in context bar" (desktop) and "Account / Responsive context" (tablet, mobile). */
export function ContextBar({ title, text, cta, href }: { title: string; text: string; cta: string; href: string }) {
  return (
    <div className="w-full px-4 pt-6 md:px-6 xl:px-12">
      <div className="flex w-full flex-col items-start gap-3 rounded-[20px] border border-brand bg-brand-tint p-4 md:p-5 xl:flex-row xl:items-center xl:gap-4 xl:p-6">
        <div className="flex w-full min-w-0 items-center gap-3 xl:flex-1 xl:gap-4">
          <Avatar initials={USER.initials} size={40} textSize={14} />
          <div className="flex min-w-0 flex-1 flex-col gap-1 xl:flex-row xl:items-center xl:gap-[10px] xl:overflow-hidden xl:whitespace-nowrap">
            <p className="type-label text-ink">{title}</p>
            <p className="hidden type-body-sm text-muted xl:block">·</p>
            <p className="type-body-sm text-muted xl:truncate">{text}</p>
          </div>
        </div>
        <Button href={href} size="sm" className={RESP_BTN} trailing="arrow-right-151513">
          {cta}
        </Button>
      </div>
    </div>
  );
}

/** "Best" chip used in the comparison table (14/20, brand tint, 1px brand border). */
export function BestChip() {
  return (
    <span className="shrink-0 rounded-full border border-brand bg-brand-tint px-2 py-[3px] type-caption text-brand">Best</span>
  );
}

/** Small round icon badge (brand tint) holding an icon file or a "$"/"%" glyph. */
export function IconBadge({ size, icon, glyph, iconSize = 16, className = "bg-brand-tint" }: { size: number; icon?: string; glyph?: string; iconSize?: number; className?: string }) {
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-full ${className}`} style={{ width: size, height: size }}>
      {icon ? <Img src={icon} w={iconSize} h={iconSize} /> : <span className="type-label text-brand">{glyph}</span>}
    </span>
  );
}
