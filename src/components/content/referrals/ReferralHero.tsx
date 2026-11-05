"use client";

import { Icon } from "@/components/ui/Icon";
import { QR_GRID, REFERRAL_CODE, REFERRAL_LINK, SHARE_LINKS } from "../data";
import { useCopy } from "../hooks";
import { btnClass } from "../ui";

const FULL_LINK = "https://" + REFERRAL_LINK;

function downloadQr() {
  const cell = 10;
  const gap = 4;
  const size = 7 * cell + 6 * gap + 40;
  const rects = QR_GRID.flatMap((row, y) =>
    [...row].map((v, x) =>
      v === "1" ? `<rect x="${20 + x * (cell + gap)}" y="${20 + y * (cell + gap)}" width="${cell}" height="${cell}" fill="#f0f0f0"/>` : "",
    ),
  ).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect width="100%" height="100%" fill="#212121"/>${rects}</svg>`;
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "propfirmscores-referral-qr.svg";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const channel =
  "flex h-12 min-w-0 items-center justify-center gap-1 whitespace-nowrap rounded-xl border border-brand bg-brand-tint px-1 type-caption text-ink transition hover:bg-brand-tint-raised";

/** Figma "Hero" on /referrals (379:14932 · tablet 497:46915 · mobile 497:47402). */
export function ReferralHero() {
  const { copied, copy } = useCopy(2500);

  const share = async () => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title: "PropFirmScores", url: FULL_LINK });
        return;
      } catch {
        /* cancelled */
      }
    }
    copy(FULL_LINK, "link");
  };

  return (
    <section className="flex flex-col gap-6 overflow-hidden rounded-3xl border border-line bg-[linear-gradient(90deg,rgba(0,209,106,0.15)_0%,rgba(0,209,106,0)_60%),linear-gradient(90deg,#212121_0%,#212121_100%)] p-4 md:flex-row md:items-start md:gap-8 md:p-5 xl:items-center xl:justify-between xl:gap-0 xl:p-6">
      <div className="flex min-w-0 flex-1 flex-col gap-6 xl:pr-6">
        <span className="inline-flex items-center gap-2.5 self-start rounded-full border border-brand bg-brand-tint py-2 pl-2.5 pr-4">
          <span className="size-2 rounded-full bg-brand" />
          <span className="text-[10px] font-semibold leading-[14px] tracking-[1.5px] text-brand">REFERRALS · YOUR LINK IS ACTIVE</span>
        </span>
        <h1 className="type-h1 xl:type-display">
          <span className="block">Good research is</span>
          <span className="block text-brand">worth sharing.</span>
        </h1>
        <p className="text-[20px] leading-[1.5] text-muted">
          Invite other traders to explore proof-verified reviews and discover firms with more confidence. Copy your link below
          and share it anywhere.
        </p>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={() => copy(FULL_LINK, "link")} className={btnClass("primary")}>
            <Icon name="copy-151513" size={16} />
            {copied === "link" ? "Link copied" : "Copy my link"}
          </button>
          <button type="button" onClick={share} className={btnClass("tint")}>
            <Icon name="share-f0f0f0" size={16} />
            Share
          </button>
        </div>
        <ul className="flex flex-col gap-5 xl:flex-row xl:flex-wrap xl:gap-x-5 xl:gap-y-2">
          {["Takes about a minute", "One link for every channel", "Track activity in your account"].map((t) => (
            <li key={t} className="flex items-center gap-1.5 type-body-sm whitespace-nowrap text-muted">
              <Icon name="tick-circle-898587" size={16} />
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex w-full shrink-0 flex-col gap-[18px] rounded-[28px] border border-line bg-page p-4 md:w-[348px] md:p-6 xl:w-[46%] xl:max-w-[640px] xl:p-8">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-[26px] font-extrabold leading-[1.06] tracking-[-0.5px]">Your referral link</h2>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-brand bg-brand-tint px-3 py-0.5 type-caption text-brand xl:py-1.5">
            <Icon name="dot-00d26a" size={7} />
            Active
          </span>
        </div>
        <p className="type-body-sm text-muted">Share a clearer starting point with one personal link.</p>
        <div className="flex items-center gap-2.5 rounded-2xl border border-brand bg-surface py-2 pl-4 pr-2 xl:pl-5">
          <p className="min-w-0 flex-1 break-all type-label">{REFERRAL_LINK}</p>
          <button type="button" onClick={() => copy(FULL_LINK, "link")} className={btnClass("primary")}>
            <Icon name="copy-151513" size={16} />
            Copy link
          </button>
        </div>
        <p
          aria-live="polite"
          className={`-mt-1 flex items-center gap-1 type-caption text-brand transition-opacity ${copied ? "opacity-100" : "opacity-0"}`}
        >
          <Icon name="tick-circle-outline-00d26a" size={14} />
          Copied! Paste it anywhere to share.
        </p>
        <div className="flex gap-3">
          <div className="flex min-w-0 flex-1 flex-col items-start gap-3 rounded-[14px] border border-line bg-surface p-4 xl:flex-row xl:items-center xl:justify-between xl:p-6">
            <div className="flex flex-col gap-0.5">
              <p className="type-caption text-muted">Referral code</p>
              <p className="text-[22px] font-extrabold leading-[1.1] tracking-[3px]">{REFERRAL_CODE}</p>
            </div>
            <button type="button" onClick={() => copy(REFERRAL_CODE, "code")} className={btnClass("outline")}>
              <Icon name={copied === "code" ? "tick-circle-outline-00d26a" : "copy-f0f0f0"} size={16} />
              {copied === "code" ? "Copied" : "Copy"}
            </button>
          </div>
          <button
            type="button"
            onClick={downloadQr}
            className="flex shrink-0 flex-col items-center justify-center gap-1.5 rounded-[14px] border border-line bg-surface px-4 py-3 transition hover:border-brand"
          >
            <span className="flex flex-col gap-0.5" aria-hidden>
              {QR_GRID.map((row, y) => (
                <span key={y} className="flex gap-0.5">
                  {[...row].map((v, x) => (
                    <span key={x} className={`size-[5px] ${v === "1" ? "bg-ink" : "bg-surface"}`} />
                  ))}
                </span>
              ))}
            </span>
            <span className="type-caption text-brand">Download QR</span>
          </button>
        </div>
        <div className="flex flex-col gap-2.5">
          <p className="type-caption text-muted">Share in one tap:</p>
          <div className="grid grid-cols-3 gap-2 xl:grid-cols-5">
            <a href={SHARE_LINKS.x} target="_blank" rel="noreferrer" aria-label="Share on X" className={channel}>
              <Icon name="x-logo-f0f0f0" size={14} />
            </a>
            <a href={SHARE_LINKS.telegram} target="_blank" rel="noreferrer" className={channel}>
              Telegram
            </a>
            <a href={SHARE_LINKS.whatsapp} target="_blank" rel="noreferrer" className={channel}>
              WhatsApp
            </a>
            <a href={SHARE_LINKS.email} className={channel}>
              <Icon name="sms-f0f0f0" size={14} />
              Email
            </a>
            <button type="button" onClick={downloadQr} className={channel}>
              <Icon name="scan-barcode-f0f0f0" size={14} />
              QR code
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
