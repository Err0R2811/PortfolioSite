import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";

export const PixelDissolve = ({ isExiting, duration = 0.8 }: { isExiting: boolean; duration?: number }) => {
  const rows = 12;
  const cols = 16;
  const containerRef = useRef<HTMLDivElement>(null);
  
  const blocks = useMemo(() => {
    const arr = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const delay = ((r / rows) + (c / cols)) * 0.2 + Math.random() * 0.3;
        arr.push({ r, c, delay });
      }
    }
    return arr;
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const pixels = containerRef.current.querySelectorAll(".pixel");
    
    if (isExiting) {
      // Animate TO opaque
      gsap.to(pixels, {
        opacity: 1,
        duration: 0.2,
        stagger: {
          each: 0.005,
          from: "random",
        },
        ease: "power2.inOut",
      });
    } else {
      // Animate FROM opaque TO transparent
      gsap.fromTo(pixels, 
        { opacity: 1 },
        {
          opacity: 0,
          duration: 0.2,
          stagger: {
            each: 0.005,
            from: "start",
          },
          ease: "power2.inOut",
          delay: 0.1,
        }
      );
    }
  }, [isExiting]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-[200] pointer-events-none overflow-hidden">
      <div className="absolute inset-0 grid" 
           style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}>
        {blocks.map((_, i) => (
          <div
            key={i}
            className="pixel bg-background border-[0.5px] border-primary/5"
            style={{ opacity: isExiting ? 0 : 1 }}
          />
        ))}
      </div>
      {/* Scanning Line Overlay */}
      <div className="absolute inset-0 z-[210] pointer-events-none overflow-hidden opacity-[0.05]">
        <div className="w-full h-[2px] bg-primary shadow-[0_0_15px_var(--primary)] animate-scan" />
      </div>
    </div>
  );
};
