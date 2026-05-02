import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

const principles = [
  {
    n: "01",
    title: "Constraints first",
    body: "Edge cases — Infinity, division by zero, empty states — are the product. I design from the failure modes inward.",
  },
  {
    n: "02",
    title: "Data is the spec",
    body: "Schemas, RLS, and type contracts are written before the UI. The interface is whatever the data already implies.",
  },
  {
    n: "03",
    title: "Boring infrastructure",
    body: "Postgres, REST, server-rendered pages. Boring scales. Novelty is reserved for the actual problem.",
  },
  {
    n: "04",
    title: "Calm interfaces",
    body: "Motion is intentional. Color is restrained. The user's attention is the most expensive resource on the page.",
  },
];

export const Systems = () => (
  <section id="systems" aria-labelledby="systems-heading" className="px-6 md:px-10 max-w-6xl mx-auto py-32 md:py-40">
    <SectionHeader
      index="02 — Systems thinking"
      title="How I make decisions."
      subtitle="The principles underneath the projects. Stable enough to outlast a stack."
    />
    <div className="grid md:grid-cols-2 gap-px bg-border border border-border rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl shadow-black/40">
      {principles.map((p, i) => (
        <Reveal key={p.n} delay={i * 0.08} className="bg-background">
          <motion.div 
            className="p-8 md:p-10 h-full relative overflow-hidden group cursor-default"
            whileHover="hover"
            initial="idle"
          >
            {/* Soft background fade-in */}
            <motion.div
              className="absolute inset-0 bg-muted/40"
              variants={{
                idle: { opacity: 0 },
                hover: { opacity: 1 }
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="font-mono text-xs text-primary/60 mb-6 md:mb-8 flex justify-between items-center transition-colors duration-500 group-hover:text-primary">
                <span>{p.n}</span>
                <motion.span
                  variants={{
                    idle: { x: -10, opacity: 0 },
                    hover: { x: 0, opacity: 1 }
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.span>
              </div>
              <motion.h3 
                variants={{
                  idle: { x: 0 },
                  hover: { x: 4 }
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-xl md:text-2xl font-semibold mb-3 tracking-tight"
              >
                {p.title}
              </motion.h3>
              <motion.p 
                variants={{
                  idle: { x: 0 },
                  hover: { x: 4 }
                }}
                transition={{ duration: 0.4, delay: 0.03, ease: [0.22, 1, 0.36, 1] }}
                className="text-muted-foreground leading-relaxed text-sm md:text-base mt-auto"
              >
                {p.body}
              </motion.p>
            </div>
          </motion.div>
        </Reveal>
      ))}
    </div>
  </section>
);
