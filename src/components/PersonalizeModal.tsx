import React, { useState } from 'react';
import { X, Check, Copy, Download, RefreshCw, Palette, HeartHandshake } from 'lucide-react';
import { ApologyData, ColorPalette, DEFAULT_APOLOGY, PALETTES } from '../types.ts';
import { generateShareUrl } from '../utils/urlParams.ts';
import { downloadHtmlFile } from '../utils/exportHtml.ts';

interface PersonalizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ApologyData;
  onChange: (newData: ApologyData) => void;
}

export const PersonalizeModal: React.FC<PersonalizeModalProps> = ({
  isOpen,
  onClose,
  data,
  onChange,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const currentPalette = PALETTES[data.palette] || PALETTES.blush;

  if (!isOpen) return null;

  // Calculate word count of the actual apology message prose
  const proseText = [
    data.whatHappened,
    data.impactAndResponsibility,
    data.whatDifferent,
    data.sharedMemory,
    data.closingLine,
  ].filter(Boolean).join(' ');

  const wordCount = proseText.trim().length > 0 ? proseText.trim().split(/\s+/).length : 0;
  const isOverLimit = wordCount > 150;

  const handleCopyLink = async () => {
    try {
      const shareUrl = generateShareUrl(data);
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleDownloadHtml = () => {
    downloadHtmlFile(data);
  };

  const handleReset = () => {
    onChange({ ...DEFAULT_APOLOGY });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="customize-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-xs transition-opacity overflow-y-auto"
    >
      <div
        className={`relative w-full max-w-2xl my-auto ${currentPalette.light.bg} ${currentPalette.dark.bg} rounded-xl shadow-2xl border ${currentPalette.light.border} ${currentPalette.dark.border} overflow-hidden flex flex-col max-h-[90vh]`}
      >
        {/* Header */}
        <div
          className={`px-6 py-4 border-b ${currentPalette.light.border} ${currentPalette.dark.border} flex items-center justify-between shrink-0`}
        >
          <div className="flex items-center gap-2.5">
            <HeartHandshake className={`w-4 h-4 ${currentPalette.light.textSecondary} ${currentPalette.dark.textSecondary}`} />
            <div>
              <h2
                id="customize-title"
                className={`font-serif text-lg font-medium ${currentPalette.light.textPrimary} ${currentPalette.dark.textPrimary}`}
              >
                Personalize This Note
              </h2>
              <p
                className={`text-xs font-sans ${currentPalette.light.textMuted} ${currentPalette.dark.textMuted}`}
              >
                Gentle, sincere, and human. Keep it honest and under 150 words.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800/50 transition-colors`}
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto text-sm font-sans flex-1">
          {/* Word Count Indicator */}
          <div
            className={`p-3 rounded-lg border flex items-center justify-between text-xs ${
              isOverLimit
                ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/40 text-amber-800 dark:text-amber-300'
                : `${currentPalette.light.surface} ${currentPalette.dark.surface} ${currentPalette.light.border} ${currentPalette.dark.border} ${currentPalette.light.textSecondary} ${currentPalette.dark.textSecondary}`
            }`}
          >
            <span>
              Message length: <strong className="font-semibold">{wordCount} words</strong>
              {isOverLimit ? ' (Over recommended 150 words)' : ' (Under 150 words guideline)'}
            </span>
            <span className="text-[11px] opacity-75">
              Rules: No excuses · No "but" · Don't ask for forgiveness
            </span>
          </div>

          {/* Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs font-medium mb-1.5 ${currentPalette.light.textSecondary} ${currentPalette.dark.textSecondary}`}>
                Who it’s for (Friend’s name)
              </label>
              <input
                type="text"
                value={data.recipient}
                onChange={(e) => onChange({ ...data, recipient: e.target.value })}
                placeholder="e.g. Maya"
                className={`w-full px-3 py-2 rounded-md border text-sm transition-colors ${currentPalette.light.surface} ${currentPalette.dark.surface} ${currentPalette.light.border} ${currentPalette.dark.border} ${currentPalette.light.textPrimary} ${currentPalette.dark.textPrimary} focus:outline-none focus:ring-1 focus:ring-stone-400`}
              />
            </div>

            <div>
              <label className={`block text-xs font-medium mb-1.5 ${currentPalette.light.textSecondary} ${currentPalette.dark.textSecondary}`}>
                From (Your name)
              </label>
              <input
                type="text"
                value={data.sender}
                onChange={(e) => onChange({ ...data, sender: e.target.value })}
                placeholder="e.g. Alex"
                className={`w-full px-3 py-2 rounded-md border text-sm transition-colors ${currentPalette.light.surface} ${currentPalette.dark.surface} ${currentPalette.light.border} ${currentPalette.dark.border} ${currentPalette.light.textPrimary} ${currentPalette.dark.textPrimary} focus:outline-none focus:ring-1 focus:ring-stone-400`}
              />
            </div>
          </div>

          {/* What happened */}
          <div>
            <label className={`block text-xs font-medium mb-1.5 ${currentPalette.light.textSecondary} ${currentPalette.dark.textSecondary}`}>
              What happened (1–2 honest sentences about what you did)
            </label>
            <textarea
              rows={2}
              value={data.whatHappened}
              onChange={(e) => onChange({ ...data, whatHappened: e.target.value })}
              placeholder="Name exactly what happened honestly..."
              className={`w-full px-3 py-2 rounded-md border text-sm transition-colors ${currentPalette.light.surface} ${currentPalette.dark.surface} ${currentPalette.light.border} ${currentPalette.dark.border} ${currentPalette.light.textPrimary} ${currentPalette.dark.textPrimary} focus:outline-none focus:ring-1 focus:ring-stone-400`}
            />
          </div>

          {/* Acknowledge feelings & Full responsibility */}
          <div>
            <label className={`block text-xs font-medium mb-1.5 ${currentPalette.light.textSecondary} ${currentPalette.dark.textSecondary}`}>
              Acknowledge impact & take full responsibility (No excuses, no "but")
            </label>
            <textarea
              rows={2}
              value={data.impactAndResponsibility}
              onChange={(e) => onChange({ ...data, impactAndResponsibility: e.target.value })}
              placeholder="Acknowledge how it made them feel and take complete ownership..."
              className={`w-full px-3 py-2 rounded-md border text-sm transition-colors ${currentPalette.light.surface} ${currentPalette.dark.surface} ${currentPalette.light.border} ${currentPalette.dark.border} ${currentPalette.light.textPrimary} ${currentPalette.dark.textPrimary} focus:outline-none focus:ring-1 focus:ring-stone-400`}
            />
          </div>

          {/* What I'll do differently */}
          <div>
            <label className={`block text-xs font-medium mb-1.5 ${currentPalette.light.textSecondary} ${currentPalette.dark.textSecondary}`}>
              What I’ll do differently (1–2 specific, genuine changes)
            </label>
            <textarea
              rows={2}
              value={data.whatDifferent}
              onChange={(e) => onChange({ ...data, whatDifferent: e.target.value })}
              placeholder="What tangible change are you making going forward..."
              className={`w-full px-3 py-2 rounded-md border text-sm transition-colors ${currentPalette.light.surface} ${currentPalette.dark.surface} ${currentPalette.light.border} ${currentPalette.dark.border} ${currentPalette.light.textPrimary} ${currentPalette.dark.textPrimary} focus:outline-none focus:ring-1 focus:ring-stone-400`}
            />
          </div>

          {/* Shared Memory */}
          <div>
            <label className={`block text-xs font-medium mb-1.5 ${currentPalette.light.textSecondary} ${currentPalette.dark.textSecondary}`}>
              Shared memory or personal touch (Optional, something small & real)
            </label>
            <textarea
              rows={2}
              value={data.sharedMemory}
              onChange={(e) => onChange({ ...data, sharedMemory: e.target.value })}
              placeholder="A gentle, real moment you remember or what their friendship means..."
              className={`w-full px-3 py-2 rounded-md border text-sm transition-colors ${currentPalette.light.surface} ${currentPalette.dark.surface} ${currentPalette.light.border} ${currentPalette.dark.border} ${currentPalette.light.textPrimary} ${currentPalette.dark.textPrimary} focus:outline-none focus:ring-1 focus:ring-stone-400`}
            />
          </div>

          {/* Closing Line */}
          <div>
            <label className={`block text-xs font-medium mb-1.5 ${currentPalette.light.textSecondary} ${currentPalette.dark.textSecondary}`}>
              Closing line (Giving them space: no pressure to reply or forgive)
            </label>
            <textarea
              rows={2}
              value={data.closingLine}
              onChange={(e) => onChange({ ...data, closingLine: e.target.value })}
              placeholder="Give them unconditional space without demanding an answer..."
              className={`w-full px-3 py-2 rounded-md border text-sm transition-colors ${currentPalette.light.surface} ${currentPalette.dark.surface} ${currentPalette.light.border} ${currentPalette.dark.border} ${currentPalette.light.textPrimary} ${currentPalette.dark.textPrimary} focus:outline-none focus:ring-1 focus:ring-stone-400`}
            />
          </div>

          {/* Contact Preference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs font-medium mb-1.5 ${currentPalette.light.textSecondary} ${currentPalette.dark.textSecondary}`}>
                "Message me when you’re ready" action
              </label>
              <select
                value={data.contactType}
                onChange={(e) =>
                  onChange({
                    ...data,
                    contactType: e.target.value as ApologyData['contactType'],
                  })
                }
                className={`w-full px-3 py-2 rounded-md border text-sm transition-colors ${currentPalette.light.surface} ${currentPalette.dark.surface} ${currentPalette.light.border} ${currentPalette.dark.border} ${currentPalette.light.textPrimary} ${currentPalette.dark.textPrimary} focus:outline-none focus:ring-1 focus:ring-stone-400`}
              >
                <option value="whatsapp">WhatsApp button</option>
                <option value="sms">SMS / Text message</option>
                <option value="email">Email button</option>
                <option value="none">No button (Pure quiet space)</option>
              </select>
            </div>

            {data.contactType !== 'none' && (
              <div>
                <label className={`block text-xs font-medium mb-1.5 ${currentPalette.light.textSecondary} ${currentPalette.dark.textSecondary}`}>
                  {data.contactType === 'email' ? 'Email address' : 'Phone number (with country code)'}
                </label>
                <input
                  type="text"
                  value={data.contactValue}
                  onChange={(e) => onChange({ ...data, contactValue: e.target.value })}
                  placeholder={
                    data.contactType === 'email'
                      ? 'e.g. you@example.com'
                      : 'e.g. +1 555 123 4567'
                  }
                  className={`w-full px-3 py-2 rounded-md border text-sm transition-colors ${currentPalette.light.surface} ${currentPalette.dark.surface} ${currentPalette.light.border} ${currentPalette.dark.border} ${currentPalette.light.textPrimary} ${currentPalette.dark.textPrimary} focus:outline-none focus:ring-1 focus:ring-stone-400`}
                />
              </div>
            )}
          </div>

          {/* Color Palette Selection */}
          <div>
            <label className={`block text-xs font-medium mb-2 ${currentPalette.light.textSecondary} ${currentPalette.dark.textSecondary} flex items-center gap-1.5`}>
              <Palette className="w-3.5 h-3.5" />
              <span>Color Atmosphere</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {(Object.keys(PALETTES) as ColorPalette[]).map((palKey) => {
                const pal = PALETTES[palKey];
                const isSelected = data.palette === palKey;
                return (
                  <button
                    key={palKey}
                    type="button"
                    onClick={() => onChange({ ...data, palette: palKey })}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'border-stone-800 dark:border-stone-200 ring-1 ring-stone-800 dark:ring-stone-200'
                        : `${currentPalette.light.border} ${currentPalette.dark.border} hover:border-stone-400`
                    } ${pal.light.surface} ${pal.dark.surface}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className={`w-2.5 h-2.5 rounded-full ${pal.light.accent.split(' ')[0]}`} />
                      <span className={`text-xs font-medium ${pal.light.textPrimary} ${pal.dark.textPrimary}`}>
                        {pal.name.split(' ')[0]}
                      </span>
                    </div>
                    <p className={`text-[10px] leading-tight ${pal.light.textMuted} ${pal.dark.textMuted}`}>
                      {pal.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div
          className={`px-6 py-4 border-t ${currentPalette.light.border} ${currentPalette.dark.border} ${currentPalette.light.surface} ${currentPalette.dark.surface} flex flex-wrap items-center justify-between gap-3 shrink-0`}
        >
          <button
            onClick={handleReset}
            className={`flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors py-1.5 px-2`}
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset sample</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border ${currentPalette.light.border} ${currentPalette.dark.border} bg-white dark:bg-stone-900 ${currentPalette.light.textPrimary} ${currentPalette.dark.textPrimary} hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors`}
              title="Copies a link with your personalized note parameters"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share Link'}</span>
            </button>

            <button
              onClick={handleDownloadHtml}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium ${currentPalette.light.accent} ${currentPalette.light.accentHover} ${currentPalette.dark.accent} ${currentPalette.dark.accentHover} transition-colors`}
              title="Download standalone self-contained HTML file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .HTML</span>
            </button>

            <button
              onClick={onClose}
              className={`px-4 py-1.5 rounded-md text-xs font-medium bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white transition-colors`}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
