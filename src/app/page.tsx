import Header from "@/components/Header";
import Hero from "@/components/Hero";
import KineticParallaxText from "@/components/KineticParallaxText";
import About from "@/components/About";
import HorizontalTimeline from "@/components/HorizontalTimeline";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import WrestlingMindset from "@/components/WrestlingMindset";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <KineticParallaxText />
        <About />
        <HorizontalTimeline />
        <TechStack />
        <Projects />
        <WrestlingMindset />
        <Contact />
      </main>
    </>
  );
}
