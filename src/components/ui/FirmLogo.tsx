/**
 * Figma "Firm logo" frames: a rounded tile with the firm's initials (e.g. FP, BG, AF, FN).
 * Take bg / text colour, size, radius and font size from the frame you are implementing.
 * Brand tokens: bg-fundingpips-navy (#121355), bg-guardian-blue (#0b3d91), bg-funded-blue (#1e4fd8).
 */
export function FirmLogo({
  initials,
  size = 44,
  radius = 12,
  textSize = 14,
  className = "bg-raised text-ink",
  style,
}: {
  initials: string;
  size?: number;
  radius?: number;
  textSize?: number;
  /** colour classes, e.g. "bg-fundingpips-navy text-white" */
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center font-extrabold leading-none ${className}`}
      style={{ width: size, height: size, borderRadius: radius, fontSize: textSize, ...style }}
    >
      {initials}
    </span>
  );
}
