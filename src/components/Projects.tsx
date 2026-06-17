"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectModal from "./ProjectModal";

const EXPERIENCES = [
  {
    role: "Fundador & Tech Lead",
    company: "Kodava Solutions",
    period: "2024 — Presente",
    desc: "Fundação e liderança técnica no desenvolvimento de sistemas web corporativos, automação inteligente e integrações customizadas de Inteligência Artificial para otimização de operações empresariais.",
    tags: ["React", "Python", "Supabase", "n8n", "AI APIs"],
  },
  {
    role: "Desenvolvedor Full-Stack",
    company: "VTP",
    period: "2023 — Presente",
    desc: "Criação, refatoração e manutenção de plataformas web de ponta a ponta. Foco constante em arquitetura limpa, escalabilidade, segurança e refinamento de performance de carregamento (Core Web Vitals).",
    tags: ["React", "PHP", "JavaScript", "SQL", "Tailwind"],
  },
];

const PROJECTS = [
  {
    title: "Centurion Scout",
    type: "Combate & Performance",
    desc: "Sistema especializado de scouting tático e base de dados detalhada para treinadores e atletas de esportes de combate (Wrestling, MMA, Jiu-Jitsu). Permite registrar métricas de performance, padrões de luta e análise estatística de adversários.",
    longDesc: "O Centurion Scout é uma plataforma inovadora criada na intersecção entre tecnologia de ponta e esportes de combate. Ele resolve o gargalo de análise tática subjetiva em artes marciais, trazendo dados objetivos e mapas visuais detalhados para treinadores, atletas olímpicos e lutadores profissionais estruturarem seus planos de luta (Wrestling, MMA e Jiu-Jitsu).",
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
    featured: true,
  },
  {
    title: "Decide Aí Vida",
    type: "Utilitário Inteligente",
    desc: "Aplicativo inteligente que ajuda na tomada de decisão estruturada. Utiliza lógica avançada e processamento de IA para ponderar cenários cotidianos e reduzir a fadiga de escolha dos usuários.",
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
    featured: false,
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<(typeof PROJECTS)[0] | null>(null);

  // Scroll Reveal Animations Settings
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
      <section id="projetos" className="py-32 md:py-48 border-t border-white/[0.05] bg-[#000000]">
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
              <span className="section-tag">03 / Experiência</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-white leading-none font-serif">
                Atuação no Mercado
              </h2>
              <p className="text-zinc-500 text-xs max-w-xs leading-relaxed font-mono mt-1">
                Minha trajetória como desenvolvedor construindo soluções robustas desde os primeiros passos na programação.
              </p>
            </motion.div>

            <div className="md:col-span-8 flex flex-col gap-8">
              {EXPERIENCES.map((exp, idx) => (
                <motion.div
                  key={exp.company}
                  variants={revealVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: idx * 0.15 }}
                  className="p-6 rounded-sm bg-white/[0.01] border border-white/[0.03] hover:border-white/[0.08] transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-base font-bold text-white font-sans">{exp.role}</h3>
                      <p className="text-xs font-mono text-red-500 font-semibold">{exp.company}</p>
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
                        className="px-2 py-0.5 rounded-sm bg-white/[0.02] border border-white/[0.05] text-[10px] font-mono text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Featured Projects Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-12 border-t border-white/[0.03]">
            <motion.div
              variants={revealVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="md:col-span-4 flex flex-col gap-4"
            >
              <span className="section-tag">04 / Projetos</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-white leading-none font-serif">
                Projetos Autorais
              </h2>
              <p className="text-zinc-500 text-xs max-w-xs leading-relaxed font-mono mt-1">
                Aplicações construídas para resolver problemas reais de nicho, fundindo tecnologia com paixões pessoais. Clique para ver detalhes técnicos.
              </p>
            </motion.div>

            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROJECTS.map((proj, idx) => (
                <motion.div
                  key={proj.title}
                  variants={revealVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: idx * 0.15 }}
                  onClick={() => setSelectedProject(proj)}
                  className={`p-6 rounded-sm bg-white/[0.01] border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                    proj.featured
                      ? "border-red-500/20 hover:border-red-500/40 bg-red-950/[0.01]"
                      : "border-white/[0.03] hover:border-white/[0.08]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">
                        {proj.type}
                      </span>
                      {proj.featured && (
                        <span className="px-1.5 py-0.5 rounded-sm bg-red-500/10 border border-red-500/20 text-[9px] font-mono text-red-400 uppercase font-semibold">
                          Destaque
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-white tracking-tight mb-2 font-serif">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans mb-6">
                      {proj.desc}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-sm bg-white/[0.02] border border-white/[0.05] text-[9px] font-mono text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
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
