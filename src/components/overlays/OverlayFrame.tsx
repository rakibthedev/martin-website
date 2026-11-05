"use client";

import { useEffect, useRef } from "react";
import { useShellUI } from "@/components/layout/ShellUI";

/**
 * Positions a header overlay (account menu / notifications panel) the way Figma does per breakpoint:
 *
 * - ≥1536px (desktop header, 371:778 / 371:1181): a dropdown card absolutely positioned under the header's
 *   right-hand cluster (top 84px). The scrim there is hidden / transparent — Figma prototype 462:8397 /
 *   462:8494 "Click-outside area (closes overlay)" — so we close on any pointerdown outside the card.
 * - <1536px (responsive header, 497:9245 / 497:9554 / 497:9863 / 497:10172): a full-viewport black scrim
 *   covering the header, with the card 92px from the top and 16px side gutters (full width up to 736px,
 *   right-aligned beyond that). The scrim scrolls when the card is taller than the viewport.
 */
export function OverlayFrame({
  label,
  role = "dialog",
  desktopClassName,
  className = "",
  children,
}: {
  label: string;
  role?: "dialog" | "region";
  /** 2xl: positioning of the card, e.g. "2xl:right-12 2xl:w-[320px]" */
  desktopClassName: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { close } = useShellUI();
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Desktop: click outside the card closes it. Header triggers (aria-expanded) toggle themselves.
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (!t || rootRef.current?.contains(t)) return;
      if (t.closest("header [aria-expanded]")) return;
      close();
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [close]);

  // Below 1536px the overlay is a full-screen sheet — lock the page behind it.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1535.98px)");
    const apply = () => {
      document.body.style.overflow = mq.matches ? "hidden" : "";
    };
    apply();
    mq.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      document.body.style.overflow = "";
    };
  }, []);

  // Move focus into the card so keyboard users land in the overlay.
  useEffect(() => {
    cardRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div
      ref={rootRef}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black px-4 pb-4 pt-[92px] 2xl:static 2xl:inset-auto 2xl:z-auto 2xl:overflow-visible 2xl:bg-transparent 2xl:p-0"
    >
      <div
        ref={cardRef}
        tabIndex={-1}
        role={role}
        aria-label={label}
        className={`w-full rounded-[24px] border border-line bg-surface outline-none md:ml-auto md:max-w-[736px] 2xl:absolute 2xl:top-[84px] 2xl:z-50 2xl:max-w-none 2xl:drop-shadow-[0px_24px_24px_black] ${desktopClassName} ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
