"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { ART_SRC, ARTICLE_HREF, type ArtKind, type ArticleCardData } from "./data";
import { BrandPill, LevelPill } from "./ui";

/** Figma "Article art / Proof | Profit split | Drawdown": exported SVG, scaled to the slot width (542x300 at 1920). */
export function ArticleArt({ kind, className = "", priority = false }: { kind: ArtKind; className?: string; priority?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={ART_SRC[kind]}
      alt=""
      width={542}
      height={300}
      loading="eager"
      fetchPriority={priority ? "high" : "auto"}
      draggable={false}
      className={`block h-full w-full object-cover object-left-top ${className}`}
    />
  );
}

/** Figma "Article card / v3" (381:5182). */
export function ArticleCard({ a, showSave = true }: { a: ArticleCardData; showSave?: boolean }) {
  const [saved, setSaved] = useState(!!a.saved);
  return (
    <article className="relative flex min-w-0 flex-col rounded-[28px] border border-line bg-surface p-4 md:p-5 xl:p-6">
      <Link
        href={ARTICLE_HREF}
        aria-label={a.title}
        className="block aspect-[542/300] w-full overflow-hidden rounded-[20px] bg-page"
      >
        <ArticleArt kind={a.art} />
      </Link>
      {showSave && (
        <button
          type="button"
          aria-pressed={saved}
          aria-label={saved ? "Remove from saved articles" : "Save article"}
          onClick={() => setSaved((s) => !s)}
          className={`absolute right-[11px] top-[11px] flex size-10 items-center justify-center rounded-full border border-line transition md:right-[12px] md:top-[15px] xl:right-[16px] xl:top-[26px] xl:size-12 ${
            saved ? "bg-brand" : "bg-page hover:bg-raised"
          }`}
        >
          <Icon name={saved ? "bookmark-filled-151513" : "bookmark-f0f0f0"} size={18} />
        </button>
      )}
      <div className="flex flex-1 flex-col gap-3 px-3 pb-2 pt-5">
        <div className="flex flex-wrap items-center gap-2.5">
          <BrandPill>{a.category}</BrandPill>
          <LevelPill level={a.level} />
          <span className="type-caption whitespace-nowrap text-muted">{a.minutes} min read</span>
        </div>
        <h3 className="type-h3">
          <Link href={ARTICLE_HREF} className="hover:text-brand">
            {a.title}
          </Link>
        </h3>
        <p className="type-body-sm text-muted">{a.description}</p>
        <div className="flex items-center gap-3 rounded-2xl bg-page p-4 md:p-5 xl:p-6">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-tint">
            <Icon name="danger-00d26a" size={14} />
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <p className="text-[10px] font-semibold leading-[14px] tracking-[1.2px] text-brand">KEY TAKEAWAY</p>
            <p className="type-body-sm">{a.takeaway}</p>
          </div>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
          <div className="flex min-w-0 flex-col gap-0.5">
            <Link href={ARTICLE_HREF} className="type-label hover:text-brand">
              Read article
            </Link>
            <Link href={a.tool.href} className="flex items-center gap-1 type-caption text-muted hover:text-ink">
              <span className="truncate">{a.tool.label}</span>
              <Icon name="arrow-right-898587" size={14} />
            </Link>
          </div>
          <Link
            href={ARTICLE_HREF}
            aria-label={`Read ${a.title}`}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand transition xl:size-12 hover:brightness-110"
          >
            <Icon name="arrow-up-151513" size={16} rotate={45} />
          </Link>
        </div>
      </div>
    </article>
  );
}
