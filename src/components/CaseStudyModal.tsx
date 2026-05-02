import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback, useMemo } from "react";
import { X, ArrowUpRight, Github } from "lucide-react";
import { Project } from "@/data/projects";

interface Props {
  project: Project | null;
  onClose: () => void;
}

const dropIn = {
  hidden: { y: "-100vh", opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 18,
      mass: 1.2,
      delay: 0.15, // slight pause before opening
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.4,
      delay: 0.85, // wait for dissolve to fully play out
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerChildren = {
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

const BlockMask = () => {
  const rows = 12;
  const cols = 12;
  const blocks = [];
  const w = 1.05 / cols;
  const h = 1.05 / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      blocks.push(
        <motion.rect
          key={`${r}-${c}`}
          initial={{ x: c / cols, y: r / rows, width: w, height: h, opacity: 1 }}
          animate={{ x: c / cols, y: r / rows, width: w, height: h, opacity: 1 }}
          exit={{ 
            x: (c / cols) + (w / 2),
            y: (r / rows) + (h / 2),
            width: 0,
            height: 0,
            opacity: 0,
            transition: { 
              delay: Math.random() * 0.7, // 700ms max delay for slower dissolve
              duration: 0.2,
              ease: "circOut"
            }
          }}
          fill="white"
        />
      );
    }
  }

  return (
    <svg width="0" height="0" className="absolute pointer-events-none">
      <defs>
        <mask id="block-mask" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
          {blocks}
        </mask>
      </defs>
    </svg>
  );
};

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
          exit={{ opacity: 0, transition: { duration: 0.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-start md:items-center justify-center p-0 md:p-6 bg-background/80 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`modal-title-${project.id}`}
        >
          <motion.div
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full md:max-w-3xl max-h-[92vh] flex flex-col bg-card border border-border rounded-t-2xl md:rounded-2xl shadow-soft my-auto overflow-hidden"
            style={{ 
              WebkitMaskImage: "url(#block-mask)", 
              maskImage: "url(#block-mask)" 
            }}
          >
            <BlockMask />

            {/* Inner scroll container */}
            <div className="overflow-y-auto w-full h-full flex flex-col relative z-10">
              {/* Sticky header */}
              <div className="sticky top-0 z-20 flex items-center justify-between px-6 md:px-10 py-5 bg-card/95 backdrop-blur border-b border-border">
                <span className="font-mono text-xs text-primary">{project.year} · case study</span>
                <button
                  onClick={onClose}
                  aria-label="Close case study"
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-primary/60 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Project image */}
              {project.image && (
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="mx-6 md:mx-10 mt-6 rounded-xl overflow-hidden border border-border flex-shrink-0"
                >
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className="w-full h-48 md:h-64 object-cover object-top"
                    loading="lazy"
                  />
                </motion.div>
              )}

              <motion.div
                className="px-6 md:px-10 py-8 md:py-10 flex-shrink-0"
                variants={staggerChildren}
                initial="hidden"
                animate="visible"
              >
                <motion.h2
                  variants={fadeUp}
                  id={`modal-title-${project.id}`}
                  className="text-3xl md:text-5xl font-semibold tracking-tight text-gradient"
                >
                  {project.title}
                </motion.h2>
                <motion.p variants={fadeUp} className="font-mono text-xs text-primary/80 mt-2">
                  {project.role}
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border rounded-lg overflow-hidden"
                >
                  {project.metrics.map((m) => (
                    <div key={m.label} className="bg-card p-4">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-1">
                        {m.label}
                      </div>
                      <div className="text-sm font-medium">{m.value}</div>
                    </div>
                  ))}
                </motion.div>

                <div className="mt-8 space-y-6">
                  <motion.div variants={fadeUp}>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2">
                      Problem
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
                  </motion.div>
                  <motion.div variants={fadeUp}>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2">
                      Solution
                    </div>
                    <p className="leading-relaxed">{project.solution}</p>
                  </motion.div>
                  <motion.div variants={fadeUp}>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2">
                      Outcome
                    </div>
                    <p className="leading-relaxed">{project.impact}</p>
                  </motion.div>

                  <motion.div variants={fadeUp}>
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
                  </motion.div>

                  {project.architecture && (
                    <motion.div variants={fadeUp}>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-3">
                        Architecture
                      </div>
                      <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                        {project.architecture}
                      </p>
                    </motion.div>
                  )}

                  <motion.div variants={fadeUp}>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-3">
                      Stack
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((s) => (
                        <span
                          key={s}
                          className="font-mono text-xs px-3 py-1 rounded-full border border-border text-muted-foreground"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {(project.href || project.github) && (
                    <motion.div variants={fadeUp} className="pt-4 flex flex-wrap gap-3 border-t border-border">
                      {project.href && (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-mono text-xs hover:shadow-glow transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border font-mono text-xs hover:border-primary/60 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          <Github className="w-3.5 h-3.5" />
                          Source
                        </a>
                      )}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
