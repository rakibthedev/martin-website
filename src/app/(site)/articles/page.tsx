import type { Metadata } from "next";
import Link from "next/link";
import { ArticlesFilterProvider } from "@/components/content/articles/FilterContext";
import { LearnHero } from "@/components/content/articles/LearnHero";
import { ContinueReading } from "@/components/content/articles/ContinueReading";
import { FeaturedRow } from "@/components/content/articles/FeaturedRow";
import { AllArticles } from "@/components/content/articles/AllArticles";
import { Newsletter } from "@/components/content/Newsletter";

export const metadata: Metadata = { title: "Articles · PropFirmScores" };

/** Figma "Articles" — Desktop 381:4764 · Tablet 497:45901 · Mobile 497:46406. */
export default function ArticlesPage() {
  return (
    <ArticlesFilterProvider>
      <div className="flex w-full flex-col gap-6 px-4 pb-8 pt-8 md:gap-8 md:px-6 md:pb-12 xl:gap-10 xl:px-12 xl:pb-24">
        <nav aria-label="Breadcrumb" className="type-body-sm text-muted">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span className="px-1">/</span>
          <span>Articles</span>
        </nav>
        <LearnHero />
        <ContinueReading />
        <FeaturedRow />
        <AllArticles />
        <Newsletter />
      </div>
    </ArticlesFilterProvider>
  );
}
