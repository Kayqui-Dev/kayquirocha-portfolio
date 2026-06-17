"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function DualIdentityImage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const [isRevealedMobile, setIsRevealedMobile] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const reveal = revealRef.current;
    if (!container || !reveal) return;

    gsap.set(reveal, {
      "--mask-x": 200,
      "--mask-y": 260,
      "--mask-r": 0,
    } as Record<string, number>);

    // GSAP quickTo setters for ultra-smooth spring-like cursor tracking
    const xSetter = gsap.quickTo(reveal, "--mask-x", {
      duration: 0.45,
      ease: "power3.out",
    });

    const ySetter = gsap.quickTo(reveal, "--mask-y", {
      duration: 0.45,
      ease: "power3.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      xSetter(x);
      ySetter(y);
    };

    const handleMouseEnter = () => {
      // Grow the circle mask smoothly on hover (unitless, calc handles px)
      gsap.to(reveal, {
        "--mask-r": 140,
        duration: 0.35,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      // Shrink circle mask back to 0
      gsap.to(reveal, {
        "--mask-r": 0,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    // Listeners for desktop hover reveal
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleMobileClick = () => {
    const reveal = revealRef.current;
    if (!reveal) return;

    if (!isRevealedMobile) {
      // Mobile reveal: Grow the mask from the center to fully reveal wrestling image (800px covers container)
      gsap.to(reveal, {
        "--mask-x": 200,
        "--mask-y": 260,
        "--mask-r": 800,
        duration: 0.6,
        ease: "power3.out",
      });
      setIsRevealedMobile(true);
    } else {
      // Mobile hide: Reset mask back to 0
      gsap.to(reveal, {
        "--mask-r": 0,
        duration: 0.5,
        ease: "power3.out",
      });
      setIsRevealedMobile(false);
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleMobileClick}
      className="relative aspect-[3/4] w-full max-w-sm rounded-2xl overflow-hidden border border-white/10 bg-[#000000] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] group cursor-pointer select-none"
    >
      {/* Camada Base: Foto A - Developer Persona (Visible by default) */}
      <div className="absolute inset-0 w-full h-full">
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
      </div>

      {/* Camada Superior (Frente): Foto B - Wrestling Athlete (Revealed via GSAP Clip-Path Circle) */}
      <div
        ref={revealRef}
        className="absolute inset-0 z-10 w-full h-full pointer-events-none"
        style={{
          clipPath:
            "circle(calc(var(--mask-r, 0) * 1px) at calc(var(--mask-x, 200) * 1px) calc(var(--mask-y, 260) * 1px))",
          WebkitClipPath:
            "circle(calc(var(--mask-r, 0) * 1px) at calc(var(--mask-x, 200) * 1px) calc(var(--mask-y, 260) * 1px))",
        }}
      >
        <Image
          src="/kayqui_wrestler.png"
          alt="Kayqui Rocha - Atleta NTG Wrestling"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover filter grayscale contrast-[1.35] brightness-90"
        />
        {/* Label */}
        <div className="absolute bottom-5 right-5 bg-red-600/95 text-white font-mono text-[9px] uppercase tracking-widest px-3 py-1 rounded-sm z-20 border border-red-500/20 shadow-lg font-bold">
          NTG Athlete
        </div>
      </div>

      {/* Instruction Overlay when not hovered */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-black/85 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm pointer-events-none transition-opacity duration-300 group-hover:opacity-0 z-20 shadow-lg">
        <p className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-2 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
          {isRevealedMobile ? "Toque para Resetar" : "Passe o mouse / Toque"}
        </p>
      </div>
    </div>
  );
}
