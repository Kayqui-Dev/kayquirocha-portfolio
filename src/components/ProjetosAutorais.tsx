"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ProjectModal from "./ProjectModal";

const PROJECTS = [
  {
    title: "Centurion Scout",
    type: "Combate & Performance",
    year: "2025",
    desc: "Sistema tático de scouting e analytics para treinadores e atletas de esportes de combate (Wrestling, MMA, Jiu-Jitsu). Heatmaps e análise preditiva de oponentes.",
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
    tags: ["Next.js", "Supabase", "TypeScript", "Tailwind", "PostgreSQL"],
    image: "/kayqui_wrestler.png",
  },
  {
    title: "Decide Aí Vida",
    type: "Utilitário Inteligente",
    year: "2024",
    desc: "Aplicativo inteligente que ajuda na tomada de decisão estruturada. Utiliza lógica avançada e processamento de IA para ponderar cenários e reduzir a fadiga de escolha.",
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
    image: "/kayqui_developer.jpg",
  },
];

export default function ProjetosAutorais() {
  const [selectedProject, setSelectedProject] = useState<(typeof PROJECTS)[0] | null>(null);

  const revealVariants = {
    hidden: { opacity: 0, y: 35 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <>
      <section id="projetos-autorais" className="py-32 md:py-48 border-t border-white/[0.05] bg-black relative">
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 md:px-16 flex flex-col gap-16">
          
          {/* Section Header */}
          <motion.div
            variants={revealVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-4 select-none"
          >
            <span className="section-tag">04 / Projetos Autorais</span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-white uppercase font-sans">
              PROJETOS AUTORAIS
            </h2>
            <div className="w-16 h-[2px] bg-[#00A3FF]"></div>
            <p className="text-zinc-500 text-xs max-w-xl leading-relaxed font-mono">
              Modelos interativos inspirados no Hall of Fame. Toque ou clique no card para ver a arquitetura detalhada e fluxo de dados.
            </p>
          </motion.div>

          {/* Wide Spacious Cards Column (Lando's Hall of Fame style) */}
          <div className="flex flex-col gap-8 md:gap-12">
            {PROJECTS.map((proj, idx) => (
              <motion.div
                key={proj.title}
                variants={revealVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.15 }}
                onClick={() => setSelectedProject(proj)}
                className="relative w-full rounded-md overflow-hidden bg-[rgba(10,12,16,0.35)] backdrop-blur-xl border border-white/5 hover:border-[#00A3FF]/20 hover:shadow-[0_20px_50px_rgba(0,163,255,0.08)] transition-all duration-500 cursor-pointer select-none group min-h-[400px] flex flex-col justify-between p-8 sm:p-12"
              >
                {/* Background Image Panel (Occupies the right side with a split glow on desktop) */}
                <div className="absolute top-0 right-0 w-full lg:w-5/12 h-full -z-10 opacity-10 lg:opacity-25 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover filter grayscale contrast-125 brightness-[0.4] group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent hidden lg:block"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent lg:hidden"></div>
                </div>

                {/* Card Top Metadata Row */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                  <span className="text-[10px] font-mono tracking-widest text-[#00A3FF] uppercase font-bold">
                    {proj.type}
                  </span>
                  <span className="text-xl sm:text-3xl font-serif text-[#00A3FF]/20 leading-none group-hover:text-[#00A3FF]/50 transition-colors duration-500 font-black">
                    {proj.year}
                  </span>
                </div>

                {/* Card Main Info */}
                <div className="flex flex-col gap-4 max-w-2xl">
                  {/* Title (Giant Serif) */}
                  <h3 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white tracking-tighter uppercase font-bold leading-none group-hover:text-[#00A3FF] transition-colors duration-300">
                    {proj.title}
                  </h3>

                  {/* Technical Tags Row (Monospace small) */}
                  <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-2">
                    {proj.tags.map((tag) => (
                      <span key={tag} className="text-[9px] sm:text-[10px] font-mono text-[#00A3FF] tracking-wider uppercase font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans mt-4 max-w-xl">
                    {proj.desc}
                  </p>
                </div>

                {/* Card Footer Detail Row */}
                <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-8">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#00A3FF] animate-pulse"></span>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold group-hover:text-white transition-colors duration-300">
                      Ver Especificação Técnica & Fluxo de Dados
                    </span>
                  </div>
                  <span className="text-xl text-[#00A3FF] group-hover:translate-x-2 transition-transform duration-300">
                    →
                  </span>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
