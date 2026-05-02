import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

export const LoadingScreen = () => {
  const [counter, setCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const counterRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => setIsLoading(false), 500);
      },
    });

    const countObj = { value: 0 };

    tl.to(countObj, {
      value: 100,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => {
        setCounter(Math.floor(countObj.value));
      },
    });

    if (progressRef.current) {
      tl.to(progressRef.current, {
        scaleX: 1,
        duration: 2.5,
        ease: "power2.inOut",
      }, 0);
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
          }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center pointer-events-auto"
        >
          {/* Grid Background */}
          <div className="absolute inset-0 grid-lines opacity-10" />

          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4"
            >
              Initializing Systems
            </motion.div>
            
            <div 
              ref={counterRef}
              className="text-7xl md:text-9xl font-bold tracking-tighter tabular-nums"
              style={{ 
                color: "black",
                WebkitTextStroke: "1.5px hsl(var(--primary))",
                textShadow: "0 0 30px hsl(var(--primary) / 0.2)"
              }}
            >
              {counter}%
            </div>

            <div className="mt-8 w-48 h-[1px] bg-border relative overflow-hidden">
              <div 
                ref={progressRef}
                className="absolute inset-0 bg-primary origin-left scale-x-0"
              />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-6 font-mono text-[10px] text-primary/60"
            >
              SYNCING_DATA_CORES
            </motion.div>
          </div>

          {/* Corner Accents */}
          <div className="absolute top-10 left-10 w-12 h-12 border-t border-l border-primary/20" />
          <div className="absolute top-10 right-10 w-12 h-12 border-t border-r border-primary/20" />
          <div className="absolute bottom-10 left-10 w-12 h-12 border-b border-l border-primary/20" />
          <div className="absolute bottom-10 right-10 w-12 h-12 border-b border-r border-primary/20" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
