"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  size?: number;
  className?: string;
  dark?: boolean;
}

const EASING = [0.16, 1, 0.3, 1] as const;

export default function ConcentricCircles({ size = 500, className = "", dark = false }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const center = size / 2;
  const dotColor = dark ? "#ffffff" : "#1a1a2e";

  const rings = [
    { r: size * 0.14, sw: 1.2, delay: 0.2, opacity: dark ? 0.5 : 0.55 },
    { r: size * 0.29, sw: 0.9, delay: 0.4, opacity: dark ? 0.25 : 0.3 },
    { r: size * 0.45, sw: 0.6, delay: 0.6, opacity: dark ? 0.1 : 0.14 },
  ];

  return (
    <div ref={ref} className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Radial gradient glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          top: "-10%",
          left: "-10%",
          width: "120%",
          height: "120%",
          background: dark
            ? "radial-gradient(circle, rgba(110, 84, 255, 0.7) 0%, rgba(133, 230, 255, 0.5) 35%, transparent 65%)"
            : "radial-gradient(circle, rgba(110, 84, 255, 0.75) 0%, rgba(133, 230, 255, 0.55) 35%, transparent 65%)",
          filter: "blur(18px)",
        }}
      />

      <svg viewBox={`0 0 ${size} ${size}`} className="relative w-full h-full">
        {rings.map((ring, i) => (
          <motion.circle
            key={i}
            cx={center}
            cy={center}
            r={ring.r}
            fill="none"
            stroke={dark ? `rgba(255,255,255,${ring.opacity})` : `rgba(0,0,0,${ring.opacity})`}
            strokeWidth={ring.sw}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 1.5, delay: ring.delay, ease: EASING },
              opacity: { duration: 0.3, delay: ring.delay },
            }}
          />
        ))}
        {/* Center dot */}
        <motion.circle
          cx={center}
          cy={center}
          r={size * 0.03}
          fill={dotColor}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        />
      </svg>
    </div>
  );
}
