import type { CSSProperties } from "react";

const COLS = 12;
const ROWS = 12;

function fract(n: number) {
  return ((n % 1) + 1) % 1;
}

/** Twee vaste hashes, zodat links en rechts een ander patroon krijgen. */
const HASH = {
  left: (c: number, r: number) => fract(Math.sin(c * 12.9898 + r * 78.233) * 43758.5453),
  right: (c: number, r: number) => fract(Math.sin(c * 91.7 + r * 47.3) * 12345.678),
};

/**
 * Stippenveld achter de slotkaart: lime stippen die van de buitenrand naar het
 * midden dunner en transparanter worden. Het patroon is deterministisch, dus
 * server en client renderen hetzelfde.
 *
 * De stippen ademen langzaam van buiten naar binnen: de rusttoestand is exact
 * de alpha uit het ontwerp, de golf licht kort op. Bij `prefers-reduced-motion`
 * staat het veld stil op die rusttoestand.
 */
export default function PixelField({ side }: { side: "left" | "right" }) {
  const hash = HASH[side];
  const dots: { key: string; alpha: number; delay: number }[] = [];

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      // Afstand tot de buitenrand: 0 aan de rand, 1 aan de binnenkant.
      const d = side === "left" ? c / (COLS - 1) : (COLS - 1 - c) / (COLS - 1);
      const p = Math.max(0, 1 - d * 1.35);
      const on = hash(c, r) < p;
      dots.push({
        key: `${r}-${c}`,
        alpha: on ? Number((0.18 + p * 0.72).toFixed(2)) : 0,
        // De golf loopt van de buitenrand naar binnen, met wat ruis per rij.
        delay: Number((d * 1.4 + (r % 4) * 0.12).toFixed(2)),
      });
    }
  }

  return (
    <div
      className="pointer-events-none absolute inset-y-0 grid w-[34%] content-center gap-[10px] p-4"
      style={{
        gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
        zIndex: -1,
        [side]: 0,
      }}
      aria-hidden="true"
    >
      {dots.map((d) =>
        d.alpha === 0 ? (
          <span key={d.key} className="aspect-square" />
        ) : (
          <span
            key={d.key}
            className="px-wave aspect-square rounded-full bg-lime"
            style={
              {
                "--px-a": d.alpha,
                "--px-a-hi": Math.min(1, d.alpha * 1.7).toFixed(2),
                "--px-delay": `${d.delay}s`,
                "--px-dur": "4.6s",
                opacity: d.alpha,
              } as CSSProperties
            }
          />
        ),
      )}
    </div>
  );
}
