import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { t as translate, tx } from '../i18n/t';
import { setLocale, setTheme, toggleTheme } from '../store/slices/preferencesSlice';

export function useI18n() {
  const dispatch = useDispatch();
  const locale = useSelector((state) => state.preferences.locale);
  const theme = useSelector((state) => state.preferences.theme);

  const t = useCallback((key, vars) => translate(locale, key, vars), [locale]);

  return useMemo(
    () => ({
      locale,
      theme,
      t,
      tx: (value) => tx(value, locale),
      setLocale: (next) => dispatch(setLocale(next)),
      setTheme: (next) => dispatch(setTheme(next)),
      toggleTheme: () => dispatch(toggleTheme()),
    }),
    [dispatch, locale, t, theme],
  );
}
