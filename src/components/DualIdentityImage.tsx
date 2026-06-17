"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export default function DualIdentityImage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [clipPercent, setClipPercent] = useState(100);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setClipPercent(percentage);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smoothly animate back to showing the developer image (100%)
    setClipPercent(100);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[4/5] max-w-md mx-auto rounded-xl overflow-hidden border border-white/[0.08] bg-[#0c0c0e] cursor-ew-resize select-none"
    >
      {/* Background Image: Wrestler Persona (Base) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/kayqui_wrestler.png"
          alt="Kayqui Rocha - Atleta de Luta Livre Olímpica / Wrestling"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover filter grayscale contrast-125"
        />
        {/* Label for bottom image */}
        <div className="absolute bottom-4 right-4 bg-red-600/90 text-white font-mono text-[9px] uppercase tracking-widest px-2 py-1 rounded-sm z-10 backdrop-blur-sm shadow-md">
          NTG Athlete
        </div>
      </div>

      {/* Foreground Image: Developer Persona (Overlaid & Clipped) */}
      <div
        className="absolute inset-0 w-full h-full transition-all duration-300 ease-out"
        style={{
          clipPath: `polygon(0 0, ${clipPercent}% 0, ${clipPercent}% 100%, 0 100%)`,
          transition: isHovered ? "none" : "clip-path 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <Image
          src="/kayqui_developer.png"
          alt="Kayqui Rocha - Engenheiro de Software Full-Stack"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover filter grayscale contrast-110"
        />
        {/* Label for top image */}
        <div className="absolute bottom-4 left-4 bg-zinc-950/90 text-white font-mono text-[9px] uppercase tracking-widest px-2 py-1 rounded-sm z-10 border border-white/10 backdrop-blur-sm">
          Full-Stack Dev
        </div>
      </div>

      {/* Slider Indicator Divider Line */}
      {isHovered && clipPercent < 100 && (
        <div
          className="absolute top-0 bottom-0 w-[1.5px] bg-red-500 z-20 pointer-events-none"
          style={{
            left: `${clipPercent}%`,
            boxShadow: "0 0 8px rgba(239, 68, 68, 0.8)",
          }}
        >
          {/* Handle Badge */}
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
        </div>
      )}

      {/* Floating Instruction overlay when NOT hovered */}
      {!isHovered && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/75 border border-white/[0.06] rounded-full px-3 py-1 backdrop-blur-sm pointer-events-none transition-all duration-300">
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
                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
              />
            </svg>
            Passe o mouse para revelar
          </p>
        </div>
      )}
    </div>
  );
}
