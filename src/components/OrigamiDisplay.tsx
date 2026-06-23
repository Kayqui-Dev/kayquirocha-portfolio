"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

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

  // Force video to pause and run warmup to unlock seeking in iOS/Android
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force load the video source
    video.load();

    // 1. Programmatic Muted Autoplay Warmup: Attempt to play immediately on mount (often allowed because it's muted)
    video.play()
      .then(() => {
        video.pause();
        console.log("Immediate video warmup succeeded, duration:", video.duration);
      })
      .catch(err => {
        console.log("Immediate video warmup blocked, waiting for user gesture:", err);
      });

    // 2. Gesture Fallback: warmup on first touch or click
    const warmup = () => {
      if (video.paused) {
        video.play()
          .then(() => {
            video.pause();
            console.log("Video warmed up via gesture, duration:", video.duration);
          })
          .catch(err => {
            console.log("Video gesture warmup failed:", err);
          });
      }
      
      // Clean up event listeners once warmup has run once
      document.removeEventListener("click", warmup);
      document.removeEventListener("touchstart", warmup);
    };

    document.addEventListener("click", warmup);
    document.addEventListener("touchstart", warmup, { passive: true });

    // 3. Play-Pause Hack on Seeked to force iOS Safari to render frame changes while paused
    const handleSeeked = () => {
      if (video.paused) {
        video.play()
          .then(() => {
            video.pause();
          })
          .catch(() => {});
      }
    };
    video.addEventListener("seeked", handleSeeked);

    return () => {
      document.removeEventListener("click", warmup);
      document.removeEventListener("touchstart", warmup);
      video.removeEventListener("seeked", handleSeeked);
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
      const isReady = cameraProgress !== -1;

      if (isReady && !isCameraActive) {
        setIsCameraActive(true);
      }

      const activeProgress = isReady ? cameraProgress : localProgress;

      // 1. Linear Interpolation (Lerp) for smooth progress catching up
      smoothedProgress.current += (activeProgress - smoothedProgress.current) * 0.15;

      // 2. Force the video playhead directly to the exact frame (zero delay, scrubbed timeline)
      if (!video.paused) {
        video.play().then(() => video.pause()).catch(() => {});
      }
      
      const targetTime = smoothedProgress.current * video.duration;
      // Only set currentTime if the video decoder is not already busy seeking,
      // and the difference is greater than ~16ms (one frame at 60fps).
      if (!video.seeking && Math.abs(video.currentTime - targetTime) > 0.016) {
        video.currentTime = targetTime;
      }

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
        {/* Origami Crumpling Video */}
        <video
          ref={videoRef}
          src="/origami_crumple_smooth.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ opacity: 0.01 }}
        />

        {/* Static Origami Base Image */}
        <div ref={imageRef} className="origami-static-img absolute inset-0 w-full h-full z-10 pointer-events-none">
          <img
            src="/imagen_origami.png"
            alt="Origami Shape"
            className="w-full h-full object-cover filter brightness-95 contrast-105"
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
