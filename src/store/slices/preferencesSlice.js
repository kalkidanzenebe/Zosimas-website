import { createSlice } from '@reduxjs/toolkit';

export const THEME_STORAGE_KEY = 'zosimas-theme';
export const LOCALE_STORAGE_KEY = 'zosimas-locale';

function readStored(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value || fallback;
  } catch {
    return fallback;
  }
}

const initialState = {
  theme: readStored(THEME_STORAGE_KEY, 'light') === 'dark' ? 'dark' : 'light',
  locale: readStored(LOCALE_STORAGE_KEY, 'en') === 'am' ? 'am' : 'en',
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload === 'dark' ? 'dark' : 'light';
    },
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
    setLocale(state, action) {
      state.locale = action.payload === 'am' ? 'am' : 'en';
    },
  },
});

export const { setTheme, toggleTheme, setLocale } = preferencesSlice.actions;
export default preferencesSlice.reducer;
