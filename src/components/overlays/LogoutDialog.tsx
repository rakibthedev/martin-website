"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { useShellUI } from "@/components/layout/ShellUI";
import { USER } from "@/lib/nav";

const KEPT = ["Your shortlist and comparisons", "1 review draft (kept for 30 days)", "$190 rewards balance"];

/**
 * Figma: Dialog / Log out — desktop 445:10557 (520px, p24, gap 20) on a black scrim (395:7212),
 * tablet 503:20541 (p20, gap 12, buttons 44), mobile 503:20753 (p16, gap 12, buttons 40).
 * Confirm → redirect Home + "Logged out" toast (note 395:8044).
 */
export function LogoutDialog() {
  const { overlay, close, showToast } = useShellUI();
  if (overlay !== "logout") return null;
  return <Dialog close={close} showToast={showToast} />;
}

function Dialog({ close, showToast }: { close: () => void; showToast: (m: string) => void }) {
  const router = useRouter();
  const titleId = useId();
  const descId = useId();
  const [allDevices, setAllDevices] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Move focus into the dialog and keep Tab inside it.
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !dialogRef.current) return;
      const f = dialogRef.current.querySelectorAll<HTMLElement>("button, input");
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, []);

  const confirm = () => {
    close();
    router.push("/");
    showToast(`You’ve been logged out. See you soon, ${USER.name.split(" ")[0]}.`);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      className="fixed inset-0 z-[60] flex overflow-y-auto overscroll-contain bg-black px-4 py-6"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="m-auto flex w-full max-w-[736px] flex-col outline-none items-start gap-3 rounded-[28px] border border-line bg-surface p-4 md:p-5 xl:w-[520px] xl:max-w-none xl:gap-5 xl:p-6 xl:drop-shadow-[0px_24px_32px_black]"
      >
        <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-danger">
          <Icon name="logout-24-ff6b6b" size={24} />
        </span>

        <div className="flex w-full flex-col items-start gap-2">
          <h2 id={titleId} className="w-full text-[24px] font-extrabold leading-[30px] text-ink xl:whitespace-nowrap">
            Log out of PropFirmScores?
          </h2>
          <p id={descId} className="type-body-sm w-full text-muted">
            You’ll need to sign in again to submit reviews, use member-only codes and see your shortlist.
          </p>
        </div>

        <div className="flex w-full flex-col items-start gap-2.5 rounded-[16px] border border-line bg-page p-4 md:p-5 xl:p-6">
          <p className="w-full text-[12px] font-semibold leading-4 text-muted">Saved to your account</p>
          <ul className="contents">
            {KEPT.map((k) => (
              <li key={k} className="flex w-full items-center gap-2 xl:w-auto">
                <Icon name="tick-circle-bold-00d26a" size={16} />
                <span className="type-body-sm min-w-0 flex-1 text-ink xl:flex-none xl:whitespace-nowrap">{k}</span>
              </li>
            ))}
          </ul>
        </div>

        <label className="flex w-full cursor-pointer items-start gap-2.5 xl:w-auto xl:items-center">
          <input
            type="checkbox"
            checked={allDevices}
            onChange={(e) => setAllDevices(e.target.checked)}
            className="peer sr-only"
          />
          <span
            aria-hidden
            className={`relative size-5 shrink-0 rounded-[6px] border-[1.5px] transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand ${
              allDevices ? "border-brand bg-brand" : "border-line"
            }`}
          >
            {allDevices ? (
              <span className="absolute left-[5.5px] top-[2px] h-[10px] w-[5px] rotate-45 border-b-2 border-r-2 border-page" />
            ) : null}
          </span>
          <span className="flex min-w-0 flex-1 flex-col items-start xl:flex-none">
            <span className="type-label w-full text-ink xl:whitespace-nowrap">Also log out of all other devices</span>
            <span className="type-caption w-full text-muted xl:whitespace-nowrap">Chrome on Windows and 1 other device</span>
          </span>
        </label>

        <div className="flex w-full items-start justify-end gap-4">
          <button
            type="button"
            onClick={close}
            className="type-label flex h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-brand bg-brand-tint px-4 py-1 text-ink transition-colors hover:bg-brand-tint-raised md:h-11 xl:h-12"
          >
            Stay signed in
          </button>
          <button
            type="button"
            onClick={confirm}
            className="type-label flex h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-danger px-4 py-1 text-page transition hover:brightness-110 md:h-11 xl:h-12"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
