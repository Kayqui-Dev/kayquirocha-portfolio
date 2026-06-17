"use client";

import { motion } from "framer-motion";

const MILESTONES = [
  {
    age: "11 Anos",
    title: "O Primeiro Commit",
    desc: "Início no desenvolvimento de software de forma autodidata. Primeiras páginas HTML, lógica com JavaScript básico e desenvolvimento de pequenos scripts.",
    status: "Curiosidade",
  },
  {
    age: "15 Anos",
    title: "Profissionalização & Automação",
    desc: "Desenvolvimento freelancer de scripts em Python, web scraping, gerenciamento de servidores VPS e primeiros passos em integrações de APIs.",
    status: "Exploração",
  },
  {
    age: "17 Anos",
    title: "Kodava & Inteligência Artificial",
    desc: "Fundação da Kodava Solutions. Formação especializada em IA pela Zenithon Academy, integrando modelos cognitivos a sistemas empresariais.",
    status: "Liderança",
  },
  {
    age: "18 Anos (Atual)",
    title: "Alta Performance & NTG",
    desc: "ADS na FMU. Engenheiro Full-Stack na VTP atuando com React e microsserviços. Rotina intensa de atleta competitivo de Wrestling no NTG.",
    status: "Excelência",
  },
];

export default function HorizontalTimeline() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="py-32 md:py-48 border-t border-white/[0.05] overflow-hidden bg-[#000000]">
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 md:px-16 flex flex-col gap-12">
        {/* Section Title */}
        <div className="flex flex-col gap-4">
          <span className="section-tag">01.2 / Trajetória</span>
          <h2 className="text-3xl font-extrabold tracking-tighter text-white leading-none font-serif">
            Linha do Tempo
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl font-sans">
            A evolução contínua de um desenvolvedor focado em alta performance, de soluções simples aos 11 anos até arquiteturas complexas.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative mt-8">
          {/* Main Horizontal Timeline Bar */}
          <div className="absolute top-[45px] left-0 right-0 h-[1.5px] bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 pointer-events-none"></div>

          {/* Scrolling Container */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 overflow-x-auto pb-4 scrollbar-thin"
          >
            {MILESTONES.map((milestone) => (
              <motion.div
                key={milestone.age}
                variants={itemVariants}
                className="relative flex flex-col pt-12 min-w-[240px] md:min-w-0"
              >
                {/* Timeline Node Point */}
                <div className="absolute top-[37px] left-4 z-10 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-zinc-950 border-2 border-red-500 flex items-center justify-center relative">
                    <span className="absolute w-2 h-2 rounded-full bg-red-500 animate-ping opacity-75"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 rounded-sm bg-white/[0.01] border border-white/[0.03] hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300 flex flex-col justify-between h-full group">
                  <div>
                    {/* Header Info */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-lg font-bold text-white tracking-tight">
                        {milestone.age}
                      </span>
                      <span className="text-[8px] font-mono tracking-widest text-zinc-500 uppercase px-1.5 py-0.5 rounded-sm bg-white/[0.02] border border-white/[0.05]">
                        {milestone.status}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2 group-hover:text-red-500 transition-colors duration-300">
                      {milestone.title}
                    </h3>

                    {/* Desc */}
                    <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                      {milestone.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
