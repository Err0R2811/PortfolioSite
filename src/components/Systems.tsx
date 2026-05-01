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
    <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
      {principles.map((p, i) => (
        <Reveal key={p.n} delay={i * 0.06}>
          <div className="bg-background p-8 md:p-10 h-full hover:bg-muted/40 transition-colors duration-500">
            <div className="font-mono text-xs text-primary mb-6">{p.n}</div>
            <h3 className="text-xl md:text-2xl font-semibold mb-3 tracking-tight">
              {p.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              {p.body}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);
