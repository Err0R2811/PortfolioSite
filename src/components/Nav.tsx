import { motion } from "framer-motion";
import { ResumeButton } from "./ResumeButton";

const links = [
  { href: "#work", label: "Work" },
  { href: "#systems", label: "Systems" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export const Nav = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/40 border-b border-border/50"
      role="banner"
    >
      <nav
        className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between"
        aria-label="Primary"
      >
        <a
          href="#"
          className="font-semibold text-sm tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          aria-label="Amit Virpara — home"
        >
          Amit Virpara
        </a>
        <ul className="hidden md:flex items-center gap-8 text-sm text-muted-foreground" role="list">
          {links.map((l, i) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="hover:text-foreground transition-colors duration-300 font-mono focus-visible:outline-none focus-visible:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded"
              >
                <span className="text-primary/60 mr-1" aria-hidden>
                  0{i + 1}.
                </span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden md:block">
          <ResumeButton variant="ghost" />
        </div>
      </nav>
    </motion.header>
  );
};
