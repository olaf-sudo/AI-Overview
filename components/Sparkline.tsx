const POINTS = "0,66 23,62 46,56 69,46 92,36 115,24 138,14 160,6";

/** Lijntje met de groei van het weekrapport. */
export default function Sparkline() {
  return (
    <svg
      viewBox="0 0 160 72"
      width="100%"
      height="72"
      preserveAspectRatio="none"
      className="block"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C6F24E" stopOpacity="0.45" />
          <stop offset="1" stopColor="#C6F24E" stopOpacity="0" />
        </linearGradient>
      </defs>

      <polygon points={`${POINTS} 160,72 0,72`} fill="url(#sparkFill)" />

      <polyline
        points={POINTS}
        fill="none"
        stroke="#C6F24E"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      <g>
        <circle cx="160" cy="6" r="9" fill="#C6F24E" fillOpacity="0.25" />
        <circle cx="160" cy="6" r="5" fill="#C6F24E" />
      </g>
    </svg>
  );
}
