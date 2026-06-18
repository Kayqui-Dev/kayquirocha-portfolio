"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MOMENTS = [
  {
    location: "SÃO PAULO",
    year: "2019",
    title: "O Primeiro Código",
    image: "/kayqui_developer.jpg",
    className: "absolute left-[10vw] top-[14vh] md:left-[10vw] md:top-[16vh] w-[260px] h-[340px] md:w-[320px] md:h-[420px]",
  },
  {
    location: "ARACAJU",
    year: "2025",
    title: "Bronze no Brasileiro",
    image: "/kayqui_trophy.jpg",
    className: "absolute left-[90vw] top-[44vh] md:left-[36vw] md:top-[46vh] w-[280px] h-[360px] md:w-[340px] md:h-[440px]",
  },
  {
    location: "SÃO PAULO",
    year: "2025",
    title: "Vice-Campeão Paulista",
    image: "/kayqui_wrestler.png",
    className: "absolute left-[250vw] top-[10vh] md:left-[66vw] md:top-[12vh] w-[260px] h-[340px] md:w-[320px] md:h-[420px]",
  },
  {
    location: "SÃO PAULO",
    year: "2026",
    title: "Full-Stack na VTP",
    image: "/kayqui_developer.png",
    className: "absolute left-[330vw] top-[42vh] md:left-[96vw] md:top-[44vh] w-[280px] h-[360px] md:w-[350px] md:h-[450px]",
  },
];

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trayRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    const tray = trayRef.current;
    if (!containerRef.current || !tray) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2200",
          scrub: 1, // Sincronizado com Lenis.js
          pin: true,
          anticipatePin: 1,
        },
      });

      // 1. Horizontal translation of the collage tray
      tl.to(tray, {
        x: () => -(tray.scrollWidth - window.innerWidth + 100),
        ease: "none",
        duration: 3,
      }, 0);

      // 2. Cinematic staggered slide/grow reveal from bottom-right (scale: 0.5, x: 150, y: 100)
      tl.fromTo(
        cards,
        {
          scale: 0.5,
          opacity: 0,
          x: 150,
          y: 100,
        },
        {
          scale: 1,
          opacity: 1,
          x: 0,
          y: 0,
          stagger: 0.18,
          duration: 2,
          ease: "power2.out",
        },
        0.1 // starts shortly after horizontal scroll begins
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="relative w-full h-screen bg-[radial-gradient(circle_at_center,rgba(0,28,48,0.25)_0%,rgba(0,0,0,1)_85%)] flex flex-col justify-between py-16 overflow-hidden select-none"
    >
      {/* Top Section Tag */}
      <div className="w-full px-6 sm:px-12 md:px-16 flex justify-between items-start z-30">
        <div className="flex flex-col gap-2">
          <span className="section-tag">01.1 / Galeria</span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tighter text-white uppercase font-sans">
            MOMENTOS & PROJETOS
          </h2>
          <div className="w-16 h-[2px] bg-[#00A3FF]"></div>
        </div>
      </div>

      {/* Center Section: Staggered Collage Tray */}
      <div className="relative flex-1 w-full h-[70vh] flex items-center overflow-visible">
        {/* Horizontal Scroll Track (Tray) */}
        <div ref={trayRef} className="absolute inset-y-0 left-0 w-[420vw] md:w-[130vw] h-full overflow-visible">
          {MOMENTS.map((moment, idx) => (
            <div
              key={idx}
              ref={(el) => {
                if (el) cardsRef.current[idx] = el;
              }}
              style={{ opacity: 0 }}
              className={`${moment.className} flex-shrink-0 bg-[rgba(10,12,16,0.3)] backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-end p-6 group shadow-2xl transition-all duration-300 hover:border-[#00A3FF]/40 hover:shadow-[0_20px_50px_rgba(0,163,255,0.08)]`}
            >
              {/* Image filling background */}
              <div className="absolute inset-0 w-full h-full -z-10 bg-black">
                <Image
                  src={moment.image}
                  alt={moment.title}
                  fill
                  sizes="(max-width: 768px) 280px, 350px"
                  className="object-cover filter brightness-[0.8] contrast-[1.05] group-hover:scale-102 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              </div>

              {/* Metadata (Monospace small) */}
              <div className="flex justify-between items-center mb-auto z-10">
                <span className="text-[10px] font-mono tracking-widest text-[#00A3FF] uppercase font-bold">
                  {moment.location}
                </span>
                <span className="text-[9px] font-mono text-zinc-500 uppercase px-1.5 py-0.5 rounded-sm bg-white/[0.02] border border-white/[0.05]">
                  {moment.year}
                </span>
              </div>

              {/* Moment Title (Serif giant font) */}
              <div className="flex flex-col gap-2 mt-4 z-10">
                <h4 className="text-2xl sm:text-3xl md:text-4.5xl font-serif text-white tracking-tight uppercase leading-none font-bold group-hover:text-[#00A3FF] transition-colors duration-300">
                  {moment.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer line details */}
      <div className="w-full px-6 sm:px-12 md:px-16 flex justify-between items-end select-none text-[8px] font-mono text-zinc-600 uppercase tracking-widest z-30">
        <span>NTG Athletic Career</span>
        <span>© 2026</span>
      </div>
    </section>
  );
}
