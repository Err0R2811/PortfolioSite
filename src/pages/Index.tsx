import { ParticleField } from "@/components/ParticleField";
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
      <ParticleField />
      <Nav />
      <main id="main" className="relative min-h-screen overflow-x-hidden">
        <Hero />
        <Work />
        <Systems />
        <Skills />
        <Contact />
      </main>
      <SettingsControl />
    </>
  );
};

export default Index;
