import type Lenis from "lenis";

declare global {
  interface Window {
    /** Gezet door <SmoothScroll>, zodat programmatisch scrollen dezelfde easing gebruikt. */
    __lenis?: Lenis;
  }
}

export {};
