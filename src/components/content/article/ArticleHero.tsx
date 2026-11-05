"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { SHARE_URL } from "../data";
import { useCopy } from "../hooks";
import { btnClass } from "../ui";

const pill = "inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-0.5 md:py-1 xl:py-1.5 type-caption whitespace-nowrap";

/** Figma "Article hero" (432:13604 · tablet 497:24753 · mobile 497:25240). */
export function ArticleHero() {
  const [saved, setSaved] = useState(false);
  const { copied, copy } = useCopy();

  const share = async () => {
    const data = { title: "How to read a prop firm review.", url: SHARE_URL };
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share(data);
        return;
      } catch {
        /* cancelled — fall back to copy */
      }
    }
    copy(SHARE_URL, "share");
  };

  return (
    <section className="flex flex-col gap-6 p-4 md:p-5 xl:gap-7 xl:p-6">
      <nav aria-label="Breadcrumb" className="type-body-sm text-muted">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        <span className="px-1.5">/</span>
        <Link href="/articles" className="hover:text-ink">
          Articles
        </Link>
        <span className="px-1.5">/</span>
        <span>Firm research</span>
      </nav>

      <div className="flex flex-wrap items-center gap-2">
        <span className={`${pill} border border-brand bg-brand-tint text-brand`}>Firm research</span>
        <span className={`${pill} bg-raised`}>
          <Icon name="dot-f0f0f0" size={7} />
          Intermediate
        </span>
        <span className={`${pill} bg-raised`}>
          <Icon name="timer-f0f0f0" size={14} />6 min read
        </span>
        <span className={`${pill} bg-brand text-page`}>
          <Icon name="star-151513" size={14} />
          Featured guide
        </span>
      </div>

      <h1 className="type-h1 xl:type-display xl:max-w-[1300px]">How to read a prop firm review.</h1>
      <p className="text-[22px] leading-[1.5] text-muted xl:max-w-[1100px]">
        Understand the evidence, context and trading details that make a review useful — so you can trust what you read and
        choose a firm with confidence.
      </p>

      <div className="flex flex-col gap-2.5 pt-2 md:flex-row md:items-start md:justify-between xl:items-center">
        <div className="flex min-w-0 items-start gap-3.5 md:max-w-[50%] xl:max-w-none xl:items-center">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand text-[20px] font-extrabold leading-none text-page">
            P
          </span>
          <div className="flex min-w-0 flex-col gap-0.5">
            <p className="type-label">PropFirmScores Guides</p>
            <p className="type-caption text-muted">Editorial team · Plain-English guides for traders</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={saved}
            onClick={() => setSaved((s) => !s)}
            className={btnClass("subtle")}
          >
            <Icon name={saved ? "heart-bold-00d26a" : "heart-f0f0f0"} size={16} />
            {saved ? "Saved" : "Save"}
          </button>
          <button type="button" onClick={share} className={btnClass("subtle")}>
            <Icon name="share-f0f0f0" size={16} />
            {copied === "share" ? "Link copied" : "Share"}
          </button>
          <button type="button" onClick={() => copy(SHARE_URL, "link")} className={btnClass("subtle")}>
            <Icon name={copied === "link" ? "tick-circle-outline-00d26a" : "link-f0f0f0"} size={16} />
            {copied === "link" ? "Copied" : "Copy link"}
          </button>
        </div>
      </div>

      <div className="relative h-[280px] w-full overflow-hidden rounded-[32px] border border-line md:h-[252px] xl:h-[560px]">
        <Image
          src="/images/content/article-hero.png"
          alt="Trader reviewing proof-verified prop firm reviews on a large screen"
          fill
          priority
          sizes="(min-width: 1280px) 1872px, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
