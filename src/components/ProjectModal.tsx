"use client";

import { motion } from "framer-motion";

interface ProjectDetails {
  title: string;
  type: string;
  desc: string;
  longDesc: string;
  architecture: string[];
  dbFlow: string;
  features: string[];
  tags: string[];
}

interface ProjectModalProps {
  project: ProjectDetails | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-zinc-950 border border-white/10 rounded-sm w-full max-w-2xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] relative z-10 flex flex-col max-h-[85vh] select-none"
      >
        {/* Header decoration */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-lime/80 via-white/20 to-accent-lime/80"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white hover:bg-white/5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 z-20"
          aria-label="Fechar Modal"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Scrollable Container */}
        <div className="p-6 md:p-8 overflow-y-auto scrollbar-thin flex flex-col gap-6">
          {/* Title & Tag */}
          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-mono tracking-widest text-accent-lime uppercase font-bold">
              {project.type}
            </span>
            <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase font-sans">
              {project.title}
            </h3>
          </div>

          {/* Long Description */}
          <p className="text-sm text-zinc-400 leading-relaxed font-sans border-b border-white/5 pb-6">
            {project.longDesc}
          </p>

          {/* Two Column details: Architecture & Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-white/5 pb-6">
            {/* Tech Architecture */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-mono tracking-wider text-white uppercase font-bold">
                🛠️ Arquitetura
              </h4>
              <ul className="flex flex-col gap-2 font-mono text-[11px] text-zinc-500">
                {project.architecture.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-accent-lime font-bold">•</span>
                    <span className="text-zinc-400">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Scope / Key Features */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-mono tracking-wider text-white uppercase font-bold">
                🎯 Funcionalidades
              </h4>
              <ul className="flex flex-col gap-2 font-sans text-xs text-zinc-400">
                {project.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2">
                    <span className="text-accent-lime font-bold">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Database Flow */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono tracking-wider text-white uppercase font-bold">
              🗄️ Fluxo de Dados (Database/Supabase)
            </h4>
            <p className="font-mono text-[11px] text-zinc-400 leading-relaxed bg-zinc-900/40 border border-white/5 p-4 rounded-sm">
              {project.dbFlow}
            </p>
          </div>

          {/* Stacks tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-sm bg-white/[0.02] border border-white/[0.05] text-[10px] font-mono text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
