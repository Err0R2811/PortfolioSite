import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings2 } from "lucide-react";
import { usePrefs } from "@/context/PrefsContext";

const Toggle = ({
  checked,
  onChange,
  label,
  id,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  id: string;
}) => (
  <button
    id={id}
    role="switch"
    aria-checked={checked}
    aria-label={label}
    onClick={() => onChange(!checked)}
    className={`relative w-10 h-5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card ${
      checked ? "bg-primary" : "bg-muted border border-border"
    }`}
  >
    <span
      className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-background transition-transform ${
        checked ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);

export const SettingsControl = () => {
  const { reducedMotion, particles, setReducedMotion, setParticles } = usePrefs();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-label="Display preferences"
            className="absolute bottom-14 right-0 w-72 bg-card border border-border rounded-xl shadow-soft p-5"
          >
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-4">
              Comfort settings
            </div>
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <label htmlFor="pref-motion" className="cursor-pointer">
                  <div className="text-sm font-medium">Reduce motion</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Disable scroll reveals and hover animations.
                  </div>
                </label>
                <Toggle
                  id="pref-motion"
                  checked={reducedMotion}
                  onChange={setReducedMotion}
                  label="Reduce motion"
                />
              </div>
              <div className="h-px bg-border" />
              <div className="flex items-start justify-between gap-4">
                <label htmlFor="pref-particles" className="cursor-pointer">
                  <div className="text-sm font-medium">Particle background</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Toggle the ambient 3D field.
                  </div>
                </label>
                <Toggle
                  id="pref-particles"
                  checked={particles}
                  onChange={setParticles}
                  label="Particle background"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open display settings"
        aria-expanded={open}
        className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center shadow-soft hover:border-primary/60 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <Settings2 className="w-5 h-5" />
      </button>
    </div>
  );
};
