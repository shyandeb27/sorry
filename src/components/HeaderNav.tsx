import React from 'react';
import { Sun, Moon, Volume2, VolumeX, SlidersHorizontal, Download } from 'lucide-react';
import { ApologyData, PALETTES } from '../types.ts';

interface HeaderNavProps {
  data: ApologyData;
  isDark: boolean;
  onToggleTheme: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  onOpenPersonalize: () => void;
  onExportHtml: () => void;
  onScrollToTop: () => void;
  onScrollToMessage: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  data,
  isDark,
  onToggleTheme,
  isAudioPlaying,
  onToggleAudio,
  onOpenPersonalize,
  onExportHtml,
  onScrollToTop,
  onScrollToMessage,
}) => {
  const currentPalette = PALETTES[data.palette] || PALETTES.blush;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-opacity-80 transition-colors duration-300">
      <div
        className={`max-w-5xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-6 border-b ${currentPalette.light.border} ${currentPalette.dark.border}`}
      >
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={onScrollToTop}
          className={`font-serif text-base sm:text-lg tracking-tight font-medium ${currentPalette.light.textPrimary} ${currentPalette.dark.textPrimary} hover:opacity-80 transition-opacity whitespace-nowrap shrink-0`}
          aria-label="Back to top"
        >
          A Quiet Note
        </button>

        {/* Zone 2: Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-sans font-medium">
          <button
            onClick={onScrollToTop}
            className={`${currentPalette.light.textSecondary} hover:${currentPalette.light.textPrimary} ${currentPalette.dark.textSecondary} hover:${currentPalette.dark.textPrimary} transition-colors whitespace-nowrap shrink-0`}
          >
            Opening
          </button>
          <button
            onClick={onScrollToMessage}
            className={`${currentPalette.light.textSecondary} hover:${currentPalette.light.textPrimary} ${currentPalette.dark.textSecondary} hover:${currentPalette.dark.textPrimary} transition-colors whitespace-nowrap shrink-0`}
          >
            Read Letter
          </button>
          <button
            onClick={onOpenPersonalize}
            className={`${currentPalette.light.textSecondary} hover:${currentPalette.light.textPrimary} ${currentPalette.dark.textSecondary} hover:${currentPalette.dark.textPrimary} transition-colors whitespace-nowrap shrink-0`}
          >
            Customize
          </button>
          <button
            onClick={onExportHtml}
            className={`${currentPalette.light.textSecondary} hover:${currentPalette.light.textPrimary} ${currentPalette.dark.textSecondary} hover:${currentPalette.dark.textPrimary} transition-colors whitespace-nowrap shrink-0`}
          >
            Download HTML
          </button>
        </nav>

        {/* Zone 3: Interactive controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Ambient Rain/Chime toggle (strictly opt-in, disabled by default) */}
          <button
            onClick={onToggleAudio}
            title={isAudioPlaying ? 'Mute gentle rain' : 'Play gentle background rain'}
            className={`p-2 rounded-full border transition-all duration-200 text-xs flex items-center gap-1.5 ${
              isAudioPlaying
                ? `${currentPalette.light.accentSubtle} ${currentPalette.dark.accentSubtle} border-transparent`
                : `${currentPalette.light.surface} ${currentPalette.dark.surface} ${currentPalette.light.border} ${currentPalette.dark.border} ${currentPalette.light.textMuted} ${currentPalette.dark.textMuted}`
            }`}
            aria-label={isAudioPlaying ? 'Mute rain sound' : 'Enable tranquil rain sound'}
          >
            {isAudioPlaying ? (
              <Volume2 className="w-3.5 h-3.5" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
            <span className="hidden lg:inline text-[11px] font-sans pr-1">
              {isAudioPlaying ? 'Rain on' : 'Rain'}
            </span>
          </button>

          {/* Light / Dark Mode Toggle */}
          <button
            onClick={onToggleTheme}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`p-2 rounded-full border ${currentPalette.light.surface} ${currentPalette.dark.surface} ${currentPalette.light.border} ${currentPalette.dark.border} ${currentPalette.light.textSecondary} ${currentPalette.dark.textSecondary} hover:${currentPalette.light.textPrimary} hover:${currentPalette.dark.textPrimary} transition-all duration-200`}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* Mobile Customize Button */}
          <button
            onClick={onOpenPersonalize}
            className={`md:hidden p-2 rounded-full border ${currentPalette.light.surface} ${currentPalette.dark.surface} ${currentPalette.light.border} ${currentPalette.dark.border} ${currentPalette.light.textSecondary} ${currentPalette.dark.textSecondary}`}
            aria-label="Customize Note"
            title="Customize Note"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onOpenPersonalize}
            className={`hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium font-sans rounded-md transition-colors ${currentPalette.light.accent} ${currentPalette.light.accentHover} ${currentPalette.dark.accent} ${currentPalette.dark.accentHover} whitespace-nowrap shrink-0`}
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>Personalize Note</span>
          </button>
        </div>
      </div>
    </header>
  );
};
