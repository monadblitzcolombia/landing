"use client";

import { motion } from "framer-motion";
import { CITIES } from "@/lib/constants";
import CityCard from "./CityCard";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function CiudadesYFechas() {
  return (
    <section id="ciudades" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 font-heading">
            Ciudades y Fechas
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            MonadBlitz recorrerá 4 ciudades colombianas. Encuentra la más
            cercana a ti.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {CITIES.map((city, i) => (
            <CityCard key={city.id} city={city} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
