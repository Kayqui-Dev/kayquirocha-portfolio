import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import KineticParallaxText from "@/components/KineticParallaxText";
import WrestlingMindset from "@/components/WrestlingMindset";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col bg-black overflow-x-clip">
        {/* Starts with the fullscreen trophy hero section */}
        <Hero />
        
        {/* Tech Stack containing skills & DevOps tools */}
        <TechStack />
        
        {/* Projects showcase and dynamic specs modal */}
        <Projects />
        
        {/* Kinetic marquee scroll divider */}
        <KineticParallaxText />
        
        {/* Wrestling vs Code comparison */}
        <WrestlingMindset />
        
        {/* Footer contact details */}
        <Contact />
      </main>
    </>
  );
}
