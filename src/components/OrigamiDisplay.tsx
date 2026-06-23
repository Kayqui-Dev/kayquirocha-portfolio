"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface OrigamiDisplayProps {
  fistProgress: React.MutableRefObject<number>;
}

export default function OrigamiDisplay({ fistProgress }: OrigamiDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const smoothedProgress = useRef(0);
  const [localProgress, setLocalProgress] = useState(0);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  // Preload frames (64 frames sequence for optimal mobile memory & smooth load)
  useEffect(() => {
    const totalFrames = 64;
    const imgs: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      // Map 64 indices to the 192 available video frames, ensuring the last maps to frame 192
      const frameIndex = i === totalFrames - 1 ? 192 : (i * 3 + 1);
      const frameNum = String(frameIndex).padStart(3, "0");
      img.src = `/frames/frame_${frameNum}.jpg`;
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, []);

  // Draw current frame to canvas using GSAP Ticker (60FPS Lerp + Canvas rendering)
  useEffect(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image) return;

    let imageFadedOut = false;

    const tick = () => {
      const totalFrames = 64;
      const images = imagesRef.current;
      if (images.length < totalFrames || loadedCount < totalFrames) return;

      const cameraProgress = fistProgress.current;
      const isReady = cameraProgress !== -1;

      if (isReady && !isCameraActive) {
        setIsCameraActive(true);
      }

      const activeProgress = isReady ? cameraProgress : localProgress;

      // 1. Linear Interpolation (Lerp) for smooth progress catching up
      smoothedProgress.current += (activeProgress - smoothedProgress.current) * 0.15;

      // 2. Render frame onto canvas
      const frameIndex = Math.min(totalFrames - 1, Math.max(0, Math.round(smoothedProgress.current * (totalFrames - 1))));
      const activeImage = images[frameIndex];

      const ctx = canvas.getContext("2d");
      if (ctx && activeImage && activeImage.complete && activeImage.naturalWidth > 0) {
        // Ensure canvas internal resolution matches its display size
        if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
          canvas.width = canvas.clientWidth;
          canvas.height = canvas.clientHeight;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Object-cover scaling calculations
        const imgW = activeImage.naturalWidth;
        const imgH = activeImage.naturalHeight;
        const canvasW = canvas.width;
        const canvasH = canvas.height;

        const imgRatio = imgW / imgH;
        const canvasRatio = canvasW / canvasH;

        let drawW = canvasW;
        let drawH = canvasH;
        let drawX = 0;
        let drawY = 0;

        if (imgRatio > canvasRatio) {
          drawW = canvasH * imgRatio;
          drawX = (canvasW - drawW) / 2;
        } else {
          drawH = canvasW / imgRatio;
          drawY = (canvasH - drawH) / 2;
        }

        ctx.drawImage(activeImage, drawX, drawY, drawW, drawH);
      }

      // 3. Opacity transitions (fade placeholder out and show canvas)
      if (smoothedProgress.current > 0.10) {
        if (!imageFadedOut) {
          imageFadedOut = true;
          // Fade out the static placeholder image
          gsap.to(image, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto"
          });
          // Fade in the canvas
          gsap.to(canvas, {
            opacity: 0.85,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto"
          });
        }
      } else {
        if (imageFadedOut) {
          imageFadedOut = false;
          // Fade in the static placeholder image
          gsap.to(image, {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto"
          });
          // Fade out the canvas
          gsap.to(canvas, {
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
  }, [fistProgress, localProgress, isCameraActive, loadedCount]);

  // Mouse & Touch fallback scrubbing
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (fistProgress.current === -1) {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const normalized = Math.max(0, Math.min(1, x / rect.width));
        setLocalProgress(normalized);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (fistProgress.current === -1 && e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const normalized = Math.max(0, Math.min(1, x / rect.width));
        setLocalProgress(normalized);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (fistProgress.current === -1 && e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const normalized = Math.max(0, Math.min(1, x / rect.width));
        setLocalProgress(normalized);
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
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
        {/* Canvas for butter-smooth frame sequence rendering */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ opacity: 0 }}
        />

        {/* Static Origami Base Image (Placeholder during load) */}
        <div ref={imageRef} className="origami-static-img absolute inset-0 w-full h-full z-10 pointer-events-none">
          <img
            src="/imagen_origami.png"
            alt="Origami Shape"
            className="w-full h-full object-cover filter brightness-95 contrast-105"
          />
        </div>
        
        {/* Preloading indicator */}
        {loadedCount < 64 && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-30 font-mono text-[9px] text-[#00FFC2] uppercase tracking-[0.2em]">
            <div className="w-5 h-5 border border-current border-t-transparent rounded-full animate-spin mb-3" />
            <span>Carregando ({Math.round((loadedCount / 64) * 100)}%)</span>
          </div>
        )}
        
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
          {isCameraActive ? "Gestos Ativos por IA" : "Mova o mouse ou arraste no mobile como Fallback"}
        </p>
      </div>
    </div>
  );
}
