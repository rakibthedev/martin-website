/**
 * Renders an exact Figma-exported Iconsax SVG from /public/icons.
 * Files are named `<icon>-<hex>.svg` by scripts/fetch-assets.mjs, so the colour is part of the file.
 *
 *   <Icon name="arrow-right-f0f0f0" size={16} />
 *   <Icon name="arrow-up-151513" size={20} rotate={45} />   // Figma "arrow-up-right"
 */
type IconProps = {
  name: string;
  size?: number;
  /** Degrees. Figma uses arrow-up rotated 45° for ↗ and `add` rotated 45° for ✕. */
  rotate?: number;
  className?: string;
  alt?: string;
};

export function Icon({ name, size = 20, rotate, className = "", alt = "" }: IconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/icons/${name}.svg`}
      width={size}
      height={size}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      draggable={false}
      className={`block shrink-0 select-none ${className}`}
      style={{ width: size, height: size, ...(rotate ? { transform: `rotate(${rotate}deg)` } : null) }}
    />
  );
}
