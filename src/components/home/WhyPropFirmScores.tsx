/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { manrope, playfair } from "./fonts";

const FEATURES = [
  { title: "Human moderation", body: "Every review is checked by our team before publishing.", href: "/articles/how-to-read-a-prop-firm-review" },
  { title: "Human moderation", body: "Every review is checked by our team before publishing.", href: "/articles/how-to-read-a-prop-firm-review" },
];

/** Figma "Frame 73" (379:11592 / 497:34592 / 497:37145) — "Why PropFirmScores" feature cards. */
export function WhyPropFirmScores() {
  return (
    <section className="px-8 py-8 md:px-12 md:py-12 xl:px-0 xl:py-20">
      <div className="flex w-full flex-col gap-6 bg-[linear-gradient(90deg,rgba(0,209,106,0.15)_0%,rgba(0,209,106,0)_60%)] p-4 md:gap-8 md:p-5 xl:gap-[60px] xl:p-20">
        {/* heading row */}
        <div className="flex w-full flex-col md:flex-row md:flex-wrap md:items-start md:justify-between md:gap-y-2 xl:flex-nowrap xl:items-end">
          <div className="flex w-full flex-col gap-4 md:w-auto md:min-w-0 md:flex-1 xl:w-[655px] xl:flex-none">
            <span className="flex w-full justify-center rounded-full bg-raised px-3 py-2.5 xl:w-[193px]">
              <span className={`${manrope.className} w-[271px] max-w-full text-[14px] leading-normal text-ink md:w-[286px] xl:w-auto xl:whitespace-nowrap`}>
                WHY PROPFIRMSCORES
              </span>
            </span>
            <h2 className="type-h2 text-ink md:hidden">
              Built different.
              <br />
              For serious <span className="text-brand">traders.</span>
            </h2>
            <h2 className={`${manrope.className} hidden text-[40px] font-medium leading-[56px] text-ink md:block xl:w-[540px]`}>
              Built different.
              <br />
              For serious <span className={`${playfair.className} font-medium italic text-brand`}>traders.</span>
            </h2>
          </div>
          <p className={`${manrope.className} w-full text-[20px] leading-8 text-ink md:w-auto md:min-w-0 md:flex-1 xl:w-[441px] xl:flex-none`}>
            Discover what makes our reviews more transparent and trustworthy.
          </p>
        </div>

        {/* cards */}
        <div className="flex w-full flex-col gap-6 md:gap-8 xl:flex-row xl:items-center xl:gap-[37px]">
          {FEATURES.map((f, i) => (
            <Link
              key={i}
              href={f.href}
              className="group flex w-full min-w-0 rounded-xl border border-ink bg-black px-4 py-8 md:px-6 xl:flex-1 xl:p-8"
            >
              <div className="flex w-full flex-col gap-6 md:gap-8">
                <div className="relative h-[199px] w-full overflow-hidden rounded-lg md:h-[365px]">
                  <Image
                    src="/images/home/why-human-moderation.png"
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 33vw, 100vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className={`${manrope.className} flex flex-col gap-2 font-medium leading-normal text-ink xl:min-h-[85px]`}>
                  <p className="text-[24px]">{f.title}</p>
                  <p className="text-[16px]">{f.body}</p>
                </div>
              </div>
            </Link>
          ))}
          <div className="flex w-full min-w-0 flex-col gap-6 md:gap-8 xl:h-[547px] xl:flex-1">
            <div className="relative h-[192.5px] w-full overflow-hidden rounded-xl border border-ink md:h-[315px] xl:h-auto xl:flex-1">
              <Image src="/images/home/why-trust-shield.png" alt="" fill sizes="(min-width: 1280px) 33vw, 100vw" className="object-cover" />
            </div>
            <div className="flex w-full flex-col items-start justify-center gap-6 rounded-xl border border-ink bg-black p-4 md:p-5 xl:p-6">
              <p className="type-h2 text-ink xl:w-[217px]">
                Your Trust. Our <span className="text-brand">Priority.</span>
              </p>
              <Link
                href="/reviews/new"
                className="inline-flex h-12 items-center justify-center gap-1.5 rounded-full border border-line px-4 type-label whitespace-nowrap text-brand transition hover:bg-brand-tint"
              >
                Submit Review
                <img alt="" src="/icons/arrow-up-00d26a.svg" width={20} height={20} className="block size-5 rotate-45" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
