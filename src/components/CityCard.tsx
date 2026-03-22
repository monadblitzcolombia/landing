"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { City } from "@/lib/types";

interface CityCardProps {
  city: City;
  index: number;
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function CityCard({ city }: CityCardProps) {
  return (
    <motion.div
      id={`city-${city.id}`}
      variants={itemVariants}
      className={`relative backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 card-glow ${
        city.confirmed
          ? "card-animated-border p-6"
          : "bg-glass-bg border border-glass-border rounded-xl p-6 hover:border-white/20"
      }`}
    >
      {/* Confirmed badge */}
      {city.confirmed && (
        <span className="absolute top-4 right-4 bg-monad-primary text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full z-10">
          Confirmado
        </span>
      )}

      {/* City name */}
      <div className="relative z-10 flex items-center gap-2 mb-3">
        <MapPin className="w-5 h-5 text-monad-primary" />
        <h3 className="text-2xl font-extrabold">{city.name}</h3>
      </div>

      {/* Date */}
      <div className="relative z-10 flex items-center gap-2 mb-4">
        <Calendar className="w-4 h-4 text-white/40" />
        <span className={`text-sm ${city.date ? "text-white/80" : "text-white/40 italic"}`}>
          {city.date ?? "Próximamente"}
        </span>
      </div>

      {/* Description */}
      <p className="relative z-10 text-white/50 text-sm mb-6 leading-relaxed">
        {city.description}
      </p>

      {/* CTA */}
      <div className="relative z-10">
        {city.confirmed && city.registrationUrl ? (
          <a
            href={city.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-monad-primary text-white font-bold text-sm px-5 py-2.5 rounded-md hover:brightness-110 transition-all btn-glow"
          >
            Regístrate
            <ArrowRight className="w-4 h-4" />
          </a>
        ) : (
          <button className="inline-flex items-center gap-2 border border-white/20 text-white/70 font-medium text-sm px-5 py-2.5 rounded-md hover:border-monad-primary/40 hover:text-white transition-colors">
            Notifícame
          </button>
        )}
      </div>
    </motion.div>
  );
}
