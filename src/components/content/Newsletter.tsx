"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

/** Figma "Newsletter" (381:5539 / 432:14053 · tablet 497:46372 · mobile 497:46877). */
export function Newsletter({ placeholder = "alex.carter@mail.com" }: { placeholder?: string }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="flex flex-col items-start gap-6 overflow-hidden rounded-3xl border border-line bg-surface p-4 md:flex-row md:items-center md:gap-8 md:p-5 xl:p-6">
      <span className="flex size-[52px] shrink-0 items-center justify-center rounded-full bg-brand-tint">
        <Icon name="sms-00d26a" size={16} />
      </span>
      <div className="flex min-w-0 flex-col gap-0.5 md:flex-1">
        <p className="text-[24px] font-extrabold leading-[1.15] tracking-[-0.5px]">Get the next guide in your inbox</p>
        <p className="type-body-sm text-muted">One short email per new guide. No spam.</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (email.includes("@")) setDone(true);
        }}
        className="flex w-full shrink-0 items-center gap-2 rounded-full border border-line bg-page py-1.5 pl-4 pr-1.5 md:w-[295px] md:pl-5 xl:w-[520px]"
      >
        {done ? (
          <p className="flex min-w-0 flex-1 items-center gap-2 type-body text-brand">
            <Icon name="tick-circle-outline-00d26a" size={16} />
            You’re subscribed
          </p>
        ) : (
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            aria-label="Email address"
            className="min-w-0 flex-1 bg-transparent type-body text-ink outline-none placeholder:text-muted"
          />
        )}
        <button
          type="submit"
          disabled={done}
          className="inline-flex h-10 shrink-0 items-center justify-center rounded-full bg-brand px-4 type-label text-page transition hover:brightness-110 disabled:opacity-60 md:h-11 xl:h-12"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}
