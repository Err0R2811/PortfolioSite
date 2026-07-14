import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ResumeButton } from "./ResumeButton";
import { AVMonogram } from "./AVMonogram";
import GooeyNav from "./GooeyNav";

const links = [
  { href: "#work", label: "Work" },
  { href: "#systems", label: "Systems" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export const Nav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 glass-panel border-x-0 border-t-0"
      role="banner"
    >
      <nav
        ref={navRef}
        className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between"
        aria-label="Primary"
      >
        <a
          href="#"
          className="font-semibold text-sm tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary flex items-center gap-2 text-foreground rounded"
          aria-label="Amit Virpara — home"
        >
          <AVMonogram className="w-7 h-7 text-primary" />
          Amit Virpara
        </a>

        {/* Desktop nav */}
        <div className="hidden md:block">
          <GooeyNav
            items={links}
            particleCount={15}
            particleDistances={[90, 10]}
            particleR={100}
            initialActiveIndex={0}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        </div>
        <div className="hidden md:block">
          <ResumeButton variant="ghost" />
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="md:hidden w-11 h-11 flex items-center justify-center rounded-md hover:bg-muted/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-border"
          >
            <ul className="px-6 py-4 space-y-1" role="list">
              {links.map((l, i) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 py-3 px-3 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <span className="text-primary/60 text-xs" aria-hidden>
                      0{i + 1}.
                    </span>
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-2 border-t border-border">
                <ResumeButton variant="ghost" />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
