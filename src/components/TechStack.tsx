"use client";

import { motion } from "framer-motion";

const STACK_ITEMS = [
  {
    name: "React / Next.js",
    category: "Frontend & UI",
    desc: "Criação de interfaces web de alto desempenho utilizando App Router, TypeScript, Tailwind e renderização híbrida.",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    ),
  },
  {
    name: "Python",
    category: "Backend & IA",
    desc: "Scripts de automação, manipulação de dados, scripts de scraping e backend resiliente integrado a IA.",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    name: "Supabase",
    category: "Database & Auth",
    desc: "Modelagem PostgreSQL, segurança com RLS (Row Level Security), real-time subscriptions e Serverless Functions.",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
  {
    name: "n8n",
    category: "Workflow Automation",
    desc: "Orquestração de microsserviços, automação de processos de negócios e integração inteligente entre plataformas.",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    name: "JavaScript / TS",
    category: "Espinha Dorsal",
    desc: "Domínio de sintaxe moderna (ES6+), manipulação assíncrona, tipagem estática e NodeJS para microsserviços.",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: "PHP",
    category: "Backend Legacy/Mod",
    desc: "Manutenção de sistemas e desenvolvimento de APIs rápidas integradas a bancos de dados relacionais.",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
      </svg>
    ),
  },
  {
    name: "APIs de IA",
    category: "Inteligência Artificial",
    desc: "Integração direta com LLMs (Gemini, GPT) para estruturação de dados, automação cognitiva e agentes inteligentes.",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    name: "Hospedagem & VPS",
    category: "Infraestrutura",
    desc: "Gerenciamento de servidores VPS, Docker, pipelines de CI/CD para deploy rápido e monitoramento na nuvem.",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    ),
  },
];

export default function TechStack() {
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
    <section id="stack" className="py-32 md:py-48 border-t border-white/[0.05] bg-[#000000]">
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 md:px-16 flex flex-col gap-12">
        {/* Section Header */}
        <motion.div
          variants={revealVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-4"
        >
          <span className="section-tag">02 / Tech Stack</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-white leading-none font-serif">
            Arsenal Tecnológico
          </h2>
          <p className="text-zinc-400 text-sm max-w-xl font-sans">
            Ferramentas e tecnologias selecionadas para criar soluções robustas, automatizadas e de alta performance.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STACK_ITEMS.map((tech, idx) => (
            <motion.div
              key={tech.name}
              variants={revealVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1 }}
              className="p-5 rounded-sm bg-white/[0.01] border border-white/[0.03] hover:border-white/[0.1] hover:bg-white/[0.03] transition-all duration-300 flex flex-col justify-between group select-none"
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] font-mono tracking-wider text-zinc-500 uppercase">
                    {tech.category}
                  </span>
                  <div className="text-zinc-500 group-hover:text-red-500 transition-colors duration-300">
                    {tech.icon}
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-sm font-semibold text-white tracking-tight mb-2 font-mono">
                  {tech.name}
                </h3>

                {/* Desc */}
                <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                  {tech.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
