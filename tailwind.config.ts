import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        steel: 'var(--steel)',
        panel: 'var(--panel)',
        'panel-2': 'var(--panel-2)',
        line: 'var(--line)',
        'line-strong': 'var(--line-strong)',
        paper: 'var(--paper)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        'accent-strong': 'var(--accent-strong)',
        focus: 'var(--focus)',
        warn: 'var(--warn)',
      },
      fontFamily: {
        heading: ['var(--font-archivo)', 'system-ui', 'sans-serif'],
        body: ['var(--font-plex-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '4px',
        sm: '4px',
        md: '4px',
        lg: '4px',
      },
      maxWidth: {
        content: '1180px',
      },
    },
  },
  plugins: [],
};

export default config;
