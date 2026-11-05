"use client";

import { useEffect, useRef, useState } from "react";
import type { Platform } from "../data";

/* eslint-disable @next/next/no-img-element */

/** Figma "Five star rating": 5 × 14px Icon / star (filled green, empty grey). */
export function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  return (
    <span className="flex shrink-0" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <img
          key={i}
          src={i < full ? "/images/catalog/star-full.svg" : "/images/catalog/star-empty.svg"}
          width={14}
          height={14}
          alt=""
          className="block size-[14px] shrink-0"
        />
      ))}
    </span>
  );
}

/** Figma platform logos (asset-2 cTrader, asset-4 MT5, asset-8 TradingView), 20 × 21.304. */
export function PlatformLogo({ platform }: { platform: Platform }) {
  if (platform === "mt5")
    return (
      <span className="relative block h-[21.304px] w-5 shrink-0" title="MetaTrader 5">
        <span className="absolute inset-[0.51%_0_1.53%_0]">
          <img src="/images/catalog/platform-mt5-base.svg" alt="" className="absolute inset-0 block size-full max-w-none" />
        </span>
        <span
          className="absolute inset-[17.44%_14.42%_18.45%_14.43%]"
          style={{
            maskImage: "url(/images/catalog/platform-mt5-mask.svg)",
            WebkitMaskImage: "url(/images/catalog/platform-mt5-mask.svg)",
            maskSize: "14.229px 13.657px",
            WebkitMaskSize: "14.229px 13.657px",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <img src="/images/catalog/platform-mt5-group.svg" alt="" className="absolute inset-0 block size-full max-w-none" />
        </span>
      </span>
    );
  const src = platform === "ctrader" ? "/images/catalog/platform-ctrader.svg" : "/images/catalog/platform-tradingview.svg";
  return (
    <img
      src={src}
      width={20}
      height={21.304}
      alt=""
      title={platform === "ctrader" ? "cTrader" : "TradingView"}
      className="block h-[21.304px] w-5 shrink-0"
    />
  );
}

export function Platforms({ platforms, className = "" }: { platforms: Platform[]; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {platforms.map((p) => (
        <PlatformLogo key={p} platform={p} />
      ))}
    </div>
  );
}

/** Copies text to the clipboard and exposes a short-lived "copied" flag. */
export function useCopied(timeout = 1600) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* clipboard unavailable — still show feedback */
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), timeout);
  };
  return { copied, copy };
}

/** Figma promo box: raised 8px-radius tile with "12% OFF" and the code + bi:copy icon. Click copies the code. */
export function PromoBox({ discount, code }: { discount: number; code: string }) {
  const { copied, copy } = useCopied();
  return (
    <button
      type="button"
      onClick={() => copy(code)}
      aria-label={`Copy promo code ${code}`}
      className="flex shrink-0 flex-col items-start gap-0.5 rounded-lg bg-raised px-4 py-1 text-left transition hover:brightness-125"
    >
      <span className="w-full text-center type-body text-brand">{discount}% OFF</span>
      <span className="flex w-full items-center gap-1">
        <span className="type-body-sm whitespace-nowrap text-ink" aria-live="polite">
          {copied ? "Copied!" : code}
        </span>
        <img src="/images/catalog/bi-copy.svg" width={16} height={16} alt="" className="block size-4 shrink-0" />
      </span>
    </button>
  );
}

/** Favourites count (Icon / heart 14 + green count). Toggles the firm in the user's favourites. */
export function FavouriteToggle({
  count,
  active,
  onToggle,
  name,
  className = "",
}: {
  count: number;
  active: boolean;
  onToggle: () => void;
  name: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      aria-label={active ? `Remove ${name} from favourites` : `Add ${name} to favourites`}
      className={`flex shrink-0 items-center gap-1 rounded-full transition ${
        active ? "-mx-2 bg-brand-tint px-2 ring-1 ring-brand" : "hover:opacity-80"
      } ${className}`}
    >
      <img src="/images/catalog/heart-14.svg" width={14} height={14} alt="" className="block size-[14px] shrink-0" />
      <span className="type-caption whitespace-nowrap text-brand">{count + (active ? 1 : 0)}</span>
    </button>
  );
}
