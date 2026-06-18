import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col bg-black overflow-x-clip relative">
        {/* Starts with the fullscreen trophy hero section */}
        <Hero />
        
        {/* Cinematic horizontal gallery */}
        <Gallery />
      </main>
    </>
  );
}
