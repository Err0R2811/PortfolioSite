import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { X, ArrowUpRight, Github } from "lucide-react";
import { Project } from "@/data/projects";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal = ({ project, onClose }: Props) => {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6 bg-background/80 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`modal-title-${project.id}`}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full md:max-w-3xl max-h-[92vh] overflow-y-auto bg-card border border-border shadow-soft"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-10 py-5 bg-card/95 backdrop-blur border-b border-border">
              <span className="font-mono text-xs text-primary">{project.year} · case study</span>
              <button
                onClick={onClose}
                aria-label="Close case study"
                className="w-9 h-9 border border-border flex items-center justify-center hover:border-primary/60 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 md:px-10 py-8 md:py-10">
              <h2
                id={`modal-title-${project.id}`}
                className="text-3xl md:text-5xl font-semibold tracking-tight text-gradient"
              >
                {project.title}
              </h2>
              <p className="font-mono text-xs text-primary/80 mt-2">{project.role}</p>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border overflow-hidden">
                {project.metrics.map((m) => (
                  <div key={m.label} className="bg-card p-4">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-1">
                      {m.label}
                    </div>
                    <div className="text-sm font-medium">{m.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2">
                    Problem
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2">
                    Solution
                  </div>
                  <p className="leading-relaxed">{project.solution}</p>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2">
                    Outcome
                  </div>
                  <p className="leading-relaxed">{project.impact}</p>
                </div>

                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-3">
                    System thinking
                  </div>
                  <ul className="space-y-2">
                    {project.systems.map((s) => (
                      <li key={s} className="text-sm text-muted-foreground flex gap-3 leading-relaxed">
                        <span className="font-mono text-primary/60 mt-1">→</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {project.architecture && (
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-3">
                      Architecture
                    </div>
                    <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                      {project.architecture}
                    </p>
                  </div>
                )}

                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-3">
                    Stack
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="font-mono text-xs px-3 py-1 border border-border text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {(project.href || project.github) && (
                  <div className="pt-4 flex flex-wrap gap-3 border-t border-border">
                    {project.href && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-mono text-xs hover:shadow-glow transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        Visit live
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 border border-border font-mono text-xs hover:border-primary/60 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <Github className="w-3.5 h-3.5" />
                        Source
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
