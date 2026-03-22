"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ScrambleLink from "./ScrambleLink";
import BuildMegaMenu from "./BuildMegaMenu";
import { BUILD_MENU_COLUMNS } from "@/lib/buildMenuData";

const navLinks = [
  { label: "Sobre", href: "#sobre" },
  { label: "Ciudades", href: "#ciudades" },
  { label: "Partners", href: "#partners" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [buildOpen, setBuildOpen] = useState(false);
  const [buildMobileOpen, setBuildMobileOpen] = useState(false);
  const buildRef = useRef<HTMLDivElement>(null);
  const buildTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mega menu on click outside
  useEffect(() => {
    if (!buildOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (buildRef.current && !buildRef.current.contains(e.target as Node)) {
        setBuildOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [buildOpen]);

  // Close mega menu on Escape
  useEffect(() => {
    if (!buildOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setBuildOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [buildOpen]);

  const openBuild = () => {
    if (buildTimeoutRef.current) clearTimeout(buildTimeoutRef.current);
    setBuildOpen(true);
  };

  const closeBuild = () => {
    buildTimeoutRef.current = setTimeout(() => setBuildOpen(false), 150);
  };

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
          {/* Build dropdown trigger */}
          <div
            ref={buildRef}
            className="relative"
            onMouseEnter={openBuild}
            onMouseLeave={closeBuild}
          >
            <ScrambleLink
              text="Build"
              className="text-sm text-white/70 hover:text-white transition-colors font-mono flex items-center gap-1 cursor-pointer"
            >
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  buildOpen ? "rotate-180" : ""
                }`}
              />
            </ScrambleLink>

            <AnimatePresence>
              {buildOpen && <BuildMegaMenu />}
            </AnimatePresence>
          </div>

          {navLinks.map((link) => (
            <ScrambleLink
              key={link.href}
              text={link.label}
              href={link.href}
              className="text-sm text-white/70 hover:text-white transition-colors font-mono"
            />
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

          {/* Build accordion */}
          <div>
            <button
              onClick={() => setBuildMobileOpen(!buildMobileOpen)}
              className="flex items-center justify-between w-full text-sm text-white/70 hover:text-white font-mono"
            >
              <span>Build</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  buildMobileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {buildMobileOpen && (
                <motion.div
                  key="build-mobile"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 pb-1 pl-4 space-y-3">
                    {BUILD_MENU_COLUMNS.map((column) => (
                      <div key={column.heading}>
                        <p className="text-[10px] font-bold tracking-[3px] text-white/30 font-mono uppercase mb-2">
                          {column.heading}
                        </p>
                        {column.items.map((item) => (
                          <a
                            key={item.title}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 py-2 text-sm text-white/60 hover:text-white transition-colors"
                            onClick={() => setMenuOpen(false)}
                          >
                            <item.icon className="w-4 h-4 text-monad-primary" />
                            <span>{item.title}</span>
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
