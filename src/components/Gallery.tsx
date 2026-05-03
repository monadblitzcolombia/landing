"use client";

import { motion } from "framer-motion";
import { GalleryImage } from "@/lib/types";

const EASING = [0.16, 1, 0.3, 1] as const;

/*
 * Gallery images from past MonadBlitz events.
 *
 * HOW TO ADD IMAGES:
 * 1. Download images from Monad's event feed (Twitter/X, Discord, etc.)
 * 2. Save them to /public/images/gallery/
 * 3. Add entries below with the correct path, alt text, and city
 * 4. Recommended dimensions: at least 800x600px, JPG or WebP
 *
 * Once images are added, remove USE_PLACEHOLDERS flag.
 */
const USE_PLACEHOLDERS = false;

const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "/images/gallery/monadblitz-01.jpg",
    alt: "MonadBlitz Shanghai - equipos trabajando en el hackathon",
    city: "Shanghai",
  },
  {
    src: "/images/gallery/monadblitz-02.jpg",
    alt: "MonadBlitz Shanghai - builders en el evento",
    city: "Shanghai",
  },
  {
    src: "/images/gallery/monadblitz-03.jpg",
    alt: "MonadBlitz Shanghai - presentaciones y demos",
    city: "Shanghai",
  },
  {
    src: "/images/gallery/monadblitz-04.jpg",
    alt: "Monad 101 - comunidad y networking",
    city: "Asia Tour",
  },
  {
    src: "/images/gallery/monadblitz-05.jpg",
    alt: "Monad 101 - participantes del evento",
    city: "Asia Tour",
  },
  {
    src: "/images/gallery/monadblitz-06.jpg",
    alt: "MonadBlitz CDMX - hackathon en Ciudad de Mexico",
    city: "CDMX",
  },
];

const PLACEHOLDER_GRADIENTS = [
  "linear-gradient(135deg, #6E54FF 0%, #85E6FF 100%)",
  "linear-gradient(135deg, #85E6FF 0%, #DDD7FE 100%)",
  "linear-gradient(135deg, #FF8EE4 0%, #FFAE45 100%)",
  "linear-gradient(135deg, #FFAE45 0%, #6E54FF 100%)",
  "linear-gradient(135deg, #DDD7FE 0%, #FF8EE4 100%)",
  "linear-gradient(135deg, #6E54FF 0%, #FF8EE4 100%)",
];

export default function Gallery() {
  if (GALLERY_IMAGES.length === 0) return null;

  return (
    <section id="galeria" className="py-16 sm:py-20 px-6 bg-monad-dark overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASING }}
          className="mb-12"
        >
          <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[3px] text-white/40 mb-4">
            {"// GALERIA"}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white max-w-3xl">
            MonadBlitz alrededor del mundo
          </h2>
          <p className="text-base sm:text-lg text-white/50 mt-4 max-w-xl">
            Momentos de los eventos pasados en Shanghai, CDMX y mas ciudades.
          </p>
        </motion.div>

        {/* Image grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASING }}
              className={`relative overflow-hidden rounded-lg group ${
                i === 0 || i === 5 ? "md:row-span-2 aspect-[3/4]" : "aspect-[4/3]"
              }`}
            >
              {USE_PLACEHOLDERS ? (
                <>
                  {/* Placeholder gradient with dot pattern */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: PLACEHOLDER_GRADIENTS[i % PLACEHOLDER_GRADIENTS.length],
                      opacity: 0.6,
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, rgba(255,255,255,0.4) 0.7px, transparent 0.7px)",
                      backgroundSize: "16px 16px",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <svg
                        className="w-8 h-8 mx-auto text-white/30 mb-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M21 15l-5-5L5 21" />
                      </svg>
                      <span className="text-[10px] font-mono uppercase tracking-[2px] text-white/40">
                        {img.city}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {img.city && (
                      <span className="absolute bottom-3 left-3 text-[10px] font-mono uppercase tracking-[2px] text-white/80 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        {img.city}
                      </span>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
