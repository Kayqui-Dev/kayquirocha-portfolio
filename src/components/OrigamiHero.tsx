"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface OrigamiHeroProps {
  onStartExperience: () => void;
}

export default function OrigamiHero({ onStartExperience }: OrigamiHeroProps) {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between items-center py-12 px-6 bg-black overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-6xl flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
            <span className="text-[10px] font-mono font-bold text-white">O</span>
          </div>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-300 font-bold">
            Kayqui Origami
          </span>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#00A3FF] font-bold">
          Visão Computacional ✦ 2026
        </span>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl w-full z-10 my-12">
        {/* Left Side: Copy */}
        <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start select-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center lg:items-start"
          >
            <span className="text-[9px] font-mono tracking-[0.3em] text-[#00A3FF] uppercase font-bold mb-4 px-2 py-0.5 rounded-full bg-[#00A3FF]/10 border border-[#00A3FF]/20">
              ✦ Interativo & Sensorial ✦
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-white leading-tight">
              A Arte do <br />
              <span className="italic font-serif font-normal text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.85)]">
                Origami Dinâmico
              </span>
            </h1>
            <p className="text-sm font-mono text-zinc-400 mt-6 max-w-md leading-relaxed">
              Explore o colapso e a expansão de uma forma tridimensional através dos seus movimentos corporais e do scroll do navegador.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto"
          >
            {/* Start IA Experience */}
            <button
              onClick={onStartExperience}
              className="bg-white hover:bg-zinc-200 text-black border border-white rounded-full px-6 py-3 text-xs font-mono uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] cursor-pointer hover:scale-105 animate-pulse"
            >
              Ativar Visão IA (Gestos)
            </button>
            
            <a
              href="#origami-section"
              className="bg-transparent hover:bg-white/5 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 rounded-full px-6 py-3 text-xs font-mono uppercase tracking-widest transition-all duration-300 cursor-pointer"
            >
              Ou Role para Explorar
            </a>
          </motion.div>
        </div>

        {/* Right Side: Origami Visual */}
        <div className="flex-1 flex justify-center items-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-[min(80vw,40vh)] sm:w-[min(380px,45vh)] aspect-square overflow-hidden border border-zinc-800 rounded-2xl bg-zinc-950/40 backdrop-blur-md shadow-[0_30px_60px_rgba(0,0,0,0.8)] flex items-center justify-center p-8 group hover:border-[#00A3FF]/30 transition-colors duration-300"
          >
            <div className="relative w-full h-full animate-float">
              <Image
                src="/imagen_origami.png"
                alt="Visual Origami"
                fill
                priority
                className="object-contain filter brightness-95 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            {/* Ambient Tech Line Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(0,163,255,0.02),rgba(0,0,0,0),rgba(0,163,255,0.02))] bg-[size:100%_4px,3px_100%] pointer-events-none rounded-2xl" />
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center z-10 select-none">
        <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-600">
          Role para baixo ou clique no botão acima para iniciar.
        </span>
      </footer>
    </section>
  );
}
