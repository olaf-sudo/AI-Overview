import type { CSSProperties, ElementType, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  style?: CSSProperties;
  id?: string;
};

/**
 * Rustige opacity fade bij het in beeld komen, volledig in CSS (`.reveal` in
 * globals.css, met `animation-timeline: view()`). Geen JavaScript en geen
 * hydratie. Browsers zonder scroll-gedreven animaties tonen de inhoud meteen.
 */
export default function Reveal({ children, className = "", as: Tag = "div", style, id }: Props) {
  const Component = Tag as ElementType;
  return (
    <Component id={id} className={`reveal ${className}`.trim()} style={style}>
      {children}
    </Component>
  );
}
