"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { FirmLogo } from "@/components/ui/FirmLogo";
import { Chip, FieldLabel, PillButton, SectionHead, type SectionStatus } from "./ui";
import {
  ACCOUNT_SIZES,
  BODY_MAX,
  BODY_MIN,
  CHALLENGE_TYPES,
  GUIDANCE,
  INITIAL_REVIEW,
  MAX_FILE_BYTES,
  OUTCOMES,
  PROMPTS,
  PROOF_KINDS,
  RATING_LABELS,
  REVIEW_FIRMS,
  STOOD_OUT,
  TITLE_MAX,
  USER_DISPLAY,
  type ReviewFirm,
} from "./data";

type Step = 1 | 2 | 3;
type UploadedFile = { name: string; size: number };

const STEPS: { n: Step; title: string; hint: string }[] = [
  { n: 1, title: "Your experience", hint: "Firm, rating and story" },
  { n: 2, title: "Add proof", hint: "Screenshot or document" },
  { n: 3, title: "Review & submit", hint: "Check and send" },
];

const ACCEPT = ["image/png", "image/jpeg", "application/pdf"];

function formatSize(bytes: number) {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Preview excerpt: cut at a word boundary (~140 chars) and end with an ellipsis, as in the Figma card. */
function excerpt(text: string, max = 140) {
  if (text.length <= max) return text;
  let cut = text.slice(0, max);
  const sp = cut.lastIndexOf(" ");
  if (sp > 0) cut = cut.slice(0, sp);
  return cut.replace(/[\s.,;:!?]+$/, "") + "…";
}

function FirmMark({ firm, size = 36 }: { firm: ReviewFirm; size?: number }) {
  if (firm.logo)
    return (
      <span
        className="flex shrink-0 items-center justify-center rounded-[10px] bg-surface"
        style={{ width: size, height: size }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={firm.logo} alt="" width={22} height={22} className="block size-[22px]" />
      </span>
    );
  return <FirmLogo initials={firm.initials} size={size} radius={10} textSize={12} className={firm.logoClass} />;
}

export function SubmitReviewForm() {
  const router = useRouter();
  const [active, setActive] = useState<Step>(2);
  const [firmId, setFirmId] = useState(INITIAL_REVIEW.firmId);
  const [firmOpen, setFirmOpen] = useState(false);
  const [rating, setRating] = useState(INITIAL_REVIEW.rating);
  const [hover, setHover] = useState(0);
  const [tags, setTags] = useState<string[]>(INITIAL_REVIEW.tags);
  const [title, setTitle] = useState(INITIAL_REVIEW.title);
  const [body, setBody] = useState(INITIAL_REVIEW.body);
  const [accountSize, setAccountSize] = useState(INITIAL_REVIEW.accountSize);
  const [challengeType, setChallengeType] = useState(INITIAL_REVIEW.challengeType);
  const [outcome, setOutcome] = useState(INITIAL_REVIEW.outcome);
  const [file, setFile] = useState<UploadedFile | null>(INITIAL_REVIEW.file);
  const [progress, setProgress] = useState(100);
  const [fileError, setFileError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [postAs, setPostAs] = useState(INITIAL_REVIEW.postAs);
  const [confirmed, setConfirmed] = useState(INITIAL_REVIEW.confirmed);
  const [submitError, setSubmitError] = useState("");
  const [draftSaved, setDraftSaved] = useState(false);

  const fileInput = useRef<HTMLInputElement>(null);
  const firmBox = useRef<HTMLDivElement>(null);
  const sectionRefs = [useRef<HTMLElement>(null), useRef<HTMLElement>(null), useRef<HTMLElement>(null)];

  const firm = REVIEW_FIRMS.find((f) => f.id === firmId) ?? REVIEW_FIRMS[0];
  const uploaded = file != null && progress >= 100;

  // Simulated upload progress for newly chosen files.
  useEffect(() => {
    if (!file || progress >= 100) return;
    const t = setTimeout(() => setProgress((p) => Math.min(100, p + 20)), 120);
    return () => clearTimeout(t);
  }, [file, progress]);

  // Close the firm picker on outside click / Escape.
  useEffect(() => {
    if (!firmOpen) return;
    const onDown = (e: MouseEvent) => {
      if (firmBox.current && !firmBox.current.contains(e.target as Node)) setFirmOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setFirmOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [firmOpen]);

  useEffect(() => {
    if (!draftSaved) return;
    const t = setTimeout(() => setDraftSaved(false), 2000);
    return () => clearTimeout(t);
  }, [draftSaved]);

  const titleOk = title.trim().length > 0;
  const bodyOk = body.trim().length >= BODY_MIN;
  const step1Valid = !!firm && rating > 0 && titleOk && bodyOk;
  const tradeOk = !!(accountSize || challengeType || outcome);

  const checklist = [
    { label: "Firm selected", done: !!firm, weight: 10 },
    { label: "Rating given", done: rating > 0, weight: 15 },
    { label: "Title & experience written", done: titleOk && bodyOk, weight: 20 },
    { label: "Trade details added", done: tradeOk, weight: 10 },
    { label: "Proof uploaded", done: uploaded, weight: 15 },
    { label: "Confirmation ticked", done: confirmed, weight: 30 },
  ];
  const pct = checklist.reduce((s, c) => s + (c.done ? c.weight : 0), 0);

  const statusOf = (n: Step): SectionStatus => (n === active ? "active" : n < active ? "done" : "upcoming");

  const goTo = (n: Step) => {
    setActive(n);
    sectionRefs[n - 1].current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggle = <T,>(value: T, current: T | null, set: (v: T | null) => void) => set(current === value ? null : value);

  const acceptFile = (f: File | undefined) => {
    if (!f) return;
    const okType = ACCEPT.includes(f.type) || /\.(png|jpe?g|pdf)$/i.test(f.name);
    if (!okType) return setFileError("Please upload a PNG, JPG or PDF file.");
    if (f.size > MAX_FILE_BYTES) return setFileError("That file is larger than 10 MB.");
    setFileError("");
    setFile({ name: f.name, size: f.size });
    setProgress(0);
  };

  const submit = () => {
    if (!step1Valid) {
      setSubmitError("Please complete step 1 — rating, title and at least 50 characters of experience.");
      return goTo(1);
    }
    if (!confirmed) return setSubmitError("Please confirm this review reflects your own experience.");
    setSubmitError("");
    router.push("/account/reviews");
  };

  const shown = hover || rating;
  const previewName = postAs === "name" ? USER_DISPLAY.name : "Anonymous trader";
  const previewInitials = postAs === "name" ? USER_DISPLAY.initials : "AT";
  const previewMeta = [firm.name, accountSize, challengeType].filter(Boolean).join(" · ");

  const sectionCls = (n: Step) =>
    `flex w-full scroll-mt-6 flex-col rounded-[28px] bg-surface p-4 transition md:p-5 xl:p-6 ${
      statusOf(n) === "active" ? "border-2 border-brand" : "border border-line"
    } ${statusOf(n) === "upcoming" ? "opacity-85" : ""}`;

  return (
    <>
      {/* ───────── Stepper (432:11782) ───────── */}
      <nav
        aria-label="Review steps"
        className="flex w-full flex-col gap-3 rounded-3xl border border-line bg-surface p-4 md:flex-row md:items-center md:p-5 xl:p-6"
      >
        {STEPS.map((s, i) => {
          const st = statusOf(s.n);
          const box =
            st === "done"
              ? "bg-page p-4 md:p-5 xl:p-6"
              : st === "active"
                ? "border border-brand bg-brand-tint p-4 md:p-5 xl:p-6"
                : "py-3.5 pl-3.5 pr-4 md:pr-3.5 xl:pr-[18px]";
          const num =
            st === "done"
              ? "bg-brand"
              : st === "active"
                ? "border-2 border-brand bg-page text-brand"
                : "bg-raised text-muted";
          return (
            <div key={s.n} className="contents">
              {i > 0 && (
                <span
                  aria-hidden
                  className={`h-0.5 w-10 shrink-0 ${statusOf(STEPS[i - 1].n) === "done" ? "bg-brand" : "bg-line"}`}
                />
              )}
              <button
                type="button"
                onClick={() => goTo(s.n)}
                aria-current={st === "active" ? "step" : undefined}
                className={`flex min-w-0 flex-1 items-center gap-3.5 rounded-[18px] text-left md:flex-col md:items-start md:gap-3 xl:flex-row xl:items-center xl:gap-3.5 ${box}`}
              >
                <span
                  className={`flex size-10 shrink-0 items-center justify-center rounded-full type-label md:size-8 xl:size-10 ${num}`}
                >
                  {st === "done" ? <Icon name="tick-circle-151513" size={16} /> : s.n}
                </span>
                <span className={`flex min-w-0 flex-1 flex-col gap-0.5 ${st === "upcoming" ? "text-muted" : ""}`}>
                  <span className={`type-label ${st === "upcoming" ? "" : "text-ink"}`}>
                    Step {s.n} · {s.title}
                  </span>
                  <span className={`type-caption ${st === "done" ? "text-brand" : "text-muted"}`}>
                    {st === "done" ? "Completed" : st === "active" ? `In progress — ${s.hint}` : s.hint}
                  </span>
                </span>
              </button>
            </div>
          );
        })}
      </nav>

      {/* ───────── Body: form + sidebar (432:11803) ───────── */}
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 md:items-start md:gap-8 xl:grid-cols-[minmax(0,1232fr)_minmax(0,560fr)]">
        <div className="flex min-w-0 flex-col gap-6">
          {/* 01 · Your experience */}
          <section ref={sectionRefs[0]} onFocusCapture={() => setActive(1)} className={`${sectionCls(1)} gap-6`}>
            <SectionHead n={1} title="Your experience" status={statusOf(1)} valid={step1Valid} />

            {/* Firm */}
            <div className="flex w-full flex-col gap-2 xl:max-w-[616px]">
              <FieldLabel label="Prop firm" required />
              <div ref={firmBox} className="relative w-full">
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={firmOpen}
                  onClick={() => setFirmOpen((o) => !o)}
                  className="flex w-full items-center gap-3 rounded-[14px] border-2 border-line bg-card p-4 text-left transition-colors hover:border-muted md:p-5 xl:p-6"
                >
                  <FirmMark firm={firm} />
                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="type-label text-ink">{firm.name}</span>
                    <span className="flex items-start gap-1 type-caption text-muted">
                      <Icon name="star-898587" size={14} className="mt-[3px]" />
                      <span>{firm.meta}</span>
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1 type-caption text-brand">
                    Change
                    <Icon name="arrow-down-00d26a" size={14} rotate={firmOpen ? 180 : undefined} />
                  </span>
                </button>
                {firmOpen && (
                  <ul
                    role="listbox"
                    aria-label="Prop firm"
                    className="absolute inset-x-0 top-full z-20 mt-2 flex flex-col gap-1 rounded-[14px] border border-line bg-card p-2 shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
                  >
                    {REVIEW_FIRMS.map((f) => (
                      <li key={f.id}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={f.id === firmId}
                          onClick={() => {
                            setFirmId(f.id);
                            setFirmOpen(false);
                          }}
                          className={`flex w-full items-center gap-3 rounded-[10px] p-3 text-left hover:bg-raised ${
                            f.id === firmId ? "bg-brand-tint" : ""
                          }`}
                        >
                          <FirmMark firm={f} />
                          <span className="flex min-w-0 flex-1 flex-col">
                            <span className="type-label text-ink">{f.name}</span>
                            <span className="type-caption text-muted">{f.meta}</span>
                          </span>
                          {f.id === firmId && <Icon name="tick-circle-outline-00d26a" size={16} />}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Rating */}
            <div className="flex w-full flex-col gap-2.5">
              <FieldLabel label="Your rating" required right="Tap a star" />
              <div className="flex w-full flex-col gap-2.5 xl:flex-row xl:items-center">
                <div
                  role="radiogroup"
                  aria-label="Your rating"
                  className="flex flex-wrap gap-2 xl:gap-2.5"
                  onMouseLeave={() => setHover(0)}
                >
                  {[1, 2, 3, 4, 5].map((v) => (
                    <button
                      key={v}
                      type="button"
                      role="radio"
                      aria-checked={rating === v}
                      aria-label={`${v} · ${RATING_LABELS[v]}`}
                      onClick={() => setRating(v)}
                      onMouseEnter={() => setHover(v)}
                      onFocus={() => setHover(0)}
                      className="size-11 shrink-0 rounded-[14px] xl:size-14"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={v <= shown ? "/images/flows/rating-star.svg" : "/images/flows/rating-star-off.svg"}
                        alt=""
                        width={56}
                        height={56}
                        className="block size-full"
                      />
                    </button>
                  ))}
                </div>
                <div className="flex flex-col gap-0.5 pl-2">
                  <p className="text-[22px] font-extrabold leading-[1.08] tracking-[-0.3px] text-brand">
                    {shown ? `${shown} · ${RATING_LABELS[shown]}` : "Not rated yet"}
                  </p>
                  <p className="type-caption text-muted">1 Poor · 2 Fair · 3 Good · 4 Great · 5 Excellent</p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex w-full flex-col gap-2.5">
              <FieldLabel label="What stood out?" right="Pick any that apply" />
              <div className="flex w-full flex-wrap gap-2">
                {STOOD_OUT.map((t) => (
                  <Chip
                    key={t}
                    role="checkbox"
                    withTick
                    selected={tags.includes(t)}
                    onClick={() => setTags((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]))}
                  >
                    {t}
                  </Chip>
                ))}
              </div>
            </div>

            {/* Title */}
            <div className="flex w-full flex-col gap-2 xl:max-w-[616px]">
              <FieldLabel label="Review title" required htmlFor="review-title" right={`${title.length} / ${TITLE_MAX}`} />
              <input
                id="review-title"
                value={title}
                maxLength={TITLE_MAX}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Sum up your experience"
                className="w-full rounded-[14px] border border-line bg-card p-4 type-body text-ink outline-none placeholder:text-muted focus:border-brand"
              />
              <p className="type-caption text-muted">Tip: a short headline that sums up your experience.</p>
            </div>

            {/* Experience */}
            <div className="flex w-full flex-col gap-2.5">
              <FieldLabel
                label="Your experience"
                required
                htmlFor="review-body"
                right={
                  <span className={`flex items-center gap-1 ${bodyOk ? "text-brand" : "text-muted"}`}>
                    {body.length} / {BODY_MAX} · min {BODY_MIN}
                    {bodyOk && <Icon name="tick-circle-outline-00d26a" size={14} />}
                  </span>
                }
              />
              <div className="flex flex-col items-start gap-2 xl:flex-row xl:items-center">
                <span className="type-caption text-muted">Need ideas?</span>
                {PROMPTS.map((p) => (
                  <Chip
                    key={p.label}
                    size="prompt"
                    onClick={() =>
                      setBody((b) => {
                        const next = (b.trim() ? b.replace(/\s*$/, "") + "\n\n" : "") + p.text;
                        return next.slice(0, BODY_MAX);
                      })
                    }
                  >
                    ＋ {p.label}
                  </Chip>
                ))}
              </div>
              <textarea
                id="review-body"
                value={body}
                maxLength={BODY_MAX}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Tell traders what happened…"
                className="min-h-[132px] w-full resize-y rounded-[14px] border-2 border-line bg-card p-4 type-body text-ink outline-none [field-sizing:content] placeholder:text-muted focus:border-brand xl:min-h-[170px]"
              />
            </div>

            {/* Trade details */}
            <div className="flex w-full flex-col gap-4 rounded-[20px] bg-page p-4 md:p-5 xl:gap-[18px] xl:p-6">
              <p className="whitespace-pre-wrap type-label text-ink">{"Trade details  ·  helps others compare like-for-like"}</p>
              {(
                [
                  ["Account size", ACCOUNT_SIZES, accountSize, setAccountSize],
                  ["Challenge type", CHALLENGE_TYPES, challengeType, setChallengeType],
                  ["Your outcome", OUTCOMES, outcome, setOutcome],
                ] as const
              ).map(([label, options, value, set]) => (
                <div key={label} className="flex w-full flex-col gap-2">
                  <FieldLabel label={label} />
                  <div role="radiogroup" aria-label={label} className="flex w-full flex-wrap gap-2">
                    {options.map((o) => (
                      <Chip key={o} size="option" role="radio" selected={value === o} onClick={() => toggle(o, value, set)}>
                        {o}
                      </Chip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 02 · Add proof */}
          <section ref={sectionRefs[1]} onFocusCapture={() => setActive(2)} className={`${sectionCls(2)} gap-5`}>
            <SectionHead n={2} title="Add proof" status={statusOf(2)} valid />
            <p className="type-body text-muted">
              Proof helps other traders trust your review and earns it a “Proof verified” badge.
            </p>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                acceptFile(e.dataTransfer.files?.[0]);
              }}
              className={`flex w-full flex-col items-center gap-3 rounded-[20px] border border-dashed border-brand p-4 text-center transition-colors md:items-start md:p-5 md:text-left xl:items-center xl:p-6 xl:text-center ${
                dragging ? "bg-brand-tint" : "bg-card"
              }`}
            >
              <span className="flex size-14 items-center justify-center rounded-full bg-brand-tint">
                <Icon name="document-upload-00d26a" size={24} />
              </span>
              <p className="text-[22px] font-extrabold leading-[1.1] tracking-[-0.4px] text-ink">Drag &amp; drop your file here</p>
              <p className="type-caption text-muted">or</p>
              <PillButton variant="outline" onClick={() => fileInput.current?.click()}>
                Choose file
              </PillButton>
              <input
                ref={fileInput}
                type="file"
                accept=".png,.jpg,.jpeg,.pdf,image/png,image/jpeg,application/pdf"
                className="sr-only"
                tabIndex={-1}
                onChange={(e) => {
                  acceptFile(e.target.files?.[0]);
                  e.target.value = "";
                }}
              />
              <p className="type-caption text-muted">PNG, JPG or PDF · up to 10 MB</p>
              {fileError && <p className="type-caption text-danger">{fileError}</p>}
            </div>

            {file && (
              <div className="flex w-full items-center gap-3.5 rounded-2xl border border-line bg-card p-4 md:p-5 xl:p-6">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-[10px] bg-brand-tint">
                  <Icon name="receipt-f0f0f0" size={24} />
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <div className="flex w-full flex-wrap items-start justify-between gap-x-3 gap-y-0.5">
                    <p className="max-w-full truncate type-label text-ink">{file.name}</p>
                    <p className="flex items-center gap-1 whitespace-nowrap type-caption text-brand">
                      {formatSize(file.size)} ·
                      {uploaded ? (
                        <>
                          <Icon name="tick-circle-outline-00d26a" size={14} />
                          Uploaded
                        </>
                      ) : (
                        <span>Uploading {progress}%</span>
                      )}
                    </p>
                  </div>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-raised">
                    <div className="h-full rounded-full bg-brand transition-[width]" style={{ width: `${progress}%` }} />
                  </div>
                </div>
                <button
                  type="button"
                  aria-label={`Remove ${file.name}`}
                  onClick={() => {
                    setFile(null);
                    setProgress(100);
                  }}
                  className="shrink-0 rounded-full p-1 hover:bg-raised"
                >
                  <Icon name="add-898587" size={16} rotate={45} />
                </button>
              </div>
            )}

            <div className="flex w-full flex-col gap-2.5">
              <p className="type-label text-ink">What counts as proof?</p>
              <ul className="flex flex-col items-start gap-2 xl:flex-row xl:flex-wrap">
                {PROOF_KINDS.map((k) => (
                  <li
                    key={k.label}
                    className="flex h-6 items-center gap-1.5 rounded-full border border-line bg-page px-2.5 type-body-sm text-ink md:h-7 xl:h-auto xl:px-3 xl:py-2"
                  >
                    <Icon name={k.icon} size={16} />
                    {k.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex w-full items-start gap-3.5 rounded-2xl bg-brand-tint p-4 md:items-center md:p-5 xl:p-6">
              <Icon name="shield-tick-f0f0f0" size={24} />
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <p className="type-label text-brand">Protect your privacy</p>
                <p className="type-body-sm text-ink">
                  Hide passwords, account credentials and private financial details before uploading. Proof is only used
                  for verification.
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <p className="type-caption text-muted xl:hidden">No proof? You can skip — the review just won’t get the badge.</p>
              <div className="flex w-full items-center justify-between gap-2.5 xl:contents">
                <PillButton variant="subtle" onClick={() => goTo(1)}>
                  <Icon name="arrow-left-f0f0f0" size={16} />
                  Back
                </PillButton>
                <div className="flex items-center gap-2.5">
                  <p className="hidden type-caption text-muted xl:block">
                    No proof? You can skip — the review just won’t get the badge.
                  </p>
                  <PillButton variant="primary" onClick={() => goTo(3)}>
                    Continue
                    <Icon name="arrow-right-151513" size={16} />
                  </PillButton>
                </div>
              </div>
            </div>
          </section>

          {/* 03 · Review & submit */}
          <section ref={sectionRefs[2]} onFocusCapture={() => setActive(3)} className={`${sectionCls(3)} gap-6 xl:gap-8`}>
            <div className="flex w-full flex-col gap-5">
              <SectionHead n={3} title="Review & submit" status={statusOf(3)} valid={confirmed} />
              <div className="flex w-full flex-col gap-2.5">
                <p className="type-label text-ink">Show my review as</p>
                <div role="radiogroup" aria-label="Show my review as" className="flex w-full flex-col gap-2.5 xl:flex-row">
                  {(
                    [
                      ["name", USER_DISPLAY.name, "First name + initial"],
                      ["anonymous", "Anonymous trader", "Your name is hidden"],
                    ] as const
                  ).map(([v, label, sub]) => {
                    const on = postAs === v;
                    return (
                      <button
                        key={v}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        onClick={() => setPostAs(v)}
                        className={`flex min-w-0 flex-1 items-center gap-3 rounded-2xl border p-4 text-left md:p-5 xl:p-6 ${
                          on ? "border-brand bg-brand-tint" : "border-line bg-card hover:border-muted"
                        }`}
                      >
                        <span
                          className={`size-5 shrink-0 rounded-full ${on ? "border-[6px] border-brand" : "border border-line"}`}
                        />
                        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                          <span className="type-label text-ink">{label}</span>
                          <span className="type-caption text-muted">{sub}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <label className="flex w-full cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => {
                  setConfirmed(e.target.checked);
                  if (e.target.checked) setSubmitError("");
                }}
                className="peer sr-only"
              />
              <span
                aria-hidden
                className={`relative flex size-[22px] shrink-0 items-center justify-center rounded-md border peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand ${
                  confirmed ? "border-brand bg-brand" : submitError && !confirmed ? "border-danger bg-page" : "border-line bg-page"
                }`}
              >
                {confirmed && <span className="mb-0.5 block h-[11px] w-[6px] rotate-45 border-b-2 border-r-2 border-page" />}
              </span>
              <span className="min-w-0 flex-1 type-body-sm text-ink">
                This review reflects my own experience and is accurate to the best of my knowledge.
              </span>
            </label>

            <div className="flex w-full flex-col gap-3">
              <div className="flex flex-col items-start gap-3 xl:flex-row xl:items-center">
                <PillButton variant="outline" onClick={() => setDraftSaved(true)}>
                  <Icon name={draftSaved ? "tick-circle-outline-00d26a" : "save-2-f0f0f0"} size={16} />
                  {draftSaved ? "Draft saved" : "Save draft"}
                </PillButton>
                <PillButton variant="primary" onClick={submit}>
                  Submit for verification
                  <Icon name="arrow-right-151513" size={16} />
                </PillButton>
              </div>
              {submitError && (
                <p role="alert" className="type-caption text-danger">
                  {submitError}
                </p>
              )}
            </div>

            <p className="flex items-start gap-1 type-caption text-muted">
              <Icon name="info-circle-898587" size={14} className="mt-[3px]" />
              <span>We check every review before publishing and will email you when it’s live.</span>
            </p>
          </section>
        </div>

        {/* ───────── Sidebar (432:12073) ───────── */}
        <aside className="flex min-w-0 flex-col gap-5">
          <div className="flex w-full flex-col gap-3.5 rounded-3xl border border-line bg-surface p-4 md:p-5 xl:p-6">
            <div className="flex w-full items-center justify-between text-[22px] font-extrabold leading-[1.1] tracking-[-0.4px]">
              <p className="text-ink">{pct === 100 ? "Ready to submit" : "Almost there"}</p>
              <p className="text-brand">{pct}%</p>
            </div>
            <div
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Review completion"
              className="h-2 w-full overflow-hidden rounded-full bg-raised"
            >
              <div className="h-full rounded-full bg-brand transition-[width] duration-300" style={{ width: `${pct}%` }} />
            </div>
            <ul className="flex flex-col gap-3.5">
              {checklist.map((c) => (
                <li key={c.label} className="flex items-center gap-2.5">
                  {c.done ? (
                    <Icon name="tick-circle-outline-00d26a" size={16} />
                  ) : (
                    <span className="flex size-4 items-center justify-center">
                      <Icon name="circle-898587" size={14} />
                    </span>
                  )}
                  <span className={`type-body-sm ${c.done ? "text-ink" : "text-muted"}`}>{c.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex w-full flex-col gap-3.5 rounded-3xl border border-brand bg-surface p-4 md:p-5 xl:p-6">
            <div className="flex w-full flex-wrap items-center justify-between gap-x-2">
              <p className="flex items-center gap-1.5 type-label text-ink">
                <Icon name="eye-f0f0f0" size={16} />
                Live preview
              </p>
              <p className="type-caption text-muted">How traders will see it</p>
            </div>
            <article className="flex w-full flex-col gap-3 rounded-[18px] bg-page p-4 md:p-5 xl:p-6">
              <div className="flex w-full flex-wrap items-center gap-2.5 md:flex-col md:items-start xl:flex-row xl:items-center">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-raised type-caption text-brand">
                  {previewInitials}
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5 xl:min-w-[180px]">
                  <p className="type-label text-ink">{previewName}</p>
                  <p className="type-caption text-muted">{previewMeta}</p>
                </div>
                {uploaded && (
                  <span className="flex items-center gap-1 rounded-full bg-brand-tint px-3 py-1.5 type-caption text-brand">
                    <Icon name="tick-circle-outline-00d26a" size={14} />
                    Proof verified
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Icon key={v} name={v <= rating ? "star-00d26a" : "star-898587"} size={16} />
                  ))}
                </span>
                <p className="whitespace-pre type-body-sm text-brand">
                  {rating ? `${rating}.0` : "–"}
                  {outcome ? `  ·  ${outcome}` : ""}
                </p>
              </div>
              <p className="text-[20px] font-extrabold leading-[1.1] tracking-[-0.3px] text-ink">
                {title.trim() || "Your review title"}
              </p>
              <p className="type-body-sm text-muted">{body.trim() ? excerpt(body.trim()) : "Your experience will appear here."}</p>
              {tags.length > 0 && (
                <div className="flex w-full flex-wrap gap-1.5">
                  {STOOD_OUT.filter((t) => tags.includes(t)).map((t) => (
                    <span key={t} className="rounded-full border border-line px-3 py-1.5 type-caption text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </article>
          </div>

          <div className="flex w-full flex-col gap-3.5 rounded-3xl border border-line bg-surface p-4 md:p-5 xl:p-6">
            <p className="text-[20px] font-extrabold leading-[1.1] tracking-[-0.4px] text-ink">
              Help traders see the full picture
            </p>
            {GUIDANCE.map((g) => (
              <div key={g.title} className="flex w-full items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-page">
                  <Icon name={g.icon} size={18} />
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <p className="type-label text-ink">{g.title}</p>
                  <p className="type-caption text-muted">{g.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex w-full items-center gap-3 rounded-[20px] border border-line bg-page p-4 md:p-5 xl:p-6">
            <Icon name="message-f0f0f0" size={24} />
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <p className="type-label text-ink">Questions about reviews?</p>
              <Link
                href="/articles/how-to-read-a-prop-firm-review"
                className="flex flex-wrap items-center gap-1 type-caption text-brand hover:underline"
              >
                Read our guide “Proof behind the review”
                <Icon name="arrow-right-00d26a" size={14} />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
