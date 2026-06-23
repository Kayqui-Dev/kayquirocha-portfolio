"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";



interface HeroProps {
  onStartExperience?: () => void;
}

export default function Hero({ onStartExperience }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgTrophyRef = useRef<HTMLImageElement | null>(null);
  const trailRef = useRef<Array<{ x: number; y: number; r: number; opacity: number }>>([]);
  
  const mouseRef = useRef({
    x: 384,
    y: 512,
    targetX: 384,
    targetY: 512,
    isHovered: false,
    radius: 0,
    targetRadius: 0,
  });
  const mouseClientRef = useRef({ x: 0, y: 0 });

  // Track scroll progress of the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Dynamic transforms based on scroll progress (Keeping background dark)
  const cardScale = useTransform(scrollYProgress, [0, 0.5], [1.0, 0.72]);
  const cardY = useTransform(scrollYProgress, [0, 0.5], [0, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1.0, 0.85]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -40]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  

  // Color transitions to match Lando's white-to-black scroll behavior
  const bgColor = useTransform(scrollYProgress, [0, 0.4], ["#ffffff", "#00050a"]);
  const textColor = useTransform(scrollYProgress, [0, 0.4], ["#000000", "#ffffff"]);
  const textMutedColor = useTransform(scrollYProgress, [0, 0.4], ["#71717a", "#a1a1aa"]);
  const borderCol = useTransform(scrollYProgress, [0, 0.4], ["rgba(0, 0, 0, 0.12)", "rgba(255, 255, 255, 0.1)"]);
  const titleColor = useTransform(scrollYProgress, [0, 0.4], ["#000000", "#ffffff"]);
  const accentColorTransform = useTransform(scrollYProgress, [0, 0.4], ["#00A3FF", "#00A3FF"]);
  const marqueeColor = useTransform(scrollYProgress, [0, 0.4], ["rgba(0,0,0,0.04)", "rgba(255,255,255,0.035)"]);
  
  // Opacities for the message header and foreground signature
  const messageOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);
  const signatureOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 0.95]);

  // Staggered writing path animations for the letter K
  const stemPathLength = useTransform(scrollYProgress, [0.15, 0.28], [0, 1]);
  const rightPathLength = useTransform(scrollYProgress, [0.28, 0.45], [0, 1]);

  // Load trophy image on mount
  useEffect(() => {
    const img = new window.Image();
    img.src = "/kayqui_trophy.jpg";
    img.onload = () => {
      imgTrophyRef.current = img;
    };

    // Create offscreen canvas once
    offscreenCanvasRef.current = document.createElement("canvas");
    offscreenCanvasRef.current.width = 768;
    offscreenCanvasRef.current.height = 1024;
    
    // Set initial mouse coordinates to center of viewport
    mouseClientRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    const canvas = canvasRef.current;
    if (!card || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastX = 384;
    let lastY = 512;

    const tick = () => {
      const imgTrophy = imgTrophyRef.current;
      const offscreen = offscreenCanvasRef.current;
      const mouse = mouseRef.current;
      const trail = trailRef.current;

      // ==========================================
      // CARD MASK CANVAS RENDER
      // ==========================================
      ctx.clearRect(0, 0, 768, 1024);

      mouse.radius += (mouse.targetRadius - mouse.radius) * 0.15;
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      if (mouse.isHovered && mouse.radius > 5) {
        const dist = Math.hypot(mouse.x - lastX, mouse.y - lastY);
        if (dist > 3) {
          const steps = Math.ceil(dist / 6);
          for (let i = 1; i <= steps; i++) {
            const t = i / steps;
            const x = lastX + (mouse.x - lastX) * t;
            const y = lastY + (mouse.y - lastY) * t;
            trail.push({
              x,
              y,
              r: mouse.radius,
              opacity: 1.0,
            });
          }
          lastX = mouse.x;
          lastY = mouse.y;
        }
      }

      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.r -= 2.2;
        p.opacity -= 0.022;
        if (p.r <= 0 || p.opacity <= 0) {
          trail.splice(i, 1);
        }
      }

      if (imgTrophy && offscreen && (mouse.radius > 0.1 || trail.length > 0)) {
        const oCtx = offscreen.getContext("2d");
        if (oCtx) {
          oCtx.clearRect(0, 0, 768, 1024);
          oCtx.save();

          trail.forEach((p) => {
            oCtx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
            oCtx.beginPath();
            oCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            oCtx.fill();
          });

          if (mouse.isHovered && mouse.radius > 0) {
            oCtx.fillStyle = "rgba(255, 255, 255, 1)";
            oCtx.beginPath();
            oCtx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
            oCtx.fill();
          }

          oCtx.globalCompositeOperation = "source-in";
          oCtx.filter = "grayscale(100%) contrast(125%) brightness(100%)";
          oCtx.drawImage(imgTrophy, 0, 0, 768, 1024);
          oCtx.restore();

          ctx.drawImage(offscreen, 0, 0, 768, 1024);
        }
      }


    };

    gsap.ticker.add(tick);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 768;
      const y = ((e.clientY - rect.top) / rect.height) * 1024;

      const mouse = mouseRef.current;
      if (!mouse.isHovered) {
        mouse.x = x;
        mouse.y = y;
        lastX = x;
        lastY = y;
      }
      mouse.targetX = x;
      mouse.targetY = y;
    };

    const handleGlobalMouseMove = (e: MouseEvent) => {
      mouseClientRef.current.x = e.clientX;
      mouseClientRef.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleGlobalMouseMove);

    const handleMouseEnter = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 768;
      const y = ((e.clientY - rect.top) / rect.height) * 1024;

      const mouse = mouseRef.current;
      mouse.isHovered = true;
      mouse.x = x;
      mouse.y = y;
      mouse.targetX = x;
      mouse.targetY = y;
      lastX = x;
      lastY = y;
      mouse.targetRadius = 150; // Trophies brush size
    };

    const handleMouseLeave = () => {
      const mouse = mouseRef.current;
      mouse.isHovered = false;
      mouse.targetRadius = 0;
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      gsap.ticker.remove(tick);
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [scrollYProgress]);

  // Text rows for background scroll marquee (mirrors Lando's marquee style)
  const textRow = "KAYQUI ROCHA GODINHO • FULL-STACK ENGINEER • NTG ATHLETE • KODAVA SOLUTIONS • ";

  return (
    <div
      ref={containerRef}
      className="relative h-[260vh] w-full bg-black"
    >
      {/* Pinned Sticky Hero viewport with scrolling background color transition */}
      <motion.div
        style={{ backgroundColor: bgColor }}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-12 px-6 sm:px-12 md:px-16"
      >
        {/* BACKGROUND LAYER: Giant marquee text (layered behind the card) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden flex flex-col justify-center gap-12 -z-20">
          {/* Marquee Row 1 */}
          <motion.div
            style={{ color: marqueeColor }}
            className="flex whitespace-nowrap text-7xl sm:text-9xl font-serif font-bold uppercase select-none animate-marquee"
          >
            <span>{textRow + textRow}</span>
          </motion.div>

          {/* Marquee Row 2 */}
          <motion.div
            style={{ color: marqueeColor }}
            className="flex whitespace-nowrap text-7xl sm:text-9xl font-serif font-bold uppercase select-none animate-marquee [animation-direction:reverse]"
          >
            <span>{textRow + textRow}</span>
          </motion.div>
        </div>

        {/* FOREGROUND LAYER: Giant digital signature (layered in front of the card to match reference) */}
        <motion.div
          style={{ opacity: signatureOpacity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vw] max-w-[850px] aspect-video pointer-events-none select-none z-20 flex items-center justify-center"
        >
          <svg viewBox="0 0 500 200" fill="none" stroke="#00A3FF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full filter drop-shadow-[0_2px_8px_rgba(0,163,255,0.35)]">
            {/* Stem of the K */}
            <motion.path
              d="M 170 40 C 160 30, 150 40, 150 60 C 150 100, 165 140, 170 160"
              style={{ pathLength: stemPathLength }}
            />
            {/* Right side of the K */}
            <motion.path
              d="M 240 60 C 230 50, 200 70, 185 95 C 175 105, 170 115, 185 115 C 205 115, 235 135, 265 155 C 305 175, 360 170, 400 155"
              style={{ pathLength: rightPathLength }}
            />
          </svg>
        </motion.div>

        {/* Top Header Row with scrolling color transition */}
        <motion.div
          style={{ color: textColor }}
          className="w-full flex justify-between items-start font-mono text-[9px] tracking-widest uppercase z-10 pt-10 pointer-events-none"
        >
          {/* Removed left side to prevent overlap with fixed header logo */}
          <div></div>
          <div className="text-right">
            <span className="text-[#00A3FF] font-extrabold block">FULL-STACK DEV / ATLETA NTG</span>
            <motion.p style={{ color: textMutedColor }} className="mt-1">DESDE 2019</motion.p>
          </div>
        </motion.div>

        {/* MIDDLE LAYER: Giant typography AND centered card */}
        <div className="w-full flex-1 flex items-center justify-center relative my-auto">
          
          {/* Giant Title with outline color sync */}
          <motion.div
            style={{ scale: textScale, y: textY, opacity: textOpacity }}
            className="absolute z-0 flex flex-col items-center text-center px-4 pointer-events-none"
          >
            <span className="font-mono text-[9px] tracking-[0.3em] text-[#00A3FF] uppercase font-bold mb-4 block">
              — DESENVOLVIMENTO & WRESTLING DE ELITE
            </span>
            <motion.h1
              style={{ color: titleColor }}
              className="text-6xl sm:text-8xl md:text-9.5xl font-black tracking-tighter leading-[0.8] uppercase font-sans"
            >
              KAYQUI <br />
              <span className="text-transparent [-webkit-text-stroke:1px_currentColor] font-sans">
                ROCHA
              </span>
            </motion.h1>
            <span className="text-xl sm:text-2xl font-mono tracking-[0.2em] text-[#00A3FF] uppercase mt-4 block font-extrabold">
              GODINHO
            </span>
          </motion.div>

          {/* Centered Wrapper: scales and translates together */}
          <motion.div
            style={{
              scale: cardScale,
              y: cardY,
            }}
            className="relative z-10 flex items-center justify-center"
          >
            {/* Message from Kayqui Header (floating above card, matches reference) */}
            <motion.div
              style={{ opacity: messageOpacity }}
              className="absolute top-[-52px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none"
            >
              <div className="w-5 h-5 rounded-full bg-[#00A3FF]/15 border border-[#00A3FF]/30 flex items-center justify-center shadow-sm">
                <span className="text-[#00A3FF] font-mono text-[9px] font-black">K</span>
              </div>
              <span className="text-[7px] font-mono tracking-[0.25em] text-[#00A3FF] uppercase font-bold whitespace-nowrap">
                Message from Kayqui
              </span>
            </motion.div>

            {/* Centered Card ("Quadro") in front of the text */}
            <motion.div
              ref={cardRef}
              style={{
                borderColor: borderCol,
              }}
              className="relative w-[min(80vw,45vh)] sm:w-[min(380px,50vh)] aspect-[3/4] overflow-hidden border rounded-sm bg-zinc-950 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] cursor-crosshair select-none hover:border-[#00A3FF]/40 transition-colors duration-300"
            >
              {/* 1. Base Image: Diner eating photo (kayqui_developer.jpg) */}
              <div className="absolute inset-0 w-full h-full z-0">
                <Image
                  src="/kayqui_developer.jpg"
                  alt="Kayqui Rocha - Dinner"
                  fill
                  priority
                  sizes="(max-width: 768px) 80vw, 380px"
                  className="object-cover filter grayscale contrast-115 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                {/* Badge */}
                <div className="absolute bottom-4 left-4 bg-black/80 border border-white/10 text-white font-mono text-[8px] uppercase tracking-widest px-2.5 py-0.5 rounded-sm z-20 font-bold">
                  Fighter / Dev
                </div>
              </div>

              {/* 2. Dynamic Canvas overlay for mouse trail reveal */}
              <canvas
                ref={canvasRef}
                width="768"
                height="1024"
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
              />

              {/* Badge for Trophy / Athlete (rendered on top of canvas) */}
              <div className="absolute bottom-4 right-4 bg-[#00A3FF]/10 border border-[#00A3FF]/20 text-[#00A3FF] font-mono text-[8px] uppercase tracking-widest px-2.5 py-0.5 rounded-sm z-20 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                Trophy / Athlete
              </div>

              {/* Hover Instruction overlay */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/90 border border-white/10 rounded-full px-3 py-1 backdrop-blur-sm pointer-events-none transition-opacity duration-300 group-hover:opacity-0 z-20 shadow-md">
                <p className="text-[8px] font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-1.5 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-ping"></span>
                  Passe o mouse
                </p>
              </div>
            </motion.div>
            
            {/* Start Hand-tracking experience button */}
            {onStartExperience && (
              <button
                onClick={onStartExperience}
                className="absolute bottom-[-55px] left-1/2 -translate-x-1/2 bg-black/90 hover:bg-[#00A3FF] text-[#00A3FF] hover:text-white border border-[#00A3FF]/40 rounded-full px-5 py-2 text-[10px] font-mono uppercase tracking-widest backdrop-blur-sm transition-all duration-300 shadow-[0_0_15px_rgba(0,163,255,0.15)] hover:shadow-[0_0_25px_rgba(0,163,255,0.45)] cursor-pointer z-30 pointer-events-auto"
              >
                ✦ Ativar Visão IA (Gestos)
              </button>
            )}
          </motion.div>
        </div>

        {/* Bottom Panel with color transitions */}
        <motion.div
          style={{ color: textColor }}
          className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6 z-10 font-mono"
        >
          
          {/* Next Challenge block */}
          <motion.div
            style={{ borderColor: accentColorTransform }}
            className="border-l-2 pl-4 flex flex-col pointer-events-none"
          >
            <motion.span style={{ color: textMutedColor }} className="text-[9px] tracking-wider uppercase font-bold block">Próximo Desafio</motion.span>
            <span className="text-xs font-bold uppercase mt-1">CPB Luta Livre / Kodava IA</span>
            <span className="text-[#00A3FF] text-[10px] uppercase font-bold mt-0.5 block">SÃO PAULO — BRASIL</span>
          </motion.div>

          {/* Buttons removed per request */}
          <div></div>

          {/* Scroll reminder */}
          <div className="hidden md:flex items-center gap-4 select-none pointer-events-none">
            <motion.span style={{ color: textMutedColor }} className="text-[9px] tracking-widest uppercase font-bold block">Deslize para navegar</motion.span>
            <div className="w-8 h-[1px] bg-[#00A3FF]/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-[#00A3FF] w-1/2 animate-[pulse_1.5s_infinite]"></div>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
