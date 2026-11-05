"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { FirmFilter } from "./data";

/** Figma "Filter and sorting options" (379:9446 desktop, 497:32446 tablet, 497:34999 mobile). Active chip = outline style. */
export function FirmFilters() {
  const [active, setActive] = useState<FirmFilter>("Popular");
  const [filterOpen, setFilterOpen] = useState(false);
  const v = (f: FirmFilter) => (active === f ? "outline" : "subtle");
  const pick = (f: FirmFilter) => () => setActive(f);

  return (
    <>
      {/* tablet + desktop */}
      <div className="hidden flex-wrap gap-3 md:flex md:items-start xl:items-center xl:gap-2">
        <Button
          variant={filterOpen ? "outline" : "subtle"}
          size="md"
          leading="filter-f0f0f0"
          className="xl:h-12"
          aria-pressed={filterOpen}
          onClick={() => setFilterOpen((o) => !o)}
        >
          Filter
        </Button>
        <Button variant={v("Popular")} size="md" leading="flame-ff6b6b" className="xl:h-12" aria-pressed={active === "Popular"} onClick={pick("Popular")}>
          Popular
        </Button>
        <Button variant={v("Favorite")} size="md" className="xl:h-12" aria-pressed={active === "Favorite"} onClick={pick("Favorite")}>
          Favorite 0/5
        </Button>
        <Button variant={v("New")} size="md" className="xl:h-12" aria-pressed={active === "New"} onClick={pick("New")}>
          New
        </Button>
        <Button variant={v("All")} size="md" className="xl:h-12" aria-pressed={active === "All"} onClick={pick("All")}>
          All
        </Button>
        <div className="h-px min-w-px flex-1" />
        <Button href="/articles/how-to-read-a-prop-firm-review" variant="outline" size="md" className="xl:h-12">
          How We Verify and Rank Firms
        </Button>
        <LivePill className="h-7 px-2.5 py-1 xl:px-2" />
      </div>

      {/* mobile */}
      <div className="flex flex-col items-start gap-3 md:hidden">
        <div className="flex flex-wrap gap-2">
          <Button variant={v("All")} size="sm" aria-pressed={active === "All"} onClick={pick("All")}>
            All
          </Button>
          <Button variant={v("New")} size="sm" aria-pressed={active === "New"} onClick={pick("New")}>
            New
          </Button>
          <Button
            variant={filterOpen ? "outline" : "subtle"}
            size="sm"
            leading="filter-f0f0f0"
            aria-label="Filter"
            aria-pressed={filterOpen}
            onClick={() => setFilterOpen((o) => !o)}
          />
          <Button variant={v("Popular")} size="sm" leading="flame-ff6b6b" aria-label="Popular" aria-pressed={active === "Popular"} onClick={pick("Popular")} />
          <Button variant={v("Favorite")} size="sm" leading="heart-f0f0f0" aria-label="Favorite" aria-pressed={active === "Favorite"} onClick={pick("Favorite")}>
            0/5
          </Button>
        </div>
        <Button href="/articles/how-to-read-a-prop-firm-review" variant="outline" size="sm">
          How We Verify and Rank Firms
        </Button>
        <LivePill className="h-6 px-2.5 py-0.5" />
      </div>
    </>
  );
}

function LivePill({ className }: { className: string }) {
  return (
    <span className={`inline-flex shrink-0 items-center justify-center gap-1 rounded-full bg-brand-tint type-caption whitespace-nowrap text-brand ${className}`}>
      Live Data {"·"} updated 3 min ago
    </span>
  );
}

export function ViewAllFirms() {
  return (
    <div className="flex justify-center pt-6">
      <Link
        href="/firms"
        className="inline-flex h-10 items-center justify-center rounded-full border border-brand bg-page px-4 type-label text-ink transition hover:bg-brand-tint md:h-11 xl:h-12"
      >
        View All
      </Link>
    </div>
  );
}
