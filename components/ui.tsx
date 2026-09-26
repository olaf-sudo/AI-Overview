import Image from "next/image";
import type { CSSProperties } from "react";
import { AIS, type Ai } from "@/lib/content";

/** Het vierpuntige sterretje uit het logo. */
export const STAR_PATH =
  "M12 0C12 4.69 19.31 12 24 12C19.31 12 12 19.31 12 24C12 19.31 4.69 12 0 12C4.69 12 12 4.69 12 0Z";

/** Lime bolletje met een vinkje erin. */
export function Tick({
  size = 18,
  className = "",
  style,
}: {
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={`tick ${className}`.trim()}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.6), ...style }}
      aria-hidden="true"
    >
      ✓
    </span>
  );
}

/** Kruisje voor "not mentioned". */
export function Cross({ size = 20 }: { size?: number }) {
  return (
    <span
      className="inline-flex flex-none items-center justify-center rounded-full bg-signal-tint font-bold text-signal"
      style={{ width: size, height: size, fontSize: Math.round(size * 0.5) }}
      aria-hidden="true"
    >
      ✕
    </span>
  );
}

/** Eén AI-logo. `alt=""` maakt het decoratief. */
export function AiLogo({
  ai,
  size = 16,
  alt,
  className = "",
  style,
}: {
  ai: Ai;
  size?: number;
  /** Laat weg voor de naam van de AI, of geef "" voor decoratief gebruik. */
  alt?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Image
      src={ai.src}
      alt={alt ?? ai.name}
      width={size}
      height={size}
      className={`block ${className}`.trim()}
      style={style}
      unoptimized
    />
  );
}

/** Drie overlappende logo-cirkels. */
export function AiLogoStack({
  circle = 24,
  logo = 12,
  overlap = -6,
  border = true,
  labelled = false,
}: {
  circle?: number;
  logo?: number;
  overlap?: number;
  border?: boolean;
  /** Geeft elke afbeelding een alt-tekst in plaats van decoratief. */
  labelled?: boolean;
}) {
  return (
    <span className="flex">
      {AIS.map((ai) => (
        <span
          key={ai.key}
          // box-content: de maat is de binnenkant, de rand komt erbij. Zo staat
          // de cirkel even groot als in de designreferentie.
          className={`box-content flex flex-none items-center justify-center rounded-full bg-white ${
            border ? "border border-line" : ""
          }`}
          style={{ width: circle, height: circle, marginRight: overlap }}
        >
          <AiLogo ai={ai} size={logo} alt={labelled ? ai.name : ""} />
        </span>
      ))}
    </span>
  );
}

/** Het merkvinkje uit de handoff: 7×7 ronde stippen, 1 = stip aan. */
const CHECK = ["0000011", "0000011", "0000110", "1100110", "1101100", "0111100", "0011000"];

/**
 * Het stippenvinkje. Met `draw` ploppen de stippen van links naar rechts in
 * (`.px-draw` in globals.css), alsof het vinkje wordt gezet.
 */
export function DotCheck({
  dot = 3,
  gap = 1,
  color = "#1A1AFF",
  draw = false,
  loop = false,
}: {
  dot?: number;
  gap?: number;
  color?: string;
  draw?: boolean;
  /** Blijft het intekenen herhalen, zoals in het "Most chosen"-balkje. */
  loop?: boolean;
}) {
  const size = CHECK.length * (dot + gap) - gap;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      className={`block flex-none ${loop ? "px-draw-loop" : draw ? "px-draw" : ""}`}
    >
      {CHECK.flatMap((row, r) =>
        row.split("").map((bit, c) =>
          bit === "1" ? (
            <circle
              key={`${r}-${c}`}
              cx={c * (dot + gap) + dot / 2}
              cy={r * (dot + gap) + dot / 2}
              r={dot / 2}
              fill={color}
              style={{ "--px-i": c } as CSSProperties}
            />
          ) : null,
        ),
      )}
    </svg>
  );
}
