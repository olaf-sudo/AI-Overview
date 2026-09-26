import { GOOGLE } from "@/lib/content";
import CountUp from "./CountUp";
import PhoneFrame from "./PhoneFrame";
import PixelArrow from "./PixelArrow";
import Reveal from "./Reveal";
import { Tick } from "./ui";

export default function GoogleSection() {
  return (
    <section aria-labelledby="google-title" className="cv-auto overflow-hidden border-b border-line bg-beige">
      {/* Warm beige in plaats van het verzadigde blauw; de onderrand markeert waar
          de telefoon wordt afgesneden. */}
      <div className="container-page grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] items-center gap-16 pt-24 max-lg:grid-cols-1">
        {/* Tekstkolom */}
        <div className="flex flex-col items-start gap-6 pb-24 max-lg:pb-0">
          <Reveal>
            <p className="pill-outline m-0">
              <Tick size={18} />
              {GOOGLE.pill}
            </p>
          </Reveal>

          <Reveal
            as="h2"
            id="google-title"
            className="h2 text-[clamp(36px,4.6vw,60px)] text-pretty"
          >
            {GOOGLE.h2}
          </Reveal>

          <Reveal>
            <p className="lead max-w-[480px]">{GOOGLE.body}</p>
          </Reveal>

          <div className="grid w-full max-w-[480px] grid-cols-2 gap-6 border-t border-line pt-6 max-[420px]:grid-cols-1">
            {GOOGLE.stats.map((s) => (
              <Reveal key={s.n} className="flex flex-col gap-1">
                <CountUp value={s.n} className="num block text-[52px] leading-none text-blue" />
                <div className="text-[14px] font-medium">{s.label}</div>
                <div className="label-sm">{s.src}</div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Telefoon met stippenpijl erachter */}
        <div className="relative flex h-[640px] items-end justify-center">
          <PixelArrow />
          <Reveal className="relative">
            <PhoneFrame />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
