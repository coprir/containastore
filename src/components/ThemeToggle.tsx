'use client';

import { useEffect, useState } from 'react';
import { applyTheme, getStoredTheme, type Theme } from '@/lib/theme';

/** Day/night toggle. Defaults to dark (the brand's home mode). */
export function ThemeToggle({ className = 'inline-flex' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getStoredTheme());
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={theme === 'light'}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`theme-toggle ${className}`}
      style={mounted ? undefined : { opacity: 0 }}
      suppressHydrationWarning
    >
      <span className="theme-toggle__thumb" aria-hidden="true">
        {theme === 'dark' ? (
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none">
            <path
              d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"
              fill="currentColor"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none">
            <circle cx="12" cy="12" r="4.2" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.5 1.5M16.9 16.9l1.5 1.5M5.6 18.4l1.5-1.5M16.9 7.1l1.5-1.5" />
            </g>
          </svg>
        )}
      </span>
    </button>
  );
}
