"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { scrollToId, useReducedMotion } from "@/lib/hooks";

/**
 * De hero als <section>. Bij het wegscrollen schaalt de inhoud naar boven weg
 * terwijl de volgende sectie eroverheen schuift. Dit component zet alleen een
 * paar CSS-variabelen; de opmaak staat in `.hero-out` en `.hero-hint`.
 *
 * Is de hero hoger dan het scherm (kleine telefoons), dan begint het effect
 * pas als de onderkant in beeld is, zodat het invoerveld bereikbaar blijft.
 */
export function HeroScroll({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const height = el.offsetHeight;
      const viewport = window.innerHeight;
      const start = Math.max(0, height - viewport);
      const range = Math.min(height, viewport);
      const d = Math.min(Math.max(window.scrollY - start, 0), range);
      const p = d / range;

      // Halve snelheid naar boven, iets kleiner en vervagend.
      el.style.setProperty("--hero-y", `${(d * 0.5).toFixed(1)}px`);
      el.style.setProperty("--hero-s", (1 - p * 0.08).toFixed(4));
      el.style.setProperty("--hero-o", (1 - p * 0.9).toFixed(3));
      // De scrollknop is al weg voordat de uitleg halverwege is.
      el.style.setProperty("--hero-hint", Math.max(0, 1 - p * 4).toFixed(3));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      for (const v of ["--hero-y", "--hero-s", "--hero-o", "--hero-hint"]) {
        el.style.removeProperty(v);
      }
    };
  }, [reduced]);

  return (
    <section ref={ref} id={id} aria-label="Intro" className={className}>
      {children}
    </section>
  );
}

/** Scroll-down knop onderaan de hero, in de stijl van Gemini. */
export function ScrollHint({
  target,
  className,
  children,
}: {
  target: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button type="button" onClick={() => scrollToId(target)} className={className}>
      {children}
    </button>
  );
}

/** Formulier dat bewust niets doet: Enter of de knop laden de pagina niet opnieuw. */
export function QuietForm({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <form className={className} onSubmit={(e) => e.preventDefault()} noValidate>
      {children}
    </form>
  );
}
