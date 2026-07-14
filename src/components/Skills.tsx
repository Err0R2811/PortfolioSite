import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

const groups = [
  {
    label: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "SQL"],
  },
  {
    label: "AI · Data",
    items: ["Pandas", "NumPy", "Matplotlib", "EDA", "ML", "Statistics"],
  },
  {
    label: "Frameworks",
    items: ["React", "Next.js", "FastAPI", "Streamlit", "Supabase"],
  },
  {
    label: "Cloud · Infra",
    items: ["AWS", "Azure", "GCP", "Docker", "Git", "TCP/IP"],
  },
];

const certs = [
  "AWS Academy Graduate: Cloud Foundations — AWS",
  "CCNA: Introduction to Networks — Cisco",
  "CCNA: Switching, Routing & Wireless Essentials — Cisco",
  "CCNA: Enterprise Networking, Security, and Automation — Cisco",
  "Artificial Intelligence Fundamentals — IBM SkillsBuild",
  "Applied Data Science with Python — IBM",
  "Data Visualization with Python — Cognitive Class",
  "Foundations: Data, Data, Everywhere — Google",
];

export const Skills = () => (
  <section id="skills" aria-labelledby="skills-heading" className="px-6 md:px-10 max-w-6xl mx-auto py-32 md:py-40">
    <SectionHeader
      index="03 — Toolkit"
      title="Tools I reach for."
      subtitle="Grouped by intent, not hype."
    />

    <div className="grid md:grid-cols-2 gap-12 md:gap-20">
      <div className="space-y-10">
        {groups.map((g, i) => (
          <Reveal key={g.label} delay={i * 0.05}>
            <div>
              <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-border">
                <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
                  {g.label}
                </span>
                <span className="font-mono text-xs text-primary/70">
                  0{g.items.length}
                </span>
              </div>
              <ul className="flex flex-wrap gap-3">
                {g.items.map((it) => (
                  <li key={it}>
                    <span className="inline-block px-4 py-2 border border-border rounded-md bg-muted/20 text-foreground/90 text-sm md:text-base transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-primary/10 hover:text-primary cursor-default hover:shadow-lg">
                      {it}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="md:pl-10 md:border-l border-border">
          <div className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-6">
            Certifications
          </div>
          <ul className="flex flex-wrap gap-3">
            {certs.map((c) => (
              <li key={c}>
                <span className="inline-block px-4 py-2 border border-border rounded-md bg-muted/20 text-foreground/90 text-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-primary/10 hover:text-primary cursor-default hover:shadow-lg">
                  {c}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-12 p-6 border border-border rounded-md bg-muted/20">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
              Currently
            </div>
            <p className="text-sm leading-relaxed">
              Integrated B.Tech, Computer Science — Parul University.
              <span className="text-muted-foreground"> CGPA 8.52 / 10.</span>
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);
