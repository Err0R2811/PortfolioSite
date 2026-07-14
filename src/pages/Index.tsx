import Particles from "@/components/Particles";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { Systems } from "@/components/Systems";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { SettingsControl } from "@/components/SettingsControl";

const Index = () => {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-full focus:bg-primary focus:text-primary-foreground focus:font-mono focus:text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-glow"
      >
        Skip to content
      </a>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <Particles
          particleColors={["#7dd3fc", "#c084fc", "#f472b6"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>
      <Nav />
      <main id="main" className="relative min-h-screen overflow-x-hidden">
        <Hero />
        <Work />
        <Systems />
        <Skills />
        <Contact />
      </main>
      <footer
        className="px-6 md:px-10 max-w-6xl mx-auto py-8 border-t border-border flex flex-col md:flex-row justify-between gap-4 font-mono text-[11px] text-muted-foreground"
        role="contentinfo"
      >
        <span>© {new Date().getFullYear()} Amit Virpara. Built quietly.</span>
        <span>Vadodara, Gujarat — IN</span>
      </footer>
      <SettingsControl />
    </>
  );
};

export default Index;
