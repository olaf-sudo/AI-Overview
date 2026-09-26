"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "@/lib/hooks";

/**
 * Lenis smooth scroll over de hele pagina. Lenis scrollt het document zelf, dus
 * `position: sticky` blijft werken. Bij `prefers-reduced-motion` wordt Lenis
 * niet gestart en scrollt de browser gewoon zelf.
 *
 * Bewust licht afgesteld: een hoge `lerp` haalt er alleen de scherpe randjes af
 * en laat het scrollen verder direct aanvoelen. Lager betekent meer naijlen.
 */
export default function SmoothScroll() {
  const reduced = useReducedMotion();
  const ref = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      // 0.1 is de standaard en voelt zwaar; 0.28 volgt het wiel bijna direct.
      lerp: 0.28,
      smoothWheel: true,
      // Touchscreens scrollen native; dat voelt beter dan een geëmuleerde easing.
      syncTouch: false,
      anchors: true,
    });

    ref.current = lenis;
    window.__lenis = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      ref.current = null;
      delete window.__lenis;
    };
  }, [reduced]);

  return null;
}
