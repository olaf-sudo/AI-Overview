"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/hooks";

/** Hoe klein en hoe scheef een kaart wordt als hij helemaal is afgedekt. */
const MIN_SCALE = 0.92;
const MAX_TILT = 1.5;

/**
 * Wrapper om de sticky proceskaarten. Schuift de volgende kaart over een kaart
 * heen, dan wordt die onderste kleiner en kantelt hij een tikje, om en om naar
 * links en rechts. De kaart die bovenop ligt blijft dus altijd volle maat.
 *
 * Werkt met twee CSS-variabelen per kaart; de opmaak staat in `.stack-card`.
 */
export default function StackCards({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root || reduced) return;

    const cards = Array.from(root.children) as HTMLElement[];
    let tops: number[] = [];
    let frame = 0;

    const measure = () => {
      tops = cards.map((c) => parseFloat(getComputedStyle(c).top) || 0);
    };

    const update = () => {
      frame = 0;
      for (let i = 0; i < cards.length - 1; i++) {
        const card = cards[i];
        const next = cards[i + 1];
        // Begint zodra de volgende kaart de onderkant raakt, klaar zodra die
        // zelf op zijn sticky plek ligt.
        const from = tops[i] + card.offsetHeight;
        const to = tops[i + 1];
        const p = Math.min(Math.max((from - next.getBoundingClientRect().top) / (from - to), 0), 1);
        const dir = i % 2 === 0 ? -1 : 1;
        card.style.setProperty("--stack-s", (1 - (1 - MIN_SCALE) * p).toFixed(4));
        card.style.setProperty("--stack-r", `${(dir * MAX_TILT * p).toFixed(3)}deg`);
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      schedule();
    };

    measure();
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      for (const c of cards) {
        c.style.removeProperty("--stack-s");
        c.style.removeProperty("--stack-r");
      }
    };
  }, [reduced]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
