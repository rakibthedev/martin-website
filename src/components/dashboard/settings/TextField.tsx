"use client";

import { useId } from "react";
import { Icon } from "@/components/ui/Icon";

/**
 * Figma: Form / Text field (374:2153) — Label (16/24 SemiBold ink), gap 8, Input (card bg, 1px line border,
 * r14, px16, 14/22 ink; h 48 mobile/tablet, 50 desktop), optional helper (Caption muted).
 * `options` turns it into a select with the 16px arrow-down trailing icon ("Dropdown" variant).
 */
const INPUT =
  "w-full min-w-0 rounded-[14px] border border-line bg-card px-4 py-3 xl:py-[13px] type-body-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-brand";

export function TextField({
  label,
  value,
  onChange,
  helper,
  type = "text",
  options,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  helper?: string;
  type?: string;
  options?: string[];
  autoComplete?: string;
}) {
  const id = useId();
  const helperId = helper ? `${id}-help` : undefined;
  return (
    <div className="flex w-full min-w-0 flex-1 flex-col items-start gap-2">
      <label htmlFor={id} className="type-label text-ink">
        {label}
      </label>
      {options ? (
        <div className="relative w-full">
          <select
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-describedby={helperId}
            className={`${INPUT} cursor-pointer appearance-none pr-11`}
          >
            {options.map((o) => (
              <option key={o} value={o} className="bg-card text-ink">
                {o}
              </option>
            ))}
          </select>
          <Icon
            name="arrow-down-898587"
            size={16}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
          />
        </div>
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={helperId}
          className={INPUT}
        />
      )}
      {helper && (
        <p id={helperId} className="type-caption text-muted">
          {helper}
        </p>
      )}
    </div>
  );
}
