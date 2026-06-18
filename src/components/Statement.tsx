"use client";

import { motion } from "framer-motion";

export default function Statement() {
  const revealVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="statement" className="py-24 md:py-32 bg-transparent relative flex flex-col items-center justify-center text-center overflow-hidden select-none border-t border-white/[0.03]">
      <motion.div
        variants={revealVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 flex flex-col items-center gap-10"
      >
        {/* Laurel Wreath Badge (inspired by Lando's McLaren badge) */}
        <div className="flex flex-col items-center gap-3">
          <svg className="w-12 h-12 text-[#00A3FF]/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M 6 4 C 4 7, 4 12, 6 15 C 8 18, 11 19, 12 19 C 13 19, 16 18, 18 15 C 20 12, 20 7, 18 4 M 9 6 C 8 8, 8 11, 9 13 C 10 15, 11 16, 12 16 C 13 16, 14 15, 15 13 C 16 11, 16 8, 15 6" />
            <circle cx="12" cy="11" r="1.5" fill="currentColor" />
          </svg>
          <span className="text-[9px] font-mono tracking-[0.3em] text-[#00A3FF] uppercase font-bold text-center">
            KODAVA SOLUTIONS / NTG WRESTLING • DESDE 2019
          </span>
        </div>

        {/* Defining Phrase (Giant Serif & Outlined Contrast) */}
        <div className="flex flex-col gap-2 font-serif uppercase tracking-tighter">
          <h2 className="text-4xl sm:text-7xl md:text-8.5xl font-black text-white leading-[0.9] md:leading-[0.85]">
            REDEFININDO <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.45)] font-serif">LIMITES</span>,
          </h2>
          <h2 className="text-4xl sm:text-7xl md:text-8.5xl font-black text-white leading-[0.9] md:leading-[0.85]">
            LUTANDO POR <span className="text-[#00A3FF] font-serif filter drop-shadow-[0_2px_10px_rgba(0,163,255,0.2)]">VITÓRIAS</span>.
          </h2>
        </div>
      </motion.div>
    </section>
  );
}
