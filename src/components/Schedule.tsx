"use client";

import { motion } from "framer-motion";
import ConcentricCircles from "./ConcentricCircles";

const EASING = [0.16, 1, 0.3, 1] as const;

const SCHEDULE = [
  {
    time: "10:00",
    title: "Puertas abiertas",
    description: "Registro, welcome brunch y networking",
  },
  {
    time: "11:00",
    title: "Apertura oficial y kickoff",
    description: "Bienvenida, reglas y formación de equipos",
  },
  { time: "13:00", title: "Almuerzo", description: "Pausa para comer y recargar" },
  {
    time: "17:00",
    title: "Deadline de submissions",
    description: "Último momento para enviar tu proyecto",
  },
  {
    time: "18:00",
    title: "Pitches, demos y networking",
    description: "Presenta tu proyecto. Los ganadores los deciden los mismos builders. Abre el bar",
  },
  {
    time: "21:00",
    title: "Premiación",
    description: "Anuncio de ganadores y ceremonia de premios",
  },
  { time: "22:00", title: "Cierre del evento", description: "Fin oficial del MonadBlitz" },
];

const PRIZES = [
  { place: "1er Lugar", amount: "$1,000 USD" },
  { place: "2do Lugar", amount: "$700 USD" },
  { place: "3er Lugar", amount: "$300 USD" },
];

export default function Schedule() {
  return (
    <section id="agenda" className="py-16 sm:py-20 px-6 bg-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute -top-[10%] -right-[8%] pointer-events-none opacity-20">
        <ConcentricCircles size={400} />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASING }}
          className="mb-12"
        >
          <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[3px] text-gray-400 mb-4">
            {"// AGENDA"}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-gray-900 max-w-2xl">
            Un día. Sin límites. Solo construye.
          </h2>
          <p className="text-base sm:text-lg text-gray-500 mt-4 max-w-xl">
            Llega, forma equipo, construye lo que quieras y shippea. Si es cool y corre en Monad,
            vale.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[52px] sm:left-[60px] top-0 bottom-0 w-px bg-gray-100" />

          {SCHEDULE.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: EASING }}
              className="relative flex items-start gap-5 sm:gap-6 py-4 group"
            >
              {/* Time */}
              <span className="text-sm font-mono text-gray-400 w-[44px] sm:w-[48px] text-right flex-shrink-0 pt-0.5">
                {item.time}
              </span>

              {/* Dot */}
              <div className="relative flex-shrink-0 mt-1.5">
                <span className="block w-3 h-3 rounded-full border-2 border-gray-200 bg-white group-hover:border-monad-primary group-hover:bg-monad-primary/10 transition-colors duration-300" />
              </div>

              {/* Content */}
              <div className="min-w-0 pb-2">
                <h4 className="text-base sm:text-lg font-heading font-semibold text-gray-900 group-hover:text-monad-primary transition-colors">
                  {item.title}
                </h4>
                {item.description && (
                  <p className="text-sm text-gray-400 mt-0.5">{item.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Prizes section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASING }}
          className="mt-16"
        >
          <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[3px] text-gray-400 mb-6">
            {"// PREMIOS"}
          </p>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-gray-900 mb-2">
            $2,000 USD en premios por ciudad
          </h3>
          <p className="text-sm text-gray-500 mb-8">
            Sin jurados ocultos. Los ganadores los eligen los mismos participantes.
          </p>

          <div className="grid grid-cols-3 gap-4">
            {PRIZES.map((prize, i) => (
              <motion.div
                key={prize.place}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASING }}
                className={`text-center py-6 px-4 rounded-xl border ${
                  i === 0 ? "border-monad-primary/30 bg-monad-primary/[0.03]" : "border-gray-100"
                }`}
              >
                <span className="text-2xl sm:text-3xl font-extrabold font-heading text-gray-900">
                  {prize.amount}
                </span>
                <p className="text-xs font-mono text-gray-400 uppercase tracking-[2px] mt-2">
                  {prize.place}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* What's included */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASING }}
          className="mt-12 p-6 rounded-xl border border-gray-100 bg-gray-50/50"
        >
          <h4 className="text-sm font-heading font-semibold text-gray-900 mb-3">
            Incluido en el evento
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {["Brunch de bienvenida", "Almuerzo", "Snacks todo el día", "Bebidas y cerveza"].map(
              (item) => (
                <div key={item} className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-monad-primary flex-shrink-0"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3 8l3.5 3.5L13 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-xs text-gray-500">{item}</span>
                </div>
              )
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
            {["WiFi dedicado", "Swag Kit", "Mentoría"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-monad-primary flex-shrink-0"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M3 8l3.5 3.5L13 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-xs text-gray-500">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-xs text-gray-300 font-mono mt-8 text-center"
        >
          * La agenda puede variar. Horarios sujetos a confirmación final.
        </motion.p>
      </div>
    </section>
  );
}
