"use client";

import { useSyncExternalStore } from "react";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeMedia(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** Volgt `prefers-reduced-motion: reduce`. Op de server altijd false. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeMedia,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false,
  );
}

/** Scrollt naar een element, via Lenis als die draait. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY;
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(top, { duration: 0.9 });
  } else {
    const reduced = window.matchMedia(REDUCED_QUERY).matches;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  }
}
