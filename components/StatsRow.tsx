import { STATS } from "@/lib/content";
import Reveal from "./Reveal";

export default function StatsRow() {
  return (
    <section aria-labelledby="stats-title" className="border-b border-line bg-white">
      <div className="container-page stats-grid">
        <div className="flex flex-col justify-center gap-2 py-11 pr-8">
          <Reveal as="h2" id="stats-title" className="h2 text-[clamp(30px,3.2vw,42px)]">
            {STATS.title}
          </Reveal>
          <Reveal delay={120}>
            <div className="text-[15px] text-muted">{STATS.sub}</div>
          </Reveal>
        </div>

        {STATS.items.map((s, i) => (
          <Reveal
            key={s.n}
            delay={160 + i * 110}
            className="flex flex-col justify-center gap-[6px] px-7 py-11"
          >
            <div className="num text-[clamp(36px,3.6vw,52px)] leading-none text-blue">
              {s.n}
            </div>
            <div className="text-[14px] font-medium text-pretty">{s.label}</div>
            <div className="label-sm">{s.src}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
