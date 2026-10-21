import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'myglucoguide-theme';
const THEME_COLORS: Record<Theme, string> = { light: '#0284c7', dark: '#0b1220' };

function readStoredTheme(): Theme | null {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'dark' || stored === 'light' ? stored : null;
  } catch {
    return null;
  }
}

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** Applies the theme to <html>. The inline script in index.html does the same
 *  before first paint, so this only needs to keep React state in sync. */
function applyTheme(theme: Theme, animate: boolean) {
  const root = document.documentElement;
  if (animate) {
    root.classList.add('theme-transition');
    window.setTimeout(() => root.classList.remove('theme-transition'), 250);
  }
  root.classList.toggle('dark', theme === 'dark');
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', THEME_COLORS[theme]);
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light',
  );

  // Sync with stored / system preference on mount
  useEffect(() => {
    const initial = readStoredTheme() ?? systemTheme();
    applyTheme(initial, false);
    setTheme(initial);
  }, []);

  // Follow system changes only while the visitor has not chosen a theme
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (readStoredTheme()) return;
      const next = systemTheme();
      applyTheme(next, true);
      setTheme(next);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    const next: Theme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(next, true);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* storage unavailable (private mode) – theme still applies for this session */
    }
    setTheme(next);
  }, []);

  return { theme, isDark: theme === 'dark', toggleTheme };
}
