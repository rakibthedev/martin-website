"use client";

/**
 * Figma: Form / Toggle (374:2167) — 44×24 pill, r12. On: brand track + page knob (r9, cx 32).
 * Off: raised track + muted knob (cx 12).
 */
export function Toggle({
  checked,
  onChange,
  label,
  className = "",
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative block h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
        checked ? "bg-brand" : "bg-raised"
      } ${className}`}
    >
      <span
        className={`absolute top-[3px] size-[18px] rounded-full transition-[left,background-color] ${
          checked ? "left-[23px] bg-page" : "left-[3px] bg-muted"
        }`}
      />
    </button>
  );
}
