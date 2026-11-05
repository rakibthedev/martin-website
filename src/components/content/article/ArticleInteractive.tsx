"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { CHECKLIST } from "../data";
import { useCopy } from "../hooks";
import { btnClass } from "../ui";

/** Inline glossary term + "Glossary tooltip" card (432:13768). Clicking the underlined word toggles the definition. */
export function ContextParagraph() {
  const [open, setOpen] = useState(true);
  return (
    <>
      <p className="text-[18px] leading-[1.7] text-muted">
        The same experience can mean very different things. A trader who broke the{" "}
        <button
          type="button"
          aria-expanded={open}
          aria-controls="glossary-maximum-loss"
          onClick={() => setOpen((o) => !o)}
          className="text-brand underline decoration-from-font underline-offset-2 hover:brightness-110"
        >
          maximum loss
        </button>{" "}
        rule will often leave a negative review — but that tells you about the rule, not whether the firm pays out fairly.
      </p>
      {open && (
        <div
          id="glossary-maximum-loss"
          role="note"
          className="flex items-center gap-3 rounded-[14px] border border-line bg-raised px-4 py-3.5 xl:self-start xl:px-[18px]"
        >
          <Icon name="book-f0f0f0" size={16} />
          <div className="flex min-w-0 flex-col gap-0.5">
            <p className="type-label">Maximum loss</p>
            <p className="type-caption text-muted xl:whitespace-pre">
              {"Your overall loss limit. Breaking it ends the account.  Tap any underlined word for a quick definition."}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

/** Figma "Your review checklist" (432:13839): toggleable items + copy. */
export function ReviewChecklist() {
  const [checked, setChecked] = useState<boolean[]>([true, true, false, false, false]);
  const { copied, copy } = useCopy();
  const done = checked.filter(Boolean).length;
  const text = CHECKLIST.map((c, i) => `${checked[i] ? "[x]" : "[ ]"} ${c}`).join("\n");

  return (
    <section
      id="your-review-checklist"
      className="flex scroll-mt-6 flex-col gap-4 rounded-3xl border border-brand bg-surface p-4 md:p-5 xl:p-6"
    >
      <div className="flex flex-col items-start gap-2 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 flex-col gap-1">
          <h2 className="text-[26px] font-extrabold leading-[1.15] tracking-[-0.5px]">Your review checklist</h2>
          <p className="type-caption text-muted">
            Use this every time you read a review. {done} of {CHECKLIST.length} done
          </p>
        </div>
        <button type="button" onClick={() => copy("Your review checklist\n" + text)} className={btnClass("outline")}>
          <Icon name={copied ? "tick-circle-outline-00d26a" : "copy-f0f0f0"} size={16} />
          {copied ? "Copied" : "Copy checklist"}
        </button>
      </div>
      {CHECKLIST.map((item, i) => (
        <button
          key={item}
          type="button"
          role="checkbox"
          aria-checked={checked[i]}
          onClick={() => setChecked((c) => c.map((v, j) => (j === i ? !v : v)))}
          className={`flex w-full items-start gap-3.5 rounded-[14px] px-4 py-3.5 text-left transition md:items-center ${
            checked[i] ? "bg-brand-tint" : "bg-page hover:bg-raised"
          }`}
        >
          {checked[i] ? (
            <span className="mt-0.5 flex size-[22px] shrink-0 items-center justify-center rounded-md border border-brand bg-brand md:mt-0">
              <Icon name="check-151513" size={14} />
            </span>
          ) : (
            <span className="mt-0.5 size-[22px] shrink-0 rounded-md border-2 border-line md:mt-0" />
          )}
          <span className="min-w-0 flex-1 type-body">{item}</span>
        </button>
      ))}
    </section>
  );
}

/** Figma "Was this helpful" (432:13862). */
export function WasThisHelpful() {
  const [vote, setVote] = useState<"yes" | "no" | null>(null);
  return (
    <section className="flex flex-col gap-4 rounded-[20px] border border-line bg-surface p-4 md:p-5 xl:flex-row xl:items-center xl:justify-between xl:p-6">
      <div className="flex min-w-0 flex-col gap-0.5">
        <p className="type-label">{vote ? "Thanks for your feedback!" : "Was this guide helpful?"}</p>
        <p className="type-caption text-muted">Your feedback helps us improve our guides.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={vote === "yes"}
          onClick={() => setVote("yes")}
          className={btnClass("outline", undefined, vote === "yes" ? "ring-1 ring-brand" : "")}
        >
          <Icon name="like-f0f0f0" size={16} />
          Yes
        </button>
        <button
          type="button"
          aria-pressed={vote === "no"}
          onClick={() => setVote("no")}
          className={btnClass("subtle", undefined, vote === "no" ? "ring-1 ring-muted" : "")}
        >
          <Icon name="dislike-f0f0f0" size={16} />
          Not really
        </button>
      </div>
    </section>
  );
}
