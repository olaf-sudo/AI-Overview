import { FAQ } from "@/lib/content";
import Reveal from "./Reveal";

/**
 * Veelgestelde vragen met native <details>. Dezelfde `name` maakt er een
 * exclusieve accordeon van: de browser houdt zelf één vraag tegelijk open.
 * Geen JavaScript nodig.
 */
export default function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="cv-auto container-page section-y grid scroll-mt-24 grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] items-start gap-x-16 gap-y-10 max-lg:grid-cols-1"
    >
      <div className="flex flex-col gap-4 lg:sticky lg:top-24">
        <Reveal as="h2" id="faq-title" className="h2">
          {FAQ.h2}
        </Reveal>
        <Reveal>
          <p className="m-0 text-[16px] text-muted">
            {FAQ.footer.text}
            {/* TODO: echt mailto-adres invullen */}
            <a href="#" className="font-semibold">
              {FAQ.footer.link}
            </a>
          </p>
        </Reveal>
      </div>

      <Reveal className="border-t border-line">
        {FAQ.items.map((item) => (
          <details key={item.q} name="faq" className="faq-item border-b border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[18px] font-semibold text-ink">
              {item.q}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="faq-chevron flex-none text-blue"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </summary>
            <p className="m-0 max-w-[62ch] pb-5 text-[16px] text-pretty text-muted">{item.a}</p>
          </details>
        ))}
      </Reveal>
    </section>
  );
}
