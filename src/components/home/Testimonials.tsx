"use client";

/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useState } from "react";
import { TESTIMONIALS } from "./data";
import { manrope } from "./fonts";

/** Figma "Frame 74" (379:11618 / 497:34618 / 497:37171) — testimonial picker with prev/next arrows. */
export function Testimonials() {
  const [active, setActive] = useState(1);
  const n = TESTIMONIALS.length;
  const t = TESTIMONIALS[active];

  return (
    <section className="px-8 py-8 md:px-12 md:py-12 xl:py-20">
      <div className="flex w-full flex-col items-center gap-6 md:gap-8 xl:gap-[60px]">
        <div className="flex w-full flex-col items-center gap-4 text-center text-ink xl:w-[1026px] xl:max-w-full">
          <span className="flex w-full justify-center rounded-full bg-raised px-3 py-2.5 xl:w-[134px]">
            <span className={`${manrope.className} whitespace-nowrap text-[14px] leading-normal`}>TESTIMONIALS</span>
          </span>
          <h2 className="type-h1 xl:type-display">
            Real Stories. Verified <span className="text-brand">Experiences.</span>
          </h2>
          <p className={`${manrope.className} text-[20px] leading-normal`}>
            Explore real experiences and verified reviews from traders to make more confident decisions.
          </p>
        </div>

        <div className="flex w-full flex-col gap-6 md:flex-row md:items-start md:gap-x-8 md:gap-y-4 xl:items-center xl:gap-20">
          {/* people */}
          <ul className="flex w-full flex-col justify-center gap-6 md:min-w-0 md:flex-1 xl:w-[219px] xl:flex-none xl:items-end xl:gap-[27px]">
            {TESTIMONIALS.map((p, i) => {
              const on = i === active;
              return (
                <li key={i} className="flex w-full items-center xl:w-auto">
                  {on && <span className="h-[184px] w-3.5 shrink-0 rounded-l-xl bg-brand" />}
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setActive(i)}
                    className={`flex min-w-0 flex-1 flex-col items-start gap-4 rounded-r-2xl p-4 text-ink transition md:p-5 xl:w-[199px] xl:flex-none xl:items-center xl:p-6 ${
                      on ? "bg-raised" : "bg-page opacity-30 hover:opacity-60"
                    }`}
                  >
                    <Image src={p.avatar} alt="" width={80} height={80} className="size-20 shrink-0 rounded-full" />
                    <span className={`${manrope.className} flex w-full flex-col gap-1.5 text-center leading-normal`}>
                      <span className="text-[20px] font-medium">{p.name}</span>
                      <span className="text-[16px]">{p.role}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* quote */}
          <div className="flex w-full flex-col items-start gap-6 md:min-w-0 md:flex-1 md:gap-8 xl:gap-20">
            <img alt="" src="/images/home/quote-mark.svg" className="block size-[74px]" />
            <p className="type-h2 text-ink" aria-live="polite">
              {t.quote}
            </p>
            <div className="flex flex-wrap gap-5">
              <button type="button" aria-label="Previous testimonial" onClick={() => setActive((active - 1 + n) % n)} className="cursor-pointer">
                <img alt="" src="/images/home/testimonial-arrow-a.svg" className="block size-12 rotate-180" />
              </button>
              <button type="button" aria-label="Next testimonial" onClick={() => setActive((active + 1) % n)} className="cursor-pointer">
                <img alt="" src="/images/home/testimonial-arrow-b.svg" className="block size-12" />
              </button>
            </div>
          </div>

          {/* visual */}
          <div className="relative h-[232px] w-full overflow-hidden rounded-2xl md:h-[474px] md:min-w-0 md:flex-1 xl:h-[510px]">
            <Image src="/images/home/testimonial-visual.png" alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
