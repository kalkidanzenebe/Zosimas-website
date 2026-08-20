import { messages } from './messages';

export function t(locale, key, vars) {
  const table = messages[locale] || messages.en;
  const fallback = messages.en;
  const value =
    key.split('.').reduce((acc, part) => acc?.[part], table) ??
    key.split('.').reduce((acc, part) => acc?.[part], fallback) ??
    key;

  if (typeof value !== 'string' || !vars) return value;

  return Object.entries(vars).reduce(
    (text, [name, replacement]) => text.replaceAll(`{${name}}`, String(replacement)),
    value,
  );
}

export function tx(value, locale) {
  if (value && typeof value === 'object' && ('en' in value || 'am' in value)) {
    return value[locale] || value.en || '';
  }
  return value;
}

export function localizeItem(item, overlay, locale) {
  if (!item) return item;
  if (locale === 'en' || !overlay) return item;
  return { ...item, ...overlay };
}
