import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LOCALE_STORAGE_KEY, THEME_STORAGE_KEY } from '../../store/slices/preferencesSlice';

export function PreferencesSync() {
  const theme = useSelector((state) => state.preferences.theme);
  const locale = useSelector((state) => state.preferences.locale);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.lang = locale === 'am' ? 'am' : 'en';
    root.dataset.theme = theme;
    root.dataset.locale = locale;

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      /* storage can be blocked */
    }
  }, [theme, locale]);

  return null;
}
