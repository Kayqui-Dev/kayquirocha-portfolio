"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import About from "@/components/About";
import ProjectGallery from "@/components/ProjectGallery";
import TechStack from "@/components/TechStack";
import WrestlingMindset from "@/components/WrestlingMindset";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const globalWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = globalWrapperRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      // 1. Transition to LIGHT mode when entering ProjectGallery
      gsap.to([wrapper, "#project-gallery"], {
        backgroundColor: "#E3E2DC", // Premium cream tone
        color: "#1C1C1C", // Dark text
        scrollTrigger: {
          trigger: "#project-gallery",
          start: "top center",
          end: "top top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // 2. Transition back to DARK mode when leaving ProjectGallery into TechStack
      gsap.to([wrapper, "#project-gallery"], {
        backgroundColor: "#000000", // Back to deep dark
        color: "#f4f4f5", // Light text
        scrollTrigger: {
          trigger: "#project-gallery",
          start: "bottom center",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Header />
      <main
        ref={globalWrapperRef}
        id="global-wrapper"
        className="flex-1 flex flex-col bg-black text-[#f4f4f5] relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
      >
        {/* Starts with the fullscreen trophy hero section */}
        <Hero />
        
        {/* Giant typography statement (phrase) */}
        <Statement />
        
        {/* Seção 01 / Sobre Mim */}
        <About />
        
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
