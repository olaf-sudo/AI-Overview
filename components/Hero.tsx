import { HERO } from "@/lib/content";
import { HeroScroll, QuietForm, ScrollHint } from "./HeroScroll";
import { STAR_PATH as STAR } from "./ui";

export default function Hero() {
  return (
    <HeroScroll
      id="check"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-white px-6 pb-[104px] pt-12 text-[#1f1f1f]"
    >
      <div className="hero-out relative mx-auto w-full max-w-[640px]">
        {/* Zachte kleurvlekken achter de inhoud, in het palet van de landingspagina:
            ultramarijn linksboven, lime achter de stappen, paars als brug ertussen.
            Bewust heel licht: in het midden nog geen 6% (ultramarijn) of 14% (lime). */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[-135px] top-[-137px] h-[560px] w-[470px] bg-[radial-gradient(closest-side,rgba(26,26,255,0.055),rgba(26,26,255,0))]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[315px] top-[-177px] h-[560px] w-[480px] bg-[radial-gradient(closest-side,rgba(155,126,241,0.07),rgba(155,126,241,0))]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[85px] top-[206px] h-[540px] w-[540px] bg-[radial-gradient(closest-side,rgba(198,242,78,0.14),rgba(198,242,78,0))]"
        />

        <div className="relative flex flex-col">
          <div id="hero-brand" className="flex h-6 items-center gap-[11px]">
            {/* Sterretje: draait binnen, daarna af en toe een fonkeling met halo en mini-ster */}
            <span aria-hidden="true" className="relative block size-6 flex-none">
              <span className="aio-halo" />
              <svg width="24" height="24" viewBox="0 0 24 24" className="aio-spark relative block">
                <path d={STAR} fill="#5889f5" />
              </svg>
              <svg width="9" height="9" viewBox="0 0 24 24" className="aio-mini absolute left-5 top-[-4px] block">
                <path d={STAR} fill="#8fb0fa" />
              </svg>
            </span>
            <span className="relative block overflow-hidden text-[17px] font-medium leading-6">
              {HERO.brand}
              <span aria-hidden="true" className="aio-shine" />
            </span>
          </div>

          <h1 className="mb-0 mt-5 text-[23.5px] font-medium leading-8">
            {HERO.h1Before}
            <span className="rounded-md bg-[#d3e3fe] px-[6px] py-[2px] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
              {HERO.h1Highlight}
            </span>
            {HERO.h1After}
          </h1>

          <p className="mb-0 mt-[14px] text-[18px] leading-[30px]">
            {HERO.lead}{" "}
            <span
              aria-hidden="true"
              className="relative top-[2px] ml-[5px] inline-flex h-7 items-center whitespace-nowrap rounded-[14px] bg-[#f2f3f4] pl-[5px] pr-[13px] align-middle text-[13px] font-medium leading-4 text-[#454746]"
            >
              <span className="box-content flex size-4 flex-none items-center justify-center rounded-full border border-[#dbdce0] bg-white">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="block">
                  <circle cx="5" cy="5" r="4.4" stroke="#5f6369" strokeWidth="0.7" />
                  <ellipse cx="5" cy="5" rx="1.9" ry="4.4" stroke="#5f6369" strokeWidth="0.7" />
                  <path d="M0.6 5H9.4" stroke="#5f6369" strokeWidth="0.7" />
                </svg>
              </span>
              <span className="ml-[7px]">{HERO.chip.domain}</span>
              {/* #6b6d6b i.p.v. #757775 uit het ontwerp: 4.7:1 in plaats van 4.06:1. */}
              <span className="ml-2 text-[#6b6d6b]">{HERO.chip.more}</span>
            </span>
          </p>

          <h2 className="mb-0 mt-[30px] text-[25px] font-semibold leading-8 text-[#0c2c54]">
            {HERO.stepsTitle}
          </h2>

          <ol role="list" className="mb-0 mt-5 flex list-none flex-col gap-[18px] p-0 text-[18px] leading-[30px]">
            {HERO.steps.map((step, i) => (
              <li key={step.title} className="grid grid-cols-[24px_minmax(0,1fr)] items-start gap-x-[14px]">
                <span
                  aria-hidden="true"
                  className="mt-[3px] block size-6 rounded-full bg-[#d3e3fe] text-center text-[13px] font-semibold leading-6 text-[#0c2c54]"
                >
                  {i + 1}
                </span>
                <div>
                  <strong className="font-bold">{step.title}</strong> {step.body}
                </div>
              </li>
            ))}
          </ol>

          {/* Invoerpil. Invullen doet bewust niets. */}
          <QuietForm className="mt-[27px] flex items-center gap-3 rounded-[32px] border border-[#e5e6ea] bg-white py-[9px] pl-5 pr-[9px] shadow-[0_2px_10px_rgba(0,0,0,0.08)] focus-within:shadow-[0_2px_10px_rgba(0,0,0,0.08),0_0_0_3px_rgba(9,87,208,0.18)]">
            <input
              type="text"
              inputMode="url"
              autoComplete="url"
              spellCheck={false}
              placeholder={HERO.placeholder}
              aria-label={HERO.inputLabel}
              className="block h-11 min-w-0 flex-1 border-0 bg-transparent p-0 text-[18px] leading-[44px] text-[#1f1f1f] outline-none placeholder:text-[#80868c] placeholder:opacity-100 focus-visible:outline-none"
            />
            <button
              type="submit"
              aria-label={HERO.submitLabel}
              className="flex size-11 flex-none cursor-pointer items-center justify-center rounded-full border-0 bg-[#0957d0] p-0 text-white transition-colors hover:bg-[#0a4cb8]"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="block">
                <path
                  d="M1 7H13M7.5 1.5L13 7L7.5 12.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </QuietForm>
        </div>
      </div>

      {/* Scroll-down knop in de stijl van Gemini: witte pil, Google-schaduw,
          Material-pijl. Vervaagt zodra de scroll-out begint. */}
      <ScrollHint
        target="more"
        className="hero-hint absolute bottom-8 left-1/2 flex h-10 -translate-x-1/2 cursor-pointer items-center gap-2 whitespace-nowrap rounded-full border-0 bg-white py-0 pl-4 pr-3 text-[14px] font-medium text-[#444746] shadow-[0_1px_2px_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] transition-[background-color,box-shadow] duration-200 hover:bg-[#f0f4f9] hover:shadow-[0_1px_3px_rgba(60,64,67,0.3),0_4px_8px_3px_rgba(60,64,67,0.15)] active:bg-[#e1e5ea]"
      >
        {HERO.scrollHint}
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" className="block flex-none" fill="currentColor">
          <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
        </svg>
      </ScrollHint>
    </HeroScroll>
  );
}
