export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function isTouchDevice() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches;
}

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(values) {
  const errors = {};

  if (!values.fullName?.trim() || values.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }

  if (!values.email?.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (values.phone?.trim() && !/^[+\d][\d\s()-]{6,}$/.test(values.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.';
  }

  if (!values.service) {
    errors.service = 'Please select a service.';
  }

  if (!values.message?.trim() || values.message.trim().length < 20) {
    errors.message = 'Please share a little more about your project (at least 20 characters).';
  }

  return errors;
}

export function formatDateLabel(date) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
  }).format(date);
}
