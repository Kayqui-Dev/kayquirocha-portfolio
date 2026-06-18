"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOPICS = [
  {
    num: "01",
    name: "Consistência Diária",
    tatame: "A exaustão física sob pressão constante, onde o corpo implora para parar, mas a mente exige mais um round de esforço exaustivo.",
    teclado: "Sistemas complexos nascem do commit persistente. A regularidade no teclado constrói arquiteturas escaláveis e robustas."
  },
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

const QUOTE_TEXT = "No wrestling, não há atalhos. Cada vitória é conquistada com sangue, suor e repetição exaustiva. No código, o princípio é o mesmo.";

export default function WrestlingMindset() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftTextsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rightTextsRef = useRef<(HTMLDivElement | null)[]>([]);
  const topicTitlesRef = useRef<(HTMLDivElement | null)[]>([]);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const leftCards = leftTextsRef.current.filter(Boolean);
    const rightCards = rightTextsRef.current.filter(Boolean);
    const indicators = topicTitlesRef.current.filter(Boolean);
    const quoteWords = quoteRef.current?.querySelectorAll(".word");
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // 1. Word-by-word reveal animation for the Wrestling Quote on enter
      if (quoteWords && quoteWords.length > 0) {
        gsap.fromTo(
          quoteWords,
          { opacity: 0.1, y: 5 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.03,
            duration: 0.5,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top 80%",
              end: "top 30%",
              scrub: true,
            },
          }
        );
      }

      // 2. Create GSAP Timeline hooked to ScrollTrigger with Pin
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=2200", // Expanded scroll range for 3 slides
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Set initial states for slide 02 and 03
      gsap.set([leftCards[1], rightCards[1], leftCards[2], rightCards[2]], { opacity: 0, y: 50 });

      // Transition 1: Slide 01 out, Slide 02 in
      tl.to([leftCards[0], rightCards[0]], {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power2.inOut"
      })
      .to(indicators[0], {
        color: "rgba(255, 255, 255, 0.15)",
        scale: 0.9,
        duration: 0.5
      }, "<")
      .to([leftCards[1], rightCards[1]], {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.inOut"
      }, "-=0.5")
      .to(indicators[1], {
        color: "#00A3FF",
        scale: 1.1,
        duration: 0.5
      }, "<")

      // Transition 2: Slide 02 out, Slide 03 in
      .to([leftCards[1], rightCards[1]], {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power2.inOut"
      })
      .to(indicators[1], {
        color: "rgba(255, 255, 255, 0.15)",
        scale: 0.9,
        duration: 0.5
      }, "<")
      .to([leftCards[2], rightCards[2]], {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.inOut"
      }, "-=0.5")
      .to(indicators[2], {
        color: "#00A3FF",
        scale: 1.1,
        duration: 0.5
      }, "<");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const quoteWords = QUOTE_TEXT.split(" ");

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden border-t border-white/[0.03] flex flex-col justify-between py-16 px-6 sm:px-12 md:px-24"
    >
      {/* Split Backgrounds */}
      <div className="absolute left-0 top-0 w-full lg:w-1/2 h-full bg-[#030303] border-r border-white/5 z-0 pointer-events-none"></div>
      <div className="absolute right-0 top-0 hidden lg:block lg:w-1/2 h-full bg-[#000d1a] bg-[linear-gradient(rgba(0,163,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,163,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] z-0 pointer-events-none"></div>
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

      {/* Intro Quote (Reveals Word-by-Word) */}
      <div className="w-full flex justify-center my-4 z-10">
        <div ref={quoteRef} className="text-sm sm:text-base md:text-lg lg:text-xl font-serif text-zinc-400 italic max-w-4xl text-center leading-relaxed select-none">
          {quoteWords.map((word, i) => (
            <span key={i} className="word inline-block mr-2 transition-opacity duration-300">
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Split Screen Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 my-auto max-w-7xl mx-auto w-full relative z-10 pt-4">
        
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
