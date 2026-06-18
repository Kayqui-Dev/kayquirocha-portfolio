import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import ProjectGallery from "@/components/ProjectGallery";
import TechStack from "@/components/TechStack";
import WrestlingMindset from "@/components/WrestlingMindset";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col bg-black relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        {/* Starts with the fullscreen trophy hero section */}
        <Hero />
        
        {/* Giant typography statement (phrase) */}
        <Statement />
        
        {/* Seção 01 / Galeria de Projetos */}
        <ProjectGallery />

        {/* Seção 02 / Arsenal Tecnológico */}
        <TechStack />

        {/* Seção 05 / Mindset de Atleta */}
        <WrestlingMindset />
      </main>
      
      {/* Sticky Footer Reveal (reveals from behind main container) */}
      <Footer />
    </>
  );
}
