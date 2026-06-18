"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const CONTACTS = [
  { name: "GitHub", href: "https://github.com/kayquirocha", detail: "@kayquirocha" },
  { name: "LinkedIn", href: "https://linkedin.com/in/kayquirocha", detail: "Kayqui Rocha" },
  { name: "E-mail", href: "mailto:kayquirocha.dev@gmail.com", detail: "kayquirocha.dev@gmail.com" },
  { name: "WhatsApp", href: "https://wa.me/5511999999999", detail: "Enviar Mensagem" }
];

export default function Footer() {
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    linkRefs.current.forEach((link) => {
      if (!link) return;

      const xTo = gsap.quickTo(link, "x", { duration: 0.3, ease: "power3.out" });
      const yTo = gsap.quickTo(link, "y", { duration: 0.3, ease: "power3.out" });

      const onMouseMove = (e: MouseEvent) => {
        const rect = link.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        
        // Attract the link towards the cursor (max 20px)
        xTo(relX * 0.45);
        yTo(relY * 0.45);
      };

      const onMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      link.addEventListener("mousemove", onMouseMove);
      link.addEventListener("mouseleave", onMouseLeave);

      return () => {
        link.removeEventListener("mousemove", onMouseMove);
        link.removeEventListener("mouseleave", onMouseLeave);
      };
    });
  }, []);

  return (
    <footer className="h-[75vh] md:h-[70vh] w-full flex flex-col justify-between py-16 px-6 sm:px-12 md:px-24 bg-[#050505] sticky bottom-0 z-0 select-none overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,163,255,0.025)_0%,rgba(0,0,0,0)_70%)] pointer-events-none"></div>

      {/* Main Call to Action */}
      <div className="flex-1 flex flex-col justify-center items-center max-w-4xl mx-auto w-full text-center z-10 gap-6">
        <span className="section-tag text-[10px] font-mono tracking-widest text-[#00A3FF] uppercase font-bold">
          06 / Contato
        </span>
        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight uppercase leading-none">
          Vamos construir o próximo pódio juntos?
        </h2>
        <p className="text-zinc-500 text-xs sm:text-sm font-sans max-w-xl leading-relaxed mt-2">
          Seja para planejar arquiteturas com inteligência artificial, refinar fluxos de engenharia ou falar sobre o tatame, conecte-se.
        </p>
      </div>

      {/* Social / Contact Links Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl w-full mx-auto justify-items-center items-center z-10 py-8 border-t border-white/5">
        {CONTACTS.map((c, idx) => (
          <a
            key={c.name}
            ref={(el) => {
              linkRefs.current[idx] = el;
            }}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center group cursor-pointer p-4 rounded-xl transition-all"
          >
            <span className="text-[10px] font-mono tracking-widest text-[#00A3FF] uppercase font-bold mb-1">
              {c.name}
            </span>
            <span className="text-sm sm:text-base font-serif text-white uppercase tracking-tight group-hover:text-white/80 transition-colors">
              {c.detail}
            </span>
          </a>
        ))}
      </div>

      {/* Bottom Metadata row */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between border-t border-white/5 pt-8 text-[9px] sm:text-[10px] font-mono text-zinc-600 gap-4 z-10">
        <p>© {new Date().getFullYear()} KAYQUI ROCHA GODINHO. TODOS OS DIREITOS RESERVADOS.</p>
        <div className="flex items-center gap-4 uppercase font-bold tracking-wider text-[8px] sm:text-[9px]">
          <span className="text-zinc-500">Foco & Disciplina</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse"></span>
          <span className="text-[#00A3FF]">Kodava Solutions</span>
        </div>
      </div>
    </footer>
  );
}
