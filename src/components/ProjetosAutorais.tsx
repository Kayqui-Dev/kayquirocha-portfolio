"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectModal from "./ProjectModal";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "Centurion Scout",
    type: "Combate & Performance",
    year: "2025",
    desc: "Sistema especializado de scouting tático e base de dados preditiva para treinadores e atletas de esportes de combate (Wrestling, MMA). Avaliação estatística usando IA.",
    longDesc: "O Centurion Scout é uma plataforma inovadora criada na intersecção entre tecnologia de ponta e esportes de combate. Ele resolve o gargalo de análise tática subjetiva em artes marciais, trazendo dados objetivos e mapas visuais detalhados para treinadores, atletas olímpicos e lutadores profissionais estruturarem seus planos de luta.",
    architecture: [
      "Next.js (App Router) + TypeScript no frontend.",
      "Banco de dados relacional PostgreSQL.",
      "Backend-as-a-service moderno via Supabase.",
      "Row Level Security (RLS) para proteção de dados sensíveis dos lutadores."
    ],
    features: [
      "Gravação de mapas de calor (heatmaps) de quedas e pontuações no tatame.",
      "Dashboard dinâmico com métricas táticas de oponentes.",
      "Histórico de lesões e acompanhamento de corte de peso.",
      "Exportação de relatórios táticos completos em PDF."
    ],
    dbFlow: "Supabase PostgreSQL -> Tabelas relacionais vinculando 'Atletas', 'Lutas' e 'Ações'. Cada pontuação no tatame dispara uma inserção em tempo real que atualiza os heatmaps instantaneamente via real-time triggers, estruturada sob políticas rígidas de segurança por perfil.",
    tags: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    image: "/centurion_scout.png",
  },
  {
    title: "Decide Aí Vida",
    type: "Decisão Autônoma",
    year: "2024",
    desc: "Rede de decisão autônoma alimentada por LLMs locais seguros. Avalia logs operacionais e ajuda na tomada de decisão estruturada para reduzir a fadiga de escolha.",
    longDesc: "O Decide Aí Vida é uma ferramenta de produtividade e análise cognitiva desenvolvida para combater a fadiga de escolha cotidiana. A aplicação utiliza modelos avançados de Inteligência Artificial para analisar cenários ponderando os prós, contras, riscos e potenciais recompensas das decisões tomadas pelos usuários.",
    architecture: [
      "Frontend multiplataforma em React Native.",
      "API de processamento rápido utilizando Python (FastAPI).",
      "Modelos de IA da OpenAI e Gemini para geração cognitiva.",
      "Caching inteligente de sessões para performance."
    ],
    features: [
      "Análise assistida por IA para decisões complexas e rápidas.",
      "Ponderação automática de cenários com árvore de probabilidade.",
      "Histórico criptografado de decisões tomadas.",
      "Design minimalista focado em reduzir estresse cognitivo."
    ],
    dbFlow: "React Native -> API Gateway (Python FastAPI) -> OpenAI/Gemini API para avaliação estruturada. Os dados da decisão do usuário são processados e armazenados localmente de forma segura, com registros agregados anonimizados para estatísticas de comportamento.",
    tags: ["React Native", "Python", "AI APIs", "FastAPI"],
    image: "/decide_ai_vida.png",
  },
];

export default function ProjetosAutorais() {
  const [selectedProject, setSelectedProject] = useState<(typeof PROJECTS)[0] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            scale: 0.5,
            opacity: 0,
            x: 200,
            y: 150,
          },
          {
            scale: 1,
            opacity: 1,
            x: 0,
            y: 0,
            ease: "none", // Keeps animation linear to scrolling position
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "top center",
              scrub: 1,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        id="projetos-autorais"
        ref={containerRef}
        className="py-32 md:py-48 border-t border-white/[0.05] bg-[radial-gradient(circle_at_center,rgba(0,18,36,0.3)_0%,rgba(0,0,0,1)_85%)] relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 md:px-16 flex flex-col gap-16">
          
          {/* Section Header */}
          <div className="flex flex-col gap-4 select-none">
            <span className="section-tag">04 / Projetos Autorais</span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-white uppercase font-sans">
              PROJETOS AUTORAIS
            </h2>
            <div className="w-16 h-[2px] bg-[#00A3FF]"></div>
            <p className="text-zinc-500 text-xs max-w-xl leading-relaxed font-mono">
              Modelos interativos inspirados no Hall of Fame. Toque ou clique no card para ver a arquitetura detalhada e fluxo de dados.
            </p>
          </div>

          {/* Cinematic Gallery - Spacious Cards Stack */}
          <div className="flex flex-col gap-24 md:gap-32 w-full">
            {PROJECTS.map((proj, idx) => (
              <div
                key={proj.title}
                ref={(el) => {
                  if (el) cardsRef.current[idx] = el;
                }}
                onClick={() => setSelectedProject(proj)}
                style={{ opacity: 0 }} // Prevent Flash of Unstyled Content before GSAP kicks in
                className="relative w-full rounded-2xl overflow-hidden bg-[rgba(10,12,16,0.35)] border border-white/5 hover:border-[#00A3FF]/20 hover:shadow-[0_20px_50px_rgba(0,163,255,0.12)] transition-all duration-500 cursor-pointer select-none group min-h-[480px] md:min-h-[580px] flex flex-col justify-end p-6 sm:p-10 md:p-14"
              >
                {/* Background Image of the project */}
                <div className="absolute inset-0 w-full h-full -z-10 bg-black">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    priority={idx === 0}
                    sizes="(max-width: 1024px) 100vw, 80vw"
                    className="object-cover filter brightness-[0.7] contrast-[1.05] group-hover:scale-102 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                </div>

                {/* Floating Glassmorphic Panel (CSS backdrop-filter: blur) */}
                <div className="relative max-w-lg p-6 sm:p-8 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col gap-4 z-10 transition-all duration-300 group-hover:border-[#00A3FF]/30">
                  {/* Tech Stack (Monospace small font with spacing) */}
                  <span className="font-mono text-[10px] sm:text-xs text-[#00A3FF] tracking-widest uppercase font-bold">
                    {proj.tags.join(" • ")}
                  </span>

                  {/* Title (Giant Serif font) */}
                  <h3 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight uppercase leading-none group-hover:text-[#00A3FF] transition-colors duration-300">
                    {proj.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {proj.desc}
                  </p>

                  {/* Action Detail Row */}
                  <div className="flex items-center gap-2 pt-4 border-t border-white/10 mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse"></span>
                    <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider">
                      Ver Especificação Técnica & Fluxo de Dados
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Details Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
