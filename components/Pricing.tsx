import Image from "next/image";
import { PRICING } from "@/lib/content";
import Reveal from "./Reveal";

/** Kleur van tabje en knop per plan: rustig grijs, lime (uitgelicht), inkt. */
const TONE = [
  { badge: "bg-[#eceef3] text-ink", cta: "bg-[#eceef3] text-ink hover:bg-[#e1e4ec]" },
  { badge: "bg-lime text-ink", cta: "bg-lime text-ink hover:bg-[#b8e63c]" },
  { badge: "bg-ink text-white", cta: "bg-ink text-white hover:bg-[#1c1c55]" },
];

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="mt-[3px] flex-none text-muted">
      <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Pricing() {
  return (
    <section
      id="prijzen"
      aria-labelledby="pricing-title"
      className="cv-auto container-page section-y flex scroll-mt-24 flex-col gap-12"
    >
      <div className="flex max-w-[640px] flex-col items-start gap-[14px]">
        <Reveal as="h2" id="pricing-title" className="h2">
          {PRICING.h2}
        </Reveal>
        <Reveal>
          <p className="lead">{PRICING.sub}</p>
        </Reveal>
      </div>

      {/* Drie plannen, met een tabje bovenop en het middelste plan uitgelicht */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-stretch gap-5 pt-4 max-md:gap-9">
        {PRICING.plans.map((p, i) => (
          <Reveal key={p.name} className="flex">
            <div
              className={`relative flex w-full flex-col rounded-[20px] bg-white p-8 ${
                p.highlight ? "border-2 border-lime shadow-[0_20px_50px_-20px_rgba(11,11,59,0.18)]" : "border border-line"
              }`}
            >
              <span
                className={`absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg px-5 py-[5px] text-[14px] font-medium ${TONE[i].badge}`}
              >
                {p.badge}
              </span>

              <h3 className="m-0 text-[26px] font-semibold leading-tight tracking-[-0.02em]">{p.name}</h3>
              <div className="text-[26px] leading-tight tracking-[-0.02em] text-muted">
                {p.price}
                {PRICING.per}
              </div>
              <div className="mt-2 text-[13px] text-muted">{p.visible}</div>

              <p className="mb-0 mt-6 text-[15px] leading-[1.5] md:min-h-[45px]">{p.who}</p>

              <a href="#check" className={`btn mt-5 w-full rounded-[10px] px-4 py-3 text-[15px] ${TONE[i].cta}`}>
                {PRICING.planCta(p.name)}
              </a>

              <div className="mt-7 border-t border-line pt-6 text-[15px] font-medium">{p.featuresTitle}</div>
              <ul className="m-0 mt-4 flex list-none flex-col gap-3 p-0 text-[15px] text-muted">
                {p.checks.map((c) => (
                  <li key={c} className="flex gap-[10px]">
                    <Check />
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
          <div className="max-w-[40ch] text-[20px] font-bold leading-[1.25] tracking-[-0.02em] text-pretty">
            {PRICING.expert.title}
          </div>
          <div className="max-w-[52ch] text-[16px] text-pretty text-paper/85">{PRICING.expert.body}</div>
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
