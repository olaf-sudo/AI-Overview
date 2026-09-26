import Image from "next/image";
import { PRICING } from "@/lib/content";
import Reveal from "./Reveal";
import { DotCheck, Tick } from "./ui";


export default function Pricing() {
  return (
    <section
      id="prijzen"
      aria-labelledby="pricing-title"
      className="cv-auto container-page section-y flex scroll-mt-24 flex-col gap-10"
    >
      <div className="flex max-w-[640px] flex-col items-start gap-[14px]">
        <Reveal as="h2" id="pricing-title" className="h2">
          {PRICING.h2}
        </Reveal>
        <Reveal>
          <p className="lead">{PRICING.sub}</p>
        </Reveal>
      </div>

      {/* Drie plannen. De prijs is het grootste element; de doorlooptijd staat als
          klein label eronder. Groei is waar we naartoe sturen: blauwe balk
          bovenop met het merkvinkje, blauwe naam en knop, opgetild met gloed. */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-stretch gap-5 pt-3">
        {PRICING.plans.map((p) => {
          const hl = Boolean(p.popular);
          return (
            <Reveal key={p.name} className="flex">
              <div
                className={`relative flex w-full flex-col overflow-hidden rounded-[20px] bg-white ${
                  hl
                    ? "z-[1] border-2 border-blue shadow-[0_28px_60px_-24px_rgba(26,26,255,0.35)] md:-translate-y-3"
                    : "border border-line md:mt-[38px]"
                }`}
              >
                {hl ? (
                  <div className="flex items-center justify-center gap-2 bg-blue py-[9px] text-[13px] font-semibold text-white">
                    <DotCheck dot={2} gap={0.6} color="#C6F24E" loop />
                    {PRICING.badgePopular}
                  </div>
                ) : null}

                <div className="flex flex-1 flex-col p-7">
                  <h3 className={`m-0 text-[20px] font-bold tracking-[-0.02em] ${hl ? "text-blue" : ""}`}>{p.name}</h3>
                  <div className="mt-[6px] text-[15px] text-muted md:min-h-[45px]">{p.who}</div>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="num text-[52px] font-semibold leading-none tracking-[-0.035em]">{p.price}</span>
                    <span className="text-[16px] font-medium text-muted">{PRICING.per}</span>
                  </div>

                  <div
                    className={`mt-4 inline-flex items-center gap-2 self-start rounded-full py-[6px] pl-[10px] pr-3 text-[13px] font-semibold ${
                      hl ? "bg-lime text-ink" : "bg-paper text-muted"
                    }`}
                  >
                    <DotCheck dot={1.6} gap={0.5} color={hl ? "#0B0B3B" : "#525873"} />
                    {p.visible}
                  </div>

                  <a
                    href="#check"
                    className={`btn mt-6 w-full px-4 py-[14px] text-[15px] ${hl ? "btn-blue" : "btn-white border border-line"}`}
                  >
                    {PRICING.planCta(p.name)}
                  </a>

                  <div className="mt-7 border-t border-line pt-5 text-[14px] font-semibold">{p.featuresTitle}</div>
                  <ul className="m-0 mt-3 flex list-none flex-col gap-[10px] p-0 text-[15px]">
                    {p.checks.map((c) => (
                      <li key={c} className="flex items-center gap-[10px]">
                        <Tick size={18} />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          );
        })}
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
          <div className="max-w-[40ch] text-[20px] font-bold leading-[1.25] tracking-[-0.02em] text-pretty">
            {PRICING.expert.title}
          </div>
          <div className="max-w-[52ch] text-[16px] text-pretty text-paper/85">{PRICING.expert.body}</div>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 max-md:w-full">
          {/* TODO: echte link naar de agenda voor een kennismaking */}
          <a href="#" className="btn btn-lime whitespace-nowrap px-5 py-[13px] text-[15px]">
            {PRICING.expert.cta}
          </a>
          {/* TODO: echte link naar de pagina over de expert */}
          <a href="#" className="whitespace-nowrap text-[14px] text-paper">
            {PRICING.expert.link}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
