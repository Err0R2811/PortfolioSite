import { ParticleField } from "@/components/ParticleField";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { Systems } from "@/components/Systems";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";

const Index = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <ParticleField />
      <Nav />
      <Hero />
      <Work />
      <Systems />
      <Skills />
      <Contact />
    </main>
  );
};

export default Index;
