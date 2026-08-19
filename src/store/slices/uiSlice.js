import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mobileMenuOpen: false,
  notification: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openMobileMenu(state) {
      state.mobileMenuOpen = true;
    },
    closeMobileMenu(state) {
      state.mobileMenuOpen = false;
    },
    toggleMobileMenu(state) {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    showNotification(state, action) {
      state.notification = {
        id: Date.now(),
        type: action.payload.type || 'info',
        message: action.payload.message,
      };
    },
    clearNotification(state) {
      state.notification = null;
    },
  },
});

export const {
  openMobileMenu,
  closeMobileMenu,
  toggleMobileMenu,
  showNotification,
  clearNotification,
} = uiSlice.actions;

export default uiSlice.reducer;
