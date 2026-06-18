"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position of the Hero container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scroll transforms for parallax, scale, and fade effects
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 0.95]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [0.4, 0.1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[150vh] w-full bg-black">
      {/* Pinned Sticky Wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center">
        {/* Background Grid Texture */}
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        {/* Parallax Background Trophy Image */}
        <motion.div
          style={{ scale, opacity: imageOpacity }}
          className="absolute inset-0 w-full h-full -z-10 bg-[#000000]"
        >
          <Image
            src="/kayqui_trophy.jpg"
            alt="Kayqui Rocha Godinho - Conquista CBW"
            fill
            priority
            className="object-cover filter grayscale contrast-110 brightness-[0.35]"
          />
          {/* Vercel-style bottom fade to Pure Black */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
        </motion.div>

        {/* Hero Copy Content */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="z-10 flex flex-col items-center text-center px-6 max-w-4xl"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] mb-8 backdrop-blur-sm select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
            <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase font-bold">
              Full-Stack Dev & Wrestling Athlete
            </span>
          </div>

          {/* Title (Playfair Serif Font) */}
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter leading-[0.9] text-white font-serif uppercase">
            Kayqui Rocha
          </h1>
          <span className="text-xl sm:text-2xl md:text-3xl font-mono tracking-[0.2em] text-red-500 uppercase mt-4 block font-extrabold">
            Godinho
          </span>

          {/* Short Bio Subtitle */}
          <p className="text-zinc-400 text-sm sm:text-base md:text-lg font-normal max-w-2xl leading-relaxed mt-8 font-sans">
            Fundador da Kodava Solutions & Zenithon Academy IA.
            Trazendo a disciplina, consistência e o foco de atleta competitivo de Wrestling para a engenharia de software de alta performance.
          </p>

          {/* Call-to-actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full sm:w-auto px-4 sm:px-0">
            <a
              href="#sobre"
              className="inline-flex h-11 items-center justify-center rounded-sm bg-white px-8 text-xs font-mono font-bold text-black uppercase hover:opacity-90 transition-opacity duration-300 w-full sm:w-auto text-center"
            >
              Iniciar Exploração
            </a>
            <a
              href="#contato"
              className="inline-flex h-11 items-center justify-center rounded-sm border border-zinc-800 bg-black/45 px-8 text-xs font-mono text-zinc-400 uppercase hover:bg-white/[0.02] hover:border-zinc-700 transition-all duration-300 w-full sm:w-auto text-center"
            >
              Contato
            </a>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 select-none"
        >
          <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase font-bold">
            Role para ver
          </span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-red-500 to-transparent animate-bounce"></div>
        </motion.div>
      </div>
    </div>
  );
}
