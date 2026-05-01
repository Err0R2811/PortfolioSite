import { motion } from "framer-motion";

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
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#" className="font-mono text-sm tracking-tight">
          <span className="text-primary">/</span>amit.virpara
        </a>
        <ul className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map((l, i) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="hover:text-foreground transition-colors duration-300 font-mono"
              >
                <span className="text-primary/60 mr-1">0{i + 1}.</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="mailto:amitvirpara@outlook.com"
          className="hidden md:inline-flex font-mono text-xs px-4 py-2 border border-border rounded-full hover:border-primary/60 hover:text-primary transition-all duration-300"
        >
          Get in touch
        </a>
      </nav>
    </motion.header>
  );
};
