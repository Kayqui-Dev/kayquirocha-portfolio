"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scroll animations for Lando-style entrance zoom
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, 0.95]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [0.4, 0.08, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[150vh] w-full bg-black">
      {/* Pinned Sticky Hero viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-16 px-6 sm:px-12 md:px-16">
        
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        {/* Fullscreen Grayscale Background Image */}
        <motion.div
          style={{ scale, opacity: imageOpacity }}
          className="absolute inset-0 w-full h-full -z-10 bg-[#000000]"
        >
          <Image
            src="/kayqui_trophy.jpg"
            alt="Kayqui Rocha Godinho - Troféu CBW"
            fill
            priority
            sizes="100vw"
            className="object-cover filter grayscale contrast-120 brightness-[0.22] lg:object-center"
          />
          {/* Top & Bottom dark fades */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
        </motion.div>

        {/* Top Header Row (Since 2019 / Metadata) */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="w-full flex justify-between items-start font-mono text-[9px] tracking-widest text-zinc-500 uppercase z-10 pt-10"
        >
          <div>
            <span className="text-white font-bold">KAYQUI ROCHA GODINHO</span>
            <p className="text-zinc-600 mt-1">SÃO PAULO, BRASIL</p>
          </div>
          <div className="text-right">
            <span className="text-accent-lime font-bold">FULL-STACK DEV / ATLETA NTG</span>
            <p className="text-zinc-600 mt-1">DESDE 2019</p>
          </div>
        </motion.div>

        {/* Center: Massive typography layout and Signature overlay */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="w-full flex flex-col items-start justify-center relative z-10 my-auto"
        >
          {/* Lando-style digital green signature path overlaying the text */}
          <div className="absolute right-0 sm:right-[15%] lg:right-[30%] top-[-30px] sm:top-[-60px] w-48 sm:w-80 h-32 sm:h-48 z-20 pointer-events-none opacity-80 select-none animate-pulse-slow">
            <svg
              viewBox="0 0 500 200"
              fill="none"
              stroke="#00A3FF"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-full h-full"
            >
              {/* Animated handdrawn look of "Kayqui" signature */}
              <path
                d="M 50 150 C 80 50, 100 20, 120 70 C 130 90, 140 150, 150 150 C 160 150, 180 80, 190 100 C 200 110, 210 130, 220 130 C 230 130, 250 80, 260 90 C 270 100, 280 120, 290 120 C 310 120, 330 30, 340 50 C 350 70, 320 180, 360 170 C 390 160, 420 110, 450 110 C 470 110, 480 130, 490 140"
                className="opacity-75"
              />
              <path d="M 100 110 L 400 130" className="opacity-40" />
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="font-mono text-[9px] tracking-[0.3em] text-accent-lime uppercase font-bold mb-2 block">
              — DESENVOLVIMENTO & WRESTLING DE ELITE
            </span>
            <h1 className="text-6xl sm:text-8xl md:text-9.5xl font-black tracking-tighter leading-[0.8] text-white select-none uppercase font-sans">
              KAYQUI <br />
              <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.25)] font-sans">
                ROCHA
              </span>
            </h1>
          </div>
        </motion.div>

        {/* Bottom Panel (Next challenge / scroll indicator) */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6 z-10 font-mono"
        >
          {/* Next Race replica: Next Sprint / Challenge block */}
          <div className="border-l-2 border-accent-lime pl-4 flex flex-col">
            <span className="text-[9px] text-zinc-500 tracking-wider uppercase font-bold">Próximo Desafio</span>
            <span className="text-white text-xs font-bold uppercase mt-1">CPB Torneio de Luta Livre / Kodava IA</span>
            <span className="text-accent-lime text-[10px] uppercase font-bold mt-0.5">SÃO PAULO — BRASIL</span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-4">
            <a
              href="#sobre"
              className="inline-flex h-10 items-center justify-center rounded-sm bg-accent-lime px-8 text-[10px] font-mono font-bold text-black uppercase hover:bg-white transition-all duration-300"
            >
              Entrar
            </a>
            <a
              href="#contato"
              className="inline-flex h-10 items-center justify-center rounded-sm border border-zinc-800 bg-black/60 px-8 text-[10px] font-mono text-zinc-400 uppercase hover:text-white hover:border-zinc-500 transition-all duration-300"
            >
              Contato
            </a>
          </div>

          {/* Scroll reminder */}
          <div className="hidden md:flex items-center gap-4 select-none">
            <span className="text-[9px] text-zinc-500 tracking-widest uppercase font-bold">Deslize para navegar</span>
            <div className="w-8 h-[1px] bg-accent-lime/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-accent-lime w-1/2 animate-[pulse_1.5s_infinite]"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
