import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { usePrefs } from "@/context/PrefsContext";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}

export const Reveal = ({ children, delay = 0, className, y = 24 }: RevealProps) => {
  const systemReduce = useReducedMotion();
  const { reducedMotion } = usePrefs();
  const reduce = systemReduce || reducedMotion;

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduce ? 0.2 : 0.7, ease: [0.22, 1, 0.36, 1], delay: reduce ? 0 : delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
