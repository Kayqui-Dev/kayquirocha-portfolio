"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function WrestlingMindset() {
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
    <section id="mindset" className="py-32 md:py-48 border-t border-white/[0.05] bg-black">
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 md:px-16 flex flex-col gap-16">
        
        {/* Section Header */}
        <motion.div
          variants={revealVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-4"
        >
          <span className="section-tag">05 / Estilo de Vida</span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-white uppercase font-sans">
            ON TRACK & OFF TRACK
          </h2>
          <div className="w-16 h-[2px] bg-accent-lime"></div>
          <p className="text-zinc-400 text-sm max-w-xl font-sans">
            Alta performance em duas frentes. A disciplina inabalável aplicada dentro e fora do tatame de Luta Livre.
          </p>
        </motion.div>

        {/* Lando-style double card split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: ON TRACK (Wrestling / Combat) */}
          <motion.div
            variants={revealVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="relative h-[450px] sm:h-[500px] rounded-sm overflow-hidden flex flex-col justify-end p-8 border border-white/5 bg-[#041E15]/30 group select-none"
          >
            {/* Background image */}
            <div className="absolute inset-0 w-full h-full -z-10 bg-black">
              <Image
                src="/kayqui_wrestler.png"
                alt="Wrestling Atleta NTG"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover filter grayscale contrast-125 brightness-[0.2] group-hover:scale-105 group-hover:brightness-[0.3] transition-all duration-700 ease-out"
              />
              {/* Emerald dark green gradient glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-[#041E15]/30"></div>
            </div>

            {/* Content info */}
            <div className="z-10">
              <span className="font-mono text-[9px] tracking-[0.2em] text-accent-lime font-bold uppercase mb-2 block">
                — ATLETISMO DE ELITE (WRESTLING)
              </span>
              
              {/* Massive letters */}
              <h3 className="text-5xl sm:text-7xl font-black tracking-tighter text-white uppercase leading-none font-sans group-hover:text-accent-lime transition-colors duration-300">
                ON <br />
                TRACK
              </h3>

              <p className="text-zinc-400 text-sm leading-relaxed max-w-md mt-6 font-sans">
                Rotina intensa de treinos diários como atleta federado do **NTG (National Training Group)**. O Wrestling olímpico exige resiliência mental fria e preparação silenciosa antes de pisar no tapete.
              </p>

              {/* Highlights tags */}
              <div className="flex flex-wrap gap-2 mt-6 border-t border-white/5 pt-6 font-mono text-[9px] text-zinc-500 uppercase font-bold">
                <span className="text-accent-lime">★ NTG Competitivo</span>
                <span>• Prata no Paulista (CBW)</span>
                <span>• Disciplina Física</span>
              </div>
            </div>

            {/* Border bottom indicator */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-zinc-900 group-hover:bg-accent-lime transition-colors duration-500"></div>
          </motion.div>

          {/* Card 2: OFF TRACK (Developer / Tech Lead) */}
          <motion.div
            variants={revealVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="relative h-[450px] sm:h-[500px] rounded-sm overflow-hidden flex flex-col justify-end p-8 border border-white/5 bg-zinc-950/40 group select-none"
          >
            {/* Background image */}
            <div className="absolute inset-0 w-full h-full -z-10 bg-black">
              <Image
                src="/kayqui_developer.jpg"
                alt="Software Engineer Developer"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover filter grayscale contrast-115 brightness-[0.2] group-hover:scale-105 group-hover:brightness-[0.28] transition-all duration-700 ease-out"
              />
              {/* Dark studio gradient glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
            </div>

            {/* Content info */}
            <div className="z-10">
              <span className="font-mono text-[9px] tracking-[0.2em] text-accent-lime font-bold uppercase mb-2 block">
                — ENGENHARIA DE SOFTWARE & IA
              </span>
              
              {/* Massive letters */}
              <h3 className="text-5xl sm:text-7xl font-black tracking-tighter text-white uppercase leading-none font-sans group-hover:text-accent-lime transition-colors duration-300">
                OFF <br />
                TRACK
              </h3>

              <p className="text-zinc-400 text-sm leading-relaxed max-w-md mt-6 font-sans">
                Fundação da **Kodava Solutions** e atuação como Desenvolvedor Full-Stack na **VTP**. Desenvolvimento de produtos digitais, integrações inteligentes de APIs de Inteligência Artificial e automações de fluxos de processos.
              </p>

              {/* Highlights tags */}
              <div className="flex flex-wrap gap-2 mt-6 border-t border-white/5 pt-6 font-mono text-[9px] text-zinc-500 uppercase font-bold">
                <span className="text-accent-lime">★ Kodava Founder</span>
                <span>• Full-Stack na VTP</span>
                <span>• Automações Inteligentes</span>
              </div>
            </div>

            {/* Border bottom indicator */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-zinc-900 group-hover:bg-accent-lime transition-colors duration-500"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
