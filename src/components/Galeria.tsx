"use client";

import { SHOW_GALLERY } from "@/lib/constants";

export default function Galeria() {
  if (!SHOW_GALLERY) return null;

  return (
    <section id="galeria" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-16">
          Galería
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Photo grid will be populated after first event */}
          <div className="aspect-video bg-glass-bg border border-glass-border rounded-lg flex items-center justify-center text-white/20 text-sm">
            Próximamente
          </div>
        </div>
      </div>
    </section>
  );
}
