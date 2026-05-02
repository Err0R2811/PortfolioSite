import { motion } from "framer-motion";
import indiaMap from "@/data/india-map.json";
import { usePrefs } from "@/context/PrefsContext";

type StateGeo = { name: string; d: string };
const states = indiaMap as Record<string, StateGeo>;

// Approximate position of Vadodara in the SVG viewBox (0 0 612 696),
// derived from the Gujarat path bounding box.
const VADODARA = { x: 86, y: 362 };

export const IndiaMap = () => {
  const { reducedMotion } = usePrefs();
  const animate = !reducedMotion;

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div
        className="absolute inset-0 -z-10 rounded-full blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(circle at 18% 55%, hsl(var(--primary) / 0.45), transparent 55%)",
        }}
        aria-hidden
      />
      <svg
        viewBox="0 0 612 696"
        className="w-full h-auto"
        role="img"
        aria-label="Map of India with Gujarat state highlighted, marking Vadodara"
      >
        <defs>
          <radialGradient id="gj-fill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.55" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
          </radialGradient>
          <filter id="gj-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Other states — better visibility */}
        <g
          fill="hsl(var(--muted) / 0.5)"
          stroke="hsl(var(--foreground) / 0.18)"
          strokeWidth={1}
          strokeLinejoin="round"
        >
          {Object.entries(states)
            .filter(([id]) => id !== "gj")
            .map(([id, s]) => (
              <path key={id} d={s.d} className="transition-colors hover:fill-muted-foreground/30 duration-300" />
            ))}
        </g>

        {/* Gujarat — highlighted */}
        <motion.path
          d={states.gj.d}
          fill="url(#gj-fill)"
          stroke="hsl(var(--primary))"
          strokeWidth={1.2}
          strokeLinejoin="round"
          filter="url(#gj-glow)"
          initial={animate ? { opacity: 0 } : false}
          whileInView={animate ? { opacity: 1 } : undefined}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Vadodara marker */}
        <g transform={`translate(${VADODARA.x} ${VADODARA.y})`}>
          {animate && (
            <motion.circle
              r={4}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth={1}
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <circle r={4.5} fill="hsl(var(--primary) / 0.35)" />
          <circle r={2} fill="hsl(var(--primary-glow))" />
          <line
            x1={0}
            y1={-6}
            x2={28}
            y2={-22}
            stroke="hsl(var(--primary) / 0.6)"
            strokeWidth={0.8}
          />
          <text
            x={30}
            y={-23}
            fill="hsl(var(--foreground))"
            fontSize={9}
            fontFamily="JetBrains Mono, monospace"
            letterSpacing={1}
          >
            VADODARA
          </text>
          <text
            x={30}
            y={-13}
            fill="hsl(var(--muted-foreground))"
            fontSize={6.5}
            fontFamily="JetBrains Mono, monospace"
            letterSpacing={0.8}
          >
            22.31°N · 73.18°E
          </text>
        </g>
      </svg>
    </div>
  );
};
