"use client";

import { useId, useState } from "react";
import { FAQ } from "@/lib/content";
import Reveal from "./Reveal";

export default function Faq() {
  /** Eén vraag tegelijk open; −1 is alles dicht. */
  const [open, setOpen] = useState(-1);
  const base = useId();

  // Doorlopende index over alle groepen, zodat er één vraag tegelijk open staat.
  const offsets = FAQ.groups.reduce<number[]>((acc, g, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + FAQ.groups[i - 1].items.length);
    return acc;
  }, []);

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="section-y mx-auto flex w-full max-w-[868px] scroll-mt-24 flex-col gap-10 px-6"
    >
      <Reveal as="h2" id="faq-title" className="h2">
        {FAQ.h2}
      </Reveal>

      {FAQ.groups.map((g, gi) => (
        <Reveal key={g.title} delay={gi * 80} className="flex flex-col gap-2">
          <div className="label">{g.title}</div>

          <div className="border-t border-line">
            {g.items.map((item, ii) => {
              const i = offsets[gi] + ii;
              const isOpen = open === i;
              const panelId = `${base}-panel-${i}`;
              const buttonId = `${base}-button-${i}`;

              return (
                <div key={item.q} className="border-b border-line">
                  <h3 className="m-0">
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent px-0 py-[18px] text-left font-sans text-[18px] font-semibold text-ink"
                    >
                      <span>{item.q}</span>
                      <span aria-hidden="true" className="flex-none text-[20px] leading-none text-blue">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                  </h3>

                  <div className="faq-panel" data-open={isOpen} id={panelId} role="region" aria-labelledby={buttonId}>
                    <div>
                      <p className="faq-answer m-0 max-w-[62ch] pb-[18px] text-[16px] text-pretty text-muted">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      ))}

      <Reveal>
        <p className="m-0 text-[16px] text-muted">
          {FAQ.footer.text}
          {/* TODO: echt mailto-adres invullen */}
          <a href="#" className="font-semibold">
            {FAQ.footer.link}
          </a>
        </p>
      </Reveal>
    </section>
  );
}
