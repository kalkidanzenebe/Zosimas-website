import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import contactReducer from './slices/contactSlice';
import preferencesReducer from './slices/preferencesSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    contact: contactReducer,
    preferences: preferencesReducer,
  },
});
