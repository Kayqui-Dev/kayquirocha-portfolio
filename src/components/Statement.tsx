"use client";

import { motion } from "framer-motion";

export default function Statement() {
  const revealVariants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="statement" className="py-32 md:py-44 bg-transparent relative flex flex-col items-center justify-center text-center overflow-hidden select-none border-t border-white/[0.03]">
      <motion.div
        variants={revealVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 flex flex-col items-center gap-14"
      >
        {/* Laurel Wreath Badge (inspired by Lando's McLaren badge) */}
        <div className="flex flex-col items-center gap-4">
          <svg className="w-14 h-14 text-[#00A3FF]/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M 6 4 C 4 7, 4 12, 6 15 C 8 18, 11 19, 12 19 C 13 19, 16 18, 18 15 C 20 12, 20 7, 18 4 M 9 6 C 8 8, 8 11, 9 13 C 10 15, 11 16, 12 16 C 13 16, 14 15, 15 13 C 16 11, 16 8, 15 6" />
            <circle cx="12" cy="11" r="1.5" fill="currentColor" />
          </svg>
          <span className="text-[10px] font-mono tracking-[0.35em] text-[#00A3FF] uppercase font-bold text-center">
            KODAVA SOLUTIONS / NTG WRESTLING
          </span>
        </div>

        {/* Defining Phrase (Giant Serif & Outlined Contrast) */}
        <div className="flex flex-col gap-4 font-serif uppercase tracking-tighter text-center">
          <h2 className="text-4xl sm:text-7xl md:text-8.5xl lg:text-9.5xl font-black text-white leading-[0.85] md:leading-[0.8] font-serif">
            CÓDIGO DE IMPACTO,
          </h2>
          <h2 className="text-4xl sm:text-7xl md:text-8.5xl lg:text-9.5xl font-black text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.45)] leading-[0.85] md:leading-[0.8] font-serif">
            SISTEMAS INDESTRUTÍVEIS.
          </h2>
          <h2 className="text-4xl sm:text-7xl md:text-8.5xl lg:text-9.5xl font-black text-white leading-[0.85] md:leading-[0.8] font-serif">
            LEVANDO A <span className="text-[#00A3FF] font-serif filter drop-shadow-[0_2px_10px_rgba(0,163,255,0.2)]">KODAVA</span> AO TOPO,
          </h2>
          <h2 className="text-4xl sm:text-7xl md:text-8.5xl lg:text-9.5xl font-black text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.45)] leading-[0.85] md:leading-[0.8] font-serif">
            DO TATAME À LINHA DE COMANDO.
          </h2>
        </div>
      </motion.div>
    </section>
  );
}
