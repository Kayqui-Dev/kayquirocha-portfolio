"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BackgroundContours from "./BackgroundContours";

gsap.registerPlugin(ScrollTrigger);

const GALLERY_PROJECTS = [
  {
    title: "Centurion Scout",
    type: "Performance & Combate",
    year: "2025",
    image: "/centurion_scout.png",
    offsetClass: "-translate-y-16"
  },
  {
    title: "Decide Aí Vida",
    type: "Inteligência Artificial",
    year: "2024",
    image: "/decide_ai_vida.png",
    offsetClass: "translate-y-16"
  },
  {
    title: "Centurion Fight Shop",
    type: "E-commerce & Analytics",
    year: "2025",
    image: "/centurion_fight_shop.png",
    offsetClass: "-translate-y-10"
  },
  {
    title: "VTPDirect Dashboard",
    type: "Painel Operacional",
    year: "2024",
    image: "/vtpdirect_dashboard.png",
    offsetClass: "translate-y-10"
  },
  {
    title: "Esporte NTG",
    type: "Portal de Performance",
    year: "2025",
    image: "/esportentg.png",
    offsetClass: "-translate-y-16"
  },
  {
    title: "Capril Sparta",
    type: "Agronegócio & Design",
    year: "2024",
    image: "/caprilsparta.png",
    offsetClass: "translate-y-16"
  },
  {
    title: "Emporio Glass",
    type: "Arquitetura & E-commerce",
    year: "2025",
    image: "/emporioglass.png",
    offsetClass: "-translate-y-10"
  },
  {
    title: "Açai Puro Landing",
    type: "Alimentação & Marketing",
    year: "2024",
    image: "/hero_acai.png",
    offsetClass: "translate-y-10"
  },
  {
    title: "Açai Puro Store",
    type: "Alimentação & E-commerce",
    year: "2024",
    image: "/store_acai.png",
    offsetClass: "-translate-y-16"
  },
  {
    title: "Açai Puro Self-Service",
    type: "Sistemas & Automação",
    year: "2024",
    image: "/selfservice_acai.png",
    offsetClass: "translate-y-16"
  },
  {
    title: "Love Kodava App",
    type: "Rede Social & Conexões",
    year: "2024",
    image: "/love_kodava_home.png",
    offsetClass: "-translate-y-10"
  },
  {
    title: "Love Kodava Proposal",
    type: "Customização & Interface",
    year: "2024",
    image: "/love_kodava_proposal.png",
    offsetClass: "translate-y-10"
  },
  {
    title: "Love Kodava Customize",
    type: "Interações de Usuário",
    year: "2024",
    image: "/love_kodava_customize.png",
    offsetClass: "-translate-y-16"
  },
  {
    title: "Love Kodava Gift",
    type: "Social & Entregas",
    year: "2024",
    image: "/love_kodava_gift.png",
    offsetClass: "translate-y-16"
  }
];

export default function ProjectGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trayRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    const tray = trayRef.current;
    const container = containerRef.current;
    if (!container || !tray || cards.length === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${tray.scrollWidth - window.innerWidth}`,
          scrub: 1, // Synced with Lenis
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      // Horizontal translation of the tray
      tl.to(tray, {
        x: () => -(tray.scrollWidth - window.innerWidth),
        ease: "none",
      });

      // Staggered fade and pop-up animation for cards
      tl.fromTo(
        cards,
        {
          scale: 0.85,
          opacity: 0,
          y: 40,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 1.2,
          ease: "power2.out",
        },
        0.1
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="project-gallery"
      ref={containerRef}
      className="relative w-full h-screen bg-[radial-gradient(circle_at_center,rgba(0,18,36,0.2)_0%,rgba(0,0,0,1)_85%)] flex flex-col justify-between py-16 overflow-hidden select-none border-t border-white/[0.03]"
    >
      {/* Premium Topographic Contour Lines Background */}
      <BackgroundContours />

      {/* Top Section Tag */}
      <div className="w-full px-6 sm:px-12 md:px-24 flex justify-between items-start z-30 pointer-events-none">
        <div className="flex flex-col gap-2">
          <span className="section-tag text-[10px] font-mono tracking-widest text-[#00A3FF] uppercase font-bold">
            01 / Galeria de Projetos
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-white uppercase font-sans">
            GALERIA DE PROJETOS
          </h2>
          <div className="w-16 h-[2px] bg-[#00A3FF]"></div>
        </div>
      </div>

      {/* Center Section: Staggered Collage Tray */}
      <div className="relative flex-1 w-full h-[70vh] flex items-center overflow-visible">
        <div
          ref={trayRef}
          className="flex flex-nowrap h-full items-center pl-[10vw] pr-[20vw] gap-[8vw]"
          style={{ width: "max-content" }}
        >
          {GALLERY_PROJECTS.map((proj, idx) => (
            <div
              key={idx}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              style={{ opacity: 0 }}
              className={`w-[260px] h-[340px] md:w-[320px] md:h-[420px] flex-shrink-0 bg-[rgba(10,12,16,0.3)] backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-end p-6 group shadow-2xl transition-all duration-500 hover:border-[#00A3FF]/40 hover:shadow-[0_20px_50px_rgba(0,163,255,0.08)] ${proj.offsetClass}`}
            >
              {/* Image filling background */}
              <div className="absolute inset-0 w-full h-full -z-10 bg-black">
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  sizes="(max-width: 768px) 260px, 320px"
                  className="object-cover filter brightness-[0.75] contrast-[1.05] group-hover:scale-102 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              </div>

              {/* Metadata (Monospace small) */}
              <div className="flex justify-between items-center mb-auto z-10">
                <span className="text-[9px] font-mono tracking-widest text-[#00A3FF] uppercase font-bold">
                  {proj.type}
                </span>
                <span className="text-[9px] font-mono text-zinc-500 uppercase px-1.5 py-0.5 rounded-sm bg-white/[0.02] border border-white/[0.05]">
                  {proj.year}
                </span>
              </div>

              {/* Project Title (Serif giant font) */}
              <div className="flex flex-col gap-2 mt-4 z-10">
                <h4 className="text-xl sm:text-2xl md:text-3xl font-serif text-white uppercase leading-tight font-bold group-hover:text-[#00A3FF] transition-colors duration-300">
                  {proj.title}
                </h4>
              </div>
            </div>
          ))}

          {/* Staggered Quote & Signature at the end (Lando Norris style) */}
          <div className="w-[320px] sm:w-[420px] flex-shrink-0 flex flex-col gap-6 p-6 sm:p-8 translate-y-4">
            <p className="font-serif text-lg sm:text-xl md:text-2xl text-zinc-300 leading-relaxed uppercase">
              "Desde a primeira linha de código, dedico cada segundo a projetar arquiteturas implacáveis que redefinem o jogo."
            </p>
            {/* Signature SVG */}
            <div className="text-zinc-500 select-none">
              <svg
                viewBox="0 0 200 80"
                className="w-40 h-16 filter drop-shadow-[0_2px_6px_rgba(0,163,255,0.15)]"
                stroke="#00A3FF"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 50 Q45 25 70 30 T120 40 T150 20 T180 50" />
                <path d="M50 20 C60 10, 80 15, 75 45 C70 65, 45 60, 65 30 C85 0, 115 10, 105 40 T145 60" />
                <path d="M125 45 L155 45" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Footer line details */}
      <div className="w-full px-6 sm:px-12 md:px-24 flex justify-between items-end select-none text-[8px] font-mono text-zinc-600 uppercase tracking-widest z-30">
        <span>Kodava Solutions Systems</span>
        <span>© 2026</span>
      </div>
    </section>
  );
}
