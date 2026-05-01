import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

type Project = {
  year: string;
  title: string;
  role: string;
  problem: string;
  solution: string;
  impact: string;
  stack: string[];
  systems: string[];
  architecture?: string;
  href?: string;
};

const projects: Project[] = [
  {
    year: "2025",
    title: "Acadence",
    role: "Attendance Intelligence System",
    problem:
      "Students and faculty track attendance manually — no visibility into minimum required, missed-lecture impact, or subject-wise risk.",
    solution:
      "A real-time platform that computes minimum attendance to pass each subject and surfaces subject-wise analytics for both roles.",
    impact: "Live in production at Parul Institute of Technology.",
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    systems: [
      "GSD-based prediction algorithm for minimum lectures required",
      "Real-time data flow via Supabase subscriptions",
      "Role-based access control (student / faculty)",
      "Edge-case handling: Infinity values, ε-guarded precision",
    ],
    architecture:
      "Next.js app router · Supabase Postgres with RLS · derived columns for attendance ratios · server actions for write paths",
    href: "https://acadence-pit.vercel.app/home",
  },
  {
    year: "2025",
    title: "WhatsApp Store Builder",
    role: "Multi-tenant SaaS",
    problem:
      "MSMEs take orders manually on WhatsApp — no catalogue, no automation, no scale.",
    solution:
      "A SaaS that lets any business run a full storefront inside WhatsApp: catalogue, chat-driven ordering, and payment links.",
    impact:
      "Targeting MSME businesses in Vadodara — recurring-revenue SaaS in build.",
    stack: ["Next.js", "Supabase", "WhatsApp Cloud API", "Razorpay"],
    systems: [
      "Multi-tenant architecture with isolated catalogues",
      "State machine for conversational order flow",
      "WhatsApp Cloud API integration for inbound + outbound",
      "Razorpay payment links generated per order",
    ],
    architecture:
      "Tenant-scoped Postgres schemas · webhook ingest → FSM → reply queue · per-tenant Razorpay key vault",
  },
  {
    year: "2025",
    title: "Pathly",
    role: "AI Learning System",
    problem:
      "Learners get stuck on where to start, how to structure time, and which resources to trust.",
    solution:
      "An AI pipeline that turns a vague goal into a modular, time-bound roadmap with curated external resources.",
    impact: "Moves AI from chat into a structured learning system.",
    stack: ["TypeScript", "LLM APIs", "YouTube Data API", "Supabase"],
    systems: [
      "Prompt-driven generation pipeline with structured output",
      "Module decomposition into time-boxed learning units",
      "External content integration (YouTube, docs)",
      "Persisted roadmaps with progress state",
    ],
    architecture:
      "Goal → planner LLM → module schema → resource enrichment → persisted roadmap",
  },
  {
    year: "2025",
    title: "Safarnama",
    role: "Travel Data System",
    problem:
      "Travelers juggle expenses, itineraries, and journey logs across disconnected tools.",
    solution:
      "A centralized cross-platform system for trip planning, expense tracking, and journey logging.",
    impact: "Demonstrates scalable product design across web and mobile.",
    stack: ["React", "Vite", "Supabase", "Capacitor"],
    systems: [
      "Relational schema for trips, legs, and expenses",
      "Cross-platform architecture (web + mobile via Capacitor)",
      "6-phase production-readiness plan: security, perf, testing, deploy",
      "Structured user data with integrity guarantees",
    ],
    architecture:
      "Single React codebase · Capacitor shell for iOS/Android · Supabase auth + storage · normalized trip/expense models",
  },
  {
    year: "2024",
    title: "Shivaali",
    role: "Client E-commerce Platform",
    problem:
      "Real client needed an online storefront and structured product presentation to go digital.",
    solution:
      "A responsive, production e-commerce site with clean browsing, product structure, and live deployment.",
    impact: "Live website serving real users for a real business.",
    stack: ["React", "TypeScript", "Vite"],
    systems: [
      "Production-ready frontend architecture",
      "Performance + responsiveness optimization",
      "Worked directly against real client requirements",
    ],
    architecture:
      "Static-first frontend · structured catalogue data · CDN-deployed on Vercel",
    href: "https://shivaali.vercel.app/",
  },
  {
    year: "2023",
    title: "Plant-Pal",
    role: "AI Plant Detection",
    problem:
      "Identifying plants requires expertise, manual search, and trust in unreliable results.",
    solution:
      "An ML pipeline that detects plant type from an image and surfaces contextual information.",
    impact: "Real-world ML integrated into a usable product surface.",
    stack: ["Python", "Streamlit", "Scikit-learn"],
    systems: [
      "Image preprocessing + inference pipeline",
      "Trained on 500+ samples",
      "ML output rendered into a user-facing dashboard",
    ],
    architecture:
      "Image upload → preprocessing → classifier → result + reference content",
  },
];

