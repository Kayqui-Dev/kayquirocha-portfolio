"use client";

import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { label: "Sobre", href: "#sobre" },
  { label: "Tech Stack", href: "#stack" },
  { label: "Projetos", href: "#projetos" },
  { label: "Mindset", href: "#mindset" },
  { label: "Contato", href: "#contato" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on click link
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#000000]/80 backdrop-blur-md border-b border-white/[0.06] py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-mono text-sm tracking-[0.2em] font-bold text-white uppercase group"
        >
          KAYQUI<span className="text-red-500 group-hover:text-white transition-colors duration-300">.</span>ROCHA
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-mono tracking-wider text-zinc-400 hover:text-white transition-colors duration-200 uppercase relative py-1 group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-zinc-400 hover:text-white p-1 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 right-0 border-b border-white/[0.06] bg-[#000000]/95 backdrop-blur-lg transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col px-6 py-6 gap-4">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
              className="text-xs font-mono tracking-wider text-zinc-400 hover:text-white transition-colors duration-200 uppercase py-2"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
