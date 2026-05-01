import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { CaseStudyModal } from "./CaseStudyModal";
import { projects, allDomains, allStackTags, Project, Domain, StackTag } from "@/data/projects";

const FilterChip = ({
  active,
  onClick,
  children,
  ariaLabel,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  ariaLabel: string;
}) => (
  <button
    onClick={onClick}
    aria-pressed={active}
    aria-label={ariaLabel}
    className={`font-mono text-[11px] px-3 py-1.5 rounded-full border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
      active
        ? "border-primary text-primary bg-primary/10"
        : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
    }`}
  >
    {children}
  </button>
);

export const Work = () => {
  const [domain, setDomain] = useState<Domain | "All">("All");
  const [stackTag, setStackTag] = useState<StackTag | "All">("All");
  const [active, setActive] = useState<Project | null>(null);

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          (domain === "All" || p.domains.includes(domain)) &&
          (stackTag === "All" || p.stackTags.includes(stackTag))
      ),
    [domain, stackTag]
  );

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="px-6 md:px-10 max-w-6xl mx-auto py-32 md:py-40"
    >
      <div id="work-heading">
        <SectionHeader
          index="01 — Selected work"
          title="Six systems worth talking about."
          subtitle="Each project starts with a problem, not a stack. Click any case study to read the full breakdown."
        />
      </div>

      {/* Filters */}
      <Reveal>
        <div className="mb-12 space-y-4" role="group" aria-label="Project filters">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 mr-2">
              Domain
            </span>
            <FilterChip
              active={domain === "All"}
              onClick={() => setDomain("All")}
              ariaLabel="Show all domains"
            >
              All
            </FilterChip>
            {allDomains.map((d) => (
              <FilterChip
                key={d}
                active={domain === d}
                onClick={() => setDomain(d)}
                ariaLabel={`Filter by ${d}`}
              >
                {d}
              </FilterChip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 mr-2">
              Stack
            </span>
            <FilterChip
              active={stackTag === "All"}
              onClick={() => setStackTag("All")}
              ariaLabel="Show all stacks"
            >
              All
            </FilterChip>
            {allStackTags.map((t) => (
              <FilterChip
                key={t}
                active={stackTag === t}
                onClick={() => setStackTag(t)}
                ariaLabel={`Filter by ${t}`}
              >
                {t}
              </FilterChip>
            ))}
          </div>
          <p className="font-mono text-[10px] text-muted-foreground/60" aria-live="polite">
            {filtered.length} of {projects.length} projects
          </p>
        </div>
      </Reveal>

      <ul className="border-t border-border" role="list">
        {filtered.map((p, i) => (
          <Reveal key={p.id} delay={Math.min(i * 0.04, 0.2)}>
            <li>
              <motion.button
                whileHover="hover"
                onClick={() => setActive(p)}
                aria-label={`Open ${p.title} case study`}
                className="w-full text-left grid md:grid-cols-12 gap-6 py-8 md:py-10 border-b border-border relative cursor-pointer group focus-visible:outline-none focus-visible:bg-muted/30"
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
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-3">
                    {p.title}
                    <motion.span
                      variants={{ hover: { x: 4, y: -4 } }}
                      transition={{ duration: 0.3 }}
                      className="inline-block text-primary/70"
                      aria-hidden
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </motion.span>
                  </h3>
                  <p className="font-mono text-xs text-primary/80 mt-1.5">{p.role}</p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xl">
                    <span className="text-foreground/80">{p.solution}</span>
                  </p>

                  {/* Compact metrics row */}
                  <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                    {p.metrics.map((m) => (
                      <div key={m.label} className="flex items-baseline gap-1.5">
                        <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
                          {m.label}
                        </dt>
                        <dd className="font-mono text-[11px] text-foreground/90">{m.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="md:col-span-3 md:pl-6 md:border-l border-border flex md:flex-col gap-2 items-start">
                  {p.domains.map((d) => (
                    <span
                      key={d}
                      className="font-mono text-[10px] px-2 py-0.5 rounded border border-border text-muted-foreground"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </motion.button>
            </li>
          </Reveal>
        ))}
        {filtered.length === 0 && (
          <li className="py-16 text-center font-mono text-sm text-muted-foreground">
            No projects match these filters.
          </li>
        )}
      </ul>

      <CaseStudyModal project={active} onClose={() => setActive(null)} />
    </section>
  );
};
