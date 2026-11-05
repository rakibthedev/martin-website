"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

/** Which global overlay is open. Only one at a time, like the Figma prototype. */
export type Overlay = null | "nav" | "account" | "notifications" | "logout";

type ShellUIValue = {
  overlay: Overlay;
  open: (o: Exclude<Overlay, null>) => void;
  toggle: (o: Exclude<Overlay, null>) => void;
  close: () => void;
  openLogout: () => void;
  toast: string | null;
  showToast: (msg: string) => void;
  hideToast: () => void;
};

const Ctx = createContext<ShellUIValue | null>(null);

export function ShellUIProvider({ children }: { children: React.ReactNode }) {
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [toast, setToast] = useState<string | null>(null);

  const close = useCallback(() => setOverlay(null), []);
  const open = useCallback((o: Exclude<Overlay, null>) => setOverlay(o), []);
  const toggle = useCallback((o: Exclude<Overlay, null>) => setOverlay((cur) => (cur === o ? null : o)), []);
  const showToast = useCallback((msg: string) => setToast(msg), []);
  const hideToast = useCallback(() => setToast(null), []);

  // Esc closes any overlay
  useEffect(() => {
    if (!overlay) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOverlay(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [overlay]);

  // Lock page scroll for the full-screen nav drawer and modal dialog
  useEffect(() => {
    const lock = overlay === "nav" || overlay === "logout";
    document.documentElement.style.overflow = lock ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [overlay]);

  // Toast auto-hides after 5s (Figma note: "show this toast for 5s")
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(t);
  }, [toast]);

  const value = useMemo(
    () => ({ overlay, open, toggle, close, openLogout: () => setOverlay("logout"), toast, showToast, hideToast }),
    [overlay, open, toggle, close, toast, showToast, hideToast],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useShellUI() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useShellUI must be used inside <ShellUIProvider>");
  return v;
}
