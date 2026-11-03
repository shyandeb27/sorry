import { useState, useEffect, useRef } from 'react';
import { ApologyData, PALETTES } from './types.ts';
import { parseApologyFromUrl, generateShareUrl } from './utils/urlParams.ts';
import { downloadHtmlFile } from './utils/exportHtml.ts';
import { ambientSound } from './utils/ambientAudio.ts';
import { HeaderNav } from './components/HeaderNav.tsx';
import { OpeningHero } from './components/OpeningHero.tsx';
import { ApologyBody } from './components/ApologyBody.tsx';
import { PersonalizeModal } from './components/PersonalizeModal.tsx';
import { GentlePetalDrift } from './components/CuteBotanicalAccents.tsx';
import { Feather, Download, Share2 } from 'lucide-react';

export default function App() {
  const [data, setData] = useState<ApologyData>(() => parseApologyFromUrl());
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('quiet_note_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isPersonalizeOpen, setIsPersonalizeOpen] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  const bodyRef = useRef<HTMLDivElement | null>(null);

  // Sync dark theme to <html> tag
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('quiet_note_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('quiet_note_theme', 'light');
    }
  }, [isDark]);

  // Update document title dynamically
  useEffect(() => {
    if (data.recipient) {
      document.title = `${data.recipient}, I’m sorry · A Quiet Note`;
    } else {
      document.title = 'A Quiet Note';
    }
  }, [data.recipient]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      ambientSound.stop();
    };
  }, []);

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleToggleAudio = () => {
    const active = ambientSound.toggle();
    setIsAudioPlaying(active);
  };

  const handleScrollToMessage = () => {
    const el = document.getElementById('message');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExportHtml = () => {
    downloadHtmlFile(data);
  };

  const handleQuickCopyLink = async () => {
    try {
      const shareUrl = generateShareUrl(data);
      await navigator.clipboard.writeText(shareUrl);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2400);
    } catch {
      // ignore
    }
  };

  const currentPalette = PALETTES[data.palette] || PALETTES.blush;

  return (
    <div
      className={`min-h-screen relative selection:bg-stone-200 dark:selection:bg-stone-800 transition-colors duration-500 ${currentPalette.light.bg} ${currentPalette.dark.bg}`}
    >
      {/* Ambient background soft glow */}
      <div
        className="pointer-events-none fixed inset-0 opacity-40 dark:opacity-20 z-0"
        style={{
          background:
            data.palette === 'slate'
              ? 'radial-gradient(circle at 50% 15%, rgba(140, 170, 200, 0.15) 0%, transparent 70%)'
              : data.palette === 'sage'
              ? 'radial-gradient(circle at 50% 15%, rgba(150, 180, 160, 0.15) 0%, transparent 70%)'
              : data.palette === 'stone'
              ? 'radial-gradient(circle at 50% 15%, rgba(180, 170, 160, 0.15) 0%, transparent 70%)'
              : 'radial-gradient(circle at 50% 15%, rgba(215, 180, 175, 0.15) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Gentle drifting petals */}
      <GentlePetalDrift palette={data.palette} />

      {/* Top Bar Navigation */}
      <HeaderNav
        data={data}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
        onOpenPersonalize={() => setIsPersonalizeOpen(true)}
        onExportHtml={handleExportHtml}
        onScrollToTop={handleScrollToTop}
        onScrollToMessage={handleScrollToMessage}
      />

      {/* Main Single-Page Apology Experience */}
      <main className="relative z-10 pt-14">
        {/* Quiet Opening Screen */}
        <OpeningHero data={data} onReadOn={handleScrollToMessage} />

        {/* The Sincere Letter Content with slow scroll fade-in */}
        <ApologyBody data={data} bodyRef={bodyRef} />
      </main>

      {/* Quiet Minimal Footer */}
      <footer
        className={`max-w-xl mx-auto px-6 py-12 text-center text-xs font-sans border-t ${currentPalette.light.border} ${currentPalette.dark.border} ${currentPalette.light.textMuted} ${currentPalette.dark.textMuted} space-y-3 relative z-10`}
      >
        <p className="tracking-wide">
          A sincere and gentle space for honest words.
        </p>
        <div className="flex items-center justify-center gap-4 text-[11px]">
          <button
            onClick={() => setIsPersonalizeOpen(true)}
            className="hover:underline opacity-80 hover:opacity-100 transition-opacity"
          >
            Personalize this note
          </button>
          <span>·</span>
          <button
            onClick={handleExportHtml}
            className="hover:underline opacity-80 hover:opacity-100 transition-opacity"
          >
            Download as single-file HTML
          </button>
          <span>·</span>
          <button
            onClick={handleQuickCopyLink}
            className="hover:underline opacity-80 hover:opacity-100 transition-opacity"
          >
            {copiedNotification ? 'Link copied!' : 'Share link'}
          </button>
        </div>
      </footer>

      {/* Floating Bottom Action Pill (Unobtrusive) */}
      <aside aria-label="Quick note actions" className="fixed bottom-5 right-5 z-30 flex items-center gap-2">
        <button
          onClick={handleQuickCopyLink}
          title="Copy shareable link"
          className={`p-3 rounded-full shadow-md border ${currentPalette.light.surface} ${currentPalette.dark.surface} ${currentPalette.light.border} ${currentPalette.dark.border} ${currentPalette.light.textSecondary} ${currentPalette.dark.textSecondary} hover:scale-105 transition-all duration-200`}
          aria-label="Copy shareable link"
        >
          <Share2 className="w-4 h-4" />
        </button>

        <button
          onClick={handleExportHtml}
          title="Download single-file HTML"
          className={`p-3 rounded-full shadow-md border ${currentPalette.light.surface} ${currentPalette.dark.surface} ${currentPalette.light.border} ${currentPalette.dark.border} ${currentPalette.light.textSecondary} ${currentPalette.dark.textSecondary} hover:scale-105 transition-all duration-200`}
          aria-label="Download standalone HTML"
        >
          <Download className="w-4 h-4" />
        </button>

        <button
          onClick={() => setIsPersonalizeOpen(true)}
          title="Personalize note"
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full shadow-lg text-xs font-sans font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${currentPalette.light.accent} ${currentPalette.light.accentHover} ${currentPalette.dark.accent} ${currentPalette.dark.accentHover}`}
          aria-label="Personalize note"
        >
          <Feather className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Personalize Note</span>
        </button>
      </aside>

      {/* Copied link toast notification */}
      {copiedNotification && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full text-xs font-sans font-medium bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xl transition-all"
        >
          Share link copied to clipboard
        </div>
      )}

      {/* Personalization & Export Drawer / Modal */}
      <PersonalizeModal
        isOpen={isPersonalizeOpen}
        onClose={() => setIsPersonalizeOpen(false)}
        data={data}
        onChange={setData}
      />
    </div>
  );
}
