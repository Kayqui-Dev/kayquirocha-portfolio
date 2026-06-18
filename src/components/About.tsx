"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STACK_ITEMS = [
  {
    name: "React / Next.js",
    category: "Frontend & UI",
    desc: "Criação de interfaces web de alto desempenho utilizando App Router, TypeScript, Tailwind e renderização híbrida.",
    colSpan: "lg:col-span-8",
    icon: (
      <svg className="w-6 h-6 text-zinc-400 group-hover:text-[#00A3FF] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    ),
  },
  {
    name: "Python",
    category: "Backend & IA",
    desc: "Scripts de automação, manipulação de dados, scraping e backend resiliente integrado a modelos de inteligência artificial.",
    colSpan: "lg:col-span-4",
    icon: (
      <svg className="w-6 h-6 text-zinc-400 group-hover:text-[#00A3FF] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    name: "Supabase",
    category: "Database & Auth",
    desc: "Modelagem PostgreSQL, segurança com RLS (Row Level Security), real-time subscriptions e Serverless Functions.",
    colSpan: "lg:col-span-4",
    icon: (
      <svg className="w-6 h-6 text-zinc-400 group-hover:text-[#00A3FF] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
  {
    name: "n8n",
    category: "Workflow Automation",
    desc: "Orquestração de microsserviços, automação de processos de negócios e integração inteligente de fluxos cognitivos complexos.",
    colSpan: "lg:col-span-8",
    icon: (
      <svg className="w-6 h-6 text-zinc-400 group-hover:text-[#00A3FF] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    name: "AI APIs (Gemini & OpenAI)",
    category: "Inteligência Artificial",
    desc: "Integração direta com Modelos de Linguagem de Grande Porte (LLMs) para análise cognitiva estruturada, automação inteligente e agentes autônomos robustos.",
    colSpan: "lg:col-span-12",
    icon: (
      <svg className="w-6 h-6 text-zinc-400 group-hover:text-[#00A3FF] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  useEffect(() => {
    // 3D Magnetic tilt effect
    cardRefs.current.forEach((card) => {
      if (!card) return;

      const xTo = gsap.quickTo(card, "x", { duration: 0.4, ease: "power3.out" });
      const yTo = gsap.quickTo(card, "y", { duration: 0.4, ease: "power3.out" });
      const rxTo = gsap.quickTo(card, "rotateX", { duration: 0.4, ease: "power3.out" });
      const ryTo = gsap.quickTo(card, "rotateY", { duration: 0.4, ease: "power3.out" });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        
        const mouseX = e.clientX - rect.left - width / 2;
        const mouseY = e.clientY - rect.top - height / 2;

        const rotY = (mouseX / (width / 2)) * 6;
        const rotX = -(mouseY / (height / 2)) * 6;

        const transX = (mouseX / (width / 2)) * 8;
        const transY = (mouseY / (height / 2)) * 8;

        rxTo(rotX);
        ryTo(rotY);
        xTo(transX);
        yTo(transY);
        gsap.to(card, { boxShadow: "0 20px 40px -10px rgba(0, 163, 255, 0.12)", duration: 0.4, overwrite: "auto" });
      };

      const handleMouseEnter = () => {
        gsap.set(card, { transformPerspective: 1000 });
        gsap.to(card, { scale: 1.015, borderColor: "rgba(0, 163, 255, 0.25)", duration: 0.3 });
      };

      const handleMouseLeave = () => {
        rxTo(0);
        ryTo(0);
        xTo(0);
        yTo(0);
        gsap.to(card, { scale: 1, borderColor: "rgba(255, 255, 255, 0.05)", boxShadow: "none", duration: 0.3 });
      };

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    });

    // Handwriting drawing signature trigger
    const signaturePath = document.getElementById("about-signature-path") as SVGPathElement | null;
    if (signaturePath) {
      const length = signaturePath.getTotalLength() || 1000;
      
      gsap.set(signaturePath, {
        attr: {
          "stroke-dasharray": length,
          "stroke-dashoffset": length,
        }
      });

      gsap.to(signaturePath, {
        attr: { "stroke-dashoffset": 0 },
        ease: "none",
        scrollTrigger: {
          trigger: signaturePath,
          start: "top 90%",
          end: "bottom 70%",
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
    }
  }, []);

  return (
    <section
      id="sobre"
      ref={containerRef}
      className="relative z-10 w-full bg-black py-32 md:py-48 px-6 sm:px-12 md:px-24 flex flex-col justify-center border-t border-white/[0.03] overflow-hidden"
    >
      {/* Background visual detail */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,163,255,0.03)_0%,rgba(0,0,0,0)_60%)] pointer-events-none"></div>

      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col gap-16">
        
        {/* Section Header */}
        <motion.div
          variants={revealVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-4 select-none"
        >
          <span className="section-tag text-[10px] font-mono tracking-widest text-[#00A3FF] uppercase font-bold">
            02 / Sobre Mim
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-white uppercase font-sans">
            Arsenal Tecnológico
          </h2>
          <div className="w-16 h-[2px] bg-[#00A3FF]"></div>
          <p className="text-zinc-500 text-xs max-w-xl font-mono">
            Nested Bento Grid Magnético com vidro fosco e interação 3D.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
          {STACK_ITEMS.map((tech, idx) => (
            <motion.div
              key={tech.name}
              ref={(el) => {
                if (el) cardRefs.current[idx] = el;
              }}
              variants={revealVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.08 }}
              className={`p-8 sm:p-10 rounded-lg bg-[rgba(10,12,16,0.4)] backdrop-blur-md border border-white/5 flex flex-col justify-between group select-none transition-all duration-300 min-h-[220px] ${tech.colSpan}`}
            >
              {/* Card Header Info */}
              <div className="flex items-start justify-between mb-6">
                <span className="text-[10px] font-mono tracking-widest text-[#00A3FF] uppercase font-bold">
                  {tech.category}
                </span>
                <div className="p-2 rounded-sm bg-white/[0.02] border border-white/5 group-hover:bg-[#00A3FF]/5 group-hover:border-[#00A3FF]/20 transition-colors duration-300">
                  {tech.icon}
                </div>
              </div>

              {/* Title & Description */}
              <div className="flex flex-col gap-3 mt-auto">
                <h3 className="text-2xl sm:text-3xl font-serif text-white tracking-tight uppercase leading-none font-bold group-hover:text-[#00A3FF] transition-colors duration-300">
                  {tech.name}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-zinc-500 leading-relaxed max-w-2xl group-hover:text-zinc-400 transition-colors duration-300">
                  {tech.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SVG Signature container (drawn on scroll) */}
        <div className="mt-12 flex flex-col items-end gap-2 select-none w-full">
          <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
            Engenharia & Performance
          </span>
          <svg
            viewBox="0 0 400 120"
            className="w-48 h-20 filter drop-shadow-[0_2px_8px_rgba(0,163,255,0.25)]"
          >
            <path
              id="about-signature-path"
              d="M 30 80 Q 55 20 65 20 T 75 90 Q 80 40 90 60 T 105 75 Q 115 45 120 60 T 130 80 Q 145 25 150 50 T 160 80 Q 170 50 175 75 T 185 75 Q 205 75 225 40 Q 235 20 245 25 T 250 80 Q 260 40 265 60 T 275 75 Q 285 40 290 60 T 300 75 T 315 65 Q 335 65 355 30 T 365 80"
              stroke="#00A3FF"
              strokeWidth="3.2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

      </div>
    </section>
  );
}
