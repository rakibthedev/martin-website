"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

/**
 * Promo code + copy glyph (Figma "Copy promo code" / "bi:copy"). Clicking copies the code to the clipboard
 * and briefly swaps the label to "Copied".
 */
export function CopyCode({
  code,
  icon,
  iconSize,
  className = "",
  textClassName = "",
}: {
  code: string;
  icon: string;
  iconSize: number;
  className?: string;
  textClassName?: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      aria-label={`Copy promo code ${code}`}
      className={`inline-flex cursor-pointer items-center ${className}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard?.writeText(code).catch(() => {});
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1400);
      }}
    >
      <span className={`whitespace-nowrap ${textClassName}`}>{copied ? "Copied" : code}</span>
      <img alt="" src={icon} width={iconSize} height={iconSize} className="block shrink-0" style={{ width: iconSize, height: iconSize }} />
    </button>
  );
}
