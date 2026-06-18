"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const MENU_ITEMS = [
  { label: "Home", href: "#", num: "01", image: "/kayqui_trophy.jpg", desc: "Abertura e mentalidade de alta performance" },
  { label: "Tech Stack", href: "#stack", num: "02", image: "/kayqui_developer.jpg", desc: "Arsenal tecnológico, linguagens e DevOps" },
  { label: "Projetos", href: "#projetos", num: "03", image: "/kayqui_developer.jpg", desc: "Showcase de repositórios e cases de engenharia" },
  { label: "Wrestling", href: "#mindset", num: "04", image: "/kayqui_wrestler.png", desc: "A disciplina do tatame aplicada ao código" },
  { label: "Contato", href: "#contato", num: "05", image: "/kayqui_trophy.jpg", desc: "Parcerias, e-mail e canais sociais" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(MENU_ITEMS[0].image);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/90 backdrop-blur-md py-4 border-b border-white/5" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-mono text-sm tracking-[0.25em] font-extrabold text-white uppercase group"
          >
            KAYQUI<span className="text-accent-lime group-hover:text-white transition-colors duration-300">.</span>ROCHA
          </a>

          {/* Menu Trigger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-50 flex flex-col items-end gap-1.5 p-2 focus:outline-none group"
            aria-label="Menu"
          >
            <span
              className={`h-[2px] bg-white transition-all duration-300 rounded-full ${
                isMenuOpen ? "w-6 rotate-45 translate-y-[5px]" : "w-6 group-hover:w-8"
              }`}
            ></span>
            <span
              className={`h-[2px] bg-white transition-all duration-300 rounded-full ${
                isMenuOpen ? "w-6 -rotate-45 -translate-y-[3px]" : "w-4 group-hover:w-8"
              }`}
            ></span>
          </button>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-black flex flex-col lg:flex-row w-screen h-screen overflow-hidden"
          >
            {/* Background Grid Pattern in Menu */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none -z-10"></div>

            {/* Left Column: Navigation Links (Scrollable on small mobile) */}
            <div className="w-full lg:w-7/12 h-full flex flex-col justify-center px-6 sm:px-16 md:px-24 py-24 lg:py-0 overflow-y-auto">
              <div className="flex flex-col gap-6 lg:gap-8 max-w-lg">
                <span className="font-mono text-[9px] tracking-[0.3em] text-accent-lime uppercase font-bold select-none mb-2 block">
                  — Menu de Navegação
                </span>
                
                {MENU_ITEMS.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 + 0.1, duration: 0.4 }}
                    className="group"
                  >
                    <a
                      href={item.href}
                      onClick={handleLinkClick}
                      onMouseEnter={() => setActiveImage(item.image)}
                      className="inline-flex items-baseline gap-4 text-white hover:text-accent-lime transition-all duration-300 select-none py-1.5"
                    >
                      <span className="font-mono text-[10px] text-zinc-500 group-hover:text-accent-lime transition-colors duration-300 font-bold">
                        {item.num}
                      </span>
                      <span className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif tracking-tighter uppercase leading-none">
                        {item.label}
                      </span>
                    </a>
                    <p className="text-[10px] font-mono text-zinc-500 ml-9 max-w-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column: Visual Preview Container */}
            <div className="hidden lg:block lg:w-5/12 h-full relative overflow-hidden bg-zinc-950 border-l border-white/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 0.35, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={activeImage}
                    alt="Preview Menu"
                    fill
                    priority
                    sizes="50vw"
                    className="object-cover filter grayscale contrast-115 brightness-95"
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Overlay styling elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent pointer-events-none"></div>
              
              {/* Branding Stamp */}
              <div className="absolute bottom-12 right-12 z-10 flex flex-col items-end gap-1 font-mono select-none">
                <span className="text-white text-[10px] tracking-widest font-bold">KODAVA SOLUTIONS</span>
                <span className="text-accent-lime text-[9px] tracking-widest font-bold">NTG WRESTLING ACADEMY</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
