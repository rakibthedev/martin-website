import { Icon } from "@/components/ui/Icon";

/**
 * Figma: "Account / Stat card" (369:92) — KPI summary card used on the signed-in dashboard.
 * Surface card, 1px line border, r20, gap 14; 48px brand-tint icon disc with a 22px glyph;
 * label Caption muted, value ExtraBold 28/34 ink, hint Caption brand.
 * Padding: component default 20; dashboard instances use 16 (mobile) / 20 (tablet) / 24 (desktop)
 * — pass `padding="p-4 md:p-5 xl:p-6"` for that.
 *
 *   <StatCard label="Reviews published" value="6" hint="+2 this month" icon="document-text-22-00d26a" />
 *
 * `icon` is an icon file name from /public/icons (see components/ui/Icon.tsx) or any ReactNode.
 * 22px glyphs available: document-text-22-00d26a, medal-22-00d26a, heart-22-00d26a, wallet-22-00d26a.
 */
export type StatCardProps = {
  label: string;
  value: React.ReactNode;
  hint?: React.ReactNode;
  icon?: string | React.ReactNode;
  /** colour class for the hint line (default brand green) */
  hintClassName?: string;
  /** padding classes (default p-5 = Figma component) */
  padding?: string;
  className?: string;
};

export function StatCard({
  label,
  value,
  hint,
  icon = "document-text-22-00d26a",
  hintClassName = "text-brand",
  padding = "p-5",
  className = "",
}: StatCardProps) {
  return (
    <div
      className={`flex min-w-0 items-center gap-[14px] rounded-[20px] border border-line bg-surface ${padding} ${className}`}
    >
      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-tint">
        {typeof icon === "string" ? <Icon name={icon} size={22} /> : icon}
      </div>
      <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
        <p className="type-caption text-muted">{label}</p>
        <p className="text-[28px] font-extrabold leading-[34px] text-ink">{value}</p>
        {hint != null && <p className={`type-caption ${hintClassName}`}>{hint}</p>}
      </div>
    </div>
  );
}

export default StatCard;
