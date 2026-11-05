"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { pillClass, type PillVariant } from "./ui";

/** Pill "Copy" button (leading vuesax/linear/copy) that copies `text` and briefly shows "Copied". */
export function CopyButton({
  text,
  label = "Copy",
  variant = "tint",
  icon = "copy-f0f0f0",
  className = "",
}: {
  text: string;
  label?: string;
  variant?: PillVariant;
  icon?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      aria-label={`${label} ${text}`}
      onClick={() => {
        navigator.clipboard?.writeText(text).catch(() => {});
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      }}
      className={pillClass(variant, className)}
    >
      <Icon name={icon} size={16} />
      {copied ? "Copied" : label}
    </button>
  );
}
