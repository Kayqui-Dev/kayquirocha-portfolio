"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scroll animations for Lando-style entrance zoom
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, 0.95]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.5, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const sticky = stickyRef.current;
    const reveal = revealRef.current;
    if (!sticky || !reveal) return;

    // Set initial mask state (hidden radius, centered)
    gsap.set(reveal, {
      "--mask-x": 400,
      "--mask-y": 300,
      "--mask-r": 0,
    } as Record<string, number>);

    // GSAP quickTo setters for spring-like smooth cursor lag
    const xSetter = gsap.quickTo(reveal, "--mask-x", {
      duration: 0.15,
      ease: "power2.out",
    });

    const ySetter = gsap.quickTo(reveal, "--mask-y", {
      duration: 0.15,
      ease: "power2.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = sticky.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      xSetter(x);
      ySetter(y);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const rect = sticky.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.set(reveal, {
        "--mask-x": x,
        "--mask-y": y,
      } as Record<string, number>);

      // Smoothly grow the reveal lens to a large premium size (180px)
      gsap.to(reveal, {
        "--mask-r": 200,
        duration: 0.35,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      // Smoothly shrink lens back to 0
      gsap.to(reveal, {
        "--mask-r": 0,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    sticky.addEventListener("mousemove", handleMouseMove);
    sticky.addEventListener("mouseenter", handleMouseEnter);
    sticky.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      sticky.removeEventListener("mousemove", handleMouseMove);
      sticky.removeEventListener("mouseenter", handleMouseEnter);
      sticky.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[150vh] w-full bg-black">
      {/* Pinned Sticky Hero viewport */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-16 px-6 sm:px-12 md:px-16 cursor-crosshair select-none"
      >
        
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        {/* 1. Base Background Image: Diner eating photo (kayqui_developer.jpg) */}
        <motion.div
          style={{ scale, opacity: imageOpacity }}
          className="absolute inset-0 w-full h-full -z-10 bg-[#000000] pointer-events-none"
        >
          <Image
            src="/kayqui_developer.jpg"
            alt="Kayqui Rocha Godinho - Diner"
            fill
            priority
            sizes="100vw"
            className="object-cover filter grayscale contrast-115 brightness-[0.25] lg:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
        </motion.div>

        {/* 2. Revealed Background Image (Clipped dynamically): Trophy photo (kayqui_trophy.jpg) */}
        <motion.div
          ref={revealRef}
          style={{
            scale,
            opacity: imageOpacity,
            clipPath:
              "circle(calc(var(--mask-r, 0) * 1px) at calc(var(--mask-x, 200) * 1px) calc(var(--mask-y, 260) * 1px))",
            WebkitClipPath:
              "circle(calc(var(--mask-r, 0) * 1px) at calc(var(--mask-x, 200) * 1px) calc(var(--mask-y, 260) * 1px))",
          }}
          className="absolute inset-0 w-full h-full -z-10 bg-black pointer-events-none"
        >
          <Image
            src="/kayqui_trophy.jpg"
            alt="Kayqui Rocha Godinho - Conquista"
            fill
            priority
            sizes="100vw"
            className="object-cover filter grayscale contrast-125 brightness-[0.35] lg:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
        </motion.div>

        {/* Top Header Row (Since 2019 / Metadata) */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="w-full flex justify-between items-start font-mono text-[9px] tracking-widest text-zinc-500 uppercase z-10 pt-10 pointer-events-none"
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
          className="w-full flex flex-col items-start justify-center relative z-10 my-auto pointer-events-none"
        >
          {/* Lando-style digital blue signature path overlaying the text */}
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
          <div className="border-l-2 border-accent-lime pl-4 flex flex-col pointer-events-none">
            <span className="text-[9px] text-zinc-500 tracking-wider uppercase font-bold">Próximo Desafio</span>
            <span className="text-white text-xs font-bold uppercase mt-1">CPB Torneio de Luta Livre / Kodava IA</span>
            <span className="text-accent-lime text-[10px] uppercase font-bold mt-0.5">SÃO PAULO — BRASIL</span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-4 z-20">
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
          <div className="hidden md:flex items-center gap-4 select-none pointer-events-none">
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
