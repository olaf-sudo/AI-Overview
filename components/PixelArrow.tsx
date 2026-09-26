import type { CSSProperties } from "react";

/** Pijl naar beneden, raster 11×9. */
const ARROW = [
  "00000100000",
  "00000100000",
  "00000100000",
  "00000100000",
  "10000100001",
  "11000100011",
  "01100100110",
  "00111111100",
  "00001110000",
].join("");

const COLS = 11;

/** Kleur en sterkte van de rasterstippen buiten de pijl. */
const TINT = {
  grey: { bg: "bg-ink", min: 0.1, lift: 0.14 },
  blue: { bg: "bg-blue", min: 0.07, lift: 0.08 },
  lime: { bg: "bg-lime", min: 0.4, lift: 0.3 },
} as const;

/**
 * Stippenpijl achter de telefoon in de Google-sectie. Door het hele raster
 * loopt een zachte golf van boven naar beneden; de lime stippen van de pijl
 * pulseren daarbovenop duidelijk na elkaar omlaag, zodat het oog naar het
 * scherm zakt.
 */
export default function PixelArrow() {
  return (
    <div
      className="absolute left-1/2 top-[10px] grid w-[514px] max-w-full -translate-x-1/2 gap-[14px]"
      style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
      aria-hidden="true"
    >
      {ARROW.split("").map((bit, i) => {
        const on = bit === "1";
        const row = Math.floor(i / COLS);
        const col = i % COLS;
        // Vaste, verspreide verdeling (zelfde bij elke render). Lime komt vaker voor
        // rond het midden van de pijl en dunt uit naar boven en onder; blauw is
        // zeldzaam en licht, zodat het opgaat in het grijs.
        const h = (i * 37 + row * 11 + col * 7) % 100;
        const fromMiddle = Math.abs(row - 5);
        const tint = h < 34 - fromMiddle * 9 ? "lime" : h >= 62 && h < 74 ? "blue" : "grey";
        const spread = ((i * 13) % 12) / 100;
        const base = TINT[tint].min + spread;
        const alpha = on ? 0.55 + ((i * 37) % 45) / 100 : 0.06 + ((i * 13) % 12) / 100;

        return (
          <span
            key={i}
            className={`aspect-square rounded-full ${on ? "px-arrow bg-lime" : `px-ripple ${TINT[tint].bg}`}`}
            style={
              (on
                ? {
                    opacity: alpha,
                    "--px-a": (alpha * 0.75).toFixed(2),
                    "--px-a-hi": "1",
                    "--px-delay": `${(row * 0.14).toFixed(2)}s`,
                  }
                : {
                    // Raster: vooral grijs, hier en daar ultramarijn of lime, met een golf
                    // die er schuin doorheen loopt.
                    opacity: base,
                    "--px-a": base.toFixed(3),
                    "--px-a-hi": Math.min(1, base + TINT[tint].lift).toFixed(3),
                    "--px-delay": `${(row * 0.2 + col * 0.05).toFixed(2)}s`,
                  }) as CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
