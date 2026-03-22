"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Sobre", href: "#sobre" },
  { label: "Ciudades", href: "#ciudades" },
  { label: "Partners", href: "#partners" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-monad-bg/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <Image
            src="/images/monad/logo-mark.svg"
            alt="Monad"
            width={28}
            height={28}
            className="rounded-md"
          />
          <span className="text-lg font-extrabold tracking-tight">
            <span className="text-white">MONAD</span>
            <span className="text-white/50 ml-1 text-sm font-medium">TOUR</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 hover:text-white transition-colors font-mono"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#ciudades"
            className="bg-monad-primary text-white text-sm font-bold px-5 py-2 rounded-md hover:brightness-110 transition-all font-mono uppercase tracking-wide btn-glow"
          >
            Regístrate
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-transform ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-opacity ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-transform ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-monad-bg/95 backdrop-blur-md border-t border-glass-border px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-sm text-white/70 hover:text-white font-mono"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#ciudades"
            className="block bg-monad-primary text-white text-sm font-bold px-5 py-2 rounded-md text-center font-mono uppercase tracking-wide"
            onClick={() => setMenuOpen(false)}
          >
            Regístrate
          </a>
        </div>
      )}
    </nav>
  );
}
