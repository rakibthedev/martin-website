import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/dashboard/ui";

/** Figma "Page head" (372:2528) — title + intro, white pill CTA. */
export function ReviewsHead() {
  return (
    <div className="flex w-full flex-col items-start gap-6 md:flex-row xl:items-end">
      <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
        <h1 className="text-[32px] font-extrabold leading-[42px] text-ink md:text-[44px] md:leading-[52px]">
          My reviews
        </h1>
        <p className="type-body w-full text-muted">
          Track every review you have submitted — from human verification to published. Verified reviews earn trust
          points and help other traders.
        </p>
      </div>
      <Pill variant="white" href="/reviews/new">
        Write a new review
        <Icon name="arrow-up-151513" size={20} rotate={45} />
      </Pill>
    </div>
  );
}

/** Figma "Action required banner" (372:2541). */
export function ActionRequiredBanner() {
  return (
    <div className="flex w-full flex-col items-start gap-3 rounded-[20px] border border-danger bg-danger-bg p-4 md:flex-row md:items-center md:gap-[14px] md:p-5 xl:p-6">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-danger">
        <Icon name="danger-20-ff6b6b" size={20} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
        <p className="type-label text-ink">1 review needs your action</p>
        <p className="type-caption text-muted">
          Our moderators need proof of payout for your FundingPips review. Reviews without proof are removed after 14
          days.
        </p>
      </div>
      <Pill variant="primary" href="/reviews/new">
        Add proof now
      </Pill>
    </div>
  );
}
