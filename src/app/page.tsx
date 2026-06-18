import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import ProjetosAutorais from "@/components/ProjetosAutorais";
import About from "@/components/About";
import WrestlingMindset from "@/components/WrestlingMindset";
import Gallery from "@/components/Gallery";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col bg-black overflow-x-clip relative">
        {/* Starts with the fullscreen trophy hero section */}
        <Hero />
        
        {/* Giant typography statement (phrase) */}
        <Statement />
        
        {/* Cinematic Scroll-Triggered Reveal projects gallery */}
        <ProjetosAutorais />
        
        {/* Seção 01 / Sobre Mim */}
        <About />

        {/* Seção 05 / Mindset de Atleta */}
        <WrestlingMindset />

        {/* Cinematic horizontal gallery of moments */}
        <Gallery />
      </main>
    </>
  );
}
