"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { BUILD_MENU_COLUMNS } from "@/lib/buildMenuData";

export default function BuildMegaMenu() {
  return (
    <motion.div
      key="build-mega-menu"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="absolute top-full right-0 mt-2 w-[680px] max-w-[calc(100vw-3rem)] bg-monad-bg/95 backdrop-blur-xl border border-glass-border rounded-xl shadow-2xl overflow-hidden"
    >
      <div className="grid grid-cols-2">
        {BUILD_MENU_COLUMNS.map((column, colIdx) => (
          <div
            key={column.heading}
            className={`p-6 ${colIdx === 0 ? "border-r border-glass-border" : ""}`}
          >
            <h4 className="text-[10px] font-bold tracking-[3px] text-white/40 mb-4 font-mono uppercase">
              {column.heading}
            </h4>
            <div className="space-y-1">
              {column.items.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 p-3 rounded-lg hover:bg-white/[0.03] transition-colors"
                >
                  <item.icon className="w-5 h-5 text-monad-primary mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold text-white group-hover:text-monad-light transition-colors">
                        {item.title}
                      </span>
                      <ArrowUpRight className="w-3 h-3 text-white/30 group-hover:text-monad-primary transition-colors" />
                    </div>
                    <p className="text-xs text-white/40 mt-0.5 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
