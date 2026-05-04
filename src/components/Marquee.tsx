"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PARTNERS, PARTNER_CATEGORIES } from "@/lib/constants";

const EASING = [0.16, 1, 0.3, 1] as const;

/* Double the array for seamless loop */
const ITEMS = [...PARTNERS, ...PARTNERS, ...PARTNERS];

export default function Marquee() {
  return (
    <section id="aliados" className="py-16 sm:py-20 bg-monad-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASING }}
          className="text-center mb-16"
        >
          <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[3px] text-white/40 mb-3">
            {"// ALIADOS"}
          </p>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white">
            Aliados del Tour
          </h3>
        </motion.div>

        {/* Partner categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          {PARTNER_CATEGORIES.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.15, ease: EASING }}
              className="text-center"
            >
              <h4 className="text-[10px] font-mono uppercase tracking-[3px] text-monad-primary mb-6">
                {category.title}
              </h4>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {category.partners.map((partner) => (
                  <div
                    key={partner.name}
                    className="flex items-center justify-center px-4 py-3 rounded-lg border border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.05] transition-all duration-300"
                  >
                    {partner.logo ? (
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        width={120}
                        height={36}
                        className="h-7 sm:h-8 w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
                      />
                    ) : (
                      <span className="text-sm font-heading font-bold text-white/50 hover:text-white/90 whitespace-nowrap tracking-tight transition-colors duration-300">
                        {partner.name}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scrolling marquee - all logos */}
      <div
        className="relative"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="marquee-track flex items-center gap-16 w-max" aria-hidden="true">
          {ITEMS.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex items-center justify-center px-6 transition-all duration-300 flex-shrink-0"
            >
              {partner.logo ? (
                <Image
                  src={partner.logo}
                  alt=""
                  width={140}
                  height={40}
                  className={`h-8 sm:h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-all duration-300 ${partner.logo.endsWith(".svg") ? "brightness-0 invert" : ""}`}
                />
              ) : (
                <span className="text-xl font-heading font-extrabold text-white/50 hover:text-white/90 whitespace-nowrap tracking-tight transition-colors duration-300">
                  {partner.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
