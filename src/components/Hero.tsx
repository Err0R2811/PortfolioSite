import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { ResumeButton } from "./ResumeButton";
import TiltedCard from "./TiltedCard";
import GradientText from "./GradientText";
import Shuffle from "./Shuffle";
import { useEffect, useState } from "react";

const ease = [0.22, 1, 0.36, 1];

const roles = [
  "AI Engineering roles",
  "AI Backend Engineer roles",
  "Software Engineering roles",
  "Backend Developer roles",
  "Cloud Engineer roles",
  "Data Analyst roles",
  "Data Scientist roles"
];

export const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 max-w-6xl mx-auto pt-32 pb-20"
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.1 }}
        className="font-mono text-[11px] text-primary mb-10 tracking-[0.2em] uppercase flex items-center"
      >
        <span className="inline-block w-2 h-2 rounded-full bg-primary mr-3 animate-pulse" />
        Available for{' '}
        <span style={{ minWidth: '200px', display: 'inline-block', marginLeft: '0.5em' }}>
          <Shuffle
            key={roles[index]}
            text={roles[index]}
            shuffleDirection="right"
            duration={0.35}
            animationMode="evenodd"
            shuffleTimes={2}
            stagger={0.03}
            ease="power3.out"
            threshold={0.1}
            triggerOnce={false}
            triggerOnHover={true}
            respectReducedMotion={true}
            scrambleCharset="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            colorFrom="#7dd3fc"
            colorTo="#ffffff"
            tag="span"
            className="inline-block"
            style={{ fontSize: '0.6875rem', fontFamily: 'inherit' }}
          />
        </span>
      </motion.p>

      <motion.div
        id="hero-heading"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.2 }}
        className="max-w-5xl"
      >
        <GradientText
          colors={["#7dd3fc", "#c084fc", "#f472b6", "#7dd3fc"]}
          animationSpeed={5}
          showBorder={false}
          className="text-4xl md:text-6xl font-semibold tracking-tight"
        >
          Building calm software for noisy problems.
        </GradientText>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.5 }}
        className="mt-12 flex flex-col md:flex-row items-center gap-10 md:gap-16"
      >
        <div className="relative shrink-0">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease, delay: 0.6 }}
            className="absolute -inset-4 border border-primary/20 pointer-events-none transition-colors duration-500 rounded-none"
          />
          <TiltedCard
            imageSrc="/images/profile.jpeg"
            altText="Amit Virpara, software and AI developer based in Vadodara, India"
            containerHeight="192px"
            containerWidth="192px"
            imageHeight="192px"
            imageWidth="192px"
            scaleOnHover={1.05}
            rotateAmplitude={12}
            showMobileWarning={false}
            showTooltip={false}
            className="w-48 h-48 md:w-64 md:h-64"
          />
        </div>
        <p className="text-base md:text-xl text-muted-foreground leading-relaxed max-w-xl">
          <span className="text-foreground font-semibold">Amit Virpara</span> — software & AI developer focused on data systems,
          full-stack platforms, and the boring infrastructure that makes
          intelligent products feel inevitable.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease, delay: 0.8 }}
        className="mt-14 flex flex-wrap items-center gap-6"
      >
        <a
          href="#work"
          className="group inline-flex items-center gap-2 text-sm font-mono text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded"
        >
          <span className="border-b border-foreground/40 group-hover:border-primary pb-1 transition-colors">
            Selected work
          </span>
          <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" aria-hidden />
        </a>
        <ResumeButton />
        <a
          href="https://github.com/Err0R2811"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded"
        >
          github ↗
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-6 md:left-10 font-mono text-[10px] text-muted-foreground/60 tracking-widest"
      >
        VADODARA · IN — 22.31°N 73.18°E
      </motion.div>
    </section>
  );
};
