"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function DualIdentityImage() {
  return (
    <div className="relative aspect-[3/4] w-full max-w-sm rounded-2xl overflow-hidden border border-white/10 bg-[#000000] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] group cursor-pointer select-none">
      {/* Camada Base (Fundo): Wrestling Athlete Persona */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/kayqui_wrestler.png"
          alt="Kayqui Rocha - Atleta NTG Wrestling"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover filter grayscale contrast-[1.35] brightness-90 transition-transform duration-700 group-hover:scale-105"
        />
        {/* Label */}
        <div className="absolute bottom-5 right-5 bg-red-600/95 text-white font-mono text-[9px] uppercase tracking-widest px-3 py-1 rounded-sm z-20 border border-red-500/20 shadow-lg font-bold">
          NTG Athlete
        </div>
      </div>

      {/* Camada Superior (Frente): Developer Persona (Clipped on Hover) */}
      <motion.div
        initial={{ clipPath: "inset(0 0 0 0%)" }}
        whileHover={{ clipPath: "inset(0 0 0 100%)" }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="absolute inset-0 z-10 w-full h-full origin-left"
      >
        <Image
          src="/kayqui_developer.jpg"
          alt="Kayqui Rocha - Dev Tech"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover filter grayscale contrast-110 brightness-95"
        />
        {/* Label */}
        <div className="absolute bottom-5 left-5 bg-zinc-950/95 text-white font-mono text-[9px] uppercase tracking-widest px-3 py-1 rounded-sm z-20 border border-white/10 shadow-lg font-bold">
          Full-Stack Dev
        </div>
      </motion.div>

      {/* Instruction Overlay when not hovered */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-black/85 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm pointer-events-none transition-opacity duration-300 group-hover:opacity-0 z-20 shadow-lg">
        <p className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-2 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
          Deslize para Revelar
        </p>
      </div>
    </div>
  );
}
