import { Icon } from "@/components/ui/Icon";

/** Small presentational pieces shared by the Submit Review form (Figma 432:11756). */

export function FieldLabel({
  label,
  required,
  right,
  htmlFor,
}: {
  label: string;
  required?: boolean;
  right?: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-2">
      <div className="flex flex-wrap items-center gap-2">
        {htmlFor ? (
          <label htmlFor={htmlFor} className="type-label text-ink">
            {label}
          </label>
        ) : (
          <span className="type-label text-ink">{label}</span>
        )}
        <span className={`type-caption ${required ? "text-brand" : "text-muted"}`}>{required ? "Required" : "Optional"}</span>
      </div>
      {right != null && <div className="type-caption text-muted">{right}</div>}
    </div>
  );
}

const CHIP_SIZE = {
  /** "What stood out?" tags — desktop px16 py10 */
  tag: "xl:h-auto xl:px-4 xl:py-2.5",
  /** Trade-details options — desktop px14 py8 */
  option: "xl:h-auto xl:px-3.5 xl:py-2",
  /** "Need ideas?" prompts — desktop px12 py6 */
  prompt: "xl:h-auto xl:px-3 xl:py-1.5",
} as const;

/** Figma "Chip / …": pill, 16/24 SemiBold; mobile h24 px10, tablet h28, desktop per size. */
export function Chip({
  selected = false,
  size = "tag",
  withTick = false,
  role,
  onClick,
  children,
}: {
  selected?: boolean;
  size?: keyof typeof CHIP_SIZE;
  withTick?: boolean;
  role?: "checkbox" | "radio";
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role={role}
      aria-checked={role ? selected : undefined}
      onClick={onClick}
      className={`inline-flex h-6 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 type-label transition-colors md:h-7 ${
        CHIP_SIZE[size]
      } ${selected ? "border-brand bg-brand-tint text-brand" : "border-line bg-page text-ink hover:border-muted"}`}
    >
      {withTick && selected && <Icon name="tick-circle-outline-00d26a" size={16} />}
      {children}
    </button>
  );
}

export type SectionStatus = "done" | "active" | "upcoming";

/** Section head: numbered badge + ExtraBold 28 title + status on the right. */
export function SectionHead({ n, title, status, valid }: { n: number; title: string; status: SectionStatus; valid: boolean }) {
  const badge =
    status === "done"
      ? "bg-brand text-page"
      : status === "active"
        ? "border border-brand bg-page text-brand"
        : "bg-raised text-muted";
  return (
    <div className="flex w-full items-start justify-between gap-3 xl:items-center">
      <div className="flex min-w-0 items-center gap-3.5">
        <span className={`flex size-10 shrink-0 items-center justify-center rounded-full type-label ${badge}`}>{n}</span>
        <h2 className="min-w-0 text-[28px] font-extrabold leading-[1.08] tracking-[-0.8px] text-ink">{title}</h2>
      </div>
      {status === "done" && valid && (
        <span className="flex shrink-0 items-center gap-1.5 type-label text-brand">
          <Icon name="tick-circle-outline-00d26a" size={16} />
          Complete
        </span>
      )}
      {status === "done" && !valid && <span className="shrink-0 type-label text-warning">Needs attention</span>}
      {status === "active" && (
        <span className="flex shrink-0 items-center gap-1.5 type-label text-brand">
          <Icon name="dot-00d26a" size={8} />
          In progress
        </span>
      )}
      {status === "upcoming" && <span className="shrink-0 type-label text-muted">Next</span>}
    </div>
  );
}

/** Pill button sized like Figma "Button": h40 mobile, h44 tablet, h48 desktop. */
export function PillButton({
  variant,
  className = "",
  children,
  ...rest
}: { variant: "primary" | "outline" | "subtle" } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const v =
    variant === "primary"
      ? "bg-brand text-page hover:brightness-110"
      : variant === "outline"
        ? "border border-brand bg-page text-ink hover:bg-brand-tint"
        : "bg-raised text-ink hover:brightness-125";
  return (
    <button
      type="button"
      className={`inline-flex h-10 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-4 py-1 type-label transition md:h-11 xl:h-12 ${v} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
