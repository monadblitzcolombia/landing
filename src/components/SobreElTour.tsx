"use client";

import { motion } from "framer-motion";
import { Code2, Users, Trophy } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const features = [
  {
    icon: Code2,
    title: "Código",
    description:
      "Construye sobre Monad EVM con ejecución paralela y finalidad sub-segundo. Despliega tus contratos Solidity directamente — 100% compatible a nivel de bytecode.",
  },
  {
    icon: Users,
    title: "Comunidad",
    description:
      "Conecta con developers colombianos y la comunidad global de Monad. Las apps en Monad se sienten instantáneas y cuestan centavos.",
  },
  {
    icon: Trophy,
    title: "Premios",
    description:
      "Premios en efectivo, reconocimiento y oportunidades para los mejores proyectos. Tu código puede cambiar el juego.",
  },
];

export default function SobreElTour() {
  return (
    <section id="sobre" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 font-heading">
            ¿Qué es el Monad Tour?
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Una serie de hackathons MonadBlitz recorriendo Colombia. Construye
            sobre la blockchain más rápida compatible con EVM — 10,000 TPS sin
            compromisos.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="bg-glass-bg border border-glass-border rounded-xl p-8 backdrop-blur-sm hover:border-monad-primary/30 transition-colors card-glow"
            >
              <feature.icon className="w-10 h-10 text-monad-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
