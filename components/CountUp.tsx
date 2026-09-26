"use client";

import { useEffect, useRef } from "react";

const DURATION = 1400;

/** Alle getallen in een label, bijv. "45%" -> [45], "3 to 5" -> [3, 5]. */
const NUMBER = /\d+(?:\.\d+)?/g;

/**
 * Laat de getallen in een label oplopen, elke keer dat het in beeld komt: gaat
 * het uit beeld, dan springt het terug naar 0 en telt het de volgende keer weer
 * op. De server rendert het eindgetal, dus zonder JavaScript of bij reduced
 * motion staat het er gewoon. De tekst gaat direct via de ref, zonder re-renders.
 */
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const parts = value.split(NUMBER);
    const targets = (value.match(NUMBER) ?? []).map((n) => ({
      value: Number(n),
      decimals: n.includes(".") ? n.split(".")[1].length : 0,
    }));
    if (!targets.length) return;

    const render = (t: number) => {
      el.textContent = parts
        .map((part, i) => (i < targets.length ? part + (targets[i].value * t).toFixed(targets[i].decimals) : part))
        .join("");
    };

    let frame = 0;
    const run = () => {
      cancelAnimationFrame(frame);
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / DURATION);
        render(p === 1 ? 1 : 1 - Math.pow(2, -10 * p)); // easeOutExpo
        if (p < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    render(0);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
        } else {
          // Uit beeld: klaarzetten voor de volgende keer.
          cancelAnimationFrame(frame);
          render(0);
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = value;
    };
  }, [value]);

  // Schermlezers krijgen alleen het eindgetal, niet elke tussenstap.
  return (
    <span className={className}>
      <span ref={ref} aria-hidden="true">
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
