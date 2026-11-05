import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { ArticleCard } from "../ArticleCard";
import { Newsletter } from "../Newsletter";
import { ARTICLES, ARTICLE_HREF, RELATED_IDS } from "../data";
import { btnClass } from "../ui";

/** Figma "After article" (432:13919 · tablet 497:25068 · mobile 497:25555). */
export function AfterArticle() {
  const related = RELATED_IDS.map((id) => ARTICLES.find((a) => a.id === id)!).filter(Boolean);
  return (
    <div className="flex flex-col gap-6 px-4 pb-8 pt-6 md:gap-8 md:px-6 md:pb-12 xl:gap-10 xl:px-12 xl:pb-24">
      <section className="flex flex-col gap-3 rounded-[32px] border border-brand bg-brand p-4 text-page md:flex-row md:items-start md:gap-8 md:p-5 xl:items-center xl:p-6">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <p className="text-[10px] font-semibold leading-[14px] tracking-[1.5px]">UP NEXT · YOU’VE FINISHED THE “NEW HERE” PATH 🎉</p>
          <h2 className="text-[36px] font-extrabold leading-[1.15] tracking-[-1.5px] xl:text-[40px]">Building your firm shortlist</h2>
          <p className="type-body opacity-75 whitespace-pre-wrap">
            {"Turn what you learned into a fair comparison of 2–3 firms.  ·  Intermediate  ·  6 min read"}
          </p>
        </div>
        <div className="flex md:flex-1 md:justify-start xl:flex-none">
          <Link href={ARTICLE_HREF} className={btnClass("subtle", undefined, "py-2")}>
            Read next
            <Icon name="arrow-right-f0f0f0" size={16} />
          </Link>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="type-h2">Keep learning</h2>
          <Link href="/articles" className="flex items-center gap-1.5 type-label text-brand hover:underline">
            All guides
            <Icon name="arrow-right-00d26a" size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {related.map((a) => (
            <ArticleCard key={a.id} a={a} showSave={false} />
          ))}
        </div>
      </section>

      <Newsletter placeholder="your@email.com" />
    </div>
  );
}
