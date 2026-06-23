"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

interface OrigamiDisplayProps {
  fistProgress: React.MutableRefObject<number>;
}

export default function OrigamiDisplay({ fistProgress }: OrigamiDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const smoothedProgress = useRef(0);
  const [localProgress, setLocalProgress] = useState(0);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Force video to pause and run warmup on first user gesture (touch/click) to unlock seeking in iOS/Android
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();

    const warmup = () => {
      video.play()
        .then(() => {
          video.pause();
          console.log("Video warmed up successfully");
        })
        .catch(err => {
          console.log("Video warmup failed/waiting for gesture:", err);
        });
      
      // Clean up event listeners once warmup has run once
      document.removeEventListener("click", warmup);
      document.removeEventListener("touchstart", warmup);
    };

    document.addEventListener("click", warmup);
    document.addEventListener("touchstart", warmup, { passive: true });

    return () => {
      document.removeEventListener("click", warmup);
      document.removeEventListener("touchstart", warmup);
    };
  }, []);

  // Scrub and transition based on fist progress using GSAP Ticker (60FPS Lerp + frame control)
  useEffect(() => {
    const video = videoRef.current;
    const image = imageRef.current;
    if (!video || !image) return;

    let imageFadedOut = false;

    const tick = () => {
      if (!video || isNaN(video.duration) || video.duration === 0) return;

      const cameraProgress = fistProgress.current;
      if (cameraProgress > 0 && !isCameraActive) {
        setIsCameraActive(true);
      }

      const activeProgress = cameraProgress > 0 ? cameraProgress : localProgress;

      // 1. Linear Interpolation (Lerp) for smooth progress catching up
      smoothedProgress.current += (activeProgress - smoothedProgress.current) * 0.15;

      // 2. Force the video playhead directly to the exact frame (zero delay, scrubbed timeline)
      video.currentTime = smoothedProgress.current * video.duration;

      // 3. Opacity transitions (fade-in / fade-out) based on smoothed progress
      if (smoothedProgress.current > 0.05) {
        if (!imageFadedOut) {
          imageFadedOut = true;
          // Fade out the static image
          gsap.to(image, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto"
          });
          // Fade in the video
          gsap.to(video, {
            opacity: 0.85,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto"
          });
        }
      } else {
        if (imageFadedOut) {
          imageFadedOut = false;
          // Fade in the static image
          gsap.to(image, {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto"
          });
          // Fade out the video
          gsap.to(video, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto"
          });
        }
      }
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
    };
  }, [fistProgress, localProgress, isCameraActive]);

  // Mouse fallback scrubbing
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Only use mouse fallback if progress from camera is 0
      if (fistProgress.current === 0) {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const normalized = Math.max(0, Math.min(1, x / rect.width));
        setLocalProgress(normalized);
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, [fistProgress]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-[#07070a] flex items-center justify-center overflow-hidden border-t md:border-t-0 md:border-l border-zinc-800/50"
    >
      {/* Background ambient mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* 9:16 Aspect Ratio Centered Frame */}
      <div className="relative aspect-[9/16] h-[75vh] max-h-[80%] rounded-2xl overflow-hidden border border-zinc-800/80 bg-black/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10">
        {/* Origami Crumpling Video */}
        <video
          ref={videoRef}
          src="/origami_crumple_smooth.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ opacity: 0 }}
        />

        {/* Static Origami Base Image */}
        <div ref={imageRef} className="origami-static-img absolute inset-0 w-full h-full z-10 pointer-events-none">
          <Image
            src="/imagen_origami.png"
            alt="Origami Shape"
            fill
            priority
            className="object-cover filter brightness-95 contrast-105"
          />
        </div>
        
        {/* Ambient Grid overlay to match design theme */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(0,163,255,0.03),rgba(0,0,0,0),rgba(0,163,255,0.03))] bg-[size:100%_4px,3px_100%] pointer-events-none z-20 opacity-30" />
      </div>

      {/* Overlay instruction */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 text-center select-none w-full max-w-xs px-4">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#00A3FF] block mb-3 font-bold filter drop-shadow-[0_0_8px_rgba(0,163,255,0.3)]">
          ✦ Force Crush Interaction ✦
        </span>
        <h2 className="text-xl font-serif font-light text-zinc-100 uppercase tracking-widest animate-pulse">
          Feche a Mão para Destruir
        </h2>
        <p className="text-[8px] font-mono uppercase tracking-widest text-zinc-500 mt-3 font-bold">
          {isCameraActive ? "Gestos Ativos por IA" : "Mova o mouse horizontalmente como Fallback"}
        </p>
      </div>
    </div>
  );
}
