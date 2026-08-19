import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import contactReducer from './slices/contactSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    contact: contactReducer,
  },
});
