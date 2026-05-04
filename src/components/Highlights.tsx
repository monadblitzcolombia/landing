"use client";

import { motion } from "framer-motion";
import { Tweet } from "react-tweet";

const EASING = [0.16, 1, 0.3, 1] as const;

/**
 * Curated tweets from MonadBlitz events around the world.
 *
 * HOW TO ADD TWEETS:
 * 1. Find a tweet URL like https://x.com/monad/status/2028534499458404671
 * 2. Extract the numeric ID at the end
 * 3. Add it below with a label
 */
const HIGHLIGHT_TWEETS = [
  // Mexico Blitz events (most relevant for Colombia tour)
  {
    id: "2049177585527951710",
    label: "Mobil3 - Monad Blitz Mexico",
  },
  {
    id: "2046340216953401418",
    label: "Mobil3 - Monad Blitz Mexico",
  },
  {
    id: "2039140846994620794",
    label: "Mobil3 - Monad Blitz Mexico",
  },
  {
    id: "2027880102546321727",
    label: "Mobil3 - Monad Blitz Mexico",
  },
  // Global Blitz events
  {
    id: "2028534499458404671",
    label: "Monad Blitz Denver - Highlights",
  },
  {
    id: "1972727436501807574",
    label: "Monad Blitz Bangkok",
  },
  {
    id: "1994672137949647177",
    label: "Monad Blitz Shanghai",
  },
];

export default function Highlights() {
  return (
    <section id="highlights" className="py-16 sm:py-20 px-6 bg-monad-dark overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASING }}
          className="mb-12"
        >
          <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[3px] text-white/40 mb-4">
            {"// HIGHLIGHTS"}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white max-w-3xl">
            Lo que pasa en un Blitz
          </h2>
          <p className="text-base sm:text-lg text-white/50 mt-4 max-w-xl">
            Recaps, fotos y videos de los MonadBlitz alrededor del mundo.
          </p>
        </motion.div>

        {/* Tweet grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HIGHLIGHT_TWEETS.map((tweet, i) => (
            <motion.div
              key={tweet.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASING }}
              className="tweet-card [&_.react-tweet-theme]:!bg-transparent [&_article]:!border-white/10 [&_article]:!rounded-xl"
            >
              <Tweet id={tweet.id} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
