"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";

// 3D Wireframe Helmet Mesh Generation
const generateHelmetMesh = () => {
  const vertices: Array<[number, number, number]> = [];
  const edges: Array<[number, number]> = [];
  
  const latCount = 7;
  const lonCount = 12;
  const radius = 100;

  // 1. Dome hemisphere (y >= 0)
  for (let i = 0; i <= latCount; i++) {
    const lat = (i / latCount) * (Math.PI / 2);
    const y = radius * Math.cos(lat);
    const rRing = radius * Math.sin(lat);
    
    for (let j = 0; j < lonCount; j++) {
      const lon = (j / lonCount) * Math.PI * 2;
      const x = rRing * Math.cos(lon);
      const z = rRing * Math.sin(lon);
      
      vertices.push([x, y, z]);
      
      const idx = vertices.length - 1;
      
      // Connect horizontal circle edges
      const nextRingIdx = idx - j + ((j + 1) % lonCount);
      edges.push([idx, nextRingIdx]);
      
      // Connect vertical longitudinal lines
      if (i > 0) {
        const prevIdx = idx - lonCount;
        edges.push([idx, prevIdx]);
      }
    }
  }
  
  // 2. Bottom cylinder with visor cutout (y < 0)
  const cylRings = 4;
  const cylHeight = 55;
  for (let i = 1; i <= cylRings; i++) {
    const y = - (i / cylRings) * cylHeight;
    for (let j = 0; j < lonCount; j++) {
      const lon = (j / lonCount) * Math.PI * 2;
      
      // Visor opening: index j from 4 to 8 is the front (120 degree angle)
      // upper cylinder rings have no horizontal lines in this area
      const isVisorOpen = i < 3 && (j >= 4 && j <= 8);
      
      const x = radius * Math.cos(lon);
      const z = radius * Math.sin(lon);
      vertices.push([x, y, z]);
      
      const idx = vertices.length - 1;
      
      if (!isVisorOpen) {
        const nextRingIdx = idx - j + ((j + 1) % lonCount);
        edges.push([idx, nextRingIdx]);
      }
      
      // Connect vertical lines
      const prevIdx = idx - lonCount;
      edges.push([idx, prevIdx]);
    }
  }
  
  return { vertices, edges };
};

const { vertices, edges } = generateHelmetMesh();

