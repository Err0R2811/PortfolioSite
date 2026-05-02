/**
 * Inline SVG monogram inspired by the feather-accented AV slate design.
 * Uses currentColor so it adapts to any theme automatically.
 */
export const AVMonogram = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Left feather (wrapping the A) */}
    <path
      d="M 22 85 Q 18 55 30 30 Q 35 20 42 15 Q 38 30 36 45 Q 34 60 35 75 Z"
      fill="currentColor"
      opacity="0.35"
    />
    <path
      d="M 30 30 Q 34 35 36 45 M 32 40 Q 36 43 37 50 M 28 50 Q 33 52 35 58"
      stroke="currentColor"
      strokeWidth="0.8"
      opacity="0.5"
    />

    {/* The A */}
    <path
      d="M 28 82 L 44 22 L 60 82 M 34 65 L 54 65"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* The V */}
    <path
      d="M 48 28 L 68 88 L 82 28"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Right feather (wrapping the V) */}
    <path
      d="M 82 85 Q 86 55 74 30 Q 69 20 62 15 Q 66 30 68 45 Q 70 60 69 75 Z"
      fill="currentColor"
      opacity="0.35"
    />
    <path
      d="M 74 30 Q 70 35 68 45 M 72 40 Q 68 43 67 50 M 76 50 Q 71 52 69 58"
      stroke="currentColor"
      strokeWidth="0.8"
      opacity="0.5"
    />
  </svg>
);
