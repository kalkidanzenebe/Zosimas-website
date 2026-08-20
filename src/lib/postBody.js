export function serializeBody(body = [], locale = 'en') {
  return body
    .map((block) => {
      const text = block?.text?.[locale] || '';
      if (!text) return '';
      return block.type === 'h2' ? `## ${text}` : text;
    })
    .filter(Boolean)
    .join('\n\n');
}

export function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}
