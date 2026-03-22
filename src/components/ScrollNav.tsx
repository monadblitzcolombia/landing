"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "hero", label: "Inicio" },
  { id: "sobre", label: "Sobre" },
  { id: "ciudades", label: "Ciudades" },
  { id: "partners", label: "Partners" },
];

export default function ScrollNav() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3">
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className="group relative flex items-center"
          aria-label={label}
        >
          {/* Tooltip label */}
          <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-white/70 font-mono whitespace-nowrap bg-monad-bg/90 px-2 py-1 rounded">
            {label}
          </span>
          {/* Dot */}
          <motion.span
            className="block rounded-full transition-colors"
            animate={{
              width: activeSection === id ? 10 : 6,
              height: activeSection === id ? 10 : 6,
              backgroundColor:
                activeSection === id ? "#6E54FF" : "rgba(255, 255, 255, 0.3)",
            }}
            transition={{ duration: 0.3 }}
          />
        </a>
      ))}
    </nav>
  );
}
