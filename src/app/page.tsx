import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import Trajetoria from "@/components/Trajetoria";
import Projects from "@/components/Projects";
import WrestlingMindset from "@/components/WrestlingMindset";
import ProjetosAutorais from "@/components/ProjetosAutorais";
import KineticParallaxText from "@/components/KineticParallaxText";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col bg-black overflow-x-clip">
        {/* Starts with the fullscreen trophy hero section */}
        <Hero />
        
        {/* Vertical GSAP timeline trajectories */}
        <Trajetoria />
        
        {/* Experience section (Market role and company history) */}
        <Projects />

        {/* Tech Stack containing skills & DevOps tools */}
        <TechStack />

        {/* Frosted glass wide projects cards (inspired by Hall of Fame) */}
        <ProjetosAutorais />

        {/* Wrestling vs Code comparison */}
        <WrestlingMindset />
        
        {/* Kinetic marquee scroll divider */}
        <KineticParallaxText />
        
        {/* Footer contact details */}
        <Contact />
      </main>
    </>
  );
}
