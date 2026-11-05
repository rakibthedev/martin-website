"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { MATCHMAKER } from "../data";

const TRUST = ["6 challenges listed", "3 firms compared", "Rules explained in plain English"];

const overline = "text-[10px] leading-[14px] font-semibold tracking-[1.5px] text-brand";

/** Figma "Hero / Search and matchmaker" — desktop 379:13622, tablet 497:41021, mobile 497:41486. */
export function ChallengeHero({
  query,
  onQuery,
  onSearch,
  onMatch,
}: {
  query: string;
  onQuery: (q: string) => void;
  onSearch: () => void;
  /** answers[i] = chosen option index for MATCHMAKER[i] */
  onMatch: (answers: number[]) => void;
}) {
  return (
    <section
      className="flex flex-col items-start gap-6 overflow-hidden rounded-3xl border border-line p-4 md:flex-row md:flex-wrap md:justify-between md:gap-x-8 md:gap-y-4 md:p-5 xl:flex-nowrap xl:items-center xl:p-6"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(0, 209, 106, 0.15) 0%, rgba(0, 209, 106, 0) 60%), linear-gradient(90deg, #212121 0%, #212121 100%)",
      }}
    >
      {/* Intro */}
      <div className="flex w-full min-w-0 flex-col items-start gap-5 md:w-auto md:flex-1 xl:max-w-[784px]">
        <p className={overline}>CHALLENGES</p>
        <h1 className="w-full type-h1 text-ink xl:type-display">Find your next trading challenge.</h1>
        <p className="w-full type-body text-muted">
          Compare evaluation styles, account sizes and the rules that matter to your strategy — side by side, in one
          place.
        </p>

        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            onSearch();
          }}
          className="flex w-full items-center gap-3 rounded-full border border-line bg-brand-tint py-2 pr-2 pl-4 focus-within:border-brand md:flex-col md:items-start md:p-5 xl:flex-row xl:items-center xl:py-2 xl:pr-2 xl:pl-6"
        >
          <Icon name="search-normal-898587" size={24} />
          <label className="min-w-0 flex-1 md:w-full md:flex-none xl:w-auto xl:flex-1">
            <span className="sr-only">Search challenges</span>
            <input
              type="search"
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              placeholder="Search by firm, programme or rule (e.g. “no time limit”)"
              className="hidden w-full bg-transparent type-body text-ink outline-none placeholder:text-muted md:block"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              placeholder="Search by firm..."
              className="w-full bg-transparent type-body text-ink outline-none placeholder:text-muted md:hidden"
            />
          </label>
          <button
            type="submit"
            aria-label="Search challenges"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-1.5 rounded-full bg-brand px-4 py-1 type-label whitespace-nowrap text-page transition hover:brightness-110"
          >
            <Icon name="search-normal-16-151513" size={16} className="md:hidden" />
            <span className="hidden md:inline">Search challenges</span>
          </button>
        </form>

        <ul className="flex flex-col items-start gap-6 xl:flex-row">
          {TRUST.map((t) => (
            <li key={t} className="flex items-center gap-1.5">
              <Icon name="tick-circle-898587" size={16} />
              <span className="type-body-sm text-muted">{t}</span>
            </li>
          ))}
        </ul>
        <p className="w-full type-caption text-muted">
          Design preview · figures and offers are sample content from the supplied directory, not a live feed.
        </p>
      </div>

      <Matchmaker onMatch={onMatch} />
    </section>
  );
}

/** Figma "Matchmaker" card — 4-question wizard that pre-fills the filters. */
function Matchmaker({ onMatch }: { onMatch: (answers: number[]) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([1, 2, 3, 0]);
  const [done, setDone] = useState(false);
  const q = MATCHMAKER[step];
  const last = step === MATCHMAKER.length - 1;

  const next = () => {
    if (done) {
      setDone(false);
      setStep(0);
      return;
    }
    if (!last) return setStep(step + 1);
    onMatch(answers);
    setDone(true);
  };

  return (
    <div className="flex w-full min-w-0 flex-col items-start gap-4 rounded-[20px] border border-line bg-page p-4 md:w-auto md:flex-1 md:p-5 xl:w-[460px] xl:flex-none xl:p-6">
      <p className={overline}>CHALLENGE MATCHMAKER</p>
      <h2 className="w-full type-h3 text-ink">Not sure which challenge fits you?</h2>
      <p className="w-full type-body-sm text-muted">
        Answer 4 quick questions about your style and risk, and we’ll shortlist challenges that suit you.
      </p>
      <div className="flex w-full justify-between type-caption whitespace-nowrap text-muted">
        <span>
          {done ? "All set" : `Question ${step + 1} of ${MATCHMAKER.length}`}
        </span>
        <span>~1 min</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-raised">
        <div
          className="h-1.5 rounded-full bg-brand transition-[width]"
          style={{ width: `${(done ? 1 : (step + 1) / MATCHMAKER.length) * 100}%` }}
        />
      </div>
      {done ? (
        <p className="w-full type-label text-ink">Your matches are applied to the filters below.</p>
      ) : (
        <>
          <p className="w-full type-label text-ink">{q.q}</p>
          <div className="flex w-full flex-wrap gap-2" role="radiogroup" aria-label={q.q}>
            {q.options.map((o, i) => {
              const on = answers[step] === i;
              return (
                <button
                  key={o}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setAnswers((a) => a.map((v, j) => (j === step ? i : v)))}
                  className={`inline-flex h-6 items-center justify-center rounded-full border px-2.5 type-label whitespace-nowrap transition md:h-7 md:py-0.5 xl:h-auto xl:px-3.5 xl:py-2 ${
                    on ? "border-brand bg-brand-tint text-brand" : "border-line bg-surface text-ink hover:border-muted"
                  }`}
                >
                  {o}
                </button>
              );
            })}
          </div>
        </>
      )}
      <button
        type="button"
        onClick={next}
        className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-brand px-4 py-1 type-label whitespace-nowrap text-page transition hover:brightness-110 md:h-11 xl:h-12 xl:w-full"
      >
        {done ? "Start again" : step === 0 ? "Start matching" : last ? "Show my matches" : "Next question"}
        <Icon name="arrow-right-151513" size={16} />
      </button>
    </div>
  );
}
