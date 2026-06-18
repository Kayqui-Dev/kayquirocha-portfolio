"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BackgroundContours from "./BackgroundContours";

gsap.registerPlugin(ScrollTrigger);

const MOMENTS = [
  {
    location: "SÃO PAULO",
    year: "2019",
    title: "O Primeiro Código",
    image: "/kayqui_developer.jpg",
    offsetClass: "-translate-y-16",
  },
  {
    location: "ARACAJU",
    year: "2025",
    title: "Bronze no Brasileiro",
    image: "/kayqui_trophy.jpg",
    offsetClass: "translate-y-16",
  },
  {
    location: "SÃO PAULO",
    year: "2025",
    title: "Vice-Campeão Paulista",
    image: "/kayqui_wrestler.png",
    offsetClass: "-translate-y-10",
  },
  {
    location: "SÃO PAULO",
    year: "2026",
    title: "Full-Stack na VTP",
    image: "/kayqui_developer.png",
    offsetClass: "translate-y-10",
  },
];

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trayRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    const tray = trayRef.current;
    const container = containerRef.current;
    if (!container || !tray) return;

    const ctx = gsap.context(() => {
      const scrollWidth = tray.scrollWidth;
      const windowWidth = window.innerWidth;
      const totalScroll = scrollWidth - windowWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: 1, // Synced with Lenis.js
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      // Horizontal translation of the collage tray
      tl.to(tray, {
        x: -totalScroll,
        ease: "none",
      });

      // Staggered fade and pop-up animation for moments cards
      tl.fromTo(
        cards,
        {
          scale: 0.8,
          opacity: 0,
          y: 60,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 1.5,
          ease: "power2.out",
        },
        0.1
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="relative w-full h-screen bg-[radial-gradient(circle_at_center,rgba(0,18,36,0.2)_0%,rgba(0,0,0,1)_85%)] flex flex-col justify-between py-16 overflow-hidden select-none border-t border-white/[0.03]"
    >
      {/* Premium Topographic Contour Lines Background */}
      <BackgroundContours />

      {/* Top Section Tag */}
      <div className="w-full px-6 sm:px-12 md:px-24 flex justify-between items-start z-30 pointer-events-none">
        <div className="flex flex-col gap-2">
          <span className="section-tag text-[10px] font-mono tracking-widest text-[#00A3FF] uppercase font-bold">
            05 / Galeria de Momentos
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-white uppercase font-sans">
            MOMENTOS & ATLETISMO
          </h2>
          <div className="w-16 h-[2px] bg-[#00A3FF]"></div>
        </div>
      </div>

      {/* Center Section: Staggered Collage Tray (Using Flex for absolute responsiveness) */}
      <div className="relative flex-1 w-full h-[70vh] flex items-center overflow-visible">
        <div
          ref={trayRef}
          className="flex flex-nowrap h-full items-center pl-[10vw] pr-[20vw] gap-[8vw]"
          style={{ width: "max-content" }}
        >
          {MOMENTS.map((moment, idx) => (
            <div
              key={idx}
              ref={(el) => {
                if (el) cardsRef.current[idx] = el;
              }}
              style={{ opacity: 0 }}
              className={`w-[260px] h-[340px] md:w-[320px] md:h-[420px] flex-shrink-0 bg-[rgba(10,12,16,0.3)] backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-end p-6 group shadow-2xl transition-all duration-500 hover:border-[#00A3FF]/40 hover:shadow-[0_20px_50px_rgba(0,163,255,0.08)] ${moment.offsetClass}`}
            >
              {/* Image filling background */}
              <div className="absolute inset-0 w-full h-full -z-10 bg-black">
                <Image
                  src={moment.image}
                  alt={moment.title}
                  fill
                  sizes="(max-width: 768px) 260px, 320px"
                  className="object-cover filter brightness-[0.8] contrast-[1.05] group-hover:scale-102 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              </div>

              {/* Metadata (Monospace small) */}
              <div className="flex justify-between items-center mb-auto z-10">
                <span className="text-[9px] font-mono tracking-widest text-[#00A3FF] uppercase font-bold">
                  {moment.location}
                </span>
                <span className="text-[9px] font-mono text-zinc-500 uppercase px-1.5 py-0.5 rounded-sm bg-white/[0.02] border border-white/[0.05]">
                  {moment.year}
                </span>
              </div>

              {/* Moment Title (Serif giant font) */}
              <div className="flex flex-col gap-2 mt-4 z-10">
                <h4 className="text-xl sm:text-2xl md:text-3xl font-serif text-white uppercase leading-tight font-bold group-hover:text-[#00A3FF] transition-colors duration-300">
                  {moment.title}
                </h4>
              </div>
            </div>
          ))}

          {/* Staggered Quote & Signature at the end (Lando Norris style) */}
          <div className="w-[320px] sm:w-[420px] flex-shrink-0 flex flex-col gap-6 p-6 sm:p-8 translate-y-4">
            <p className="font-serif text-lg sm:text-xl md:text-2xl text-zinc-300 leading-relaxed uppercase">
              "Desde o primeiro dia no tatame e a primeira linha de código no teclado, dedico cada segundo a forjar soluções implacáveis."
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
        <span>NTG Athletic Career</span>
        <span>© 2026</span>
      </div>
    </section>
  );
}
