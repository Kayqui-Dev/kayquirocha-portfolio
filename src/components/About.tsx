"use client";

import { motion } from "framer-motion";
import DualIdentityImage from "./DualIdentityImage";

export default function About() {
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

  const bentoFacts = [
    {
      title: "Formação Acadêmica",
      desc: "FMU — Análise e Des. de Sistemas",
      subDesc: "Zenithon — Inteligência Artificial",
    },
    {
      title: "Comunicação",
      desc: "Inglês Nível B2 (Intermediário Avançado)",
      subDesc: "Colaboração global e leitura técnica fluida",
    },
    {
      title: "Atuação Profissional",
      desc: "Fundador da Kodava Solutions",
      subDesc: "Desenvolvedor Full-Stack na VTP",
    },
    {
      title: "Atletismo de Elite",
      desc: "Atleta de Wrestling Federado / NTG",
      subDesc: "Medalhista em torneios de luta olímpica",
    },
  ];

  const stats = [
    { value: "7+ Anos", label: "Na Tecnologia" },
    { value: "Full", label: "Stack Dev" },
    { value: "NTG", label: "Wrestling Elite" },
    { value: "FMU/IA", label: "Formação" },
  ];

  return (
    <section id="sobre" className="py-32 md:py-48 border-t border-white/[0.05] bg-black relative">
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 md:px-16 flex flex-col gap-20">
        
        {/* Section Header (Lando message style) */}
        <motion.div
          variants={revealVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-3"
        >
          <span className="section-tag">01 / Mensagem</span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-white uppercase font-sans">
            MENSAGEM DE KAYQUI
          </h2>
          <div className="w-16 h-[2px] bg-accent-lime mt-1"></div>
        </motion.div>

        {/* Lando-Style Statement Text */}
        <motion.div
          variants={revealVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl"
        >
          <p className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
            <span className="text-accent-lime">Redefinindo</span> limites, lutando por <span className="text-accent-lime">vitórias</span> e entregando o meu melhor em cada linha de código. Construindo um <span className="text-accent-lime">legado</span> em engenharia de software e Wrestling, dentro e fora do tatame.
          </p>
        </motion.div>

        {/* 2-Column Split: Bio Narrative & Stats (Left) & Dual Image Mask (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mt-6">
          
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <motion.div
              variants={revealVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col gap-6 text-zinc-400 text-base md:text-lg font-normal leading-relaxed font-sans"
            >
              <p>
                Iniciei minha jornada técnica aos **11 anos** guiado por uma curiosidade profunda por código. O que começou como diversão rapidamente se transformou em uma busca obstinada pela excelência e maturidade em engenharia de sistemas.
              </p>
              <p>
                Minha rotina exige dedicação total de alta performance. Além de gerenciar a **Kodava Solutions** e integrar automações de IA, treino Luta Livre Olímpica de alto rendimento afiliado ao **NTG (National Training Group)**.
              </p>
              <p>
                Entendo que o tatame e o código compartilham o mesmo DNA: ambos demandam consistência extrema, resiliência silenciosa nas sessões diárias e foco imperturbável na meta final.
              </p>
            </motion.div>

            {/* Horizontal Stats List */}
            <motion.div
              variants={revealVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/5 select-none"
            >
              {stats.map((stat, idx) => (
                <div key={idx} className="border-l border-zinc-800 pl-4">
                  <p className="text-3xl md:text-4xl font-mono tracking-tight text-white font-black">
                    {stat.value}
                  </p>
                  <p className="text-[10px] text-zinc-500 tracking-widest uppercase mt-2 font-mono font-bold">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Dynamic Image */}
          <motion.div
            variants={revealVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 flex items-center justify-center w-full"
          >
            <DualIdentityImage />
          </motion.div>
        </div>

        {/* Bento highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {bentoFacts.map((fact, idx) => (
            <motion.div
              key={fact.title}
              variants={revealVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.15 }}
              className="p-6 rounded-sm bg-zinc-950/60 border border-white/5 hover:border-accent-lime/30 transition-all duration-300 select-none group"
            >
              <p className="font-mono text-[9px] text-accent-lime uppercase tracking-wider mb-3 font-bold group-hover:translate-x-1 transition-transform duration-300">
                {fact.title}
              </p>
              <p className="text-white text-sm font-semibold tracking-tight font-sans">
                {fact.desc}
              </p>
              <p className="text-zinc-500 text-xs mt-1.5 font-sans">
                {fact.subDesc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
