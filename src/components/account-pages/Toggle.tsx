"use client";

import { useState } from "react";

/** Figma: Form / Toggle (374:2163 on, 374:2165 off) — 44×24, exact exported SVG per state. */
export function Toggle({
  defaultOn = true,
  label,
  onChange,
}: {
  defaultOn?: boolean;
  label: string;
  onChange?: (on: boolean) => void;
}) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => {
        setOn(!on);
        onChange?.(!on);
      }}
      className="block h-6 w-11 shrink-0 cursor-pointer"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={on ? "/icons/toggle-on-00d26a.svg" : "/icons/toggle-off-393734.svg"}
        width={44}
        height={24}
        alt=""
        className="block h-6 w-11"
        draggable={false}
      />
    </button>
  );
}
