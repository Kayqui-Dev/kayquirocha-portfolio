"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const MILESTONES = [
  {
    year: "2019",
    age: "11 Anos",
    title: "O Primeiro Código",
    desc: "Início autodidata na programação. Primeiros scripts, lógica, HTML/CSS e a descoberta de uma paixão inabalável.",
    image: "/kayqui_developer.jpg",
  },
  {
    year: "2023",
    age: "15 Anos",
    title: "Freelancing & Automação",
    desc: "Desenvolvimento freelancer de scripts em Python, web scraping, gerenciamento de VPS e primeiras integrações de APIs.",
    image: "/kayqui_developer.jpg",
  },
  {
    year: "2024",
    age: "17 Anos",
    title: "Fundação da Kodava",
    desc: "Criação da Kodava Solutions. Integrações avançadas de inteligência artificial generativa e automação de fluxos corporativos.",
    image: "/kayqui_trophy.jpg",
  },
  {
    year: "2025",
    age: "17 Anos",
    title: "Vice-Campeão Paulista (CBW)",
    desc: "Conquista do 2º Lugar na Luta Livre Olímpica (Wrestling) no Centro Olímpico, validando o trabalho duro de alta performance.",
    image: "/kayqui_trophy.jpg",
  },
  {
    year: "2026",
    age: "18 Anos",
    title: "NTG & Full-Stack VTP",
    desc: "Engenheiro Full-Stack na VTP. Cursando ADS na FMU e sob intenso regime de treinamento no National Training Group (Wrestling).",
    image: "/kayqui_wrestler.png",
  },
];

export default function HorizontalTimeline() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Track vertical scroll progress of this timeline section
  const { scrollYProgress } = useScroll({
    target: scrollRef,
  });

  // Transform scroll progress to horizontal translation (from 0% to -70%)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-68%"]);

  return (
    <div ref={scrollRef} className="relative h-[250vh] bg-black">
      {/* Sticky Inner Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-24 bg-black">
        
        {/* Gallery Header */}
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 md:px-16 flex flex-col gap-2 z-10 select-none">
          <span className="section-tag">02 / Linha do Tempo</span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-white uppercase font-sans">
            PROGRESSÃO E CONQUISTAS
          </h2>
          <div className="w-16 h-[2px] bg-accent-lime mt-1"></div>
        </div>

        {/* Horizontal Tray Container */}
        <div className="relative w-full flex-1 flex items-center">
          <motion.div
            style={{ x }}
            className="flex gap-6 pl-6 sm:pl-12 md:pl-24 pr-24"
          >
            {MILESTONES.map((item, idx) => (
              <div
                key={idx}
                className="w-[280px] sm:w-[420px] aspect-[3/4] sm:aspect-[1.4] relative rounded-sm overflow-hidden flex flex-col justify-end p-6 border border-white/5 bg-zinc-950/60 select-none group"
              >
                {/* Background Image with grayscale exposure */}
                <div className="absolute inset-0 w-full h-full -z-10 bg-black">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 280px, 420px"
                    className="object-cover filter grayscale contrast-[1.15] brightness-[0.25] group-hover:scale-105 group-hover:brightness-[0.35] transition-all duration-700 ease-out"
                  />
                  {/* Dark bottom gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                </div>

                {/* Milestone Metadata */}
                <div className="flex items-center justify-between mb-4 z-10">
                  <span className="font-mono text-xs text-accent-lime font-bold">
                    {item.year}
                  </span>
                  <span className="text-[8px] font-mono tracking-widest text-zinc-500 uppercase px-1.5 py-0.5 rounded-sm bg-white/[0.02] border border-white/[0.05]">
                    {item.age}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-2xl font-serif text-white tracking-tight uppercase leading-none mb-3 font-bold group-hover:text-accent-lime transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Desc */}
                <p className="text-xs text-zinc-400 leading-relaxed font-sans max-w-sm">
                  {item.desc}
                </p>

                {/* Grid Overlay Line */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-zinc-900 group-hover:bg-accent-lime transition-colors duration-500"></div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom indicator */}
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 md:px-16 flex items-center justify-between z-10 text-[9px] font-mono text-zinc-600 uppercase select-none">
          <span>Kodava Solutions & Wrestling Achievements</span>
          <div className="flex items-center gap-2">
            <span>Rolar para avançar</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-ping"></span>
          </div>
        </div>

      </div>
    </div>
  );
}
