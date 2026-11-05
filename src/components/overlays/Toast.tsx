"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { useShellUI } from "@/components/layout/ShellUI";

/**
 * Figma: Toast / Logged out — desktop 395:8035 (pill, hugs content, pl10 pr18 py10, gap 10),
 * tablet 503:20568 (full width − 32, p20, gap 8), mobile 503:20780 (p16, message wraps).
 * Auto-hides after 5s (ShellUI, note 395:8044).
 */
export function Toast() {
  const { toast, hideToast } = useShellUI();
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-4 z-[70] flex justify-center xl:inset-x-0 xl:bottom-8"
    >
      {toast ? (
        <div className="pointer-events-auto flex w-full items-center gap-2 rounded-full border border-line bg-surface p-4 md:p-5 xl:w-auto xl:gap-2.5 xl:py-2.5 xl:pl-2.5 xl:pr-[18px] xl:drop-shadow-[0px_24px_32px_black]">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-tint">
            <Icon name="tick-circle-bold-00d26a" size={16} />
          </span>
          <p className="type-label min-w-0 flex-1 text-ink xl:flex-none xl:whitespace-nowrap">{toast}</p>
          <Link
            href="/account"
            onClick={hideToast}
            className="shrink-0 whitespace-nowrap text-[12px] font-bold leading-4 text-brand hover:underline"
          >
            Undo · Sign in
          </Link>
        </div>
      ) : null}
    </div>
  );
}
