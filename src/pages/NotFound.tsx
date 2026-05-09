import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background relative">
      {/* Grid background */}
      <div className="absolute inset-0 grid-lines opacity-10" />

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-xs text-primary mb-6 tracking-[0.2em] uppercase">
            <span className="inline-block w-2 h-2 rounded-full bg-destructive mr-3" />
            Route not found
          </p>

          <h1
            className="text-7xl md:text-9xl font-bold tracking-tighter mb-6"
            style={{
              color: "transparent",
              WebkitTextStroke: "1.5px hsl(var(--primary))",
              textShadow: "0 0 30px hsl(var(--primary) / 0.2)",
            }}
          >
            404
          </h1>

          <p className="text-lg text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed">
            The page at <code className="font-mono text-xs text-primary/80 bg-muted px-2 py-1 rounded">{location.pathname}</code> doesn't exist.
          </p>

          <a
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-mono text-sm shadow-glow hover:shadow-[0_0_80px_hsl(var(--primary)/0.5)] transition-shadow rounded"
          >
            Return home
            <span aria-hidden>→</span>
          </a>
        </motion.div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-10 left-10 w-12 h-12 border-t border-l border-primary/20" />
      <div className="absolute top-10 right-10 w-12 h-12 border-t border-r border-primary/20" />
      <div className="absolute bottom-10 left-10 w-12 h-12 border-b border-l border-primary/20" />
      <div className="absolute bottom-10 right-10 w-12 h-12 border-b border-r border-primary/20" />
    </div>
  );
};

export default NotFound;