// Draw Concentric Topographic Contour Lines
const drawTopoLinesConcentric = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  color: string
) => {
  ctx.strokeStyle = color;
  ctx.lineWidth = 0.8;
  
  const centers = [
    { x: width * 0.15, y: height * 0.3, baseR: 80 },
    { x: width * 0.85, y: height * 0.65, baseR: 120 },
  ];
  
  centers.forEach((center) => {
    const ringCount = 7;
    for (let r = 1; r <= ringCount; r++) {
      ctx.beginPath();
      const baseRadius = r * 50 + center.baseR;
      const points = 72;
      
      for (let p = 0; p <= points; p++) {
        const angle = (p / points) * Math.PI * 2;
        // Subtle organic distortion
        const noise = Math.sin(angle * 3 + time * 0.0004) * 12 + 
                      Math.cos(angle * 5 - time * 0.0002) * 8;
        const radius = baseRadius + noise;
        
        const x = center.x + radius * Math.cos(angle);
        const y = center.y + radius * Math.sin(angle);
        
        if (p === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    }
  });
};

// Draw projected 3D Helmet wireframe
const drawHelmet = (
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  time: number,
  color: string,
  mouseX: number,
  mouseY: number
) => {
  // Slow background rotation + mouse parallax follow
  const angleY = time * 0.0003 + (mouseX - window.innerWidth / 2) * 0.0003;
  const angleX = 0.2 + (mouseY - window.innerHeight / 2) * 0.0003;
  
  const cosY = Math.cos(angleY);
  const sinY = Math.sin(angleY);
  const cosX = Math.cos(angleX);
  const sinX = Math.sin(angleX);

  const projected: Array<[number, number]> = [];
  const focalLength = 350;

  // Project 3D vertices
  vertices.forEach(([x, y, z]) => {
    // Rotate around Y-axis
    const x1 = x * cosY - z * sinY;
    const z1 = x * sinY + z * cosY;
    
    // Rotate around X-axis
    const y2 = y * cosX - z1 * sinX;
    const z2 = y * sinX + z1 * cosX;
    
    // Perspective projection
    const scale = focalLength / (focalLength + z2);
    const projX = centerX + x1 * scale;
    const projY = centerY + y2 * scale - 10;
    projected.push([projX, projY]);
  });

  // Draw edges
  ctx.strokeStyle = color;
  ctx.lineWidth = 0.55;
  ctx.beginPath();
  edges.forEach(([i, j]) => {
    const p1 = projected[i];
    const p2 = projected[j];
    if (p1 && p2) {
      ctx.moveTo(p1[0], p1[1]);
      ctx.lineTo(p2[0], p2[1]);
    }
  });
  ctx.stroke();
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
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
  
  // Background elements (marquee & signature) opacity fade-in
  const bgElementsOpacity = useTransform(scrollYProgress, [0, 0.5], [0.05, 0.15]);
  const marqueeOpacity = useTransform(scrollYProgress, [0, 0.5], [0.02, 0.05]);

  // Color transitions to match Lando's white-to-black scroll behavior
  const bgColor = useTransform(scrollYProgress, [0, 0.4], ["#ffffff", "#000000"]);
  const textColor = useTransform(scrollYProgress, [0, 0.4], ["#000000", "#ffffff"]);
  const textMutedColor = useTransform(scrollYProgress, [0, 0.4], ["#71717a", "#a1a1aa"]);
  const borderCol = useTransform(scrollYProgress, [0, 0.4], ["rgba(0, 0, 0, 0.12)", "rgba(255, 255, 255, 0.1)"]);
  const titleColor = useTransform(scrollYProgress, [0, 0.4], ["#000000", "#ffffff"]);
  const accentColorTransform = useTransform(scrollYProgress, [0, 0.4], ["#00A3FF", "#00A3FF"]);

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
    const bgCanvas = bgCanvasRef.current;
    if (!card || !canvas || !bgCanvas) return;

    const ctx = canvas.getContext("2d");
    const bgCtx = bgCanvas.getContext("2d");
    if (!ctx || !bgCtx) return;

    let lastX = 384;
    let lastY = 512;

    const resizeBg = () => {
      const dpr = window.devicePixelRatio || 1;
      bgCanvas.width = window.innerWidth * dpr;
      bgCanvas.height = window.innerHeight * dpr;
      bgCanvas.style.width = `${window.innerWidth}px`;
      bgCanvas.style.height = `${window.innerHeight}px`;
      bgCtx.scale(dpr, dpr);
    };
    resizeBg();
    window.addEventListener("resize", resizeBg);

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

      // ==========================================
      // BACKGROUND ANIMATIONS CANVAS RENDER
      // ==========================================
      const w = window.innerWidth;
      const h = window.innerHeight;
      
      const dpr = window.devicePixelRatio || 1;
      if (bgCanvas.width !== w * dpr || bgCanvas.height !== h * dpr) {
        bgCanvas.width = w * dpr;
        bgCanvas.height = h * dpr;
        bgCtx.scale(dpr, dpr);
      }

      bgCtx.clearRect(0, 0, w, h);

      const progress = scrollYProgress.get();
      
      // Interpolate topographic lines color: zinc-200 (#e4e4e7) -> transparent white
      const topoR = Math.round(228 - progress * (228 - 255));
      const topoG = Math.round(228 - progress * (228 - 255));
      const topoB = Math.round(231 - progress * (231 - 255));
      const topoA = 0.5 - progress * 0.44; // 0.5 to 0.06
      const topoColor = `rgba(${topoR}, ${topoG}, ${topoB}, ${topoA})`;

      // Interpolate helmet wireframe color: zinc-300 (#d4d4d8) -> subtle Kodava Blue
      const helmR = Math.round(212 - progress * 212);
      const helmG = Math.round(212 - progress * (212 - 163));
      const helmB = Math.round(216 - progress * (216 - 255));
      const helmA = 0.35 - progress * 0.20; // 0.35 to 0.15
      const helmColor = `rgba(${helmR}, ${helmG}, ${helmB}, ${helmA})`;

      const time = gsap.ticker.time * 1000;

      // 1. Draw topographic contours
      drawTopoLinesConcentric(bgCtx, w, h, time, topoColor);

      // 2. Draw rotating 3D helmet wireframe behind the card
      const cardRect = card.getBoundingClientRect();
      const centerX = cardRect.left + cardRect.width / 2;
      const centerY = cardRect.top + cardRect.height / 2;
      
      drawHelmet(
        bgCtx,
        centerX,
        centerY,
        time,
        helmColor,
        mouseClientRef.current.x,
        mouseClientRef.current.y
      );
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
      window.removeEventListener("resize", resizeBg);
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
        {/* Background Canvas for Topographic lines & Rotating 3D Helmet */}
        <canvas
          ref={bgCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none -z-20"
        />

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

        {/* Top Header Row with scrolling color transition */}
        <motion.div
          style={{ color: textColor }}
          className="w-full flex justify-between items-start font-mono text-[9px] tracking-widest uppercase z-10 pt-10 pointer-events-none"
        >
          <div>
            <span className="font-extrabold block">KAYQUI ROCHA GODINHO</span>
            <motion.p style={{ color: textMutedColor }} className="mt-1">SÃO PAULO, BRASIL</motion.p>
          </div>
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

          {/* Centered Card ("Quadro") in front of the text */}
          <motion.div
            ref={cardRef}
            style={{
              scale: cardScale,
              y: cardY,
              borderColor: borderCol,
            }}
            className="relative w-[min(80vw,45vh)] sm:w-[min(380px,50vh)] aspect-[3/4] overflow-hidden border rounded-sm bg-zinc-950 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] cursor-crosshair select-none z-10 hover:border-[#00A3FF]/40 transition-colors duration-300"
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

          {/* Action buttons with scroll-based borders */}
          <div className="flex items-center gap-4 z-20">
            <a
              href="#sobre"
              className="inline-flex h-10 items-center justify-center rounded-sm bg-[#00A3FF] px-8 text-[10px] font-mono font-bold text-white uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-300 shadow-md border border-[#00A3FF]"
            >
              Entrar
            </a>
            <motion.a
              href="#contato"
              style={{ borderColor: borderCol }}
              className="inline-flex h-10 items-center justify-center rounded-sm border bg-black/60 px-8 text-[10px] font-mono text-zinc-400 uppercase hover:text-white hover:border-zinc-500 transition-all duration-300"
            >
              Contato
            </motion.a>
          </div>

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
