"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function DualIdentityImage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion value for clip percentage (0 = fully wrestler, 100 = fully developer)
  const clipX = useMotionValue(100);

  // Spring physics interpolation (stiffness: 100, damping: 20 as requested)
  const springClipX = useSpring(clipX, { stiffness: 100, damping: 20 });

  // Map the spring value to a polygon clipPath
  const clipPathString = useTransform(
    springClipX,
    (val) => `polygon(0 0, ${val}% 0, ${val}% 100%, 0 100%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    clipX.set(percentage);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    clipX.set(100); // Spring back to developer
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[4/5] max-w-sm rounded-2xl overflow-hidden border border-white/[0.06] bg-[#09090b] cursor-ew-resize select-none shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]"
    >
      {/* Background: Wrestling Athlete Persona */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/kayqui_wrestler.png"
          alt="Kayqui Rocha - Wrestling"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover filter grayscale contrast-125 brightness-95"
        />
        {/* Label */}
        <div className="absolute bottom-4 right-4 bg-red-600/90 text-white font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-sm z-10 backdrop-blur-sm shadow-md border border-red-500/20">
          NTG Athlete
        </div>
      </div>

      {/* Foreground: Developer Persona (Clipped via Framer Motion Spring) */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: clipPathString }}
      >
        <Image
          src="/kayqui_developer.png"
          alt="Kayqui Rocha - Software Developer"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover filter grayscale contrast-110"
        />
        {/* Label */}
        <div className="absolute bottom-4 left-4 bg-zinc-950/90 text-white font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-sm z-10 border border-white/10 backdrop-blur-sm shadow-md">
          Full-Stack Dev
        </div>
      </motion.div>

      {/* Spring-linked Splitter Indicator Line */}
      <motion.div
        className="absolute top-0 bottom-0 w-[1.5px] bg-red-500 z-20 pointer-events-none"
        style={{
          left: useTransform(springClipX, (val) => `${val}%`),
          opacity: isHovered ? 1 : 0,
          boxShadow: "0 0 10px rgba(239, 68, 68, 0.8)",
        }}
      >
        {/* Drag handle button */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-red-600 border border-white/20 flex items-center justify-center shadow-lg">
          <svg
            className="w-3.5 h-3.5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M8 9l4-4 4 4m0 6l-4 4-4-4"
            />
          </svg>
        </div>
      </motion.div>

      {/* Instruction Overlay when not hovered */}
      {!isHovered && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/80 border border-white/[0.08] rounded-full px-3.5 py-1.5 backdrop-blur-sm pointer-events-none transition-all duration-300">
          <p className="text-[9px] font-mono tracking-wider text-zinc-400 uppercase flex items-center gap-1.5">
            <svg
              className="w-3 h-3 text-red-500 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777"
              />
            </svg>
            Deslize para Revelar
          </p>
        </div>
      )}
    </div>
  );
}
