"use client";

import { Icon } from "@/components/ui/Icon";

/**
 * Figma Button (outline, h48) with vuesax/linear/copy, swapped to the primary "Copied" state
 * (tick-circle, bg brand) after a click. Controlled by the parent so the code box can restyle too.
 */
export function CopyCodeButton({
  copied,
  onCopy,
  label,
  code,
}: {
  copied: boolean;
  onCopy: () => void;
  label: string;
  code: string;
}) {
  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? `Copied ${code}` : `Copy promo code ${code}`}
      className={`inline-flex h-12 shrink-0 items-center justify-center gap-1.5 rounded-full px-4 py-1 type-label whitespace-nowrap transition ${
        copied ? "bg-brand text-page" : "border border-brand bg-page text-ink hover:bg-brand-tint"
      }`}
    >
      <Icon name={copied ? "tick-circle-151513" : "copy-f0f0f0"} size={16} />
      {copied ? "Copied" : label}
    </button>
  );
}
