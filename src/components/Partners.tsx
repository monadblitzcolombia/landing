"use client";

import { motion } from "framer-motion";
import { PARTNERS } from "@/lib/constants";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function Partners() {
  return (
    <section id="partners" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 font-heading">Partners</h2>
          <p className="text-lg text-white/60">
            Construyendo el ecosistema blockchain colombiano juntos.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {PARTNERS.map((partner) => (
            <motion.div
              key={partner.name}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-glass-bg border border-glass-border rounded-xl px-8 py-6 backdrop-blur-sm flex items-center justify-center min-w-[200px] hover:border-monad-primary/30 transition-colors card-glow"
            >
              <span className="text-white/70 font-semibold text-sm text-center">
                {partner.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
