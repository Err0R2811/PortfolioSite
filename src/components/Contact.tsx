import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { IndiaMap } from "./IndiaMap";

const links = [
  { label: "Email", value: "amitvirpara@outlook.com", href: "mailto:amitvirpara@outlook.com" },
  { label: "GitHub", value: "Err0R2811", href: "https://github.com/Err0R2811" },
  { label: "LinkedIn", value: "amit-virpara", href: "https://www.linkedin.com/in/amit-virpara-a803b62b2?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
  { label: "Phone", value: "+91 63539 30421", href: "tel:+916353930421" },
];

export const Contact = () => (
  <section id="contact" aria-labelledby="contact-heading" className="px-6 md:px-10 max-w-6xl mx-auto py-32 md:py-40">
    <Reveal>
      <div className="flex items-center gap-4 mb-8">
        <span className="font-mono text-xs text-primary">04 — Contact</span>
        <span className="h-px flex-1 bg-border max-w-[120px]" />
      </div>
    </Reveal>

    <Reveal delay={0.05}>
      <h2 className="text-4xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.02] text-gradient max-w-4xl">
        Have a problem<br />worth solving?
      </h2>
    </Reveal>

    <Reveal delay={0.15}>
      <p className="mt-8 max-w-lg text-muted-foreground">
        I'm targeting AI engineering roles at early-stage product companies.
        Open to consulting, contracting, and the occasional weird side project.
      </p>
    </Reveal>

    <Reveal delay={0.25}>
      <motion.a
        href="mailto:amitvirpara@outlook.com"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-12 inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-mono text-sm shadow-glow hover:shadow-[0_0_80px_hsl(var(--primary)/0.5)] transition-shadow"
      >
        Start a conversation
        <span aria-hidden>→</span>
      </motion.a>
    </Reveal>

    <Reveal delay={0.3}>
      <div className="mt-24 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <div className="font-mono text-xs text-primary mb-4 tracking-widest uppercase">
            <span className="inline-block w-2 h-2 rounded-full bg-primary mr-3 animate-pulse" />
            Based in India
          </div>
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            Working from Vadodara,<br />shipping worldwide.
          </h3>
          <p className="text-muted-foreground text-sm md:text-base max-w-md leading-relaxed">
            IST (UTC+5:30). Comfortable across overlapping windows with EU and
            US timezones. Async-first, deep-work biased.
          </p>
        </div>
        <IndiaMap />
      </div>
    </Reveal>

    <Reveal delay={0.35}>
      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="bg-background p-6 hover:bg-muted/40 transition-colors group"
          >
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
              {l.label}
            </div>
            <div className="text-sm group-hover:text-primary transition-colors break-all">
              {l.value}
            </div>
          </a>
        ))}
      </div>
    </Reveal>

    <footer className="mt-24 pt-8 border-t border-border flex flex-col md:flex-row justify-between gap-4 font-mono text-[11px] text-muted-foreground">
      <span>© 2026 Amit Virpara. Built quietly.</span>
      <span>Vadodara, Gujarat — IN</span>
    </footer>
  </section>
);
