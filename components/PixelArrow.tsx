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
        const alpha = on ? 0.55 + ((i * 37) % 45) / 100 : 0.06 + ((i * 13) % 12) / 100;

        return (
          <span
            key={i}
            className={`aspect-square rounded-full ${on ? "px-arrow bg-lime" : "px-ripple bg-ink"}`}
            style={
              (on
                ? {
                    opacity: alpha,
                    "--px-a": (alpha * 0.55).toFixed(2),
                    "--px-a-hi": "1",
                    "--px-delay": `${(row * 0.14).toFixed(2)}s`,
                  }
                : {
                    // Grijze stippen op halve sterkte, met een golf die er schuin doorheen loopt.
                    opacity: alpha / 2,
                    "--px-a": (alpha / 2).toFixed(3),
                    "--px-a-hi": (alpha / 2 + 0.14).toFixed(3),
                    "--px-delay": `${(row * 0.2 + col * 0.05).toFixed(2)}s`,
                  }) as CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
