"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";

interface StatProps {
  value: number;
  suffix: string;
  label: string;
  duration?: number;
}

function StatCounter({ value, suffix, label, duration = 2 }: StatProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration,
        ease: [0.25, 0.46, 0.45, 0.94],
        onUpdate: (v) => setDisplay(Math.round(v)),
      });
      return controls.stop;
    }
  }, [isInView, motionValue, value, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-4xl sm:text-5xl font-extrabold text-white font-heading tabular-nums">
          {display.toLocaleString()}
        </span>
        <span className="text-2xl sm:text-3xl font-bold text-monad-primary">
          {suffix}
        </span>
      </div>
      <p className="text-sm text-white/50 mt-2 font-mono uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}

const stats = [
  { value: 4, suffix: "", label: "Ciudades" },
  { value: 10000, suffix: "+", label: "TPS en Monad" },
  { value: 1, suffix: "s", label: "Finalidad" },
  { value: 100, suffix: "%", label: "EVM Compatible" },
];

export default function Stats() {
  return (
    <section className="py-16 px-6 border-y border-glass-border">
      <motion.div
        className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {stats.map((stat) => (
          <StatCounter key={stat.label} {...stat} />
        ))}
      </motion.div>
    </section>
  );
}
