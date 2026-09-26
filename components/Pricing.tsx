import Image from "next/image";
import { PRICING } from "@/lib/content";
import Reveal from "./Reveal";
import { Tick } from "./ui";

/** Groei (index 1) staat standaard aan. */
const DEFAULT_PACE = 1;

/**
 * Prijzen zonder JavaScript: de tempo-schakelaar is een groep radioknoppen en
 * CSS (`:has()`, zie `.pricing` in globals.css) licht het bijbehorende plan uit.
 */
export default function Pricing() {
  return (
    <section
      id="prijzen"
      aria-labelledby="pricing-title"
      className="pricing cv-auto container-page section-y flex scroll-mt-24 flex-col gap-10"
    >
      {/* Kop met de tempo-schakelaar */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex max-w-[640px] flex-col items-start gap-[14px]">
          <Reveal as="h2" id="pricing-title" className="h2">
            {PRICING.h2}
          </Reveal>
          <Reveal>
            <p className="lead">{PRICING.sub}</p>
          </Reveal>
        </div>

        <Reveal className="flex max-sm:w-full">
          <fieldset className="m-0 inline-flex min-w-0 gap-1 rounded-full border border-line bg-white p-1 max-sm:w-full max-sm:flex-col max-sm:rounded-[22px]">
            <legend className="sr-only">{PRICING.toggleLabel}</legend>
            {PRICING.speeds.map((label, i) => (
              <label key={label} className="pace-option btn px-4 py-[10px] text-[14px]">
                <input
                  type="radio"
                  name="pace"
                  value={i}
                  defaultChecked={i === DEFAULT_PACE}
                  className="sr-only"
                />
                {label}
              </label>
            ))}
          </fieldset>
        </Reveal>
      </div>

      {/* Kleine lettertjes */}
      <Reveal>
        <p className="m-0 text-[14px] text-muted">
          {PRICING.terms.fine}
          {/* TODO: echte link voor het bureau-aanbod */}
          <a href="#" className="font-semibold">
            {PRICING.terms.link}
          </a>
        </p>
      </Reveal>

      {/* Drie plannen */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-stretch gap-5 pt-3">
        {PRICING.plans.map((p, i) => (
          <Reveal key={p.name} className="flex">
            <div
              data-plan={i}
              className="plan-card relative flex w-full flex-col gap-5 rounded-[20px] border border-line bg-white p-7"
            >
              <span className="plan-badge-fit label absolute -top-[14px] left-6 rounded-lg bg-blue px-[10px] py-[5px] text-white!">
                {PRICING.badgeFit}
              </span>
              {p.popular ? (
                <span className="plan-badge-popular label absolute -top-[14px] right-6 rounded-lg bg-lime px-[10px] py-[5px] text-ink!">
                  {PRICING.badgePopular}
                </span>
              ) : null}

              <div className="flex flex-col gap-[6px]">
                <h3 className="m-0 text-[20px] font-bold tracking-[-0.02em]">{p.name}</h3>
                <div className="text-[15px] text-muted">{p.who}</div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="label">{PRICING.visibleIn}</div>
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="num text-[clamp(40px,4vw,56px)] leading-none text-blue">{p.num}</span>
                  <span className="text-[18px] font-semibold">{p.unit}</span>
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-[36px] font-bold leading-none tracking-[-0.02em]">{p.price}</span>
                <span className="text-[14px] text-muted">{p.per}</span>
              </div>

              {/* Knop direct onder de prijs, zoals de meeste prijspagina's het doen */}
              <a href="#check" className="plan-cta btn w-full px-4 py-[14px] text-[15px]">
                {PRICING.planCta(p.name)}
              </a>

              <ul className="m-0 flex flex-1 list-none flex-col gap-[10px] border-t border-line p-0 pt-[18px] text-[15px]">
                {p.checks.map((c) => (
                  <li key={c} className="flex items-center gap-[10px]">
                    <Tick size={18} />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Expertkaart */}
      <Reveal className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-6 rounded-[20px] bg-ink p-7 text-paper max-md:grid-cols-1 max-md:justify-items-start">
        <Image
          src={PRICING.expert.photo}
          alt={PRICING.expert.photoAlt}
          width={96}
          height={96}
          className="box-content size-24 rounded-full border-[3px] border-lime object-cover"
        />

        <div className="flex flex-col gap-2">
          <div className="label text-lime!">{PRICING.expert.label}</div>
          <div className="text-[20px] font-bold leading-[1.25] tracking-[-0.02em] text-pretty">
            {PRICING.expert.title}
          </div>
          <div className="max-w-[62ch] text-[16px] text-pretty text-paper/85">{PRICING.expert.body}</div>
        </div>

        <div className="flex flex-col items-stretch gap-[10px] max-md:w-full">
          {/* TODO: echte link naar de agenda voor een kennismaking */}
          <a href="#" className="btn btn-lime px-5 py-[13px] text-[15px]">
            {PRICING.expert.cta}
          </a>
          {/* TODO: echte link naar de pagina over de expert */}
          <a href="#" className="text-center text-[14px] text-paper">
            {PRICING.expert.link}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
