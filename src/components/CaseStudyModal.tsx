import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { X, ArrowUpRight, Github } from "lucide-react";
import { Project } from "@/data/projects";

interface Props {
  project: Project | null;
  onClose: () => void;
}

const PixelDissolve = ({ isExiting, duration = 0.9 }: { isExiting: boolean; duration?: number }) => {
  const rows = 12;
  const cols = 16;
  const total = rows * cols;

  const blocks = useMemo(() => {
    const arr = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Random-ish delay but with a slight directional bias (top-left to bottom-right)
        const delay = ((r / rows) + (c / cols)) * 0.3 + Math.random() * 0.4;
        arr.push({ r, c, delay });
      }
    }
    return arr;
  }, []);

  return (
    <div className="absolute inset-0 z-[110] pointer-events-none overflow-hidden">
      <div className="absolute inset-0 z-[115] pointer-events-none overflow-hidden opacity-[0.03]">
        <motion.div
          animate={{ y: ["-100%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-full h-20 bg-gradient-to-b from-transparent via-primary to-transparent"
        />
      </div>
      <div className="absolute inset-0 z-[110] pointer-events-none grid grid-lines opacity-[0.03]" />
      <div className="absolute inset-0 grid" 
           style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}>
        {blocks.map((b, i) => (
        <motion.div
          key={i}
          initial={{ opacity: isExiting ? 0 : 1 }}
          animate={{ opacity: isExiting ? 1 : 0 }}
          transition={{ 
            duration: 0.2, 
            delay: b.delay * (duration / 0.9), // Scale delay to match duration
            ease: "easeInOut" 
          }}
          className="bg-background border-[0.5px] border-primary/5"
        />
      ))}
      </div>
    </div>
  );
};

export const CaseStudyModal = ({ project, onClose }: Props) => {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project]);

  const handleClose = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsAnimatingOut(false);
      onClose();
    }, 850);
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6 bg-background/80 backdrop-blur-md"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`modal-title-${project.id}`}
        >
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full md:max-w-4xl max-h-[92vh] overflow-y-auto bg-card border border-border shadow-soft"
          >
            <PixelDissolve isExiting={isAnimatingOut} duration={0.8} />

            <div className="sticky top-0 z-20 flex items-center justify-between px-6 md:px-10 py-5 bg-card/95 backdrop-blur border-b border-border">
              <span className="font-mono text-xs text-primary">{project.year} · case study</span>
              <button
                onClick={handleClose}
                aria-label="Close case study"
                className="w-9 h-9 border border-border flex items-center justify-center hover:border-primary/60 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {project.image && (
              <div className="w-full border-b border-border overflow-hidden bg-muted/20">
                <motion.img
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  src={project.image}
                  alt={project.title}
                  className={`w-full h-auto max-h-[400px] object-cover object-top transition-all duration-1000 ${isAnimatingOut ? "grayscale" : "grayscale-0"}`}
                />
              </div>
            )}

            <div className="px-6 md:px-10 py-8 md:py-10">
              <h2
                id={`modal-title-${project.id}`}
                className="text-3xl md:text-6xl font-semibold tracking-tight text-gradient"
              >
                {project.title}
              </h2>
              <p className="font-mono text-xs text-primary/80 mt-3 uppercase tracking-widest">{project.role}</p>

              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border overflow-hidden">
                {project.metrics.map((m) => (
                  <div key={m.label} className="bg-card p-5">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2">
                      {m.label}
                    </div>
                    <div className="text-sm font-medium tracking-tight">{m.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-10 space-y-10">
                <div className="grid md:grid-cols-12 gap-6 md:gap-10">
                  <div className="md:col-span-4">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-4 flex items-center gap-2">
                      <span className="w-1 h-1 bg-primary" /> Problem
                    </div>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-muted-foreground leading-relaxed md:text-lg">{project.problem}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-12 gap-6 md:gap-10">
                  <div className="md:col-span-4">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-4 flex items-center gap-2">
                      <span className="w-1 h-1 bg-primary" /> Solution
                    </div>
                  </div>
                  <div className="md:col-span-8">
                    <p className="leading-relaxed md:text-lg">{project.solution}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-12 gap-6 md:gap-10">
                  <div className="md:col-span-4">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                      <span className="w-1 h-1 bg-primary" /> Outcome
                    </div>
                  </div>
                  <div className="md:col-span-8">
                    <p className="leading-relaxed md:text-lg">{project.impact}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-12 gap-6 md:gap-10 pt-10 border-t border-border">
                  <div className="md:col-span-4">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-6">
                      System thinking
                    </div>
                  </div>
                  <div className="md:col-span-8">
                    <ul className="space-y-4">
                      {project.systems.map((s) => (
                        <li key={s} className="text-sm md:text-base text-muted-foreground flex gap-4 leading-relaxed group">
                          <span className="font-mono text-primary/40 mt-1 transition-colors group-hover:text-primary">→</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {project.architecture && (
                  <div className="grid md:grid-cols-12 gap-6 md:gap-10 pt-10 border-t border-border">
                    <div className="md:col-span-4">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-6">
                        Architecture
                      </div>
                    </div>
                    <div className="md:col-span-8">
                      <p className="font-mono text-sm text-muted-foreground leading-relaxed bg-muted/20 p-6 border border-border">
                        {project.architecture}
                      </p>
                    </div>
                  </div>
                )}

                <div className="pt-10 border-t border-border">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-5">
                    Technology Stack
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="font-mono text-[11px] px-4 py-1.5 border border-border text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors cursor-default"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {(project.href || project.github) && (
                  <div className="pt-10 flex flex-wrap gap-4 border-t border-border">
                    {project.href && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-3 bg-primary text-primary-foreground font-mono text-xs hover:shadow-glow transition-all active:scale-95"
                      >
                        Visit Live Interface
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-3 border border-border font-mono text-xs hover:border-primary/60 hover:text-primary transition-all active:scale-95"
                      >
                        <Github className="w-4 h-4" />
                        Explore Source
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
