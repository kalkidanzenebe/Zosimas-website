import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { validateContactForm } from '../../lib/utils';
import { t } from '../../i18n/t';

export const submitContact = createAsyncThunk(
  'contact/submit',
  async (formValues, { rejectWithValue, getState }) => {
    const locale = getState().preferences?.locale || 'en';
    const errors = validateContactForm(formValues, locale);
    if (Object.keys(errors).length > 0) {
      return rejectWithValue({
        type: 'validation',
        errors,
        message: t(locale, 'form.validationSummary'),
      });
    }

    await new Promise((resolve) => setTimeout(resolve, 900));

    return {
      receivedAt: new Date().toISOString(),
      payload: {
        fullName: formValues.fullName.trim(),
        email: formValues.email.trim(),
        phone: formValues.phone?.trim() || '',
        company: formValues.company?.trim() || '',
        service: formValues.service,
        message: formValues.message.trim(),
      },
    };
  },
);

const initialState = {
  status: 'idle',
  error: null,
  fieldErrors: {},
  lastSubmission: null,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    resetContact(state) {
      state.status = 'idle';
      state.error = null;
      state.fieldErrors = {};
    },
    clearFieldErrors(state) {
      state.fieldErrors = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContact.pending, (state) => {
        state.status = 'submitting';
        state.error = null;
        state.fieldErrors = {};
      })
      .addCase(submitContact.fulfilled, (state, action) => {
        state.status = 'success';
        state.lastSubmission = action.payload;
        state.error = null;
        state.fieldErrors = {};
      })
      .addCase(submitContact.rejected, (state, action) => {
        state.status = 'error';
        if (action.payload?.type === 'validation') {
          state.fieldErrors = action.payload.errors;
          state.error = action.payload.message;
        } else {
          state.error = action.payload?.message || 'Something went wrong. Please try again.';
        }
      });
  },
});

export const { resetContact, clearFieldErrors } = contactSlice.actions;
export default contactSlice.reducer;
