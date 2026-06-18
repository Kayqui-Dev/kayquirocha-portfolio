"use client";

import { motion } from "framer-motion";

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

export default function Projects() {
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
    <section id="experiencia" className="py-32 md:py-48 border-t border-white/[0.05] bg-transparent">
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 md:px-16 flex flex-col gap-20">
        
        {/* Experience Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <motion.div
            variants={revealVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-4 flex flex-col gap-4 select-none"
          >
            <span className="section-tag">01.2 / Trajetória & Experiência</span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-white uppercase font-sans">
              ATUAÇÃO NO MERCADO
            </h2>
            <div className="w-16 h-[2px] bg-[#00A3FF]"></div>
            <p className="text-zinc-500 text-xs max-w-xs leading-relaxed font-mono">
              Minha trajetória profissional construindo soluções robustas de tecnologia de ponta para empresas.
            </p>
          </motion.div>

          <div className="lg:col-span-8 flex flex-col gap-6">
            {EXPERIENCES.map((exp, idx) => (
              <motion.div
                key={exp.company}
                variants={revealVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.15 }}
                className="p-6 rounded-sm bg-zinc-950/60 border border-white/5 hover:border-[#00A3FF]/30 transition-all duration-300 select-none group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-base font-bold text-white font-sans">{exp.role}</h3>
                    <p className="text-xs font-mono text-[#00A3FF] font-bold uppercase">{exp.company}</p>
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

      </div>
    </section>
  );
}
