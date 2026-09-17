'use client';

/** Light/dark theme persistence. Default is dark — the brand's home mode. */

export type Theme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'containastore_theme';

export function getStoredTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    /* ignore */
  }
  return 'dark';
}

export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* ignore */
  }
}
