import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

const principles = [
  {
    n: "01",
    title: "Constraints first",
    body: "Edge cases — timeouts, empty responses, null states, rate limits — are the product. I design from the failure modes inward, not the happy path outward.",
  },
  {
    n: "02",
    title: "Systems thinking",
    body: "A query, a container, a packet, an API call — they're the same problem wearing different clothes. I trace the path end to end instead of staring at whichever layer broke.",
  },
  {
    n: "03",
    title: "Boring infrastructure",
    body: "Postgres, REST, plain containers, standard protocols. Boring scales and is easy to secure. Novelty is reserved for the actual problem — not for glue code.",
  },
  {
    n: "04",
    title: "Calm interfaces",
    body: "Motion is intentional. Color is restrained. Whether it's a dashboard, an API response, or a page — the user's attention and the network's bandwidth are both expensive. I don't spend either carelessly.",
  },
];

export const Systems = () => (
  <section id="systems" aria-labelledby="systems-heading" className="px-6 md:px-10 max-w-6xl mx-auto py-32 md:py-40">
    <SectionHeader
      index="02 — Systems thinking"
      title="How I make decisions."
      subtitle="The principles underneath the projects. Stable enough to outlast a stack."
    />
    <div className="grid md:grid-cols-2 gap-px bg-border rounded-xl overflow-hidden">
      {principles.map((p, i) => (
        <Reveal key={p.n} delay={i * 0.06}>
          <div className="bg-background p-8 md:p-10 h-full hover:bg-muted/40 transition-colors duration-500 group cursor-default">
            <div className="font-mono text-xs text-primary mb-6 transition-colors duration-500 group-hover:text-primary">
              {p.n}
            </div>
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
