"use client";

import { useEffect, useState } from "react";

/** 0–100: how far the reader has scrolled through #article-body (hero excluded). */
export function useReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const body = document.getElementById("article-body");
      const doc = document.documentElement;
      let p: number;
      if (body) {
        const rect = body.getBoundingClientRect();
        const start = rect.top + window.scrollY - window.innerHeight * 0.25;
        const end = rect.bottom + window.scrollY - window.innerHeight;
        p = end > start ? (window.scrollY - start) / (end - start) : 1;
      } else {
        p = window.scrollY / Math.max(1, doc.scrollHeight - window.innerHeight);
      }
      setPct(Math.round(Math.min(1, Math.max(0, p)) * 100));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return pct;
}

/** Index of the section whose heading most recently passed the upper third of the viewport. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.33;
      let idx = 0;
      ids.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) idx = i;
      });
      setActive(idx);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ids]);
  return active;
}

/** Figma "Reading progress" (432:13602): 4px brand bar under the header that tracks scroll. */
export function ReadingProgress() {
  const pct = useReadingProgress();
  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      className="sticky top-0 z-30 h-1 w-full"
    >
      <div className="h-full rounded-r-full bg-brand transition-[width] duration-150 ease-out" style={{ width: `${pct}%` }} />
    </div>
  );
}
