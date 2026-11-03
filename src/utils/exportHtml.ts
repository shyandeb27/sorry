import { ApologyData } from '../types.ts';

export function generateStandaloneHtml(data: ApologyData): string {
  const contactLink = getContactLink(data);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(data.recipient)}, I’m sorry</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=Plus+Jakarta+Sans:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #FAF7F5;
      --surface: #F4EFEB;
      --text-primary: #2D2825;
      --text-secondary: #5E5550;
      --text-muted: #8C817A;
      --border: #EAE1DA;
      --accent: #8F6A64;
      --accent-text: #FFFFFF;
      --accent-hover: #7D5B56;
      --font-serif: 'Lora', Garamond, Georgia, serif;
      --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #1A1817;
        --surface: #23201F;
        --text-primary: #ECE7E3;
        --text-secondary: #B5ABA4;
        --text-muted: #7D746D;
        --border: #332E2A;
        --accent: #B38780;
        --accent-text: #181615;
        --accent-hover: #C49992;
      }
    }

    [data-theme="dark"] {
      --bg: #1A1817;
      --surface: #23201F;
      --text-primary: #ECE7E3;
      --text-secondary: #B5ABA4;
      --text-muted: #7D746D;
      --border: #332E2A;
      --accent: #B38780;
      --accent-text: #181615;
      --accent-hover: #C49992;
    }

    [data-theme="light"] {
      --bg: #FAF7F5;
      --surface: #F4EFEB;
      --text-primary: #2D2825;
      --text-secondary: #5E5550;
      --text-muted: #8C817A;
      --border: #EAE1DA;
      --accent: #8F6A64;
      --accent-text: #FFFFFF;
      --accent-hover: #7D5B56;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
      background-color: var(--bg);
      color: var(--text-primary);
      transition: background-color 0.4s ease, color 0.4s ease;
    }

    body {
      font-family: var(--font-serif);
      line-height: 1.85;
      letter-spacing: -0.01em;
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
    }

    /* Ambient background gradient overlay */
    .ambient-glow {
      position: fixed;
      inset: 0;
      pointer-events: none;
      background: radial-gradient(circle at 50% 20%, rgba(200, 180, 175, 0.08) 0%, transparent 70%);
      z-index: 0;
    }

    /* Hero Opening Screen */
    .hero-section {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 3rem 1.5rem;
      position: relative;
      z-index: 1;
    }

    .salutation {
      font-family: var(--font-sans);
      font-size: 0.8125rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--text-muted);
      margin-bottom: 2rem;
      opacity: 0.8;
    }

    .headline {
      font-size: clamp(2.4rem, 6vw, 4.2rem);
      font-weight: 400;
      line-height: 1.18;
      letter-spacing: -0.025em;
      color: var(--text-primary);
      max-width: 22ch;
      margin-bottom: 1.75rem;
    }

    .headline-accent {
      font-style: italic;
      color: var(--accent);
    }

    .cue-btn {
      position: absolute;
      bottom: 2.75rem;
      background: none;
      border: none;
      color: var(--text-muted);
      font-family: var(--font-sans);
      font-size: 0.875rem;
      letter-spacing: 0.04em;
      cursor: pointer;
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      transition: color 0.25s ease;
      text-decoration: none;
      padding: 0.75rem 1.25rem;
    }

    .cue-btn:hover {
      color: var(--text-primary);
    }

    .cue-arrow {
      animation: floatBreath 3s ease-in-out infinite;
      font-size: 1.1rem;
      line-height: 1;
    }

    @keyframes floatBreath {
      0%, 100% { transform: translateY(0); opacity: 0.45; }
      50% { transform: translateY(5px); opacity: 0.9; }
    }

    /* Reading Column */
    .content-container {
      max-width: 640px;
      margin: 0 auto;
      padding: 4rem 1.5rem 8rem;
      position: relative;
      z-index: 1;
    }

    /* Fade-in scroll reveal */
    .reveal-item {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
      margin-bottom: 3.5rem;
    }

    .reveal-item.is-visible {
      opacity: 1;
      transform: translateY(0);
    }

    .prose-block {
      font-size: clamp(1.125rem, 2.5vw, 1.25rem);
      color: var(--text-primary);
      line-height: 1.95;
    }

    .prose-block p {
      margin-bottom: 1.25rem;
    }

    .divider {
      width: 48px;
      height: 1px;
      background-color: var(--border);
      margin: 3rem 0;
      opacity: 0.8;
    }

    .memory-card {
      font-style: italic;
      color: var(--text-secondary);
      border-left: none;
      padding: 0.5rem 0;
    }

    .signoff {
      margin-top: 4rem;
      font-size: 1.125rem;
      color: var(--text-secondary);
    }

    .signoff-name {
      display: block;
      margin-top: 0.5rem;
      font-size: 1.35rem;
      color: var(--text-primary);
      font-style: normal;
    }

    /* Action bar */
    .action-zone {
      margin-top: 4.5rem;
      padding-top: 2.5rem;
      border-top: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }

    .contact-button {
      display: inline-flex;
      align-items: center;
      gap: 0.625rem;
      padding: 0.875rem 1.75rem;
      background-color: var(--accent);
      color: var(--accent-text);
      font-family: var(--font-sans);
      font-size: 0.9375rem;
      font-weight: 500;
      text-decoration: none;
      border-radius: 4px;
      transition: background-color 0.2s ease, transform 0.15s ease;
    }

    .contact-button:hover {
      background-color: var(--accent-hover);
      transform: translateY(-1px);
    }

    .space-caption {
      font-family: var(--font-sans);
      font-size: 0.8125rem;
      color: var(--text-muted);
      line-height: 1.5;
    }

    /* Theme Switcher */
    .theme-toggle {
      position: fixed;
      top: 1.5rem;
      right: 1.5rem;
      background: var(--surface);
      border: 1px solid var(--border);
      color: var(--text-secondary);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      z-index: 10;
    }

    .theme-toggle:hover {
      color: var(--text-primary);
      border-color: var(--text-muted);
    }

    @media (prefers-reduced-motion: reduce) {
      .reveal-item {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
      }
      .cue-arrow {
        animation: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="ambient-glow" aria-hidden="true"></div>

  <!-- Theme Toggle -->
  <button id="themeToggle" class="theme-toggle" aria-label="Toggle light and dark mode">
    <svg id="themeIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  </button>

  <!-- Quiet Opening Screen -->
  <header class="hero-section">
    <div style="margin-bottom: 1rem; opacity: 0.85;">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" style="margin: 0 auto; color: var(--accent);">
        <path d="M12 22v-9" />
        <path d="M12 13c-2.5-3-5.5-2-6 1 2.5 0 4.5 1 6 3" fill="currentColor" fill-opacity="0.15" />
        <path d="M12 11c2.5-3 5.5-2 6 1-2.5 0-4.5 1-6 3" fill="currentColor" fill-opacity="0.15" />
        <circle cx="12" cy="5" r="3" fill="currentColor" fill-opacity="0.2" />
      </svg>
    </div>
    <p class="salutation">A quiet note for ${escapeHtml(data.recipient)}</p>
    <h1 class="headline">
      ${escapeHtml(data.recipient)}, <span class="headline-accent">I’m sorry.</span>
    </h1>
    <a href="#message" class="cue-btn" aria-label="Read on">
      <span>Read on</span>
      <span class="cue-arrow" aria-hidden="true">↓</span>
    </a>
  </header>

  <!-- Sincere Apology Body -->
  <main id="message" class="content-container">
    <!-- Cute Vintage Stamp -->
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px dashed var(--border);">
      <span style="font-family: var(--font-sans); font-size: 0.6875rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-muted);">Personal Letter</span>
      <div style="border: 2px dashed var(--border); padding: 0.5rem 0.75rem; background: var(--surface); border-radius: 2px; display: inline-flex; align-items: center; gap: 0.5rem;">
        <span style="font-size: 1.1rem; color: var(--accent);">❀</span>
        <div>
          <div style="font-family: var(--font-sans); font-size: 0.625rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-primary);">Special Delivery</div>
          <div style="font-size: 0.6875rem; font-style: italic; color: var(--text-muted);">For ${escapeHtml(data.recipient)}</div>
        </div>
      </div>
    </div>

    <!-- What happened & Acknowledgment -->
    <div class="reveal-item prose-block">
      <p>${escapeHtml(data.whatHappened)}</p>
      <p>${escapeHtml(data.impactAndResponsibility)}</p>
    </div>

    <div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem; margin: 2.5rem 0; opacity: 0.75;">
      <div style="height: 1px; width: 48px; background: var(--border);"></div>
      <span style="color: var(--text-muted); font-size: 0.85rem;">❀</span>
      <div style="height: 1px; width: 48px; background: var(--border);"></div>
    </div>

    <!-- What I'll do differently -->
    <div class="reveal-item prose-block">
      <p>${escapeHtml(data.whatDifferent)}</p>
    </div>

    ${data.sharedMemory ? `
    <div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem; margin: 2.5rem 0; opacity: 0.75;">
      <div style="height: 1px; width: 48px; background: var(--border);"></div>
      <span style="color: var(--text-muted); font-size: 0.85rem;">❀</span>
      <div style="height: 1px; width: 48px; background: var(--border);"></div>
    </div>

    <!-- Shared memory or personal touch -->
    <div class="reveal-item prose-block memory-card">
      <p>${escapeHtml(data.sharedMemory)}</p>
    </div>
    ` : ''}

    <div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem; margin: 2.5rem 0; opacity: 0.75;">
      <div style="height: 1px; width: 48px; background: var(--border);"></div>
      <span style="color: var(--text-muted); font-size: 0.85rem;">❀</span>
      <div style="height: 1px; width: 48px; background: var(--border);"></div>
    </div>

    <!-- Closing space: no pressure -->
    <div class="reveal-item prose-block">
      <p>${escapeHtml(data.closingLine)}</p>
      <div class="signoff">
        <span>From</span>
        <span class="signoff-name">${escapeHtml(data.sender)}</span>
      </div>
    </div>

    <!-- Cute candle note -->
    <div style="margin-top: 3rem; padding: 1.25rem; border: 1px solid var(--border); border-radius: 8px; background: var(--surface); display: flex; align-items: center; gap: 1rem;">
      <span style="font-size: 1.5rem;">🕯️</span>
      <div>
        <div style="font-size: 0.875rem; font-weight: 500; color: var(--text-primary);">A quiet flame for patience</div>
        <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.25rem;">Holding space for you. Take as many days or weeks as you need.</div>
      </div>
    </div>

    <!-- Contact action (optional) -->
    ${contactLink ? `
    <div class="reveal-item action-zone">
      <a href="${contactLink.url}" class="contact-button" ${contactLink.external ? 'target="_blank" rel="noopener noreferrer"' : ''}>
        <span>${contactLink.label}</span>
      </a>
      <p class="space-caption">Whenever you are ready. There is no timeline and no pressure.</p>
    </div>
    ` : `
    <div class="reveal-item action-zone">
      <p class="space-caption">Whenever you are ready. Take all the quiet and time you need.</p>
    </div>
    `}
  </main>

  <script>
    // Theme toggle handling
    const toggleBtn = document.getElementById('themeToggle');
    const root = document.documentElement;

    function getSystemTheme() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    let currentTheme = localStorage.getItem('apology_theme') || getSystemTheme();
    applyTheme(currentTheme);

    function applyTheme(theme) {
      currentTheme = theme;
      root.setAttribute('data-theme', theme);
      localStorage.setItem('apology_theme', theme);
      updateThemeIcon(theme);
    }

    function updateThemeIcon(theme) {
      const icon = document.getElementById('themeIcon');
      if (theme === 'dark') {
        icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
      } else {
        icon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
      }
    }

    toggleBtn.addEventListener('click', () => {
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });

    // Slow fade-in reveal on scroll
    const reveals = document.querySelectorAll('.reveal-item');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  </script>
</body>
</html>`;
}

function escapeHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getContactLink(data: ApologyData): { label: string; url: string; external: boolean } | null {
  if (data.contactType === 'none') return null;

  const cleanVal = (data.contactValue || '').trim();

  if (data.contactType === 'whatsapp') {
    const phone = cleanVal.replace(/[^0-9]/g, '');
    const url = phone ? `https://wa.me/${phone}` : 'https://wa.me/';
    return {
      label: 'Message me on WhatsApp when you’re ready',
      url,
      external: true,
    };
  }

  if (data.contactType === 'sms') {
    const phone = cleanVal.replace(/[^0-9+]/g, '');
    return {
      label: 'Send me a text when you’re ready',
      url: phone ? `sms:${phone}` : 'sms:',
      external: false,
    };
  }

  if (data.contactType === 'email') {
    const email = cleanVal || '';
    const subject = encodeURIComponent('A quiet note');
    return {
      label: 'Send me an email when you’re ready',
      url: `mailto:${email}?subject=${subject}`,
      external: false,
    };
  }

  return {
    label: 'Message me when you’re ready',
    url: '#',
    external: false,
  };
}

export function downloadHtmlFile(data: ApologyData) {
  const content = generateStandaloneHtml(data);
  const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  const safeName = (data.recipient || 'friend').toLowerCase().replace(/[^a-z0-9]/g, '-');
  anchor.href = url;
  anchor.download = `apology-note-${safeName}.html`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
