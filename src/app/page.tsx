import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import About from "@/components/About";
import ProjetosAutorais from "@/components/ProjetosAutorais";
import WrestlingMindset from "@/components/WrestlingMindset";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col bg-black overflow-x-clip relative">
        {/* Starts with the fullscreen trophy hero section */}
        <Hero />
        
        {/* Giant typography statement (phrase) */}
        <Statement />
        
        {/* Seção 01 / Sobre Mim */}
        <About />

        {/* Seção 04 / Projetos Autorais */}
        <ProjetosAutorais />

        {/* Seção 05 / Mindset de Atleta */}
        <WrestlingMindset />
      </main>
    </>
  );
}
