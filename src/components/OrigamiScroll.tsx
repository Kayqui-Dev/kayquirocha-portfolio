"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OrigamiScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // We must ensure the video metadata is fully loaded to read video.duration
    const initScrollTrigger = () => {
      const duration = video.duration || 1;
      const playhead = { currentTime: 0 };

      // 1. Video scrubbing tween
      gsap.to(playhead, {
        currentTime: duration,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Smooth interpolation lag
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          // Safeguard to prevent setting currentTime beyond bounds
          if (video && playhead.currentTime >= 0 && playhead.currentTime <= duration) {
            video.currentTime = playhead.currentTime;
          }
        },
      });

      // 2. Text fade-in / slide-up trigger
      gsap.fromTo(
        ".origami-text-container",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top -30%", // Triggers around 30% of scroll height
            end: "top -70%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    };

    // Attempt to initialize once metadata is available
    if (video.readyState >= 1) {
      initScrollTrigger();
    } else {
      video.addEventListener("loadedmetadata", initScrollTrigger);
    }

    return () => {
      if (video) {
        video.removeEventListener("loadedmetadata", initScrollTrigger);
      }
      // Kill all scroll triggers attached to this container
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[300vh] bg-black"
      id="origami-section"
    >
      {/* Sticky Fullscreen Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
        {/* Cinematic Origami Video Background */}
        <video
          ref={videoRef}
          src="/origami_crumple.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-60 -z-10"
        />

        {/* Optional Grid Overlay for Premium Tech Vibe */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.85))] pointer-events-none z-10" />

        {/* Centered Minimalist Typography Overlay */}
        <div className="origami-text-container relative z-20 flex flex-col items-center px-6 text-center select-none max-w-4xl pointer-events-none">
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#00A3FF] mb-6 font-black filter drop-shadow-[0_0_8px_rgba(0,163,255,0.3)]">
            ✦ PROJETO ORIGAMI ✦
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-light text-white/90 leading-tight">
            Transformação em <br className="sm:hidden" />
            <span className="font-serif italic font-normal text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.7)]">
              cada detalhe.
            </span>
          </h2>
          <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mt-8 max-w-md leading-relaxed">
            Role a página para dobrar, amassar e interagir com a forma tridimensional.
          </p>
        </div>

        {/* Ambient Grid overlay to match design theme */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(0,163,255,0.04),rgba(0,0,0,0),rgba(0,163,255,0.04))] bg-[size:100%_4px,3px_100%] pointer-events-none z-15 opacity-30" />
      </div>
    </section>
  );
}
