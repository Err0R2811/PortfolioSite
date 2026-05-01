import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

const projects = [
  {
    year: "2025",
    title: "Acadence",
    role: "Full-stack · AI-assisted analytics",
    summary:
      "Production attendance & academic management platform deployed at Parul Institute of Technology. GSD-based algorithm computes the minimum attendance required to pass each subject, in real time.",
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    metrics: [
      { k: "Users", v: "Live · faculty + students" },
      { k: "Edge cases", v: "Infinity / ε-guard resolved" },
    ],
  },
  {
    year: "2025",
    title: "Safarnama",
    role: "Cross-platform travel planner",
    summary:
      "Trip planning, itinerary, and expense tracking across web and mobile via Capacitor. Architected a 6-phase production-readiness plan covering security, performance, testing, and deployment.",
    stack: ["React", "Vite", "Supabase", "Capacitor"],
    metrics: [
      { k: "Core flows", v: "5+ shipped" },
      { k: "Targets", v: "Web · iOS · Android" },
    ],
  },
  {
    year: "2025",
    title: "DataMaster Journey",
    role: "Analytics portfolio",
    summary:
      "Cleaning, EDA, and visualization across 8+ real-world datasets. Structured querying and statistical analysis distilled into clear visual summaries.",
    stack: ["Python", "Pandas", "NumPy", "Matplotlib"],
    metrics: [
      { k: "Datasets", v: "8+" },
      { k: "Focus", v: "EDA · stats · viz" },
    ],
  },
  {
    year: "2023",
    title: "Plant-Pal",
    role: "ML disease classifier",
    summary:
      "Image classification on 500+ samples to detect plant diseases, served through an interactive Streamlit dashboard for inference and exploration.",
    stack: ["Python", "Streamlit", "ML"],
    metrics: [
      { k: "Samples", v: "500+" },
      { k: "Surface", v: "Streamlit app" },
    ],
  },
];

export const Work = () => {
  return (
    <section id="work" className="px-6 md:px-10 max-w-6xl mx-auto py-32 md:py-40">
      <SectionHeader
        index="01 — Selected work"
        title="A few systems worth talking about."
        subtitle="Case studies, not screenshots. Each project is a constraint translated into something usable."
      />

      <div className="space-y-px border-t border-border">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05}>
            <motion.article
              whileHover="hover"
              className="group relative grid md:grid-cols-12 gap-6 py-10 md:py-14 border-b border-border cursor-default"
            >
              <motion.div
                variants={{ hover: { opacity: 1 } }}
                initial={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-r from-primary/[0.04] to-transparent pointer-events-none"
              />

              <div className="md:col-span-2 font-mono text-xs text-muted-foreground">
                {p.year}
              </div>

              <div className="md:col-span-6 relative">
                <h3 className="text-2xl md:text-4xl font-semibold tracking-tight flex items-center gap-3">
                  {p.title}
                  <motion.span
                    variants={{ hover: { x: 4, y: -4, opacity: 1 } }}
                    initial={{ opacity: 0.4 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block text-primary"
                  >
                    <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
                  </motion.span>
                </h3>
                <p className="font-mono text-xs text-primary/80 mt-2">{p.role}</p>
                <p className="mt-4 text-muted-foreground leading-relaxed max-w-xl">
                  {p.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-muted-foreground">
                  {p.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </div>

              <div className="md:col-span-4 md:pl-6 md:border-l border-border space-y-4">
                {p.metrics.map((m) => (
                  <div key={m.k}>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
                      {m.k}
                    </div>
                    <div className="text-sm mt-1">{m.v}</div>
                  </div>
                ))}
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
