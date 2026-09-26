import { CLOSING, TRUST } from "@/lib/content";
import { QuietForm } from "./HeroScroll";
import PixelField from "./PixelField";
import Reveal from "./Reveal";
import { Tick } from "./ui";

export default function ClosingCta() {
  return (
    <section aria-labelledby="closing-title" className="container-page pb-6">
      <div className="relative isolate flex flex-col items-center gap-5 overflow-hidden rounded-[32px] bg-blue px-6 py-[clamp(40px,6vw,80px)] text-center text-white">
        {/* Stippenvelden die van buiten naar binnen ademen */}
        <PixelField side="left" />
        <PixelField side="right" />

        <Reveal as="h2" id="closing-title" className="h2 text-[clamp(36px,5vw,72px)]">
          {CLOSING.h2}
        </Reveal>

        <Reveal delay={140}>
          <p className="m-0 max-w-[56ch] text-[18px] text-pretty text-white/86">{CLOSING.body}</p>
        </Reveal>

        <Reveal delay={220} className="relative mt-2 flex w-full justify-center">
          {/* Zachte gloed achter de invoerpil */}
          <span
            aria-hidden="true"
            className="glow-pulse pointer-events-none absolute -inset-x-6 -inset-y-4 -z-10 rounded-full bg-lime/25 blur-2xl"
          />
          <QuietForm className="flex w-full max-w-[588px] items-center gap-[6px] rounded-full bg-white py-[6px] pl-[22px] pr-[6px] max-md:flex-col max-md:items-stretch max-md:rounded-[26px] max-md:p-2">
            <input
              type="text"
              inputMode="url"
              autoComplete="url"
              spellCheck={false}
              placeholder={CLOSING.placeholder}
              aria-label={CLOSING.inputLabel}
              className="min-w-0 flex-1 border-0 bg-transparent py-3 text-[17px] text-ink outline-none placeholder:text-muted max-md:px-4"
            />
            <button
              type="submit"
              className="btn btn-lime sheen flex-none px-[22px] py-[14px] text-[16px] max-md:w-full"
            >
              {CLOSING.submit}
            </button>
          </QuietForm>
        </Reveal>

        <Reveal
          delay={300}
          className="flex flex-wrap justify-center gap-x-[22px] gap-y-2 text-[14px] text-white/86"
        >
          {TRUST.map((t) => (
            <span key={t} className="flex items-center gap-2">
              <Tick size={16} />
              {t}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
