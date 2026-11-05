import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

/**
 * Figma: Footer / PropFirmScores (2035:21052)
 * Device=Mobile 393 (2035:20988) · Tablet 768 (2035:20921) · Desktop 1920 (2035:20843)
 */
const GRID_LINES = Array.from({ length: 13 });

function Overline({ children }: { children: React.ReactNode }) {
  return <p className="type-table-heading w-full text-brand">{children}</p>;
}

function LinkGroup({ title, links }: { title: string; links: { label: string; href?: string }[] }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
      <Overline>{title}</Overline>
      {links.map((l) =>
        l.href ? (
          <Link key={l.label} href={l.href} className="type-body-sm w-full text-ink hover:text-brand">
            {l.label}
          </Link>
        ) : (
          <p key={l.label} className="type-body-sm w-full text-ink">
            {l.label}
          </p>
        ),
      )}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative flex w-full flex-col items-start gap-6 overflow-clip bg-page p-4 md:gap-8 md:p-5 xl:gap-12 xl:p-6">
      {/* Background grid: 4 lines mobile, 7 tablet, 13 desktop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-4 right-4 flex items-start justify-between opacity-40 md:left-5 md:right-5 xl:left-6 xl:right-6"
      >
        {GRID_LINES.map((_, i) => (
          <div
            key={i}
            className={`h-full w-px bg-line ${i >= 7 ? "hidden xl:block" : i >= 4 ? "hidden md:block" : ""}`}
          />
        ))}
      </div>

      <div className="relative h-px w-full bg-line" />

      {/* Contact and partnership */}
      <div className="relative flex w-full flex-col items-start gap-6 md:flex-row md:gap-6 xl:gap-16">
        <div className="flex w-full shrink-0 flex-col items-start gap-4 md:w-[392px] md:gap-5 xl:w-[56.41%]">
          <Overline>HAVE QUESTIONS?</Overline>
          <p className="type-h1 w-full text-ink xl:type-display">
            Better decisions start <br className="hidden xl:inline" />
            with better research.
          </p>
          <Link
            href="#contact"
            className="flex h-10 items-center justify-center gap-1.5 rounded-full border border-brand bg-page px-4 py-1 md:h-11 xl:h-12"
          >
            <span className="type-label whitespace-nowrap text-ink">Contact Us</span>
            <Icon name="arrow-right-f0f0f0" size={16} />
          </Link>
        </div>
        <div className="flex w-full flex-row items-start gap-5 md:w-auto md:min-w-0 md:flex-1 md:flex-col xl:flex-row xl:gap-12">
          <LinkGroup
            title="PROP FIRMS & BROKERS"
            links={[{ label: "List Your Prop Firm" }, { label: "Find Vetted Providers" }]}
          />
          <div className="flex min-w-0 flex-1 md:w-full xl:w-auto">
            <LinkGroup
              title="BUSINESS & SUPPORT"
              links={[{ label: "Join as a Service Provider" }, { label: "Contact Business" }]}
            />
          </div>
        </div>
      </div>

      <div className="relative h-px w-full bg-line" />

      {/* Footer navigation */}
      <div className="relative flex w-full flex-col items-start gap-6 md:flex-row md:gap-6 xl:gap-16">
        <nav className="flex w-full shrink-0 flex-col items-start gap-3 font-semibold md:w-[300px] xl:w-[56.41%]">
          <Overline>EXPLORE</Overline>
          {[
            ["Browse Firms", "/firms"],
            ["Challenges", "/challenges"],
            ["Offers", "/offers"],
            ["Compare", "/compare"],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="w-full text-[24px] leading-[32px] text-ink hover:text-brand md:text-[32px] md:leading-[42px]"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex w-full items-start gap-5 md:w-auto md:min-w-0 md:flex-1 xl:gap-12">
          <LinkGroup
            title="RESOURCES"
            links={[
              { label: "Articles", href: "/articles" },
              { label: "Referrals", href: "/referrals" },
              { label: "Leaderboard", href: "/leaderboard" },
              { label: "Favourite Firms", href: "/favourite-firms" },
            ]}
          />
          <LinkGroup
            title="LEGAL"
            links={[
              { label: "Privacy Policy" },
              { label: "Terms & Conditions" },
              { label: "Marketplace Terms" },
              { label: "Cookie Preferences" },
            ]}
          />
        </div>
      </div>

      <div className="relative h-px w-full bg-line" />

      {/* Wordmark and copyright */}
      <div className="relative flex w-full flex-col items-center gap-2 md:gap-4">
        <Link
          href="/"
          className="whitespace-nowrap font-semibold tracking-[-0.02em] text-brand text-[11.7vw] leading-[1.174] md:text-[12.24vw] md:leading-[1.106] xl:text-[min(12.5vw,240px)] xl:leading-[1.05]"
        >
          PropFirmScores
        </Link>
        <p className="type-caption w-full text-center text-muted">© 2026 Prop Firm Match. All rights reserved.</p>
      </div>
    </footer>
  );
}
