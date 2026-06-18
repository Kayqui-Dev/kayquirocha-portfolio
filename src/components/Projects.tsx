"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ProjectModal from "./ProjectModal";

const EXPERIENCES = [
  {
    role: "Fundador & Tech Lead",
    company: "Kodava Solutions",
    period: "2024 — Presente",
    desc: "Liderança técnica no desenvolvimento de sistemas web corporativos, automação inteligente com IA e orquestrações customizadas com n8n para otimização operacional.",
    tags: ["React", "Python", "Supabase", "n8n", "AI APIs"],
  },
  {
    role: "Desenvolvedor Full-Stack",
    company: "VTP",
    period: "2023 — Presente",
    desc: "Engenharia de plataformas web ponta a ponta. Foco constante em arquitetura limpa, escalabilidade, segurança e otimização de performance (Core Web Vitals).",
    tags: ["React", "PHP", "JavaScript", "SQL", "Tailwind"],
  },
];

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
    featured: true,
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
    featured: false,
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<(typeof PROJECTS)[0] | null>(null);

  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
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
      <section id="projetos" className="py-32 md:py-48 border-t border-white/[0.05] bg-black">
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 md:px-16 flex flex-col gap-20">
          
          {/* Experience Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <motion.div
              variants={revealVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="md:col-span-4 flex flex-col gap-4"
            >
              <span className="section-tag">04 / Experiência</span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-white uppercase font-sans">
                ATUAÇÃO NO MERCADO
              </h2>
              <div className="w-16 h-[2px] bg-accent-lime"></div>
              <p className="text-zinc-500 text-xs max-w-xs leading-relaxed font-mono">
                Minha trajetória como desenvolvedor construindo soluções robustas desde os primeiros passos na programação.
              </p>
            </motion.div>

            <div className="md:col-span-8 flex flex-col gap-6">
              {EXPERIENCES.map((exp, idx) => (
                <motion.div
                  key={exp.company}
                  variants={revealVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: idx * 0.15 }}
                  className="p-6 rounded-sm bg-zinc-950/60 border border-white/5 hover:border-accent-lime/30 transition-all duration-300 select-none group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-base font-bold text-white font-sans">{exp.role}</h3>
                      <p className="text-xs font-mono text-accent-lime font-bold uppercase">{exp.company}</p>
                    </div>
                    <span className="text-xs font-mono text-zinc-500">{exp.period}</span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed font-sans mb-6">
                    {exp.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-sm bg-white/[0.02] border border-white/[0.05] text-[10px] font-mono text-zinc-400 group-hover:text-white transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Featured Projects Section (Helmet Hall of Fame Replica) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-12 border-t border-white/[0.03]">
            <motion.div
              variants={revealVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="md:col-span-4 flex flex-col gap-4"
            >
              <span className="section-tag">05 / Showcase</span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-white uppercase font-sans">
                PROJETOS AUTORAIS
              </h2>
              <div className="w-16 h-[2px] bg-accent-lime"></div>
              <p className="text-zinc-500 text-xs max-w-xs leading-relaxed font-mono">
                Modelos interativos com revelação dupla em hover. Toque ou clique para abrir a arquitetura detalhada e fluxo de dados.
              </p>
            </motion.div>

            {/* Helmet Grid replica */}
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {PROJECTS.map((proj, idx) => (
                <motion.div
                  key={proj.title}
                  variants={revealVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: idx * 0.15 }}
                  onClick={() => setSelectedProject(proj)}
                  className="relative h-[340px] rounded-sm overflow-hidden flex flex-col justify-end p-6 border border-white/5 bg-zinc-950/60 cursor-pointer select-none group"
                >
                  {/* Background Image: Hidden/Dark in base, fades and zooms in on Hover */}
                  <div className="absolute inset-0 w-full h-full -z-10 bg-black">
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="object-cover filter grayscale contrast-125 brightness-[0.05] group-hover:brightness-[0.25] group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    {/* Glowing green overlay fade in on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent group-hover:via-accent-lime-muted/20 transition-all duration-500"></div>
                  </div>

                  {/* Top Metadata */}
                  <div className="flex items-center justify-between mb-auto z-10">
                    <span className="text-[9px] font-mono tracking-widest text-accent-lime uppercase font-bold">
                      {proj.type}
                    </span>
                    <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase px-1.5 py-0.5 rounded-sm bg-white/[0.02] border border-white/[0.05]">
                      {proj.year}
                    </span>
                  </div>

                  {/* Content details */}
                  <div className="z-10 mt-6">
                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight uppercase leading-none mb-2 font-sans group-hover:text-accent-lime transition-colors duration-300">
                      {proj.title}
                    </h3>
                    
                    {/* Desc */}
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans mb-5 line-clamp-3">
                      {proj.desc}
                    </p>
                  </div>

                  {/* Bottom details block (Helmets footer style) */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-3 z-10">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Ver Arquitetura</span>
                    <span className="text-[12px] text-accent-lime group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                  </div>

                  {/* Indicator bottom line */}
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-zinc-900 group-hover:bg-accent-lime transition-colors duration-500"></div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Project Details Modal Rendering */}
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
