"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOPICS = [
  {
    num: "01",
    name: "Consistência Diária",
    tatame: "A exaustão física sob pressão constante, onde o corpo implora para parar, mas a mente exige mais um round de esforço exaustivo.",
    teclado: "Sistemas complexos nascem do commit persistente. A regularidade no teclado constrói arquiteturas escaláveis e robustas.",
  },
  {
    num: "02",
    name: "Resiliência",
    tatame: "Quedas duras e frustrações acumuladas no tatame de treinos. A resiliência é forjada na dor invisível de se levantar todas as vezes.",
    teclado: "A busca obstinada por bugs que paralisam a execução. Cada erro de sistema é um oponente a ser vencido com frieza técnica.",
  },
  {
    num: "03",
    name: "Estratégia",
    tatame: "Decisões táticas em milissegundos sob extrema adrenalina: antecipar a ação do oponente e entrar na perna no momento exato.",
    teclado: "Desenho arquitetural estratégico sob prazos curtos: planejar fluxos de dados, isolar serviços e garantir performance de pico.",
  },
];

const QUOTE_TEXT = "No wrestling, não há atalhos. Cada vitória é conquistada com sangue, suor e repetição exaustiva.";

export default function WrestlingMindset() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftTextsRef = useRef<HTMLDivElement[]>([]);
  const rightTextsRef = useRef<HTMLDivElement[]>([]);
  const topicTitlesRef = useRef<HTMLDivElement[]>([]);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const quoteWords = quoteRef.current?.querySelectorAll(".word");
    
    const ctx = gsap.context(() => {
      // 1. Word-by-word reveal animation for the Wrestling Quote (simulating SplitText)
      if (quoteWords && quoteWords.length > 0) {
        gsap.fromTo(
          quoteWords,
          { opacity: 0.1, y: 5 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.6,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              end: "top 10%",
              scrub: true,
            },
          }
        );
      }

      // 2. Timeline for Pinning and cross-fading the topics
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2400", // Scroll length while pinned
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Staggered transitions between the three topics
      // Fade out Topic 1, Fade in Topic 2
      tl.to([leftTextsRef.current[0], rightTextsRef.current[0]], { opacity: 0, y: -20, duration: 1 })
        .to(topicTitlesRef.current[0], { color: "rgba(255, 255, 255, 0.15)", scale: 0.95, duration: 0.5 }, "<")
        .fromTo([leftTextsRef.current[1], rightTextsRef.current[1]], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 })
        .to(topicTitlesRef.current[1], { color: "#00A3FF", scale: 1.1, duration: 0.5 }, "<")
        
      // Fade out Topic 2, Fade in Topic 3
      tl.to([leftTextsRef.current[1], rightTextsRef.current[1]], { opacity: 0, y: -20, duration: 1 })
        .to(topicTitlesRef.current[1], { color: "rgba(255, 255, 255, 0.15)", scale: 0.95, duration: 0.5 }, "<")
        .fromTo([leftTextsRef.current[2], rightTextsRef.current[2]], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 })
        .to(topicTitlesRef.current[2], { color: "#00A3FF", scale: 1.1, duration: 0.5 }, "<");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const quoteWords = QUOTE_TEXT.split(" ");

  return (
    <div ref={containerRef} className="relative w-full bg-black border-t border-white/[0.05]">
      {/* Sticky Inner Viewport */}
      <div className="h-screen w-full flex flex-col justify-between py-20 px-6 sm:px-12 md:px-16 overflow-hidden">
        
        {/* Section Header */}
        <div className="w-full flex justify-between items-start select-none">
          <div className="flex flex-col gap-2">
            <span className="section-tag">05 / Mindset de Atleta</span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tighter text-white uppercase font-sans">
              A DUALIDADE ON TRACK / OFF TRACK
            </h2>
            <div className="w-16 h-[2px] bg-[#00A3FF]"></div>
          </div>
          <span className="text-[10px] font-mono tracking-widest text-zinc-600 uppercase">
            Tatame vs Teclado
          </span>
        </div>

        {/* Floating Quote (revealed word-by-word on entry) */}
        <div className="w-full flex justify-center my-6">
          <div ref={quoteRef} className="text-xl sm:text-3xl font-serif text-zinc-400 italic max-w-3xl text-center leading-relaxed">
            {quoteWords.map((word, i) => (
              <span key={i} className="word inline-block mr-[0.25em] transition-opacity duration-300">
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Split Screen Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 my-auto max-w-7xl mx-auto w-full relative">
          
          {/* Left Side: No Tatame (Wrestling) */}
          <div className="lg:col-span-5 flex flex-col justify-center items-center lg:items-end text-center lg:text-right p-4 border-b lg:border-b-0 lg:border-r border-white/5 h-full relative">
            <span className="text-[10px] font-mono tracking-widest text-[#00A3FF] uppercase font-bold mb-2 block">
              NO TATAME
            </span>
            <h3 className="text-4xl sm:text-6xl font-serif text-white tracking-tighter uppercase font-bold leading-none mb-6">
              WRESTLING
            </h3>
            
            {/* Alternating Tatame Texts */}
            <div className="relative w-full h-[120px] sm:h-[90px] flex items-center lg:justify-end">
              {TOPICS.map((topic, idx) => (
                <div
                  key={idx}
                  ref={(el) => {
                    if (el) leftTextsRef.current[idx] = el;
                  }}
                  className={`absolute w-full flex flex-col justify-center lg:items-end transition-opacity duration-300 ${
                    idx !== 0 ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <p className="text-xs sm:text-sm font-mono text-zinc-400 leading-relaxed max-w-md">
                    {topic.tatame}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Center Column: Staggered Indicators */}
          <div className="lg:col-span-2 flex flex-row lg:flex-col justify-center items-center gap-6 lg:gap-8 p-4 select-none">
            {TOPICS.map((topic, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  if (el) topicTitlesRef.current[idx] = el;
                }}
                className={`flex flex-col items-center justify-center transition-all duration-500 font-serif ${
                  idx === 0 ? "text-[#00A3FF] scale-110 font-bold" : "text-white/20 font-normal"
                }`}
              >
                <span className="text-lg sm:text-xl font-mono leading-none">{topic.num}</span>
                <span className="text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap mt-1 leading-none">
                  {topic.name}
                </span>
              </div>
            ))}
          </div>

          {/* Right Side: No Teclado (Código) */}
          <div className="lg:col-span-5 flex flex-col justify-center items-center lg:items-start text-center lg:text-left p-4 h-full relative">
            <span className="text-[10px] font-mono tracking-widest text-[#00A3FF] uppercase font-bold mb-2 block">
              NO TECLADO
            </span>
            <h3 className="text-4xl sm:text-6xl font-serif text-white tracking-tighter uppercase font-bold leading-none mb-6">
              CÓDIGO
            </h3>

            {/* Alternating Teclado Texts */}
            <div className="relative w-full h-[120px] sm:h-[90px] flex items-center lg:justify-start">
              {TOPICS.map((topic, idx) => (
                <div
                  key={idx}
                  ref={(el) => {
                    if (el) rightTextsRef.current[idx] = el;
                  }}
                  className={`absolute w-full flex flex-col justify-center lg:items-start transition-opacity duration-300 ${
                    idx !== 0 ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <p className="text-xs sm:text-sm font-mono text-zinc-400 leading-relaxed max-w-md">
                    {topic.teclado}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer line details */}
        <div className="w-full flex justify-between items-end select-none text-[8px] font-mono text-zinc-600 uppercase tracking-widest">
          <span>Kodava Solutions</span>
          <span>© 2026</span>
        </div>

      </div>
    </div>
  );
}
