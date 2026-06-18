"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";

export default function Hero() {
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

  // Track scroll progress of the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Dynamic transforms based on scroll progress (Keeping background dark)
  const cardScale = useTransform(scrollYProgress, [0, 0.5], [1.3, 0.9]);
  const cardY = useTransform(scrollYProgress, [0, 0.5], [0, 50]);
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1.0, 0.85]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -40]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  
  // Background elements (marquee & signature) opacity fade-in
  const bgElementsOpacity = useTransform(scrollYProgress, [0, 0.5], [0.05, 0.15]);
  const marqueeOpacity = useTransform(scrollYProgress, [0, 0.5], [0.02, 0.05]);

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

      // 1. Clear main canvas
      ctx.clearRect(0, 0, 768, 1024);

      // 2. Interpolate mouse coordinates and radius
      mouse.radius += (mouse.targetRadius - mouse.radius) * 0.15;
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      // 3. Add points to trail if mouse is hovering
      if (mouse.isHovered && mouse.radius > 5) {
        const dist = Math.hypot(mouse.x - lastX, mouse.y - lastY);
        if (dist > 3) {
          const steps = Math.ceil(dist / 6); // Add a point every 6 canvas pixels
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

      // 4. Update and age trail points (Snake trailing shrink)
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.r -= 2.2;         // Taper brush size down
        p.opacity -= 0.022; // Fade opacity
        if (p.r <= 0 || p.opacity <= 0) {
          trail.splice(i, 1);
        }
      }

      // 5. Render trophy image masked by mouse trail to offscreen canvas
      if (imgTrophy && offscreen && (mouse.radius > 0.1 || trail.length > 0)) {
        const oCtx = offscreen.getContext("2d");
        if (oCtx) {
          // Clear offscreen
          oCtx.clearRect(0, 0, 768, 1024);

          // Save context state
          oCtx.save();

          // Draw all trailing brush circles
          trail.forEach((p) => {
            oCtx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
            oCtx.beginPath();
            oCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            oCtx.fill();
          });

          // Draw current brush circle (head of the snake)
          if (mouse.isHovered && mouse.radius > 0) {
            oCtx.fillStyle = "rgba(255, 255, 255, 1)";
            oCtx.beginPath();
            oCtx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
            oCtx.fill();
          }

          // Composite the trophy image onto the mask
          oCtx.globalCompositeOperation = "source-in";
          oCtx.filter = "grayscale(100%) contrast(125%) brightness(100%)";
          oCtx.drawImage(imgTrophy, 0, 0, 768, 1024);

          // Restore state
          oCtx.restore();

          // Draw the composited offscreen canvas onto the main canvas
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
      gsap.ticker.remove(tick);
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Text rows for background scroll marquee (mirrors Lando's marquee style)
  const textRow = "KAYQUI ROCHA GODINHO • FULL-STACK ENGINEER • NTG ATHLETE • KODAVA SOLUTIONS • ";

  return (
    <div
      ref={containerRef}
      className="relative h-[180vh] w-full bg-black"
    >
      {/* Pinned Sticky Hero viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-12 px-6 sm:px-12 md:px-16 bg-black">
        
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none -z-30"></div>

        {/* BACKGROUND LAYER: Giant signature & marquee text (layered behind the card) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden flex flex-col justify-center gap-12 -z-20">
          {/* Marquee Row 1 */}
          <motion.div
            style={{ opacity: marqueeOpacity }}
            className="flex whitespace-nowrap text-7xl sm:text-9xl font-black uppercase text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.08)] select-none animate-marquee"
          >
            <span>{textRow + textRow}</span>
          </motion.div>

          {/* Giant Digital Signature in the background */}
          <motion.div
            style={{ opacity: bgElementsOpacity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-[800px] aspect-video pointer-events-none select-none"
          >
            <svg viewBox="0 0 500 200" fill="none" stroke="#00A3FF" strokeWidth="1.5" className="w-full h-full opacity-25">
              <path d="M 50 150 C 80 50, 100 20, 120 70 C 130 90, 140 150, 150 150 C 160 150, 180 80, 190 100 C 200 110, 210 130, 220 130 C 230 130, 250 80, 260 90 C 270 100, 280 120, 290 120 C 310 120, 330 30, 340 50 C 350 70, 320 180, 360 170 C 390 160, 420 110, 450 110 C 470 110, 480 130, 490 140" />
            </svg>
          </motion.div>

          {/* Marquee Row 2 */}
          <motion.div
            style={{ opacity: marqueeOpacity }}
            className="flex whitespace-nowrap text-7xl sm:text-9xl font-black uppercase text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.08)] select-none animate-marquee [animation-direction:reverse]"
          >
            <span>{textRow + textRow}</span>
          </motion.div>
        </div>

        {/* Top Header Row (Since 2019 / Metadata) */}
        <div className="w-full flex justify-between items-start font-mono text-[9px] tracking-widest uppercase z-10 pt-10 pointer-events-none text-white">
          <div>
            <span className="font-extrabold text-white">KAYQUI ROCHA GODINHO</span>
            <p className="text-zinc-500 mt-1">SÃO PAULO, BRASIL</p>
          </div>
          <div className="text-right">
            <span className="text-accent-lime font-extrabold">FULL-STACK DEV / ATLETA NTG</span>
            <p className="text-zinc-500 mt-1">DESDE 2019</p>
          </div>
        </div>

        {/* MIDDLE LAYER: Giant typography AND centered card */}
        <div className="w-full flex-1 flex items-center justify-center relative my-auto">
          
          {/* Giant Title (Layered behind the card) */}
          <motion.div
            style={{ scale: textScale, y: textY, opacity: textOpacity }}
            className="absolute z-0 flex flex-col items-center text-center px-4 pointer-events-none"
          >
            <span className="font-mono text-[9px] tracking-[0.3em] text-accent-lime uppercase font-bold mb-4 block">
              — DESENVOLVIMENTO & WRESTLING DE ELITE
            </span>
            <h1 className="text-6xl sm:text-8xl md:text-9.5xl font-black tracking-tighter leading-[0.8] text-white uppercase font-sans">
              KAYQUI <br />
              <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.15)] font-sans">
                ROCHA
              </span>
            </h1>
            <span className="text-xl sm:text-2xl font-mono tracking-[0.2em] text-accent-lime uppercase mt-4 block font-extrabold">
              GODINHO
            </span>
          </motion.div>

          {/* Centered Card ("Quadro") in front of the text */}
          <motion.div
            ref={cardRef}
            style={{
              scale: cardScale,
              y: cardY,
            }}
            className="relative w-[80vw] sm:w-[380px] aspect-[3/4] overflow-hidden border border-white/10 rounded-sm bg-zinc-950 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] cursor-crosshair select-none z-10 hover:border-accent-lime/40 transition-colors duration-300"
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
                Dinner / Dev
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
            <div className="absolute bottom-4 right-4 bg-accent-lime/10 border border-accent-lime/20 text-accent-lime font-mono text-[8px] uppercase tracking-widest px-2.5 py-0.5 rounded-sm z-20 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              Trophy / Athlete
            </div>

            {/* Hover Instruction overlay */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/90 border border-white/10 rounded-full px-3 py-1 backdrop-blur-sm pointer-events-none transition-opacity duration-300 group-hover:opacity-0 z-20 shadow-md">
              <p className="text-[8px] font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-1.5 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-ping"></span>
                Passe o mouse
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Panel (Next challenge / scroll indicator) */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6 z-10 font-mono text-white">
          
          {/* Next Race block */}
          <div className="border-l-2 border-accent-lime pl-4 flex flex-col pointer-events-none">
            <span className="text-[9px] text-zinc-500 tracking-wider uppercase font-bold">Próximo Desafio</span>
            <span className="text-xs font-bold uppercase mt-1">CPB Luta Livre / Kodava IA</span>
            <span className="text-accent-lime text-[10px] uppercase font-bold mt-0.5">SÃO PAULO — BRASIL</span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-4 z-20">
            <a
              href="#sobre"
              className="inline-flex h-10 items-center justify-center rounded-sm bg-accent-lime px-8 text-[10px] font-mono font-bold text-black uppercase hover:bg-white transition-all duration-300 shadow-md"
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
        </div>

      </div>
    </div>
  );
}
