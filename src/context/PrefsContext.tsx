import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Prefs = {
  reducedMotion: boolean;
  particles: boolean;
  setReducedMotion: (v: boolean) => void;
  setParticles: (v: boolean) => void;
};

const PrefsContext = createContext<Prefs | null>(null);

const KEY = "amit.prefs.v1";

export const PrefsProvider = ({ children }: { children: ReactNode }) => {
  const [reducedMotion, setReducedMotionState] = useState(false);
  const [particles, setParticlesState] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const p = JSON.parse(raw);
        if (typeof p.reducedMotion === "boolean") setReducedMotionState(p.reducedMotion);
        if (typeof p.particles === "boolean") setParticlesState(p.particles);
      } else if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setReducedMotionState(true);
      }
    } catch {}
  }, []);

  const persist = (next: Partial<{ reducedMotion: boolean; particles: boolean }>) => {
    try {
      const current = { reducedMotion, particles, ...next };
      localStorage.setItem(KEY, JSON.stringify(current));
    } catch {}
  };

  const setReducedMotion = (v: boolean) => {
    setReducedMotionState(v);
    persist({ reducedMotion: v });
  };
  const setParticles = (v: boolean) => {
    setParticlesState(v);
    persist({ particles: v });
  };

  return (
    <PrefsContext.Provider value={{ reducedMotion, particles, setReducedMotion, setParticles }}>
      {children}
    </PrefsContext.Provider>
  );
};

export const usePrefs = () => {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("usePrefs must be used within PrefsProvider");
  return ctx;
};
