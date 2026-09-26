"use client";

import { useEffect, useState } from "react";
import { HERO, HOW } from "@/lib/content";

/** Hoogte van de header; het hero-logo moet hier onder schuiven. */
const HEADER_HEIGHT = 64;

/** Het merkvinkje uit de handoff: 7×7 ronde stippen, 1 = stip aan. */
const CHECK = ["0000011", "0000011", "0000110", "1100110", "1101100", "0111100", "0011000"];
const DOT = 3;
const GAP = 1;
const SIZE = CHECK.length * (DOT + GAP) - GAP;

/**
 * Het logo: het stippenvinkje. Met `draw` ploppen de stippen van links naar
 * rechts in, alsof het vinkje wordt gezet.
 */
function LogoMark({ draw }: { draw: boolean }) {
  return (
    <svg
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      aria-hidden="true"
      className={`block flex-none ${draw ? "px-draw" : ""}`}
    >
      {CHECK.flatMap((row, r) =>
        row.split("").map((bit, c) =>
          bit === "1" ? (
            <circle
              key={`${r}-${c}`}
              cx={c * (DOT + GAP) + DOT / 2}
              cy={r * (DOT + GAP) + DOT / 2}
              r={DOT / 2}
              fill="#1A1AFF"
              style={{ "--px-i": c } as React.CSSProperties}
            />
          ) : null,
        ),
      )}
    </svg>
  );
}

/**
 * Header die inschuift zodra je scrolt. Hij verschijnt op het moment dat het
 * logo in de hero onder de header verdwijnt, zodat het logo als het ware naar
 * de header verhuist en er nooit twee logo's tegelijk te zien zijn.
 */
export default function SiteHeader() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const brand = document.getElementById("hero-brand");
    let frame = 0;

    const update = () => {
      frame = 0;
      const brandTop = brand ? brand.getBoundingClientRect().top : -1;
      setShown(window.scrollY > 4 && brandTop < HEADER_HEIGHT);
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
    };
  }, []);

  return (
    <header
      inert={!shown}
      className={`fixed inset-x-0 top-0 z-50 h-16 border-b border-line/70 bg-white/92 backdrop-blur-md transition-[transform,opacity] duration-300 ease-out ${
        shown ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a
          href="#check"
          className="flex items-center gap-[10px] text-[20px] font-bold leading-6 tracking-[-0.02em] text-ink hover:no-underline"
        >
          <LogoMark draw={shown} />
          {HERO.brand}
        </a>
        {/* Eén knop rechts, terug naar het invoerveld in de hero */}
        <a href="#check" className="btn btn-blue px-4 py-[9px] text-[14px]">
          {HOW.cta}
        </a>
      </div>
    </header>
  );
}
