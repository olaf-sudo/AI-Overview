import { AIS, HOW } from "@/lib/content";
import Reveal from "./Reveal";
import Sparkline from "./Sparkline";
import StackCards from "./StackCards";
import { AiLogo, AiLogoStack, Tick } from "./ui";

/** De drie proceskaarten schuiven bij het scrollen over elkaar; <StackCards> laat de onderste krimpen. */
const STICKY_TOP = ["top-24", "top-[116px]", "top-[136px]"];

export default function HowItWorks() {
  return (
    <section
      id="hoe"
      aria-labelledby="how-title"
      className="container-page section-y grid scroll-mt-24 grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-start gap-12 max-lg:grid-cols-1"
    >
      {/* Linkerkolom, sticky vanaf 1024px */}
      <div className="flex flex-col gap-5 self-start lg:sticky lg:top-24">
        <Reveal className="flex">
          <p className="pill-outline m-0">
            <Tick size={18} />
            {HOW.pill}
          </p>
        </Reveal>

        <Reveal as="h2" id="how-title" className="h2">
          {HOW.h2}
        </Reveal>

        <Reveal>
          <p className="lead max-w-[48ch]">{HOW.body}</p>
        </Reveal>

        <Reveal className="flex items-center gap-[10px]">
          <AiLogoStack circle={38} logo={17} overlap={-8} labelled />
          <span className="ml-[10px] text-[14px] text-muted">{HOW.logosLabel}</span>
        </Reveal>

        <Reveal className="flex">
          <a href="#check" className="btn btn-blue mt-1 px-5 py-[13px] text-[15px]">
            {HOW.cta}
          </a>
        </Reveal>
      </div>

      {/* Rechterkolom: drie gestapelde kaarten */}
      <StackCards className="flex flex-col gap-5">
        {HOW.steps.map((step, i) => (
          <Reveal
            key={step.n}
            className={`stack-card sticky ${STICKY_TOP[i]} flex flex-col overflow-hidden rounded-[20px] border border-line bg-white shadow-step`}
          >
            {i === 0 ? <IntakeVisual /> : i === 1 ? <PagesVisual /> : <WeekVisual />}

            <div className="flex flex-col gap-[10px] p-[26px]">
              <div className="flex items-center gap-[14px]">
                <span className="num text-[30px] leading-none text-blue">{step.n}</span>
                <span className="text-[23px] font-bold tracking-[-0.02em]">{step.title}</span>
              </div>
              <p className="m-0 text-[16px] text-muted">{step.body}</p>
            </div>
          </Reveal>
        ))}
      </StackCards>
    </section>
  );
}

/** Kaart 1: het intakeformulier. */
function IntakeVisual() {
  return (
    <div className="ui-font box-content flex h-[240px] flex-col gap-[10px] bg-paper p-6 text-[13px]" aria-hidden="true">
      <div className="mono-label text-muted">{HOW.intake.label}</div>
      {HOW.intake.fields.map((f) => (
        <div
          key={f.q}
          className={`rounded-[10px] border bg-white px-3 py-[10px] text-muted ${
            f.active ? "border-blue" : "border-line"
          }`}
        >
          {f.q}
          <div className={`mt-[2px] font-semibold ${f.active ? "text-blue" : "text-ink"}`}>
            {f.a}
            {f.active ? <span className="caret" /> : null}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Kaart 2: drie pagina's op elkaar. */
function PagesVisual() {
  return (
    <div className="ui-font box-content relative h-[240px] overflow-hidden bg-blue p-6 text-[12px]" aria-hidden="true">
      <div className="absolute left-8 right-[72px] top-[67px] rotate-[-3deg] rounded-[12px] bg-white p-[14px] opacity-60">
        <div className="h-2 w-3/5 rounded-[4px] bg-line" />
        <div className="mt-2 h-[6px] w-[90%] rounded-[4px] bg-paper" />
        <div className="mt-[6px] h-[6px] w-4/5 rounded-[4px] bg-paper" />
      </div>
      <div className="absolute left-[52px] right-[52px] top-[95px] rotate-[2deg] rounded-[12px] bg-white p-[14px] opacity-85">
        <div className="h-2 w-[70%] rounded-[4px] bg-line" />
        <div className="mt-2 h-[6px] w-[85%] rounded-[4px] bg-paper" />
        <div className="mt-[6px] h-[6px] w-3/4 rounded-[4px] bg-paper" />
      </div>
      <div className="absolute left-[72px] right-8 top-[127px] rounded-[12px] bg-white p-[14px] text-ink">
        <div className="mono-label text-[10px] text-muted">{HOW.pages.url}</div>
        <div className="mt-[6px] text-[14px] font-semibold leading-[1.3]">{HOW.pages.title}</div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-muted">{HOW.pages.status}</span>
          <span className="rounded-full bg-lime px-[10px] py-1 font-semibold">
            {HOW.pages.approve}
          </span>
        </div>
      </div>
    </div>
  );
}

/** Kaart 3: het weekrapport. */
function WeekVisual() {
  return (
    <div
      className="ui-font box-content flex h-[240px] flex-col justify-between bg-ink px-6 py-[22px] text-[13px] text-paper"
      aria-hidden="true"
    >
      <div className="mono-label flex items-center justify-between text-paper/70">
        <span>{HOW.week.label}</span>
        <span className="rounded-full bg-lime px-2 py-[3px] text-ink">{HOW.week.delta}</span>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] items-end gap-4">
        <div>
          <div className="num text-[44px] leading-none text-lime">{HOW.week.score}</div>
          <div className="mt-[6px] text-[13px] text-paper/70">{HOW.week.scoreLabel}</div>
        </div>
        <Sparkline />
      </div>

      <div className="flex gap-2">
        {AIS.map((ai, i) => (
          <span
            key={ai.key}
            className="flex items-center gap-[6px] rounded-full border border-white/14 bg-white/6 py-1 pl-1 pr-[10px]"
          >
            <span className="flex size-5 items-center justify-center rounded-full bg-white">
              <AiLogo ai={ai} size={11} alt="" />
            </span>
            <span className="num text-[13px] text-lime">{HOW.week.scores[i]}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
