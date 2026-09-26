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
 * Stippenpijl achter de telefoon in de Google-sectie. De lime stippen van de
 * pijl lichten in een golf van boven naar beneden op, zodat het oog naar het
 * scherm zakt. De overige stippen vormen een vaag grijs raster.
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
        const alpha = on ? 0.55 + ((i * 37) % 45) / 100 : 0.06 + ((i * 13) % 12) / 100;

        return (
          <span
            key={i}
            className={`aspect-square rounded-full ${on ? "px-flow bg-lime" : "bg-ink"}`}
            style={
              {
                // De uit-stippen op halve sterkte: op een witte kaart is inkt zwaarder dan wit op blauw.
                opacity: on ? alpha : alpha / 2,
                ...(on
                  ? {
                      "--px-a": alpha.toFixed(2),
                      "--px-a-hi": Math.min(1, alpha * 1.45).toFixed(2),
                      "--px-delay": `${(row * 0.16).toFixed(2)}s`,
                    }
                  : {}),
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
