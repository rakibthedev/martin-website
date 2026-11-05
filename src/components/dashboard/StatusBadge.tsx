import { Icon } from "@/components/ui/Icon";

/**
 * Figma: "Review / Status badge" (369:91) — review moderation status.
 * Verified = published; Under review = in human verification; Needs proof = user action required;
 * Draft = not submitted. Pill h30, 1px border, gap 6, 14px icon, Caption 14/20.
 */
export type ReviewStatus = "verified" | "under-review" | "needs-proof" | "draft";

const STATUS: Record<ReviewStatus, { label: string; icon: string; cls: string }> = {
  verified: {
    label: "Verified",
    icon: "tick-circle-00d26a",
    cls: "border-brand bg-brand-tint text-brand pl-2.5 pr-3",
  },
  "under-review": {
    label: "Under review",
    icon: "clock-f5a524",
    cls: "border-warning bg-warning-bg text-warning px-[7px]",
  },
  "needs-proof": {
    label: "Needs proof",
    icon: "danger-ff6b6b",
    cls: "border-danger bg-danger-bg text-danger pl-2.5 pr-3",
  },
  draft: {
    label: "Draft",
    icon: "edit-2-898587",
    cls: "border-muted bg-card text-muted pl-2.5 pr-3",
  },
};

export const REVIEW_STATUS_LABEL: Record<ReviewStatus, string> = {
  verified: "Verified",
  "under-review": "Under review",
  "needs-proof": "Needs proof",
  draft: "Draft",
};

export function StatusBadge({
  status,
  className = "w-[123px]",
}: {
  status: ReviewStatus;
  /** width/layout override — Figma component is a fixed 123px pill */
  className?: string;
}) {
  const s = STATUS[status];
  return (
    <span
      className={`inline-flex h-[30px] shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border py-1 type-caption ${s.cls} ${className}`}
    >
      <Icon name={s.icon} size={14} />
      {s.label}
    </span>
  );
}

export default StatusBadge;
