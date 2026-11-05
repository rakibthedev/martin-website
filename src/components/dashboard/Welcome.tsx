import { Icon } from "@/components/ui/Icon";
import { CARD, Pill } from "./ui";
import { EMPTY_STATES } from "./welcomeData";

/** Figma "Section head" (376:3227): Heading 3 + muted note. */
export function SectionHead({ title, note }: { title: string; note: string }) {
  return (
    <div className="flex w-full items-start gap-2.5 pt-2 xl:items-center">
      <h2 className="type-h3 min-w-0 flex-1 text-ink xl:flex-none">{title}</h2>
      <p className="type-body-sm min-w-0 flex-1 text-muted xl:flex-none xl:whitespace-nowrap">{note}</p>
    </div>
  );
}

/**
 * Figma "Empty states" (376:3444 / 497:11625 / 497:11832).
 * Mobile: icon left of the copy; tablet: left-aligned column; desktop: centred column.
 */
export function EmptyStates() {
  return (
    <div className="grid w-full grid-cols-1 items-start gap-6 md:grid-cols-3">
      {EMPTY_STATES.map((e) => (
        <section
          key={e.title}
          className={`${CARD} flex min-w-0 items-start gap-[14px] md:flex-col xl:items-center xl:text-center ${
            e.cta ? "py-8 md:py-5 xl:py-6" : ""
          }`}
        >
          <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-brand-tint">
            <Icon name={e.icon} size={27} />
          </span>
          <div className="flex min-w-0 flex-1 flex-col items-start gap-[14px] xl:items-center">
            <h3 className="text-[20px] font-extrabold leading-[26px] text-ink">{e.title}</h3>
            <p className="type-body-sm w-full text-muted xl:max-w-[380px]">{e.text}</p>
            {e.cta && (
              <Pill href={e.cta.href} variant="ghost">
                {e.cta.label}
                <Icon name="arrow-up-00d26a" size={20} rotate={45} />
              </Pill>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
