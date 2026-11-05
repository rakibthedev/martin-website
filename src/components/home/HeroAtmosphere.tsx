/* eslint-disable @next/next/no-img-element */
import s from "./home.module.css";

/**
 * Figma "Atmosphere / stars, comet trails and corner light" (2073:25362 desktop, 2073:25220 tablet, 2073:24976 mobile).
 * Each breakpoint has its own exported artwork. The artwork box keeps the Figma frame's aspect ratio
 * (it "covers" the hero: cropped at the sides on narrower desktops, at the bottom on wider tablets/phones),
 * so the animated grid-sweep cells stay on the grid lines.
 */
type Variant = {
  key: "sm" | "md" | "xl";
  w: number;
  h: number;
  cell: number;
  cells: [number, number][];
  /** blurred ellipse artwork bleed around its layer box, % [vertical, horizontal] */
  trBleed: [number, number];
  blBleed: [number, number];
  show: string;
  box: string;
};

const VARIANTS: Variant[] = [
  {
    key: "sm",
    w: 393,
    h: 550,
    cell: 48,
    cells: [
      [28.5, 299],
      [28.5, 251],
      [76.5, 203],
      [100.5, 179],
      [220.5, 179],
      [268.5, 131],
      [292.5, 83],
      [340.5, 35],
    ],
    trBleed: [17.34, 29.77],
    blBleed: [21.27, 29.77],
    show: "md:hidden",
    box: "w-[max(100%,393px)]",
  },
  {
    key: "md",
    w: 768,
    h: 729,
    cell: 64,
    cells: [
      [64, 364.5],
      [96, 300.5],
      [160, 236.5],
      [256, 204.5],
      [416, 172.5],
      [512, 140.5],
      [576, 76.5],
      [640, 44.5],
    ],
    trBleed: [23.21, 27.02],
    blBleed: [28.47, 27.02],
    show: "hidden md:block xl:hidden",
    box: "w-full",
  },
  {
    key: "xl",
    w: 1920,
    h: 920,
    cell: 88,
    cells: [
      [146, 460],
      [322, 372],
      [498, 284],
      [762, 240],
      [1026, 196],
      [1246, 152],
      [1466, 108],
      [1686, 64],
    ],
    trBleed: [30.94, 18.18],
    blBleed: [37.94, 18.18],
    show: "hidden xl:block",
    box: "w-[1920px]",
  },
];

const pct = (v: number, of: number) => `${(v / of) * 100}%`;
/** Figma exports blurred / stroked artwork larger than its layer box: place it with a symmetric bleed (in %). */
const bleed = ([y, x]: [number, number]): React.CSSProperties => ({
  top: `-${y}%`,
  left: `-${x}%`,
  width: `${100 + 2 * x}%`,
  height: `${100 + 2 * y}%`,
});

export function HeroAtmosphere() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {VARIANTS.map((v) => {
        // sweep svgs include a 2.5px stroke bleed on every side of the cell
        const cellBleed = (2.5 / v.cell) * 100;
        return (
          <div
            key={v.key}
            className={`absolute left-1/2 top-0 -translate-x-1/2 ${v.box} ${v.show}`}
            style={{ aspectRatio: `${v.w} / ${v.h}` }}
          >
            {/* Upper right / emerald ambience */}
            <div className={`absolute ${s.glowTr}`} style={{ left: "67%", top: "-25%", width: "53%", height: "65%" }}>
              <img alt="" src={`/images/home/hero-glow-tr-${v.key}.svg`} className="absolute block max-w-none" style={bleed(v.trBleed)} />
            </div>
            {/* Lower left / emerald ambience */}
            <div className={`absolute ${s.glowBl}`} style={{ left: "-27%", top: "31%", width: "53%", height: "53%" }}>
              <img alt="" src={`/images/home/hero-glow-bl-${v.key}.svg`} className="absolute block max-w-none" style={bleed(v.blBleed)} />
            </div>
            {/* Grid / soft lines fading behind headline */}
            <img alt="" src={`/images/home/hero-grid-${v.key}.svg`} className="absolute inset-0 block size-full max-w-none" />
            {/* Grid sweep / 01–08 */}
            {v.cells.map(([x, y], i) => (
              <div
                key={i}
                className={`absolute ${s.sweep}`}
                style={{
                  left: pct(x, v.w),
                  top: pct(y, v.h),
                  width: pct(v.cell, v.w),
                  height: pct(v.cell, v.h),
                  animationDelay: `${(i * 0.82).toFixed(2)}s`,
                }}
              >
                <img
                  alt=""
                  src={`/images/home/hero-sweep-${v.key}-${i + 1}.svg`}
                  className="absolute block max-w-none"
                  style={bleed([cellBleed, cellBleed])}
                />
              </div>
            ))}
            {/* Star field and comet streaks */}
            <img alt="" src={`/images/home/hero-stars-${v.key}.svg`} className="absolute inset-0 block size-full max-w-none" />
          </div>
        );
      })}
    </div>
  );
}
