import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjetosAutorais from "@/components/ProjetosAutorais";
import Gallery from "@/components/Gallery";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col bg-black overflow-x-clip relative">
        {/* Starts with the fullscreen trophy hero section */}
        <Hero />
        
        {/* Cinematic Scroll-Triggered Reveal projects gallery */}
        <ProjetosAutorais />
        
        {/* Cinematic horizontal gallery */}
        <Gallery />
      </main>
    </>
  );
}
