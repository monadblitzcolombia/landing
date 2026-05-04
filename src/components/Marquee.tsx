"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PARTNER_CATEGORIES } from "@/lib/constants";

const EASING = [0.16, 1, 0.3, 1] as const;

export default function Marquee() {
  return (
    <section id="aliados" className="py-16 sm:py-20 bg-monad-dark overflow-hidden">
      <div className="flex flex-col gap-16 sm:gap-20">
        {PARTNER_CATEGORIES.map((category, catIndex) => {
          const items = [...category.partners, ...category.partners, ...category.partners];

          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.1, ease: EASING }}
            >
              <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[3px] text-white/40 text-center mb-4">
                {`// ${category.title}`}
              </p>

              {/* Scrolling marquee */}
              <div
                className="relative"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                }}
              >
                <div className="marquee-track flex items-center gap-16 w-max" aria-hidden="true">
                  {items.map((partner, i) => (
                    <div
                      key={`${partner.name}-${i}`}
                      className="flex items-center justify-center px-6 transition-all duration-300 flex-shrink-0"
                    >
                      {partner.logo ? (
                        <div className="flex items-center gap-2.5 w-[120px] sm:w-[140px] justify-center">
                          <Image
                            src={partner.logo}
                            alt=""
                            width={120}
                            height={28}
                            className="h-5 sm:h-6 w-auto max-w-[100px] sm:max-w-[120px] object-contain opacity-70 hover:opacity-100 transition-all duration-300 brightness-0 invert"
                          />
                          {partner.logo.includes("ultravioleta") && (
                            <span className="text-xs font-heading font-bold text-white/50 whitespace-nowrap">
                              {partner.name}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm sm:text-base font-heading font-extrabold text-white/50 hover:text-white/90 whitespace-nowrap tracking-tight transition-colors duration-300">
                          {partner.name}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
