"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";

interface StatProps {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  duration?: number;
}

function StatCounter({ value, prefix = "", suffix, label, duration = 2 }: StatProps) {
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
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center py-10 border-b border-glass-border last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 md:py-12"
    >
      <div className="flex items-baseline justify-center gap-0.5">
        {prefix && (
          <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading">
            {prefix}
          </span>
        )}
        <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading tabular-nums">
          {display.toLocaleString()}
        </span>
        <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white/80 font-heading">
          {suffix}
        </span>
      </div>
      <p className="text-xs sm:text-sm text-white/40 mt-3 font-mono uppercase tracking-[3px]">
        {label}
      </p>
    </motion.div>
  );
}

const stats: StatProps[] = [
  { value: 10000, suffix: "", label: "Transactions per second" },
  { value: 200, suffix: "+", label: "Validators" },
  { value: 100, suffix: "%", label: "EVM-Compatible" },
  { value: 0, prefix: "0.", suffix: "s", label: "Finality", duration: 0 },
  { value: 0, prefix: "0.", suffix: "s", label: "Block times", duration: 0 },
];

// Special handling for decimal stats
function DecimalStat({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center py-10 border-b border-glass-border last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 md:py-12"
    >
      <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading">
        {value}
      </span>
      <p className="text-xs sm:text-sm text-white/40 mt-3 font-mono uppercase tracking-[3px]">
        {label}
      </p>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="px-6 border-y border-glass-border">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5">
        <StatCounter value={10000} suffix="" label="Transactions per second" />
        <StatCounter value={200} suffix="+" label="Validators" />
        <StatCounter value={100} suffix="%" label="EVM-Compatible" />
        <DecimalStat value="0.8s" label="Finality" />
        <DecimalStat value="0.4s" label="Block times" />
      </div>
    </section>
  );
}
