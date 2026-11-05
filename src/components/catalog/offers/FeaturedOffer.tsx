"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { CopyCodeButton } from "./CopyCodeButton";
import { useCopy } from "./useCopy";
import { FEATURED_OFFER } from "./data";

const GRADIENT =
  "linear-gradient(90deg, rgba(0, 209, 106, 0.15) 0%, rgba(0, 209, 106, 0) 60%), linear-gradient(90deg, rgb(33, 33, 33) 0%, rgb(33, 33, 33) 100%)";

/**
 * Figma "Featured offer": desktop 379:14150 (row, border line), tablet 497:41992 / mobile 497:42352
 * (stacked, border brand).
 */
export function FeaturedOffer() {
  const offer = FEATURED_OFFER;
  const { copied, copy } = useCopy(offer.code);

  return (
    <section
      className="flex w-full flex-col items-start gap-6 overflow-hidden rounded-3xl border border-brand p-4 md:gap-8 md:p-5 xl:flex-row xl:items-center xl:gap-12 xl:border-line xl:p-6"
      style={{ backgroundImage: GRADIENT }}
    >
      {/* Firm */}
      <div className="flex w-full flex-wrap items-start gap-x-6 gap-y-4 xl:w-auto xl:min-w-0 xl:flex-1 xl:flex-nowrap xl:items-center">
        <span className="flex size-24 shrink-0 items-center justify-center rounded-[20px] border border-line bg-page">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/catalog/offers/aquafunded-logo.svg"
            alt={offer.firm}
            width={56}
            height={26.552}
            className="block max-w-none"
            style={{ width: 56, height: 26.552 }}
          />
        </span>
        <div className="flex min-w-[180px] flex-1 flex-col items-start gap-2">
          <span className="flex w-full items-center gap-1 rounded-full bg-brand px-3 py-1.5 xl:w-auto">
            <Icon name="star-151513" size={14} />
            <span className="type-table-heading text-page">BEST DEAL THIS WEEK</span>
          </span>
          <Link href={offer.href} className="w-full type-h2 text-ink hover:text-brand xl:w-auto">
            {offer.firm}
          </Link>
          <div className="flex w-full flex-col items-start gap-3 xl:w-auto xl:flex-row xl:flex-wrap xl:items-baseline">
            <p className="text-[36px] font-semibold leading-[46px] text-brand xl:text-[64px] xl:leading-[72px] xl:whitespace-nowrap">
              {offer.discount}% OFF
            </p>
            <p className="type-body text-muted">your challenge fee</p>
          </div>
        </div>
      </div>

      {/* Redeem */}
      <div className="flex w-full flex-col items-start gap-3 xl:w-[520px] xl:shrink-0">
        <p className="type-body-sm text-muted">Your promo code</p>
        <div
          className={`flex w-full flex-wrap items-start gap-3 rounded-[14px] border border-dashed border-brand p-4 md:p-5 xl:items-center xl:p-6 ${
            copied ? "bg-brand-tint" : "bg-page"
          }`}
        >
          <span className="text-[32px] leading-[42px] font-semibold tracking-[4px] whitespace-nowrap text-ink">
            {offer.code}
          </span>
          <CopyCodeButton copied={copied} onCopy={copy} label="Copy code" code={offer.code} />
        </div>
        <Link
          href={offer.href}
          className="inline-flex h-12 max-w-full items-center justify-center gap-1.5 rounded-full bg-brand px-4 py-1 type-label text-page transition hover:brightness-110 xl:w-full"
        >
          Get this deal on {offer.firm}
        </Link>
        <div className="flex w-full items-center gap-1">
          <Icon name="info-circle-898587" size={14} />
          <p className="min-w-0 flex-1 type-caption text-muted">
            Confirm current terms with the firm before using a promotion.
          </p>
        </div>
      </div>
    </section>
  );
}
