import type { Metadata } from "next";
import { ReadingProgress } from "@/components/content/article/progress";
import { ArticleHero } from "@/components/content/article/ArticleHero";
import { TableOfContents } from "@/components/content/article/TableOfContents";
import { ArticleContent } from "@/components/content/article/ArticleContent";
import { ArticleSidebar } from "@/components/content/article/Sidebar";
import { AfterArticle } from "@/components/content/article/AfterArticle";

export const metadata: Metadata = { title: "How to read a prop firm review · PropFirmScores" };

/** Figma "Article / How to read a prop firm review" — Desktop 432:13576 · Tablet 497:24749 · Mobile 497:25236. */
export default function ArticlePage() {
  return (
    <>
      <ReadingProgress />
      <ArticleHero />
      <div
        id="article-body"
        className="grid grid-cols-1 items-start gap-6 px-4 pb-8 pt-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-8 md:px-6 md:pb-12 xl:grid-cols-[300px_minmax(0,1fr)_380px] xl:gap-10 xl:px-12 xl:pb-20"
      >
        <TableOfContents />
        <ArticleContent />
        <ArticleSidebar />
      </div>
      <AfterArticle />
    </>
  );
}
