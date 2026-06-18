"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NARRATIVE_LINES = [
  "Iniciei minha jornada no mundo do desenvolvimento aos 11 anos.",
  "O que começou como curiosidade rapidamente se tornou uma vocação profissional",
  "e um compromisso indissociável com a excelência técnica.",
  "Essa imersão precoce me permitiu desenvolver maturidade profissional",
  "e capacidade técnica sólida bem antes da maioria dos meus pares.",
  "Hoje, divido meu tempo liderando a Kodava Solutions, projetando arquiteturas de IA,",
  "e treinando wrestling de alto rendimento no tapete do NTG (National Training Group).",
  "Para mim, o tatame e o teclado compartilham o mesmo DNA:",
  "ambos exigem consistência sob pressão, resiliência no silêncio e obsessão pela vitória."
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const lines = linesRef.current.filter(Boolean);
    const container = containerRef.current;
    if (!container || lines.length === 0) return;

    const ctx = gsap.context(() => {
      // 1. Animate the line-by-line opacity reveal from 20% to 100%
      gsap.fromTo(
        lines,
        { opacity: 0.2, y: 10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: container,
            start: "top 70%",
            end: "bottom 80%",
            scrub: 1,
          },
        }
      );

      // 2. Animate the handwriting signature path on scroll (Lando Norris style)
      const signaturePath = document.getElementById("about-signature-path") as SVGPathElement | null;
      if (signaturePath) {
        const length = signaturePath.getTotalLength() || 1000;
        
        // Initial state set on DOM attributes
        gsap.set(signaturePath, {
          attr: {
            "stroke-dasharray": length,
            "stroke-dashoffset": length,
          }
        });

        gsap.to(signaturePath, {
          attr: { "stroke-dashoffset": 0 },
          ease: "none",
          scrollTrigger: {
            trigger: signaturePath,
            start: "top 85%", // Starts drawing when it approaches the viewport
            end: "bottom 60%", // Finishes drawing before leaving
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sobre"
      ref={containerRef}
      className="relative w-full min-h-screen bg-black py-24 md:py-36 px-6 sm:px-12 md:px-24 flex items-center justify-center border-t border-white/[0.03] overflow-hidden"
    >
      {/* Background visual detail */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,163,255,0.03)_0%,rgba(0,0,0,0)_60%)] pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-7xl w-full mx-auto relative z-10">
        
        {/* Left Column: Sticky Title & Identity Photo */}
        <div className="lg:col-span-5 flex flex-col gap-8 lg:sticky lg:top-32 select-none">
          <div className="flex flex-col gap-2">
            <span className="section-tag text-[10px] font-mono tracking-widest text-[#00A3FF] uppercase font-bold">
              01 / Sobre Mim
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-none uppercase">
              A união entre o código e o tatame.
            </h2>
            <div className="w-16 h-[2px] bg-[#00A3FF] mt-2"></div>
          </div>

          {/* Grayscale Styled Action Stance Photo */}
          <div className="relative aspect-[4/5] w-full max-w-[280px] sm:max-w-[320px] rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl group transition-all duration-500 hover:border-[#00A3FF]/20">
            <Image
              src="/kayqui_wrestler.png"
              alt="Kayqui Rocha - Wrestling"
              fill
              priority
              sizes="(max-width: 768px) 280px, 320px"
              className="object-cover filter grayscale contrast-[1.1] brightness-[0.8] transition-transform duration-700 ease-out group-hover:scale-103"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
              NTG Wrestling Team
            </div>
          </div>
        </div>

        {/* Right Column: Scroll-triggered Text Reveal Narrative */}
        <div className="lg:col-span-7 flex flex-col justify-center min-h-[40vh] lg:min-h-[60vh] lg:pl-10">
          <div className="flex flex-col gap-6 sm:gap-8 max-w-2xl">
            {NARRATIVE_LINES.map((line, idx) => (
              <span
                key={idx}
                ref={(el) => {
                  linesRef.current[idx] = el;
                }}
                className="inline-block font-sans text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-normal"
                style={{ opacity: 0.2 }}
              >
                {line}
              </span>
            ))}

            {/* SVG Signature container (drawn on scroll) */}
            <div className="mt-8 flex justify-start select-none">
              <svg
                viewBox="0 0 400 120"
                className="w-48 h-20 filter drop-shadow-[0_2px_8px_rgba(0,163,255,0.25)]"
              >
                <path
                  id="about-signature-path"
                  d="M 30 80 Q 55 20 65 20 T 75 90 Q 80 40 90 60 T 105 75 Q 115 45 120 60 T 130 80 Q 145 25 150 50 T 160 80 Q 170 50 175 75 T 185 75 Q 205 75 225 40 Q 235 20 245 25 T 250 80 Q 260 40 265 60 T 275 75 Q 285 40 290 60 T 300 75 T 315 65 Q 335 65 355 30 T 365 80"
                  stroke="#00A3FF"
                  strokeWidth="3.2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
