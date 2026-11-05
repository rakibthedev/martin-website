"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { CARD, PILL_H, pillClass } from "../ui";
import { TextField } from "./TextField";
import { Toggle } from "./Toggle";
import {
  BIO_MAX,
  COUNTRIES,
  EXPERIENCE,
  INITIAL_PROFILE,
  MARKETS,
  PLATFORMS,
  PREFERENCES,
  PUBLIC_STATS,
  SETTINGS_TABS,
  VERIFICATION_CHECKS,
  type ProfileForm,
  type SettingsTabId,
} from "./data";

/**
 * Figma: Account Settings — Desktop 374:2168 / Tablet 497:11011 / Mobile 497:11236.
 * Main column = Page head, Settings tabs, Columns (Settings forms + Side panel).
 * In-card "desktop" layouts switch on the card's own width (container query @3xl = 768px), so the
 * 2-column form grid / inline setting rows only appear when the card is as wide as the Figma desktop frame.
 */

const H2 = "text-[22px] font-extrabold leading-[28px] text-ink";

function Avatar({ initials, photo, className }: { initials: string; photo?: string | null; className: string }) {
  return (
    <span
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand text-[14px] font-extrabold leading-none text-page ${className}`}
    >
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photo} alt="" className="absolute inset-0 size-full object-cover" />
      ) : (
        initials
      )}
    </span>
  );
}

function SectionHead({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col items-start gap-1">
      <h2 className={H2}>{title}</h2>
      <p className="type-body-sm w-full text-muted">{children}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ tabs */

function SettingsTabs({ active, onSelect }: { active: SettingsTabId; onSelect: (t: SettingsTabId) => void }) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
      <div
        role="tablist"
        aria-label="Settings sections"
        className="flex w-max items-start gap-1 rounded-full border border-line bg-surface p-1 md:w-full xl:w-max"
      >
        {SETTINGS_TABS.map((t) => {
          const on = t.id === active;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => onSelect(t.id)}
              className={`type-label flex h-10 shrink-0 items-center whitespace-nowrap rounded-full px-3.5 transition-colors md:h-11 md:px-4 xl:px-[18px] ${
                on ? "bg-brand text-page" : "text-ink hover:bg-raised"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* --------------------------------------------------------- profile details */

function ProfileDetails({
  form,
  setForm,
  dirty,
  onCancel,
  onSave,
  saved,
  photo,
  setPhoto,
}: {
  form: ProfileForm;
  setForm: (f: ProfileForm) => void;
  dirty: boolean;
  onCancel: () => void;
  onSave: () => void;
  saved: boolean;
  photo: string | null;
  setPhoto: (p: string | null) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const set = <K extends keyof ProfileForm>(k: K) => (v: ProfileForm[K]) => setForm({ ...form, [k]: v });
  const toggleMarket = (m: string) =>
    set("markets")(form.markets.includes(m) ? form.markets.filter((x) => x !== m) : [...form.markets, m]);

  return (
    <section id="settings-profile" className={`@container flex w-full scroll-mt-28 flex-col items-start gap-6 ${CARD}`}>
      <SectionHead title="Profile details">This is how other traders see you next to your reviews.</SectionHead>

      {/* Photo */}
      <div className="flex w-full flex-col items-start gap-4 md:flex-row md:items-center md:gap-5">
        <Avatar initials="AC" photo={photo} className="size-[72px] md:size-[52px] xl:size-20" />
        <div className="flex w-full min-w-0 flex-col items-start gap-3 md:flex-1 md:gap-2.5">
          <div className="flex flex-wrap items-start gap-x-2 gap-y-3">
            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg"
              className="sr-only"
              tabIndex={-1}
              aria-hidden
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) setPhoto(URL.createObjectURL(f));
                e.target.value = "";
              }}
            />
            <button type="button" onClick={() => fileRef.current?.click()} className={pillClass("outline")}>
              <Icon name="camera-f0f0f0" size={16} />
              Upload new photo
            </button>
            <button
              type="button"
              onClick={() => setPhoto(null)}
              disabled={!photo}
              className={pillClass("subtle", "disabled:cursor-default disabled:hover:brightness-100")}
            >
              Remove
            </button>
          </div>
          <p className="type-caption text-muted">JPG or PNG, at least 400×400px, max 2 MB.</p>
        </div>
      </div>

      <div className="h-px w-full bg-line" />

      {/* Form grid */}
      <div className="flex w-full flex-col items-start gap-5">
        <div className="flex w-full flex-col items-start gap-5 @3xl:flex-row">
          <TextField label="Full name" value={form.fullName} onChange={set("fullName")} autoComplete="name" />
          <TextField
            label="Display name on reviews"
            value={form.displayName}
            onChange={set("displayName")}
            helper="Shown publicly. Your full name stays private."
            autoComplete="nickname"
          />
        </div>
        <div className="flex w-full flex-col items-start gap-5 @3xl:flex-row">
          <TextField
            label="Email address"
            type="email"
            value={form.email}
            onChange={set("email")}
            helper="Verified · used for sign-in and review updates"
            autoComplete="email"
          />
          <TextField label="Country" value={form.country} onChange={set("country")} options={COUNTRIES} />
        </div>
        <div className="flex w-full flex-col items-start gap-5 @3xl:flex-row">
          <TextField
            label="Trading experience"
            value={form.experience}
            onChange={set("experience")}
            options={EXPERIENCE}
          />
          <TextField label="Main platform" value={form.platform} onChange={set("platform")} options={PLATFORMS} />
        </div>

        <div role="group" aria-labelledby="settings-markets" className="flex w-full flex-col items-start gap-2.5">
          <p id="settings-markets" className="type-label text-ink">
            Markets you trade
          </p>
          <div className="flex flex-wrap items-start gap-2">
            {MARKETS.map((m) => {
              const on = form.markets.includes(m);
              return (
                <button
                  key={m}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleMarket(m)}
                  className={`type-label flex h-6 items-center gap-1.5 whitespace-nowrap rounded-full border px-[11px] transition-colors md:h-7 xl:h-[42px] xl:px-3.5 ${
                    on ? "border-brand bg-brand-tint text-brand" : "border-line bg-card text-ink hover:bg-raised"
                  }`}
                >
                  {on && <Icon name="tick-circle-00d26a" size={14} />}
                  {m}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-2">
          <label htmlFor="settings-bio" className="type-label text-ink">
            Short bio
          </label>
          <textarea
            id="settings-bio"
            value={form.bio}
            maxLength={BIO_MAX}
            onChange={(e) => set("bio")(e.target.value)}
            className="type-body-sm h-[100px] w-full resize-none rounded-[14px] border border-line bg-card p-4 text-ink outline-none transition-colors focus:border-brand md:h-[122px] xl:h-[110px]"
          />
          <p className="type-caption w-full text-right text-muted" aria-live="polite">
            {form.bio.length} / {BIO_MAX}
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-end gap-2.5">
        {saved && (
          <p className="type-caption mr-auto flex items-center gap-1.5 text-brand" role="status">
            <Icon name="tick-circle-00d26a" size={14} />
            Changes saved
          </p>
        )}
        <button type="button" onClick={onCancel} disabled={!dirty} className={pillClass("subtle", "disabled:cursor-default")}>
          Cancel
        </button>
        <button type="button" onClick={onSave} className={pillClass("primary")}>
          Save changes
        </button>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- security */

function SettingIcon({ name }: { name: string }) {
  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-raised">
      <Icon name={name} size={18} />
    </span>
  );
}

function SettingCopy({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex w-full min-w-0 flex-1 flex-col items-start gap-0.5">
      <p className="type-label text-ink">{title}</p>
      <p className="type-caption w-full text-muted">{children}</p>
    </div>
  );
}

const SETTING_ROW = "w-full rounded-[18px] border border-line bg-card p-4 md:p-5 xl:p-6";

function Security() {
  const [twoFactor, setTwoFactor] = useState(true);
  const [otherDevices, setOtherDevices] = useState(1);
  const [pwOpen, setPwOpen] = useState(false);
  const [pw, setPw] = useState({ current: "", next: "" });
  const [pwChanged, setPwChanged] = useState(false);

  /** Password / Active sessions: mobile = (icon+copy) row then button; tablet = icon, copy, button stacked;
   *  desktop (card ≥ 768) = single row. */
  const stackRow = `flex flex-col items-start gap-4 @3xl:flex-row @3xl:flex-wrap @3xl:items-center ${SETTING_ROW}`;
  const stackHead = "flex w-full min-w-0 items-start gap-4 md:flex-col @3xl:w-auto @3xl:flex-1 @3xl:flex-row @3xl:items-center";

  return (
    <section id="settings-security" className={`@container flex w-full scroll-mt-28 flex-col items-start gap-6 ${CARD}`}>
      <SectionHead title="Sign-in & security">Protect your account and the reviews published under your name.</SectionHead>

      <div className={stackRow}>
        <div className={stackHead}>
          <SettingIcon name="lock-f0f0f0" />
          <SettingCopy title="Password">{pwChanged ? "Last changed just now" : "Last changed 3 months ago"}</SettingCopy>
        </div>
        <button type="button" aria-expanded={pwOpen} onClick={() => setPwOpen((o) => !o)} className={pillClass("outline")}>
          Change password
        </button>
        {pwOpen && (
          <form
            className="flex w-full flex-col gap-3 @3xl:basis-full"
            onSubmit={(e) => {
              e.preventDefault();
              setPwChanged(true);
              setPwOpen(false);
              setPw({ current: "", next: "" });
            }}
          >
            <div className="flex w-full flex-col gap-3 @3xl:flex-row">
              <TextField
                label="Current password"
                type="password"
                value={pw.current}
                onChange={(v) => setPw({ ...pw, current: v })}
                autoComplete="current-password"
              />
              <TextField
                label="New password"
                type="password"
                value={pw.next}
                onChange={(v) => setPw({ ...pw, next: v })}
                autoComplete="new-password"
              />
            </div>
            <div className="flex justify-end gap-2.5">
              <button type="button" onClick={() => setPwOpen(false)} className={pillClass("subtle")}>
                Cancel
              </button>
              <button type="submit" disabled={!pw.current || pw.next.length < 8} className={pillClass("primary", "disabled:opacity-50")}>
                Update password
              </button>
            </div>
          </form>
        )}
      </div>

      <div className={`flex items-start gap-4 md:items-center ${SETTING_ROW}`}>
        <SettingIcon name="shield-tick-18-f0f0f0" />
        <SettingCopy title="Two-factor authentication">
          {twoFactor
            ? "Authenticator app is on. Required to submit or edit reviews."
            : "Authenticator app is off. Turn it on to submit or edit reviews."}
        </SettingCopy>
        <Toggle checked={twoFactor} onChange={setTwoFactor} label="Two-factor authentication" />
      </div>

      <div className={stackRow}>
        <div className={stackHead}>
          <SettingIcon name="global-f0f0f0" />
          <SettingCopy title="Active sessions">
            {otherDevices > 0
              ? "Chrome on Windows · Dhaka (this device) and 1 other device"
              : "Chrome on Windows · Dhaka (this device)"}
          </SettingCopy>
        </div>
        <button
          type="button"
          onClick={() => setOtherDevices(0)}
          disabled={otherDevices === 0}
          className={pillClass("subtle", "disabled:cursor-default disabled:opacity-60")}
        >
          {otherDevices > 0 ? "Sign out other devices" : "Signed out"}
        </button>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- notifications */

function Notifications() {
  const [prefs, setPrefs] = useState(() => Object.fromEntries(PREFERENCES.map((p) => [p.id, p.on])));
  return (
    <section
      id="settings-notifications"
      className={`@container flex w-full scroll-mt-28 flex-col items-start gap-6 ${CARD}`}
    >
      <SectionHead title="Notifications">
        Choose what we email you about. In-app notifications are always on for review status.
      </SectionHead>
      <ul className="flex w-full flex-col">
        {PREFERENCES.map((p, i) => (
          <li
            key={p.id}
            className={`flex w-full items-start gap-4 py-3.5 @3xl:items-center ${i > 0 ? "border-t border-line" : ""}`}
          >
            <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
              <p className="type-label text-ink">{p.title}</p>
              <p className="type-caption text-muted">{p.description}</p>
            </div>
            <Toggle
              checked={prefs[p.id]}
              onChange={(v) => setPrefs((s) => ({ ...s, [p.id]: v }))}
              label={p.title}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

/* --------------------------------------------------------------- side panel */

function SidePanel({ form, photo }: { form: ProfileForm; photo: string | null }) {
  const [deleteStep, setDeleteStep] = useState<"idle" | "confirm" | "requested">("idle");
  const panelBtn = "w-auto xl:w-full";
  return (
    <aside className="flex w-full shrink-0 flex-col items-start gap-6 p-4 md:w-[367px] md:p-5 xl:w-[420px] xl:p-6">
      {/* Public profile preview */}
      <div
        className="flex w-full flex-col items-start gap-4 rounded-[24px] border border-line p-4 md:p-5 xl:items-center xl:gap-[18px] xl:p-6"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(0,209,106,0.15) 0%, rgba(0,209,106,0) 60%), linear-gradient(90deg, #212121 0%, #212121 100%)",
        }}
      >
        <div className="flex items-center gap-1.5">
          <Icon name="eye-14-00d26a" size={14} />
          <p className="whitespace-nowrap text-[11px] font-bold leading-normal tracking-[1px] text-brand">
            PUBLIC PROFILE PREVIEW
          </p>
        </div>
        <Avatar initials="AC" photo={photo} className="h-[50px] w-[52px] xl:size-[72px]" />
        <div className="flex w-full flex-col items-start gap-1 xl:items-center">
          <p className="text-[22px] font-extrabold leading-[28px] text-ink">{form.displayName || "Anonymous"}</p>
          <div className="flex items-center gap-1">
            <Icon name="verify-00d26a" size={14} />
            <p className="type-caption text-muted">Verified trader · Level 3 · {form.country}</p>
          </div>
        </div>
        <div className="flex w-full items-start gap-x-2.5 gap-y-3 md:flex-wrap xl:flex-nowrap">
          {PUBLIC_STATS.map((s) => (
            <div
              key={s.label}
              className="flex min-w-0 flex-1 basis-0 flex-col items-start gap-0.5 rounded-[16px] border border-line bg-brand-tint p-4 md:flex-none md:basis-auto md:p-5 xl:flex-1 xl:basis-0 xl:items-center xl:p-6 xl:text-center"
            >
              <p className="text-[20px] font-extrabold leading-normal text-ink">{s.value}</p>
              <p className="type-caption text-muted">{s.label}</p>
            </div>
          ))}
        </div>
        <Link
          href="/account/reviews"
          className={`type-label inline-flex items-center justify-center whitespace-nowrap rounded-full border border-brand bg-brand-tint px-4 text-ink transition hover:brightness-125 ${PILL_H} ${panelBtn}`}
        >
          View public profile
        </Link>
      </div>

      {/* Verification */}
      <div className="flex w-full flex-col items-start gap-3.5 rounded-[24px] border border-line bg-surface p-4 md:p-5 xl:p-6">
        <p className="text-[18px] font-extrabold leading-normal text-ink">Trader verification</p>
        {VERIFICATION_CHECKS.map((c) => (
          <div key={c.label} className="flex w-full items-center gap-2.5">
            <Icon name={c.done ? "tick-circle-00d26a" : "danger-18-f5a524"} size={18} />
            <p className={`type-body-sm min-w-0 flex-1 ${c.done ? "text-ink" : "text-warning"}`}>{c.label}</p>
            {!c.done && (
              <Link href="/account/reviews" className="shrink-0 text-[12px] font-bold leading-4 text-brand hover:underline">
                Upload
              </Link>
            )}
          </div>
        ))}
        <p className="type-caption w-full text-muted">
          Verified traders get a badge on every review and earn 2× trust points.
        </p>
      </div>

      {/* Danger zone */}
      <div
        id="settings-danger"
        className="flex w-full scroll-mt-28 flex-col items-start gap-3 rounded-[24px] border border-danger bg-danger-bg p-4 md:p-5 xl:p-6"
      >
        <p className="text-[18px] font-extrabold leading-normal text-danger">Delete account</p>
        <p className="type-caption w-full text-muted">
          {deleteStep === "requested"
            ? "Deletion requested. We’ve emailed you a link to confirm — it expires in 24 hours."
            : "Permanently removes your profile and saved firms. Published reviews stay online but become anonymous."}
        </p>
        {deleteStep === "confirm" ? (
          <div className="flex w-full flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => setDeleteStep("requested")}
              className={`type-label flex items-center justify-center rounded-full bg-danger px-[18px] text-page hover:brightness-110 ${PILL_H}`}
            >
              Yes, delete
            </button>
            <button type="button" onClick={() => setDeleteStep("idle")} className={pillClass("subtle")}>
              Keep account
            </button>
          </div>
        ) : (
          <button
            type="button"
            disabled={deleteStep === "requested"}
            onClick={() => setDeleteStep("confirm")}
            className={`type-label flex items-center justify-center whitespace-nowrap rounded-full border border-danger px-[18px] text-danger transition-colors hover:bg-danger/10 disabled:opacity-60 ${PILL_H} ${panelBtn}`}
          >
            Delete my account
          </button>
        )}
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------- root */

export function AccountSettings() {
  const [tab, setTab] = useState<SettingsTabId>("profile");
  const [saved, setSaved] = useState<ProfileForm>(INITIAL_PROFILE);
  const [form, setForm] = useState<ProfileForm>(INITIAL_PROFILE);
  const [photo, setPhoto] = useState<string | null>(null);
  const [justSaved, setJustSaved] = useState(false);
  const dirty = JSON.stringify(form) !== JSON.stringify(saved);

  useEffect(() => {
    if (!justSaved) return;
    const t = window.setTimeout(() => setJustSaved(false), 2000);
    return () => window.clearTimeout(t);
  }, [justSaved]);

  const selectTab = (id: SettingsTabId) => {
    setTab(id);
    const target = SETTINGS_TABS.find((t) => t.id === id)?.target;
    if (target) document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className="flex w-full flex-col items-start gap-2">
        <h1 className="text-[32px] font-extrabold leading-[42px] text-ink md:text-[44px] md:leading-[52px]">
          Account settings
        </h1>
        <p className="type-body w-full text-muted">
          Manage how you appear on reviews, keep your account secure and choose what we notify you about.
        </p>
      </div>

      <SettingsTabs active={tab} onSelect={selectTab} />

      <div className="flex w-full flex-col items-start gap-6 md:flex-row xl:gap-6">
        <div className="flex w-full min-w-0 flex-1 flex-col items-start gap-6">
          <ProfileDetails
            form={form}
            setForm={(f) => {
              setForm(f);
              setJustSaved(false);
            }}
            dirty={dirty}
            saved={justSaved}
            onCancel={() => setForm(saved)}
            onSave={() => {
              setSaved(form);
              setJustSaved(true);
            }}
            photo={photo}
            setPhoto={setPhoto}
          />
          <Security />
          <Notifications />
        </div>
        <SidePanel form={saved} photo={photo} />
      </div>
    </>
  );
}
