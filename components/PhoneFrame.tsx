import Image from "next/image";
import { GOOGLE } from "@/lib/content";

/** Zijknoppen: links stil/volume, rechts de aan-uitknop. */
const BUTTONS = [
  { side: "left", top: 150, height: 34 },
  { side: "left", top: 210, height: 64 },
  { side: "left", top: 290, height: 64 },
  { side: "right", top: 240, height: 100 },
] as const;

/**
 * iPhone-frame met het Google-screenshot. De wrapper is 352×640 met
 * `overflow: hidden`, zodat de telefoon door de onderkant van de sectie wordt
 * afgesneden. Onder 400px schaalt het geheel mee met `zoom`-achtige transform.
 */
export default function PhoneFrame() {
  return (
    <div className="relative h-[640px] w-[352px] max-w-full origin-bottom overflow-hidden drop-shadow-[0_30px_70px_rgba(11,11,59,0.18)] max-[420px]:scale-[0.82]">
      {BUTTONS.map((b, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute w-[3px] bg-bezel-edge"
          style={{
            top: b.top,
            height: b.height,
            [b.side]: 0,
            borderRadius: b.side === "left" ? "2px 0 0 2px" : "0 2px 2px 0",
          }}
        />
      ))}

      <div
        className="absolute left-[3px] top-0 w-[322px] rounded-[62px] bg-bezel p-3"
        style={{ boxSizing: "content-box", boxShadow: "inset 0 0 0 2px #3A3A3E, inset 0 0 0 4px #0B0B3B" }}
      >
        <div className="relative h-[700px] w-[322px] overflow-hidden rounded-[48px] bg-black">
          {/* Dynamic Island */}
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-[11px] z-[5] h-[37px] w-[126px] -translate-x-1/2 rounded-[24px] bg-black"
          />

          {/* Statusbalk */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 z-[4] flex justify-between px-[30px] pt-[21px] text-[17px] font-semibold text-white"
            style={{ fontFamily: "-apple-system, system-ui, sans-serif" }}
          >
            <span>9:41</span>
            <span className="relative mt-1 box-content h-[11px] w-[18px] rounded-[2px] border border-white/50">
              <span className="absolute inset-px right-[3px] rounded-[1px] bg-white" />
            </span>
          </div>

          <Image
            src="/img/google-ai-overview.jpg"
            alt={GOOGLE.shotAlt}
            fill
            sizes="322px"
            className="object-cover object-top"
            priority={false}
          />

          {/* Home-indicator */}
          <span
            aria-hidden="true"
            className="absolute bottom-2 left-1/2 h-[5px] w-[139px] -translate-x-1/2 rounded-full bg-white/70"
          />
        </div>
      </div>
    </div>
  );
}
