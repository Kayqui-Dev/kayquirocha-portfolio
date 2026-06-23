"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface HeroInteractiveProps {
  handPos: { x: number; y: number };
  isHandDetected: boolean;
  progress: number;
  onBack: () => void;
}

export default function HeroInteractive({
  handPos,
  isHandDetected,
  progress,
  onBack,
}: HeroInteractiveProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Track cursor target and animated positions
  const cursorRef = useRef({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 500,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 500,
    targetX: typeof window !== "undefined" ? window.innerWidth / 2 : 500,
    targetY: typeof window !== "undefined" ? window.innerHeight / 2 : 500,
    radius: 0,
    targetRadius: 130, // Default mouse radius
  });

  const [interactiveMode, setInteractiveMode] = useState<"mouse" | "hand">("mouse");

  // Local origami video to scrub
  const videoUrl = "/origami_crumple.mp4";

  // Sync hand coordinates if detected
  useEffect(() => {
    if (isHandDetected) {
      cursorRef.current.targetX = handPos.x;
      cursorRef.current.targetY = handPos.y;
      cursorRef.current.targetRadius = 180; // Larger radius for hand spotlight
      setInteractiveMode("hand");
    } else if (interactiveMode === "hand") {
      // Keep hand mode radius but wait for mouse move or shrink
      cursorRef.current.targetRadius = 130;
      setInteractiveMode("mouse");
    }
  }, [handPos, isHandDetected, interactiveMode]);

  // Scrub the video when progress prop updates (from HandTracker)
  useEffect(() => {
    if (isHandDetected) {
      const video = videoRef.current;
      if (!video || isNaN(video.duration) || video.duration === 0) return;
      const targetTime = progress * video.duration;
      gsap.to(video, {
        currentTime: targetTime,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  }, [progress, isHandDetected]);

  // GSAP Ticker animation loop
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Set initial target to center
    cursorRef.current.targetX = window.innerWidth / 2;
    cursorRef.current.targetY = window.innerHeight / 2;

    const tick = () => {
      const cursor = cursorRef.current;
      
      // Interpolate values for buttery smooth movement
      cursor.x += (cursor.targetX - cursor.x) * 0.08;
      cursor.y += (cursor.targetY - cursor.y) * 0.08;
      cursor.radius += (cursor.targetRadius - cursor.radius) * 0.06;

      // Update CSS clip-path dynamically
      overlay.style.clipPath = `circle(${cursor.radius}px at ${cursor.x}px ${cursor.y}px)`;
    };

    gsap.ticker.add(tick);

    // Track mouse coordinates as fallback and scrub video
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHandDetected) {
        cursorRef.current.targetX = e.clientX;
        cursorRef.current.targetY = e.clientY;

        const video = videoRef.current;
        if (video && !isNaN(video.duration) && video.duration > 0) {
          const mouseProgress = e.clientX / window.innerWidth;
          const targetTime = mouseProgress * video.duration;
          gsap.to(video, {
            currentTime: targetTime,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHandDetected]);

  // Entrance animations using GSAP
  useEffect(() => {
    // Fade in interface elements
    gsap.fromTo(
      ".fade-in-ui",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black select-none z-40 pointer-events-auto"
    >
      {/* ========================================================== */}
      {/* LAYER 1: BOTTOM (Revealed colourful cinematic video & text) */}
      {/* ========================================================== */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover absolute inset-0 opacity-80"
        />
        
        {/* Colorful reveal text */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-6xl sm:text-7xl md:text-[10vw] font-black tracking-tighter text-indigo-400 uppercase leading-none drop-shadow-[0_0_30px_rgba(99,102,241,0.4)]">
            KAYQUI ORIGAMI
          </h1>
          <p className="text-sm sm:text-lg md:text-xl font-mono text-cyan-300 mt-6 uppercase tracking-[0.4em] font-medium drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">
            Interactive Origami Shape
          </p>
        </div>
      </div>

      {/* ========================================================== */}
      {/* LAYER 2: MIDDLE (The dark mask overlay containing clip-path) */}
      {/* ========================================================== */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[#07070a]/98 z-10 transition-shadow duration-300 pointer-events-none"
        style={{
          clipPath: "circle(0px at 50% 50%)",
          mixBlendMode: "normal",
        }}
      />

      {/* ========================================================== */}
      {/* LAYER 3: TOP (Dark outlined text that aligns with colorful text) */}
      {/* ========================================================== */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 pointer-events-none z-20">
        <h1
          className="text-6xl sm:text-7xl md:text-[10vw] font-black tracking-tighter text-transparent uppercase leading-none"
          style={{ WebkitTextStroke: "1px rgba(255, 255, 255, 0.12)" }}
        >
          KAYQUI ORIGAMI
        </h1>
        <p className="text-sm sm:text-lg md:text-xl font-mono text-zinc-700 mt-6 uppercase tracking-[0.4em] font-medium">
          Interactive Origami Shape
        </p>
      </div>

      {/* ========================================================== */}
      {/* INTERFACE LAYER: Buttons, instructions, status indicators */}
      {/* ========================================================== */}
      
      {/* Exit Button */}
      <button
        onClick={onBack}
        className="fade-in-ui absolute top-8 left-6 sm:left-12 z-50 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 rounded-full px-5 py-2.5 text-xs font-mono uppercase tracking-widest backdrop-blur-md transition-all duration-300 cursor-pointer shadow-lg hover:shadow-indigo-500/10 pointer-events-auto"
      >
        ← Voltar ao Portfólio
      </button>

      {/* Mode Status Indicator */}
      <div className="fade-in-ui absolute top-8 right-6 sm:right-12 z-50 flex items-center gap-3 bg-black/40 border border-zinc-800/80 rounded-full px-4 py-2 backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${interactiveMode === "hand" ? "bg-indigo-400" : "bg-emerald-400"}`}></span>
          <span className={`relative inline-flex rounded-full h-2 w-2 ${interactiveMode === "hand" ? "bg-indigo-500" : "bg-emerald-500"}`}></span>
        </span>
        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
          Modo: {interactiveMode === "hand" ? "Visão IA Ativa" : "Mouse Fallback"}
        </span>
      </div>

      {/* Footer Instructions */}
      <div className="fade-in-ui absolute bottom-8 left-1/2 -translate-x-1/2 z-30 text-center w-full max-w-lg px-6">
        <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 animate-pulse font-medium">
          {interactiveMode === "hand"
            ? "Mão detectada! Feche a mão em punho para amassar o origami e mova o indicador."
            : "Mova o mouse horizontalmente ou ative a câmera para amassar o origami."}
        </p>
      </div>
      
      {/* Ambient Grid overlay to enhance depth */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none z-30 opacity-20" />
    </div>
  );
}
