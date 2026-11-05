import { Icon } from "@/components/ui/Icon";
import { ContextParagraph, ReviewChecklist, WasThisHelpful } from "./ArticleInteractive";

const card = "rounded-[20px] border border-line bg-surface p-4 md:p-5 xl:p-6";
const lead = "text-[18px] leading-[1.7]";
const chip = "inline-flex items-center gap-1.5 rounded-full border border-line bg-page px-3 py-px type-body-sm whitespace-nowrap md:py-0.5 xl:py-1.5";

function H2({ n, id, children }: { n: number; id: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-4 md:flex-nowrap">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-brand bg-brand-tint text-[20px] font-extrabold leading-[1.15] text-brand">
        {n}
      </span>
      <h2 id={id} className="min-w-0 flex-auto scroll-mt-6 md:flex-1 text-[36px] font-semibold leading-[1.15] md:font-extrabold md:tracking-[-1px]">
        {children}
      </h2>
    </div>
  );
}

function Marker({ n, inline = false }: { n: number; inline?: boolean }) {
  return (
    <span className={`flex size-6 shrink-0 items-center justify-center rounded-full bg-brand type-caption text-page ${inline ? "max-xl:order-first" : ""}`}>
      {n}
    </span>
  );
}

/** Figma "Article" column (432:13668 · tablet 497:24817 · mobile 497:25304). */
export function ArticleContent() {
  return (
    <article className="flex min-w-0 flex-col gap-6 md:gap-8 xl:gap-10">
      {/* In 30 seconds */}
      <section
        id="in-30-seconds"
        className="flex scroll-mt-6 flex-col gap-3.5 rounded-3xl border border-brand bg-[linear-gradient(90deg,rgba(0,209,106,0.15)_0%,rgba(0,209,106,0)_60%),linear-gradient(90deg,#212121_0%,#212121_100%)] p-4 md:p-5 xl:gap-2 xl:border-line xl:p-6"
      >
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand">
            <Icon name="flash-151513" size={16} />
          </span>
          <h2 className="text-[22px] font-extrabold leading-[1.15] tracking-[-0.5px]">In 30 seconds</h2>
        </div>
        {[
          "Give more weight to reviews that include proof, like a payout screenshot.",
          "Read the context: which challenge, which account size and how long ago.",
          "Trust patterns across many reviews more than one strong opinion.",
        ].map((t) => (
          <div key={t} className="flex items-center gap-3">
            <Icon name="tick-circle-outline-00d26a" size={16} />
            <p className="min-w-0 flex-1 type-body">{t}</p>
          </div>
        ))}
      </section>

      <p className={lead}>
        Reviews are one of the best ways to learn what a prop firm is really like. But not every review tells you the same
        amount. This guide shows you four quick checks that help you separate useful reviews from noise.
      </p>

      {/* 1 */}
      <section className="flex flex-col gap-5">
        <H2 n={1} id="start-with-the-proof">
          Start with the proof
        </H2>
        <p className={`${lead} text-muted`}>
          A verified review includes evidence that the trader actually used the firm. On PropFirmScores these reviews carry a
          “Proof verified” badge. Reviews without proof can still be honest — just give them a little less weight.
        </p>
        <div className={`${card} flex flex-col gap-3`}>
          <p className="type-label">What counts as proof?</p>
          <div className="flex flex-col items-start gap-2 xl:flex-row xl:flex-wrap">
            <span className={chip}>
              <Icon name="receipt-f0f0f0" size={16} />
              Payout screenshot
            </span>
            <span className={chip}>
              <Icon name="medal-star-f0f0f0" size={16} />
              Funded certificate
            </span>
            <span className={chip}>
              <Icon name="document-text-f0f0f0" size={16} />
              Account statement
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded-3xl border border-line bg-surface p-4 md:p-5 xl:p-6">
          <div className="flex flex-col gap-2 xl:flex-row xl:items-center xl:justify-between">
            <p className="text-[10px] font-semibold leading-[14px] tracking-[1.5px] text-brand">SEE IT IN A REAL REVIEW</p>
            <p className="type-caption text-muted">From the FundingPips profile</p>
          </div>
          <div className="flex flex-col gap-3 rounded-[18px] bg-page p-4 xl:p-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-raised type-caption text-brand">
                EK
              </span>
              <p className="min-w-0 flex-1 basis-[180px] type-label">Ejike Kenneth Onyedika</p>
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-tint px-3 py-1.5 type-caption text-brand">
                <Icon name="tick-circle-outline-00d26a" size={14} />
                Proof verified
              </span>
              <Marker n={1} inline />
            </div>
            <div className="flex items-center gap-2.5">
              <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
                <span className="flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Icon key={i} name="star-898587" size={16} />
                  ))}
                </span>
                <span className="whitespace-pre-wrap type-body-sm text-muted">{"5.0  ·  3 months ago  ·  Positive"}</span>
              </div>
              <Marker n={2} inline />
            </div>
            <p className="text-[20px] font-extrabold leading-[1.15] tracking-[-0.3px]">I’ve made withdrawal</p>
            <p className="type-body-sm text-muted">
              They’ve got the best rules and account size, I’ve withdrawn even from their giveaway account
            </p>
            <div className="flex items-center gap-2">
              <div className="flex min-w-0 flex-1 flex-wrap gap-1.5">
                {["Fast Payouts", "Clear Rules", "Good Support"].map((t) => (
                  <span key={t} className="rounded-full border border-line px-3 py-1.5 type-caption whitespace-nowrap text-muted">
                    {t}
                  </span>
                ))}
              </div>
              <Marker n={3} inline />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-3">
            {[
              ["Proof", "Verified badge = evidence was checked"],
              ["Context", "Rating, date and sentiment"],
              ["Details", "Specific topics the trader mentions"],
            ].map(([t, d], i) => (
              <div key={t} className="flex items-start gap-2.5 rounded-[14px] bg-page p-4 xl:p-6">
                <Marker n={i + 1} />
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <p className="type-label">{t}</p>
                  <p className="type-caption text-muted">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2 */}
      <section className="flex flex-col gap-5">
        <H2 n={2} id="read-the-context">
          Read the context
        </H2>
        <ContextParagraph />
        <div className={`${card} flex flex-col gap-3`}>
          <p className="type-label">Before you trust a review, ask:</p>
          <div className="flex flex-col items-start gap-2.5 xl:flex-row xl:flex-wrap">
            {["Which challenge did they take?", "What account size?", "How long ago was it?", "Did they pass or fail?"].map((q) => (
              <span
                key={q}
                className="rounded-full border border-line bg-page px-3.5 py-px type-body-sm whitespace-pre md:py-1 xl:py-2.5"
              >
                {`?  ${q}`}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3.5 rounded-[18px] bg-brand-tint p-4 xl:p-6">
          <Icon name="lamp-on-f0f0f0" size={24} />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <p className="type-label text-brand">Pro tip</p>
            <p className="type-body-sm">
              Look for patterns. If several traders mention the same thing — good or bad — it’s far more reliable than one
              strong opinion.
            </p>
          </div>
        </div>
      </section>

      {/* 3 */}
      <section className="flex flex-col gap-5">
        <H2 n={3} id="check-the-trading-details">
          Check the trading details
        </H2>
        <p className={`${lead} text-muted`}>
          Useful reviews mention specifics you can check against what matters to your strategy: payout speed, platform,
          support and how clear the rules were.
        </p>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-[20px] border border-brand bg-surface p-4 md:p-5 xl:p-6">
            <div className="flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-full bg-brand">
                <Icon name="tick-circle-151513" size={16} />
              </span>
              <p className="type-label">Useful review</p>
            </div>
            <p className="type-body-sm">“Payout arrived in 2 days after I requested it.”</p>
            <p className="type-body-sm">“Support answered my rule question within an hour.”</p>
            <p className="type-body-sm">“MT5 worked well; no slippage issues on news.”</p>
            <p className="type-caption text-brand">Specific, checkable, recent</p>
          </div>
          <div className="flex flex-col gap-3 rounded-[20px] border border-line bg-surface p-4 md:p-5 xl:p-6">
            <div className="flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-full bg-raised">
                <Icon name="add-898587" size={16} rotate={45} />
              </span>
              <p className="type-label">Less useful review</p>
            </div>
            <p className="type-body-sm text-muted">“Best firm ever!!!”</p>
            <p className="type-body-sm text-muted">“Total scam, avoid.”</p>
            <p className="type-body-sm text-muted">“5 stars.”</p>
            <p className="type-caption text-muted">Emotional, no details</p>
          </div>
        </div>
      </section>

      {/* 4 */}
      <section className="flex flex-col gap-5">
        <H2 n={4} id="watch-for-red-flags">
          Watch for red flags
        </H2>
        <p className={`${lead} text-muted`}>
          A few patterns suggest reviews may not tell the full story. None of them prove anything on their own, but they’re
          worth a closer look.
        </p>
        <div className="flex flex-col gap-2.5">
          {[
            ["Many reviews on the same day", "Sudden bursts can mean a campaign, not real experiences."],
            ["Vague praise with no details", "If you can’t learn anything from it, give it less weight."],
            ["Repeated payout complaints", "Several traders reporting the same issue is a strong signal."],
          ].map(([t, d]) => (
            <div key={t} className="flex items-center gap-3.5 rounded-2xl border border-line bg-surface p-4 md:p-5 xl:p-6">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-raised">
                <Icon name="danger-f0f0f0" size={16} />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <p className="type-label">{t}</p>
                <p className="type-caption text-muted">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ReviewChecklist />
      <WasThisHelpful />
    </article>
  );
}
