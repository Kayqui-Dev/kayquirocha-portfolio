"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  {
    year: "2019",
    age: "11 Anos",
    title: "O Primeiro Commit",
    desc: "Início autodidata na programação. Primeiros scripts, lógica, HTML/CSS e a descoberta de uma paixão inabalável.",
  },
  {
    year: "2023",
    age: "15 Anos",
    title: "Automação & Freelancing",
    desc: "Desenvolvimento freelancer de scripts em Python, web scraping, gerenciamento de VPS e primeiras integrações de APIs.",
  },
  {
    year: "2024 — 2025",
    age: "17 Anos",
    title: "Fundação da Kodava & Luta Olímpica",
    desc: "Criação da Kodava Solutions. Integrações avançadas de inteligência artificial generativa e automação de fluxos corporativos. Conquista de medalhas e pódio no Wrestling paulista (CBW).",
  },
  {
    year: "2026",
    age: "18 Anos",
    title: "Alta Performance & NTG",
    desc: "Engenheiro Full-Stack na VTP. Cursando ADS na FMU e sob intenso regime de treinamento no National Training Group (Wrestling).",
  },
];

export default function Trajetoria() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el) => {
        if (!el) return;
        
        // GSAP fromTo ScrollTrigger animation
        gsap.fromTo(
          el,
          { opacity: 0, y: 55 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              end: "top 55%",
              scrub: false,
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="trajetoria" ref={containerRef} className="py-32 md:py-48 border-t border-white/[0.05] bg-black relative">
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Title & Info */}
        <div className="lg:col-span-4 flex flex-col gap-4 select-none">
          <span className="section-tag">01.2 / Trajetória</span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-white uppercase font-sans">
            LINHA DO TEMPO
          </h2>
          <div className="w-16 h-[2px] bg-[#00A3FF]"></div>
          <p className="text-zinc-500 text-xs max-w-xs leading-relaxed font-mono">
            A jornada de evolução técnica e conquistas esportivas de alto rendimento.
          </p>
        </div>

        {/* Right Column: Vertical Timeline List */}
        <div className="lg:col-span-8 relative border-l border-white/10 pl-8 sm:pl-16 ml-4 flex flex-col gap-16 sm:gap-24 py-4">
          {MILESTONES.map((item, idx) => (
            <div
              key={idx}
              ref={(el) => {
                if (el) itemsRef.current[idx] = el;
              }}
              className="relative flex flex-col gap-3 group select-none"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute left-[-37px] sm:left-[-69px] top-6 w-2.5 h-2.5 rounded-full bg-[#00A3FF] border-2 border-black shadow-[0_0_8px_rgba(0,163,255,0.7)] group-hover:scale-125 transition-transform duration-300" />
              
              {/* Year & Age Group (Serif & Mono contrast) */}
              <div className="flex items-baseline gap-4">
                <span className="text-5xl sm:text-7xl font-serif font-black tracking-tighter text-[#00A3FF]/20 leading-none group-hover:text-[#00A3FF]/40 transition-colors duration-500">
                  {item.year}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase px-2 py-0.5 rounded-sm bg-white/[0.02] border border-white/[0.05]">
                  {item.age}
                </span>
              </div>

              {/* Title (Giant Serif) */}
              <h3 className="text-xl sm:text-3xl font-serif text-white tracking-tight uppercase leading-none font-bold group-hover:text-[#00A3FF] transition-colors duration-300">
                {item.title}
              </h3>

              {/* Description (Small Mono) */}
              <p className="text-xs sm:text-sm font-mono text-zinc-400 leading-relaxed max-w-xl">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
