/**
 * Server-safe plain string (no 'use client') so the root layout can inline it
 * in a <script> before hydration and avoid a flash of the wrong theme.
 * Key must match THEME_STORAGE_KEY in src/lib/theme.ts.
 */
export const noFlashThemeScript = `
(function () {
  try {
    var t = localStorage.getItem('containastore_theme');
    if (t === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  } catch (e) {}
})();
`;
