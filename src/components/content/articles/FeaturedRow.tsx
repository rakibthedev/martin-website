"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Avatar } from "@/components/ui/Avatar";
import { ArticleArt } from "../ArticleCard";
import { ARTICLE_HREF, MOST_READ } from "../data";
import { Btn, btnClass } from "../ui";

const tag = "inline-flex h-6 shrink-0 items-center rounded-full px-3 text-[12px] font-semibold leading-4 whitespace-nowrap md:h-7 xl:h-[26px]";

/** Figma "Featured row" (381:5008 · tablet 497:46006 · mobile 497:46511). */
export function FeaturedRow() {
  const [saved, setSaved] = useState(false);
  return (
    <section className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_480px]">
      <article className="flex min-w-0 flex-col gap-6 rounded-[28px] border border-line bg-surface p-4 md:gap-8 md:p-5 xl:p-6 2xl:flex-row 2xl:items-center">
        <Link
          href={ARTICLE_HREF}
          aria-label="How to read a prop firm review"
          className="block aspect-[760/400] w-full shrink-0 overflow-hidden rounded-[20px] 2xl:w-[60%]"
        >
          <ArticleArt kind="proof" priority />
        </Link>
        <div className="flex min-w-0 flex-1 flex-col gap-4 py-6 pr-4 md:pr-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`${tag} border border-brand text-brand`}>Featured guide</span>
            <span className={`${tag} bg-raised`}>Beginner</span>
            <span className="type-caption text-muted">9 min read</span>
          </div>
          <h2 className="text-[36px] font-semibold leading-[42px] md:font-extrabold md:leading-[44px]">
            <Link href={ARTICLE_HREF} className="hover:text-brand">
              How to read a prop firm review.
            </Link>
          </h2>
          <p className="type-body text-muted">
            Understand the evidence, context and trading details that make a review useful — so you can trust what you read
            and choose a firm with confidence.
          </p>
          <div className="flex items-center gap-2.5">
            <Avatar initials="PS" size={36} textSize={14} />
            <div className="flex min-w-0 flex-col">
              <p className="type-label">PropFirmScores Research Team</p>
              <p className="type-caption text-muted">Updated 28 Oct 2026 · 2.4K readers</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2.5 pt-2">
            <Link href={ARTICLE_HREF} className={btnClass("white")}>
              Read article
              <Icon name="arrow-up-151513" size={20} rotate={45} />
            </Link>
            <Btn
              variant="outline"
              leading={saved ? "bookmark-filled-00d26a" : "bookmark-f0f0f0"}
              aria-pressed={saved}
              onClick={() => setSaved((s) => !s)}
            >
              {saved ? "Saved" : "Save"}
            </Btn>
          </div>
        </div>
      </article>

      <aside className="flex flex-col gap-1 self-stretch rounded-[28px] border border-line bg-surface p-4 md:p-5 xl:p-6">
        <p className="text-[20px] font-extrabold leading-tight">Most read this week</p>
        <div className="hidden h-3 xl:block" />
        {MOST_READ.map((m, i) => (
          <div key={m.title}>
            {i > 0 && <div className="h-px w-full bg-line" />}
            <Link href={ARTICLE_HREF} className="group flex items-center gap-3.5 py-3">
              <span className={`w-[27px] shrink-0 text-[22px] font-extrabold leading-7 ${i === 0 ? "text-brand" : "text-muted"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="type-label group-hover:text-brand">{m.title}</span>
                <span className="type-caption text-muted">{m.meta}</span>
              </span>
              <Icon name="arrow-right-898587" size={16} />
            </Link>
          </div>
        ))}
      </aside>
    </section>
  );
}
