import { t } from '../i18n/t';

export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function isTouchDevice() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches;
}

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(values, locale = 'en') {
  const errors = {};

  if (!values.fullName?.trim() || values.fullName.trim().length < 2) {
    errors.fullName = t(locale, 'validation.fullName');
  }

  if (!values.email?.trim()) {
    errors.email = t(locale, 'validation.emailRequired');
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = t(locale, 'validation.emailInvalid');
  }

  if (values.phone?.trim() && !/^[+\d][\d\s()-]{6,}$/.test(values.phone.trim())) {
    errors.phone = t(locale, 'validation.phone');
  }

  if (!values.service) {
    errors.service = t(locale, 'validation.service');
  }

  if (!values.message?.trim() || values.message.trim().length < 20) {
    errors.message = t(locale, 'validation.message');
  }

  return errors;
}

export function formatDateLabel(date, locale = 'en') {
  const value = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat(locale === 'am' ? 'am-ET' : 'en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(value);
}
