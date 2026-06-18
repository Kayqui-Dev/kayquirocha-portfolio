"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOPICS = [
  {
    num: "02",
    name: "Resiliência Sob Pressão",
    tatame: "Manter a calma no tapete quando o oponente está em vantagem e usar técnica para reverter a luta.",
    teclado: "Depurar erros complexos em produção ou lidar com picos de tráfego estruturando soluções friamente."
  },
  {
    num: "03",
    name: "Estratégia & Adaptação",
    tatame: "Análise tática (scouting) do oponente para desenhar a estratégia perfeita de ataque e defesa.",
    teclado: "Escolher a arquitetura ideal (Supabase, microsserviços, IA) para solucionar os gargalos de negócio com o menor custo."
  }
];

export default function WrestlingMindset() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftTextsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rightTextsRef = useRef<(HTMLDivElement | null)[]>([]);
  const topicTitlesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const leftCards = leftTextsRef.current.filter(Boolean);
    const rightCards = rightTextsRef.current.filter(Boolean);
    const indicators = topicTitlesRef.current.filter(Boolean);
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Create GSAP Timeline hooked to ScrollTrigger with Pin
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=1200", // Pinned scroll range
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Initially, Topic 03 is hidden below
      gsap.set([leftCards[1], rightCards[1]], { opacity: 0, y: 50 });

      // Timeline transitions:
      // Fade out Topic 02 (moves up and fades)
      tl.to([leftCards[0], rightCards[0]], {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power2.inOut"
      })
      // Dim indicator 02
      .to(indicators[0], {
        color: "rgba(255, 255, 255, 0.15)",
        scale: 0.9,
        duration: 0.5
      }, "<")
      
      // Fade in Topic 03 (moves up from bottom to active center)
      .to([leftCards[1], rightCards[1]], {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.inOut"
      }, "-=0.5")
      // Highlight indicator 03
      .to(indicators[1], {
        color: "#00A3FF",
        scale: 1.1,
        duration: 0.5
      }, "<");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[radial-gradient(circle_at_center,rgba(0,18,36,0.25)_0%,rgba(0,0,0,1)_85%)] overflow-hidden border-t border-white/[0.03] flex flex-col justify-between py-16 px-6 sm:px-12 md:px-24"
    >
      {/* Top Header Row */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 select-none z-20">
        <div className="flex flex-col gap-2">
          <span className="section-tag text-[10px] font-mono tracking-widest text-[#00A3FF] uppercase font-bold">
            05 / Mindset de Atleta
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-white uppercase font-sans">
            A Disciplina do Tatame na Engenharia.
          </h2>
          <div className="w-16 h-[2px] bg-[#00A3FF]"></div>
          <p className="text-zinc-400 text-xs sm:text-sm font-sans max-w-2xl mt-2 leading-relaxed">
            A Luta Livre Olímpica (Wrestling) não é apenas um esporte de força; é um xadrez humano de alavanca, estratégia e pura resiliência mental.
          </p>
        </div>
      </div>

      {/* Split Screen Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 my-auto max-w-7xl mx-auto w-full relative z-10 pt-8">
        
        {/* Left Side: No Tatame (Wrestling) */}
        <div className="lg:col-span-5 flex flex-col justify-center items-center lg:items-end text-center lg:text-right p-4 border-b lg:border-b-0 lg:border-r border-white/5 h-full relative">
          <span className="text-[10px] font-mono tracking-widest text-[#00A3FF] uppercase font-bold mb-1 block">
            No Tatame
          </span>
          <h3 className="text-3xl sm:text-5xl font-serif text-white tracking-tighter uppercase font-bold leading-none mb-6">
            Wrestling
          </h3>
          
          {/* Container for absolute overlay cards */}
          <div className="relative w-full h-[180px] sm:h-[130px] flex items-center lg:justify-end">
            {TOPICS.map((topic, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  leftTextsRef.current[idx] = el;
                }}
                className={`absolute w-full flex flex-col justify-center lg:items-end transition-all duration-300 ${
                  idx !== 0 ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                <div className="backdrop-blur-xl bg-white/[0.02] border border-white/10 p-6 rounded-2xl shadow-xl w-full max-w-md transition-all hover:border-[#00A3FF]/25">
                  <p className="text-xs sm:text-sm font-mono text-zinc-300 leading-relaxed">
                    {topic.tatame}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center Indicators */}
        <div className="lg:col-span-2 flex flex-row lg:flex-col justify-center items-center gap-6 lg:gap-8 p-4 select-none z-10">
          {TOPICS.map((topic, idx) => (
            <div
              key={idx}
              ref={(el) => {
                topicTitlesRef.current[idx] = el;
              }}
              className={`flex flex-col items-center justify-center transition-all duration-500 font-serif ${
                idx === 0 ? "text-[#00A3FF] scale-110 font-bold" : "text-white/20 font-normal"
              }`}
            >
              <span className="text-lg sm:text-xl font-mono leading-none">{topic.num}</span>
              <span className="text-[10px] sm:text-xs tracking-wider uppercase whitespace-nowrap mt-1 leading-none">
                {topic.name}
              </span>
            </div>
          ))}
        </div>

        {/* Right Side: No Teclado (Código) */}
        <div className="lg:col-span-5 flex flex-col justify-center items-center lg:items-start text-center lg:text-left p-4 h-full relative">
          <span className="text-[10px] font-mono tracking-widest text-[#00A3FF] uppercase font-bold mb-1 block">
            No Teclado
          </span>
          <h3 className="text-3xl sm:text-5xl font-serif text-white tracking-tighter uppercase font-bold leading-none mb-6">
            Código
          </h3>

          {/* Container for absolute overlay cards */}
          <div className="relative w-full h-[180px] sm:h-[130px] flex items-center lg:justify-start">
            {TOPICS.map((topic, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  rightTextsRef.current[idx] = el;
                }}
                className={`absolute w-full flex flex-col justify-center lg:items-start transition-all duration-300 ${
                  idx !== 0 ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                <div className="backdrop-blur-xl bg-white/[0.02] border border-white/10 p-6 rounded-2xl shadow-xl w-full max-w-md transition-all hover:border-[#00A3FF]/25">
                  <p className="text-xs sm:text-sm font-mono text-zinc-300 leading-relaxed">
                    {topic.teclado}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Footer details */}
      <div className="w-full flex justify-between items-end select-none text-[8px] font-mono text-zinc-600 uppercase tracking-widest z-20">
        <span>Kodava Solutions</span>
        <span>© 2026</span>
      </div>
    </section>
  );
}
