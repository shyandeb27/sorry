import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { ColorPalette, PALETTES } from '../types.ts';

interface CuteBotanicalAccentsProps {
  palette: ColorPalette;
}

// Delicate botanical divider with a miniature pressed flower
export const BotanicalDivider: React.FC<{ palette: ColorPalette }> = ({ palette }) => {
  const currentPalette = PALETTES[palette] || PALETTES.blush;

  return (
    <div className="flex items-center justify-center gap-3 my-10 sm:my-14 select-none opacity-75">
      <div className={`h-[1px] w-12 sm:w-16 ${currentPalette.light.border} ${currentPalette.dark.border} border-t`} />
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className={`w-4 h-4 ${currentPalette.light.textMuted} ${currentPalette.dark.textMuted}`}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2a9 9 0 0 1 9 9c0 4.97-4.03 9-9 9A9 9 0 0 1 3 11" />
        <path d="M12 7c2 2 2 5 0 7-2-2-2-5 0-7Z" />
        <circle cx="12" cy="10.5" r="1" fill="currentColor" />
      </svg>
      <div className={`h-[1px] w-12 sm:w-16 ${currentPalette.light.border} ${currentPalette.dark.border} border-t`} />
    </div>
  );
};

// Vintage cute postal stamp with postal postmark
export const VintagePostalStamp: React.FC<{
  palette: ColorPalette;
  recipient: string;
}> = ({ palette, recipient }) => {
  const currentPalette = PALETTES[palette] || PALETTES.blush;
  const [tapped, setTapped] = useState(false);

  return (
    <div className="relative inline-block my-2 select-none">
      <motion.button
        type="button"
        whileHover={{ scale: 1.03, rotate: -1 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setTapped(!tapped)}
        className={`relative p-3 rounded-sm border-2 border-dashed ${currentPalette.light.border} ${currentPalette.dark.border} ${currentPalette.light.surface} ${currentPalette.dark.surface} shadow-xs text-left cursor-pointer transition-shadow hover:shadow-md`}
        title="A tender little stamp for Siddhi"
        aria-label="Tender postal stamp"
      >
        <div className="flex items-center gap-2.5">
          {/* Cute hand-drawn pressed flower / crescent stamp art */}
          <div className="w-10 h-10 rounded border border-stone-200/60 dark:border-stone-700/60 bg-white/60 dark:bg-stone-900/60 flex items-center justify-center overflow-hidden relative">
            <svg
              viewBox="0 0 36 36"
              className="w-7 h-7 text-rose-400 dark:text-rose-300 transition-transform duration-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {/* Little blooming flower with soft petals */}
              <circle cx="18" cy="18" r="3" fill="currentColor" fillOpacity="0.4" />
              <path d="M18 15 C18 10, 14 10, 14 15 C14 18, 18 18, 18 18" stroke="currentColor" fill="currentColor" fillOpacity="0.15" />
              <path d="M18 15 C18 10, 22 10, 22 15 C22 18, 18 18, 18 18" stroke="currentColor" fill="currentColor" fillOpacity="0.15" />
              <path d="M18 21 C18 26, 14 26, 14 21 C14 18, 18 18, 18 18" stroke="currentColor" fill="currentColor" fillOpacity="0.15" />
              <path d="M18 21 C18 26, 22 26, 22 21 C22 18, 18 18, 18 18" stroke="currentColor" fill="currentColor" fillOpacity="0.15" />
              <path d="M15 18 C10 18, 10 14, 15 14 C18 14, 18 18, 18 18" stroke="currentColor" fill="currentColor" fillOpacity="0.15" />
              <path d="M21 18 C26 18, 26 14, 21 14 C18 14, 18 18, 18 18" stroke="currentColor" fill="currentColor" fillOpacity="0.15" />
              <path d="M15 18 C10 18, 10 22, 15 22 C18 22, 18 18, 18 18" stroke="currentColor" fill="currentColor" fillOpacity="0.15" />
              <path d="M21 18 C26 18, 26 22, 21 22 C18 22, 18 18, 18 18" stroke="currentColor" fill="currentColor" fillOpacity="0.15" />
            </svg>
          </div>

          <div>
            <span className={`block text-[10px] font-sans uppercase tracking-widest font-semibold ${currentPalette.light.textPrimary} ${currentPalette.dark.textPrimary}`}>
              Special Delivery
            </span>
            <span className={`block text-[11px] font-serif italic ${currentPalette.light.textMuted} ${currentPalette.dark.textMuted}`}>
              For {recipient || 'You'} · Forever
            </span>
          </div>
        </div>

        {/* Quiet postal wavy cancellation mark */}
        <div className="absolute -top-1.5 -right-2 text-[10px] text-stone-400 dark:text-stone-500 rotate-12 pointer-events-none opacity-60">
          <svg width="32" height="12" viewBox="0 0 40 12" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M0 6 Q5 0, 10 6 T20 6 T30 6 T40 6" />
          </svg>
        </div>
      </motion.button>

      {/* Sweet little message when clicked */}
      <AnimatePresence>
        {tapped && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            className={`absolute left-0 top-full mt-2 z-20 w-64 p-3 rounded-lg border text-xs font-serif leading-relaxed shadow-lg ${currentPalette.light.surface} ${currentPalette.dark.surface} ${currentPalette.light.border} ${currentPalette.dark.border} ${currentPalette.light.textPrimary} ${currentPalette.dark.textPrimary}`}
          >
            <div className="flex items-center gap-1.5 mb-1 text-rose-400 dark:text-rose-300 font-sans text-[11px] font-medium">
              <Heart className="w-3 h-3 fill-current" />
              <span>A warm thought</span>
            </div>
            Sent with honest intent, patience, and zero pressure.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Sweet interactive Candle to "Light a gentle light for peace"
export const QuietCandle: React.FC<{ palette: ColorPalette }> = ({ palette }) => {
  const currentPalette = PALETTES[palette] || PALETTES.blush;
  const [isLit, setIsLit] = useState(false);

  return (
    <div className={`p-5 sm:p-6 rounded-xl border ${currentPalette.light.surface} ${currentPalette.dark.surface} ${currentPalette.light.border} ${currentPalette.dark.border} transition-all duration-300`}>
      <div className="flex items-start gap-4">
        {/* Animated Candle SVG */}
        <button
          type="button"
          onClick={() => setIsLit(!isLit)}
          className="group relative flex flex-col items-center justify-end w-12 h-16 pt-1 focus:outline-none cursor-pointer select-none"
          title={isLit ? 'A warm light is glowing' : 'Click to light a gentle candle'}
          aria-label={isLit ? 'Candle is lit' : 'Light candle'}
        >
          {/* Flame */}
          <div className="h-6 flex items-end justify-center">
            {isLit ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{
                  scale: [1, 1.1, 0.95, 1.05, 1],
                  opacity: [0.9, 1, 0.85, 1, 0.9],
                  y: [0, -1, 1, 0],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-3.5 h-5 rounded-full bg-gradient-to-t from-amber-500 via-amber-300 to-yellow-100 shadow-[0_0_12px_rgba(251,191,36,0.7)]"
              />
            ) : (
              <div className="w-1 h-2 rounded-full bg-stone-400 group-hover:bg-amber-300 transition-colors" />
            )}
          </div>

          {/* Wick */}
          <div className="w-[1.5px] h-2 bg-stone-700 dark:bg-stone-400" />

          {/* Candle Body */}
          <div className="w-6 h-8 rounded-xs bg-stone-200 dark:bg-stone-700/80 border border-stone-300/80 dark:border-stone-600 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-stone-100 dark:bg-stone-600 rounded-t-xs" />
            <span className="text-[8px] text-stone-400 dark:text-stone-400">♥</span>
          </div>

          {/* Saucer / Base */}
          <div className="w-10 h-1.5 rounded-full bg-stone-300 dark:bg-stone-600/80 mt-0.5" />
        </button>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className={`font-serif text-sm sm:text-base font-medium ${currentPalette.light.textPrimary} ${currentPalette.dark.textPrimary}`}>
              {isLit ? 'A quiet flame is lit' : 'Light a gentle candle'}
            </h3>
            {isLit && (
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            )}
          </div>
          <p className={`mt-1 text-xs sm:text-[13px] font-sans leading-relaxed ${currentPalette.light.textSecondary} ${currentPalette.dark.textSecondary}`}>
            {isLit
              ? 'Holding quiet space for you. Take as many days, weeks, or quiet moments as you need.'
              : 'Tap the candle anytime. A small wish for calm, patience, and understanding.'}
          </p>
        </div>
      </div>
    </div>
  );
};

// Subtle drifting flower petals background
export const GentlePetalDrift: React.FC<{ palette: ColorPalette }> = ({ palette }) => {
  // Only render 6 soft, subtle petals with slow randomized CSS transforms
  const petals = [
    { id: 1, left: '10%', delay: 0, duration: 18, size: 14 },
    { id: 2, left: '26%', delay: 4, duration: 22, size: 11 },
    { id: 3, left: '48%', delay: 2, duration: 19, size: 13 },
    { id: 4, left: '68%', delay: 7, duration: 24, size: 12 },
    { id: 5, left: '85%', delay: 3, duration: 21, size: 15 },
    { id: 6, left: '92%', delay: 9, duration: 20, size: 10 },
  ];

  const currentPalette = PALETTES[palette] || PALETTES.blush;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0 select-none opacity-40 dark:opacity-20" aria-hidden="true">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -40, opacity: 0, rotate: 0 }}
          animate={{
            y: ['0vh', '110vh'],
            opacity: [0, 0.8, 0.8, 0],
            rotate: [0, 180, 360],
            x: [0, (p.id % 2 === 0 ? 30 : -30), 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            left: p.left,
            top: 0,
            width: p.size,
            height: p.size,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className={
              palette === 'slate'
                ? 'text-sky-300 dark:text-sky-400'
                : palette === 'sage'
                ? 'text-emerald-300 dark:text-emerald-400'
                : 'text-rose-300 dark:text-rose-400'
            }
          >
            {/* Delicate curved petal */}
            <path
              d="M12 2C8 6 6 12 12 22C18 12 16 6 12 2Z"
              fill="currentColor"
              fillOpacity="0.45"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

// Sweet folded P.S. note component
export const SecretPSNote: React.FC<{ palette: ColorPalette }> = ({ palette }) => {
  const currentPalette = PALETTES[palette] || PALETTES.blush;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-8 pt-6 border-t border-dashed border-stone-200 dark:border-stone-800">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-2 text-xs font-serif italic py-1 px-2.5 rounded transition-colors ${currentPalette.light.textSecondary} hover:${currentPalette.light.textPrimary} ${currentPalette.dark.textSecondary} hover:${currentPalette.dark.textPrimary}`}
      >
        <span className="text-sm">✉</span>
        <span>{isOpen ? 'Close note' : 'A small quiet P.S. (click to open)'}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div
              className={`mt-3 p-4 rounded-lg border font-serif text-sm leading-relaxed ${currentPalette.light.surface} ${currentPalette.dark.surface} ${currentPalette.light.border} ${currentPalette.dark.border} ${currentPalette.light.textSecondary} ${currentPalette.dark.textSecondary}`}
            >
              <p>
                <strong>P.S.</strong> Even in the silence, I still value who you are and everything we've shared.
                I will wait as long as it takes, without any expectations.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
