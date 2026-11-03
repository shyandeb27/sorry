import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { ApologyData, PALETTES } from '../types.ts';

interface OpeningHeroProps {
  data: ApologyData;
  onReadOn: () => void;
}

export const OpeningHero: React.FC<OpeningHeroProps> = ({ data, onReadOn }) => {
  const currentPalette = PALETTES[data.palette] || PALETTES.blush;

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 select-none">
      {/* Delicate pressed flower motif */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.85, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' as const }}
        className="mb-4 text-stone-400 dark:text-stone-500"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          className="mx-auto text-rose-400/80 dark:text-rose-300/80"
        >
          <path d="M12 22v-9" />
          <path d="M12 13c-2.5-3-5.5-2-6 1 2.5 0 4.5 1 6 3" fill="currentColor" fillOpacity="0.15" />
          <path d="M12 11c2.5-3 5.5-2 6 1-2.5 0-4.5 1-6 3" fill="currentColor" fillOpacity="0.15" />
          <circle cx="12" cy="5" r="3" fill="currentColor" fillOpacity="0.2" />
        </svg>
      </motion.div>

      {/* Salutation / Quiet kicker */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' as const }}
        className={`text-xs uppercase tracking-[0.2em] font-sans ${currentPalette.light.textMuted} ${currentPalette.dark.textMuted} mb-6 sm:mb-8 font-medium`}
      >
        A quiet note for {data.recipient || 'you'}
      </motion.p>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.3, ease: 'easeOut' as const }}
        className={`font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight ${currentPalette.light.textPrimary} ${currentPalette.dark.textPrimary} max-w-2xl leading-[1.2]`}
      >
        {data.recipient ? `${data.recipient}, ` : ''}
        <span className="italic opacity-90">I’m sorry.</span>
      </motion.h1>

      {/* Quiet breathing sub-cue */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.8 }}
        className={`mt-4 sm:mt-6 text-sm sm:text-base font-serif italic ${currentPalette.light.textSecondary} ${currentPalette.dark.textSecondary} max-w-md`}
      >
        A few honest thoughts from {data.sender || 'me'}, with care.
      </motion.p>

      {/* Subtle Read on Cue button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.2 }}
        className="absolute bottom-10 sm:bottom-14 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={onReadOn}
          className={`group flex flex-col items-center gap-2 text-xs sm:text-sm font-sans tracking-wide transition-colors duration-300 py-3 px-5 focus:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 rounded-lg ${currentPalette.light.textMuted} hover:${currentPalette.light.textPrimary} ${currentPalette.dark.textMuted} hover:${currentPalette.dark.textPrimary}`}
          aria-label="Read on"
        >
          <span className="opacity-80 group-hover:opacity-100 transition-opacity">Read on</span>
          <ArrowDown className="w-4 h-4 animate-slow-breath opacity-60 group-hover:opacity-100 transition-opacity" />
        </button>
      </motion.div>
    </section>
  );
};