const ProjectRow = ({ p, i }: { p: Project; i: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={Math.min(i * 0.04, 0.2)}>
      <motion.article
        whileHover="hover"
        className="group relative border-b border-border"
      >
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full text-left grid md:grid-cols-12 gap-6 py-8 md:py-12 cursor-pointer"
          aria-expanded={open}
        >
          <motion.div
            variants={{ hover: { opacity: 1 } }}
            initial={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-r from-primary/[0.04] to-transparent pointer-events-none"
          />

          <div className="md:col-span-2 font-mono text-xs text-muted-foreground">
            {p.year}
          </div>

          <div className="md:col-span-7 relative">
            <h3 className="text-2xl md:text-4xl font-semibold tracking-tight flex items-center gap-3">
              {p.title}
              <motion.span
                variants={{ hover: { x: 4, y: -4 } }}
                transition={{ duration: 0.3 }}
                className="inline-block text-primary/70"
              >
                <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
              </motion.span>
            </h3>
            <p className="font-mono text-xs text-primary/80 mt-2">{p.role}</p>

            <dl className="mt-5 space-y-2 max-w-xl">
              <div className="flex gap-3">
                <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 w-20 shrink-0 mt-1">
                  Problem
                </dt>
                <dd className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                  {p.problem}
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 w-20 shrink-0 mt-1">
                  Solution
                </dt>
                <dd className="text-sm md:text-[15px] text-foreground/90 leading-relaxed">
                  {p.solution}
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="font-mono text-[10px] uppercase tracking-widest text-primary/80 w-20 shrink-0 mt-1">
                  Impact
                </dt>
                <dd className="text-sm md:text-[15px] text-foreground leading-relaxed">
                  {p.impact}
                </dd>
              </div>
            </dl>

            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-muted-foreground">
              {p.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>

          <div className="md:col-span-3 md:pl-6 md:border-l border-border flex md:flex-col items-start justify-between md:justify-start gap-4">
            <motion.div
              animate={{ rotate: open ? 45 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:border-primary/60 group-hover:text-primary transition-colors"
            >
              <Plus className="w-4 h-4" />
            </motion.div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
              {open ? "Hide details" : "System thinking"}
            </span>
          </div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="grid md:grid-cols-12 gap-6 pb-10 md:pb-14">
                <div className="md:col-start-3 md:col-span-7 space-y-6">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-3">
                      System thinking
                    </div>
                    <ul className="space-y-2">
                      {p.systems.map((s) => (
                        <li
                          key={s}
                          className="text-sm text-muted-foreground flex gap-3 leading-relaxed"
                        >
                          <span className="font-mono text-primary/60 mt-1">→</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {p.architecture && (
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-3">
                        Architecture
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed font-mono">
                        {p.architecture}
                      </p>
                    </div>
                  )}
                </div>
                <div className="md:col-span-3 md:pl-6 md:border-l border-border">
                  {p.href ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs text-primary hover:text-primary-glow transition-colors"
                    >
                      Visit live
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
                      Private build
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.article>
    </Reveal>
  );
};

export const Work = () => {
  return (
    <section id="work" className="px-6 md:px-10 max-w-6xl mx-auto py-32 md:py-40">
      <SectionHeader
        index="01 — Selected work"
        title="Six systems worth talking about."
        subtitle="Each project starts with a problem, not a stack. Click any case study to see the system thinking underneath."
      />

      <div className="border-t border-border">
        {projects.map((p, i) => (
          <ProjectRow key={p.title} p={p} i={i} />
        ))}
      </div>
    </section>
  );
};
