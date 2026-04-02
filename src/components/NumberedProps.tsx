"use client";

import { motion } from "framer-motion";

const PROPS = [
  {
    number: "01",
    title: "Rapida, familiar, sin friccion",
    description:
      "Las apps en Monad se sienten instantaneas y cuestan centavos. Billeteras, direcciones e infraestructura existentes funcionan desde el primer momento - 100% compatible con EVM.",
    cta: { label: "Leer la documentacion", href: "https://docs.monad.xyz/" },
  },
  {
    number: "02",
    title: "Descentralizada por diseno",
    description:
      "Cientos de validadores en hardware accesible. Una red segura y resiliente que escala sin compromisos en descentralizacion.",
    cta: { label: "Explorar la red", href: "https://www.monad.xyz/" },
  },
  {
    number: "03",
    title: "Comunidad en su esencia",
    description:
      "Eventos, hackathons y una comunidad global de builders. Construye junto a miles de developers que ya estan en Monad.",
    cta: { label: "Unete al Discord", href: "https://discord.gg/monad" },
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function NumberedProps() {
  return (
    <section id="propuesta" className="py-16 sm:py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[3px] text-gray-400 mb-4">
            {'// PROPUESTA'}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-gray-900 max-w-2xl">
            Un nuevo benchmark para Colombia.
          </h2>
        </motion.div>

        {/* Numbered items */}
        <motion.div
          className="space-y-0"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {PROPS.map((prop) => (
            <motion.div
              key={prop.number}
              variants={itemVariants}
              className="group border-t border-gray-200 py-12 sm:py-16 transition-colors hover:bg-gray-50/50"
            >
              <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-6 md:gap-10">
                {/* Number */}
                <span className="text-6xl lg:text-8xl font-mono font-extrabold text-monad-primary/15 leading-none group-hover:text-monad-primary/30 transition-colors duration-300">
                  {prop.number}
                </span>

                {/* Content */}
                <div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading font-extrabold text-gray-900 mb-4">
                    {prop.title}
                  </h3>
                  <p className="text-base lg:text-lg text-gray-500 max-w-xl leading-relaxed mb-6">
                    {prop.description}
                  </p>
                  <a
                    href={prop.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-6 py-2.5 text-[10px] sm:text-xs font-mono uppercase tracking-[2px] text-gray-500 hover:border-monad-primary hover:text-monad-primary hover:gap-3 transition-all duration-300"
                  >
                    {prop.cta.label}
                    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Bottom border */}
          <div className="border-t border-gray-200" />
        </motion.div>
      </div>
    </section>
  );
}
