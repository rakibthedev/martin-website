/** Figma: Account / Avatar (369:106) — green circle with ExtraBold initials. */
export function Avatar({
  initials = "AC",
  size = 40,
  textSize = 14,
  className = "",
}: {
  initials?: string;
  size?: number;
  textSize?: number;
  className?: string;
}) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-brand font-extrabold leading-none text-page ${className}`}
      style={{ width: size, height: size, fontSize: textSize }}
    >
      {initials}
    </span>
  );
}
