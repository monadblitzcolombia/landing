"use client";

import dynamic from "next/dynamic";
import MapStatic from "./MapStatic";

const MapColombia = dynamic(() => import("./MapColombia"), {
  ssr: false,
  loading: () => <MapStatic />,
});

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating gradient blobs */}
      <div
        className="absolute top-[10%] left-[15%] w-[350px] h-[350px] rounded-full opacity-20 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #85E6FF, transparent 70%)",
          animation: "float-blob-1 12s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-[30%] right-[10%] w-[400px] h-[400px] rounded-full opacity-15 blur-[120px]"
        style={{
          background: "radial-gradient(circle, #FF8EE4, transparent 70%)",
          animation: "float-blob-2 15s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[10%] left-[30%] w-[300px] h-[300px] rounded-full opacity-20 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #6E54FF, transparent 70%)",
          animation: "float-blob-3 18s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Left: Text */}
          <div className="flex-[0.6] text-center lg:text-left min-w-0">
            <p className="text-xs uppercase tracking-[4px] text-monad-light/60 mb-4 font-mono">
              Monad Presenta
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 font-heading">
              MONAD TOUR
              <br />
              <span className="text-gradient-monad">COLOMBIA</span>
            </h1>
            <p className="text-base sm:text-lg text-white/60 max-w-md mx-auto lg:mx-0 mb-8 px-2 sm:px-0">
              La blockchain de alto rendimiento llega a Colombia. 10,000 TPS,
              finalidad sub-segundo y compatibilidad 100% EVM. Hackathons en
              4 ciudades.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start px-2 sm:px-0">
              <a
                href="#ciudades"
                className="bg-monad-primary text-white font-bold px-6 sm:px-8 py-3 rounded-md hover:brightness-110 transition-all text-center font-mono uppercase tracking-wide btn-glow text-sm sm:text-base"
              >
                Regístrate
              </a>
              <a
                href="https://app.monad.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/20 text-white font-medium px-6 sm:px-8 py-3 rounded-md hover:border-monad-primary/50 transition-colors text-center font-mono text-sm sm:text-base"
              >
                Explorar Ecosistema
              </a>
            </div>
          </div>

          {/* Right: Map */}
          <div className="flex-[0.4] w-full lg:max-w-none">
            <div className="h-[350px] sm:h-[400px] lg:h-[450px]">
              <MapColombia />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
