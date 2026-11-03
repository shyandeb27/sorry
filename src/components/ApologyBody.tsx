import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Mail, Phone } from 'lucide-react';
import { ApologyData, PALETTES } from '../types.ts';
import {
  BotanicalDivider,
  VintagePostalStamp,
  QuietCandle,
  SecretPSNote,
} from './CuteBotanicalAccents.tsx';

interface ApologyBodyProps {
  data: ApologyData;
  bodyRef: React.RefObject<HTMLDivElement | null>;
}

export const ApologyBody: React.FC<ApologyBodyProps> = ({ data, bodyRef }) => {
  const currentPalette = PALETTES[data.palette] || PALETTES.blush;

  const getContactAction = () => {
    if (data.contactType === 'none') return null;

    const val = (data.contactValue || '').trim();

    if (data.contactType === 'whatsapp') {
      const phone = val.replace(/[^0-9]/g, '');
      const url = phone ? `https://wa.me/${phone}` : 'https://wa.me/';
      return {
        label: 'Message me on WhatsApp when you’re ready',
        url,
        icon: <MessageSquare className="w-4 h-4 shrink-0" />,
        external: true,
      };
    }

    if (data.contactType === 'sms') {
      const phone = val.replace(/[^0-9+]/g, '');
      const url = phone ? `sms:${phone}` : 'sms:';
      return {
        label: 'Text me when you’re ready',
        url,
        icon: <Phone className="w-4 h-4 shrink-0" />,
        external: false,
      };
    }

    if (data.contactType === 'email') {
      const subject = encodeURIComponent(`A quiet note from ${data.sender || 'me'}`);
      const url = `mailto:${val}?subject=${subject}`;
      return {
        label: 'Email me when you’re ready',
        url,
        icon: <Mail className="w-4 h-4 shrink-0" />,
        external: false,
      };
    }

    return null;
  };

  const contactAction = getContactAction();

  const sectionVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.1,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <article
      ref={bodyRef}
      id="message"
      className="max-w-[620px] mx-auto px-6 sm:px-8 pt-8 pb-32 sm:pb-40 relative z-10"
    >
      {/* Cute Vintage Stamp at letterhead */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-20px' }}
        className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200/60 dark:border-stone-800/60"
      >
        <span className={`text-[11px] font-sans tracking-widest uppercase ${currentPalette.light.textMuted} ${currentPalette.dark.textMuted}`}>
          Personal Letter
        </span>
        <VintagePostalStamp palette={data.palette} recipient={data.recipient} />
      </motion.div>

      {/* Block 1: What happened & acknowledging impact */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="space-y-4"
      >
        <p
          className={`font-serif text-lg sm:text-xl leading-[1.95] ${currentPalette.light.textPrimary} ${currentPalette.dark.textPrimary}`}
        >
          {data.whatHappened}
        </p>

        <p
          className={`font-serif text-lg sm:text-xl leading-[1.95] ${currentPalette.light.textPrimary} ${currentPalette.dark.textPrimary}`}
        >
          {data.impactAndResponsibility}
        </p>
      </motion.div>

      {/* Cute botanical divider */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <BotanicalDivider palette={data.palette} />
      </motion.div>

      {/* Block 2: What I'll do differently */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        <p
          className={`font-serif text-lg sm:text-xl leading-[1.95] ${currentPalette.light.textPrimary} ${currentPalette.dark.textPrimary}`}
        >
          {data.whatDifferent}
        </p>
      </motion.div>

      {/* Block 3: Shared Memory / Personal touch (optional) */}
      {data.sharedMemory && (
        <>
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <BotanicalDivider palette={data.palette} />
          </motion.div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="py-1"
          >
            <p
              className={`font-serif italic text-lg sm:text-xl leading-[1.95] ${currentPalette.light.textSecondary} ${currentPalette.dark.textSecondary}`}
            >
              {data.sharedMemory}
            </p>
          </motion.div>
        </>
      )}

      {/* Divider */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <BotanicalDivider palette={data.palette} />
      </motion.div>

      {/* Block 4: Closing line giving space */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="space-y-8"
      >
        <p
          className={`font-serif text-lg sm:text-xl leading-[1.95] ${currentPalette.light.textPrimary} ${currentPalette.dark.textPrimary}`}
        >
          {data.closingLine}
        </p>

        {/* Quiet sign-off */}
        <div className="pt-4 font-serif">
          <span className={`text-sm block ${currentPalette.light.textMuted} ${currentPalette.dark.textMuted}`}>
            With care,
          </span>
          <span
            className={`text-xl sm:text-2xl mt-1 block font-medium ${currentPalette.light.textPrimary} ${currentPalette.dark.textPrimary}`}
          >
            {data.sender || 'Me'}
          </span>
        </div>

        {/* Cute folded P.S. note */}
        <SecretPSNote palette={data.palette} />
      </motion.div>

      {/* Cute Interactive Candle */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-30px' }}
        className="mt-14 sm:mt-16"
      >
        <QuietCandle palette={data.palette} />
      </motion.div>

      {/* Action Zone: Space & Optional soft Contact button */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-30px' }}
        className={`mt-10 sm:mt-12 pt-8 sm:pt-10 border-t ${currentPalette.light.border} ${currentPalette.dark.border} space-y-4`}
      >
        {contactAction ? (
          <div>
            <a
              href={contactAction.url}
              target={contactAction.external ? '_blank' : undefined}
              rel={contactAction.external ? 'noopener noreferrer' : undefined}
              className={`inline-flex items-center gap-2.5 px-5 py-3 text-sm font-medium font-sans rounded-md transition-all duration-200 shadow-sm ${currentPalette.light.accent} ${currentPalette.light.accentHover} ${currentPalette.dark.accent} ${currentPalette.dark.accentHover} active:scale-[0.99]`}
            >
              {contactAction.icon}
              <span className="whitespace-nowrap">{contactAction.label}</span>
            </a>
            <p
              className={`mt-3 text-xs sm:text-sm font-sans leading-relaxed ${currentPalette.light.textMuted} ${currentPalette.dark.textMuted}`}
            >
              There is no timeline, and never any pressure to reply or forgive.
            </p>
          </div>
        ) : (
          <p
            className={`text-xs sm:text-sm font-sans leading-relaxed ${currentPalette.light.textMuted} ${currentPalette.dark.textMuted}`}
          >
            Whenever you are ready, or if you simply need quiet. There is no timeline.
          </p>
        )}
      </motion.div>
    </article>
  );
};
