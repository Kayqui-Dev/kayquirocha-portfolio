"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function KineticParallaxText() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Map scroll progress to horizontal translation (opposite directions)
  const x1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  const textRow1 = "DISCIPLINA • RESILIÊNCIA • CÓDIGO • FOCO • PERFORMANCE • COMPROMISSO • ";
  const textRow2 = "WRESTLING • FULL-STACK • AUTOMATION • DATABASE • NTG • SOLUTIONS • ";

  return (
    <div
      ref={sectionRef}
      className="py-12 bg-zinc-950/20 border-t border-b border-white/[0.03] overflow-hidden flex flex-col gap-4 select-none relative"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-32 bg-red-950/5 rounded-full blur-[80px] pointer-events-none -z-10"></div>

      {/* Row 1: Moves Left to Right */}
      <motion.div
        style={{ x: x1 }}
        className="flex whitespace-nowrap text-4xl sm:text-6xl font-extrabold tracking-widest uppercase text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.06)] hover:[-webkit-text-stroke:1px_rgba(255,255,255,0.15)] transition-all duration-500 ease-out cursor-default"
      >
        <span className="inline-block">{textRow1 + textRow1 + textRow1}</span>
      </motion.div>

      {/* Row 2: Moves Right to Left */}
      <motion.div
        style={{ x: x2 }}
        className="flex whitespace-nowrap text-4xl sm:text-6xl font-extrabold tracking-widest uppercase text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.06)] hover:[-webkit-text-stroke:1px_rgba(239,68,68,0.15)] transition-all duration-500 ease-out cursor-default"
      >
        <span className="inline-block text-red-500/10 [-webkit-text-stroke:1px_rgba(239,68,68,0.06)] hover:[-webkit-text-stroke:1px_rgba(239,68,68,0.2)]">{textRow2 + textRow2 + textRow2}</span>
      </motion.div>
    </div>
  );
}
