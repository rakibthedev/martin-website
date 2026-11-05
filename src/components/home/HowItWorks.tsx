/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/Button";
import { STEPS } from "./data";

type Step = (typeof STEPS)[number];

function StepIcon({ step }: { step: Step }) {
  return (
    <span className="relative block size-6 shrink-0 overflow-hidden xl:size-12">
      <span className={`absolute ${step.iconBox}`}>
        <span className={`absolute ${step.iconBleed}`}>
          <img alt="" src={`/images/home/${step.icon}-24.svg`} className="block size-full max-w-none xl:hidden" />
          <img alt="" src={`/images/home/${step.icon}.svg`} className="hidden size-full max-w-none xl:block" />
        </span>
      </span>
    </span>
  );
}

function StepCard({ step, last }: { step: Step; last: boolean }) {
  return (
    <div
      className={`flex w-full flex-col gap-4 rounded-2xl border p-4 md:min-h-[264px] xl:min-h-[176px] xl:gap-8 xl:p-6 ${
        last ? "border-brand bg-brand-tint" : "border-line bg-surface"
      }`}
    >
      <StepIcon step={step} />
      <div className="flex w-full flex-col gap-1.5 text-ink">
        <h3 className="type-h3">{step.title}</h3>
        <p className="type-body">{step.body}</p>
      </div>
    </div>
  );
}

function Milestone({ n, last, className }: { n: string; last: boolean; className: string }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full type-label ${
        last ? "bg-brand text-page" : "border border-brand bg-brand-tint text-brand"
      } ${className}`}
    >
      {n}
    </span>
  );
}

/** Figma "How it works / Review verification timeline" (379:11562 / 497:34562 / 497:37115). */
export function HowItWorks() {
  return (
    <section className="px-8 py-8 md:px-11 md:py-12 xl:px-6 xl:py-20">
      <div className="mx-auto flex w-full flex-col items-start gap-6 md:max-w-[680px] md:items-center md:gap-8 xl:max-w-[1440px] xl:gap-10">
        <div className="flex w-full flex-col items-start gap-3 md:items-center md:text-center xl:max-w-[960px]">
          <span className="rounded-[20px] bg-brand-tint-raised px-3 py-1.5 type-label text-brand">How it works</span>
          <h2 className="type-h1 text-ink xl:type-display">
            Built on
            <br className="md:hidden" /> <span className="text-brand">verified proof</span>,
            <br /> not anonymous opinions.
          </h2>
          <p className="max-w-[560px] type-body text-ink">
            Every review goes through a clear verification process to help traders make informed decisions.
          </p>
        </div>

        {/* horizontal timeline — tablet + desktop */}
        <ol className="hidden w-full items-start md:flex">
          {STEPS.map((step, i) => {
            const first = i === 0;
            const last = i === STEPS.length - 1;
            return (
              <li key={step.n} className="flex min-w-0 flex-1 flex-col gap-4 xl:gap-5">
                <div className="flex w-full items-center">
                  <span className={`h-0.5 min-w-px flex-1 ${first ? "" : "bg-brand"}`} />
                  <Milestone n={step.n} last={last} className="size-10 xl:size-12" />
                  <span className={`h-0.5 min-w-px flex-1 ${last ? "" : "bg-brand"}`} />
                </div>
                <div className="w-full px-1.5 xl:px-2.5">
                  <StepCard step={step} last={last} />
                </div>
              </li>
            );
          })}
        </ol>

        {/* vertical timeline — mobile */}
        <ol className="flex w-full flex-col md:hidden">
          {STEPS.map((step, i) => {
            const last = i === STEPS.length - 1;
            return (
              <li key={step.n} className="flex w-full items-start gap-3">
                <div className="flex w-9 shrink-0 flex-col items-center self-stretch">
                  <Milestone n={step.n} last={last} className="size-9" />
                  {!last && <span className="min-h-px w-0.5 flex-1 bg-brand" />}
                </div>
                <div className={`min-w-0 flex-1 ${last ? "" : "pb-3"}`}>
                  <StepCard step={step} last={last} />
                </div>
              </li>
            );
          })}
        </ol>

        <div className="flex w-full justify-start md:justify-center">
          <Button
            href="/reviews/new"
            variant="white"
            size="sm"
            trailing="arrow-up-151513"
            trailingRotate={45}
            iconSize={20}
            className="md:h-11 xl:h-12"
          >
            Submit Review
          </Button>
        </div>
      </div>
    </section>
  );
}
