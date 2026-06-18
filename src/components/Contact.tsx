"use client";

import { motion } from "framer-motion";

export default function Contact() {
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

  const CONTACT_LINKS = [
    {
      name: "GitHub",
      href: "https://github.com/kayquirocha",
      detail: "@kayquirocha",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/kayquirocha",
      detail: "Kayqui Rocha Godinho",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      name: "E-mail",
      href: "mailto:kayquirocha.dev@gmail.com",
      detail: "kayquirocha.dev@gmail.com",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/5511999999999",
      detail: "Enviar mensagem",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="contato" className="py-32 md:py-48 border-t border-white/[0.05] bg-black">
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 md:px-16 flex flex-col gap-16">
        {/* Contact Header */}
        <motion.div
          variants={revealVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-xl mx-auto flex flex-col gap-4"
        >
          <span className="section-tag">06 / Contato</span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-white uppercase font-sans leading-none">
            VAMOS CONSTRUIR O PRÓXIMO PÓDIO JUNTOS?
          </h2>
          <div className="w-16 h-[2px] bg-accent-lime mx-auto mt-1"></div>
          <p className="text-sm text-zinc-400 leading-relaxed font-sans mt-2">
            Seja para desenvolver um sistema sob medida com IA, automatizar fluxos complexos da sua empresa, 
            ou trocar ideias sobre engenharia de software e Wrestling, sinta-se à vontade para se conectar.
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CONTACT_LINKS.map((link, idx) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={revealVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-sm bg-zinc-950/60 border border-white/5 hover:border-accent-lime/30 hover:bg-zinc-900/10 transition-all duration-300 flex flex-col items-center text-center group select-none"
            >
              <div className="w-10 h-10 rounded-full bg-white/[0.02] border border-white/[0.05] flex items-center justify-center text-zinc-400 group-hover:text-accent-lime group-hover:border-accent-lime/20 transition-all duration-300 mb-4">
                {link.icon}
              </div>
              <h3 className="text-sm font-semibold text-white tracking-tight mb-1 font-sans">
                {link.name}
              </h3>
              <p className="text-xs font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors duration-300">
                {link.detail}
              </p>
            </motion.a>
          ))}
        </div>

        {/* Footer info (Lando style always bringing the fight tag) */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/5 pt-8 text-[10px] font-mono text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} KAYQUI ROCHA GODINHO. TODOS OS DIREITOS RESERVADOS.</p>
          <p className="flex items-center gap-1.5 uppercase font-bold text-[9px] tracking-wider text-zinc-400">
            Foco, Disciplina & Código
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime"></span>
            Kodava Solutions
          </p>
        </div>
      </div>
    </section>
  );
}
