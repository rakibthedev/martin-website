"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { CopyCodeButton } from "./CopyCodeButton";
import { useCopy } from "./useCopy";
import type { Offer } from "./data";

/** Logo tile — Figma "Logo": 50px (mobile/tablet) / 52px (desktop), bg page, 1px border, radius 12. */
function OfferLogoTile({ offer }: { offer: Offer }) {
  const { logo } = offer;
  return (
    <span className="flex size-[50px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-page xl:size-[52px]">
      {logo.kind === "text" ? (
        <span className="type-label text-brand">{logo.initials}</span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logo.src}
          alt=""
          width={logo.width}
          height={logo.height}
          className={`block max-w-none ${logo.cover ? "object-cover" : ""}`}
          style={{ width: logo.width, height: logo.height }}
        />
      )}
    </span>
  );
}

/**
 * Figma "Offer card / v2".
 *  mobile 393 (497:42393): p16, discount 32/42, full-width code box (label inside), auto-width Get deal.
 *  tablet 768 (497:42033): p20, discount 36/46 beside the code box.
 *  desktop 1920 (379:14191): p24, logo 52, "Promo code" label above a full-width code box, full-width Get deal.
 */
export function OfferCard({ offer }: { offer: Offer }) {
  const { copied, copy } = useCopy(offer.code);
  const exclusive = offer.discount === null;

  return (
    <article className="flex min-w-0 flex-col items-start gap-4 rounded-[20px] border border-line bg-surface p-4 md:p-5 xl:p-6">
      {/* Top */}
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-3.5">
          <OfferLogoTile offer={offer} />
          <Link href={offer.href} className="min-w-0 flex-1 type-h3 text-ink hover:text-brand">
            {offer.firm}
          </Link>
        </div>
        <Link
          href={offer.href}
          className="flex shrink-0 items-center justify-center gap-2 type-body-sm text-brand hover:underline"
        >
          View firm
          <Icon name="arrow-up-00d26a" size={24} rotate={45} />
        </Link>
      </div>

      {/* Discount + code (side by side on tablet; flattened into the card column on desktop) */}
      <div className="flex w-full flex-col items-start gap-3 md:flex-row md:items-center md:justify-between md:gap-4 xl:contents">
        <div className="flex w-full min-w-0 flex-col items-start gap-0.5 md:w-auto md:flex-1 xl:w-full xl:flex-none">
          <p
            className={`w-full text-[32px] font-semibold leading-[42px] text-brand md:text-[36px] md:leading-[46px] ${
              exclusive ? "" : "xl:whitespace-nowrap"
            }`}
          >
            {exclusive ? "Exclusive deal" : `${offer.discount}% OFF`}
          </p>
          <p className="w-full type-body-sm text-muted">
            {exclusive ? "Discount amount isn’t listed — it’s shown at checkout" : "off your challenge fee"}
          </p>
        </div>

        <p className="hidden type-caption text-muted xl:block">Promo code</p>

        <div
          className={`flex w-full flex-wrap items-center justify-between gap-x-3 gap-y-2 rounded-xl border border-dashed py-1.5 pl-5 pr-1.5 md:w-auto md:shrink-0 md:justify-start xl:w-full xl:flex-nowrap xl:justify-between ${
            copied ? "border-brand bg-brand-tint" : "border-line bg-page"
          }`}
        >
          <span className="type-caption whitespace-nowrap text-muted xl:hidden">Promo code</span>
          <span className="text-2xl leading-8 font-semibold tracking-[3px] whitespace-nowrap text-ink">
            {offer.code}
          </span>
          <CopyCodeButton copied={copied} onCopy={copy} label="Copy" code={offer.code} />
        </div>
      </div>

      <Link
        href={offer.href}
        className="inline-flex h-12 shrink-0 items-center justify-center gap-1.5 rounded-full bg-brand px-4 py-1 type-label whitespace-nowrap text-page transition hover:brightness-110 xl:w-full"
      >
        Get deal
        {offer.dealArrow && (
          <span className="hidden xl:block">
            <Icon name="arrow-up-16-151513" size={16} rotate={45} />
          </span>
        )}
      </Link>

      <div className="flex w-full items-center gap-1">
        <Icon name="tick-circle-898587" size={14} />
        <p className="min-w-0 flex-1 type-caption text-muted">Sample code · confirm terms with the firm</p>
      </div>
    </article>
  );
}
