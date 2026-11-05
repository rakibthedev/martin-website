"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

/** Clipboard helper with a transient "copied" flag. */
export function useCopy(timeout = 2000) {
  const [copied, setCopied] = useState<string | null>(null);
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (t.current) clearTimeout(t.current);
  }, []);
  const copy = useCallback(
    async (text: string, key = "default") => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        /* clipboard may be unavailable (insecure context); still show feedback */
      }
      setCopied(key);
      if (t.current) clearTimeout(t.current);
      t.current = setTimeout(() => setCopied(null), timeout);
    },
    [timeout],
  );
  return { copied, copy };
}

/** Minimal dropdown (pill trigger + menu) used for "Level", "Sort" and "Last 30 days". */
export function Dropdown<T extends string>({
  value,
  options,
  onChange,
  render,
  triggerClass,
  iconName = "arrow-down-f0f0f0",
  align = "right",
}: {
  value: T;
  options: readonly T[];
  onChange: (v: T) => void;
  render: (v: T) => React.ReactNode;
  triggerClass: string;
  iconName?: string;
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);
  return (
    <div ref={ref} className="relative min-w-0">
      <button type="button" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((o) => !o)} className={triggerClass}>
        {render(value)}
        <Icon name={iconName} size={16} className={`transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul
          role="listbox"
          className={`absolute top-full z-20 mt-2 min-w-full overflow-hidden rounded-2xl border border-line bg-surface py-1 shadow-xl ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {options.map((o) => (
            <li key={o}>
              <button
                type="button"
                role="option"
                aria-selected={o === value}
                onClick={() => {
                  onChange(o);
                  setOpen(false);
                }}
                className={`block w-full px-4 py-2 text-left type-body-sm whitespace-nowrap hover:bg-raised ${o === value ? "text-brand" : "text-ink"}`}
              >
                {o}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
