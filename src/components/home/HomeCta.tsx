/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/Button";
import { manrope } from "./fonts";

/** Figma "CTA / Make your next move" (379:11655 desktop, 497:34655 tablet, 497:37208 mobile). */
export function HomeCta() {
  return (
    <section className="px-8 pb-16 pt-8 md:px-12 md:pb-24 md:pt-12 xl:pb-36 xl:pt-20">
      <div className="relative flex w-full flex-col items-center justify-center gap-5 overflow-hidden rounded-[20px] border border-line bg-page p-4 md:gap-[22px] md:p-5 xl:gap-7 xl:rounded-3xl xl:px-12 xl:py-16">
        {/* Atmosphere / grid and corner light */}
        <span aria-hidden className="pointer-events-none absolute -inset-px">
          <img alt="" src="/images/home/cta-atmosphere-sm.svg" className="absolute inset-0 block size-full max-w-none md:hidden" />
          <img alt="" src="/images/home/cta-atmosphere-md.svg" className="absolute inset-0 hidden size-full max-w-none md:block xl:hidden" />
          <img alt="" src="/images/home/cta-atmosphere-xl.svg" className="absolute inset-0 hidden size-full max-w-none xl:block" />
        </span>

        <div className="relative flex w-full max-w-[620px] flex-col items-center gap-3 text-center text-ink md:gap-3.5 xl:max-w-[920px] xl:gap-4">
          <span className="flex items-center justify-center gap-2 rounded-[20px] bg-brand-tint px-3 py-[7px]">
            <img alt="" src="/images/home/cta-dot.svg" className="block size-1.5" />
            <span className={`${manrope.className} whitespace-nowrap text-[14px] leading-normal text-brand`}>BUILT ON REAL PROOF</span>
          </span>
          <h2 className="type-h1 xl:type-display">
            Make your next
            <br className="md:hidden" /> move
            <br className="hidden md:inline" /> with
            <br className="md:hidden" /> <span className="text-brand">confidence.</span>
          </h2>
          <p className="max-w-[295px] type-body md:max-w-[450px] xl:max-w-[720px] xl:type-h3">
            Share your verified trading experience or explore trusted prop firms before you pay.
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center gap-2 md:w-auto md:flex-row md:gap-3 xl:gap-4">
          <Button
            href="/reviews/new"
            variant="white"
            size="sm"
            trailing="arrow-up-151513"
            trailingRotate={45}
            iconSize={20}
            className="w-full md:h-11 md:w-auto xl:h-12"
          >
            Submit Review
          </Button>
          <Button
            href="/firms"
            variant="subtle"
            size="sm"
            trailing="arrow-up-20-f0f0f0"
            trailingRotate={45}
            iconSize={20}
            className="w-full border border-line bg-surface! md:h-11 md:w-auto xl:h-12"
          >
            Browse All Firms
          </Button>
        </div>
      </div>
    </section>
  );
}
