"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type Props = {
  children: ReactNode;
  /** Vertraging in ms, voor een lichte stagger binnen een rij of grid. */
  delay?: number;
  /** Extra klassen op het element zelf. */
  className?: string;
  as?: ElementType;
  style?: CSSProperties;
  /** Hoeveel van het element in beeld moet zijn (0–1). */
  amount?: number;
  id?: string;
};

/**
 * Laat kinderen rustig opkomen met alleen een opacity fade, zonder
 * verschuiving of schaal. Onder de vouw start een IntersectionObserver de fade
 * zodra het element in beeld komt; die meldt zich daarna meteen af.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  style,
  amount = 0.15,
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (shown) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: amount, rootMargin: "0px 0px -6% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [amount, shown]);

  const Component = Tag as ElementType;
  return (
    <Component
      ref={ref}
      id={id}
      className={`reveal ${shown ? "is-in" : ""} ${className}`.trim()}
      style={{ "--reveal-delay": `${delay}ms`, ...style } as CSSProperties}
    >
      {children}
    </Component>
  );
}
