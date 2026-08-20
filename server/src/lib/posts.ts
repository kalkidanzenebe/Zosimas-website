import type { Post } from '@prisma/client';

export type BodyBlock = {
  type: 'p' | 'h2';
  text: { en: string; am: string };
};

export type PublicPost = {
  id: string;
  slug: string;
  date: string;
  category: { en: string; am: string };
  readTime: { en: string; am: string };
  title: { en: string; am: string };
  excerpt: { en: string; am: string };
  image: string;
  imageAlt: { en: string; am: string };
  body: BodyBlock[];
  published: boolean;
};

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function splitBlocks(markdown: string): Array<{ type: 'p' | 'h2'; text: string }> {
  return markdown
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      if (chunk.startsWith('## ')) {
        return { type: 'h2' as const, text: chunk.slice(3).trim() };
      }
      return { type: 'p' as const, text: chunk };
    });
}

export function parseBody(en: string, am: string): BodyBlock[] {
  const enBlocks = splitBlocks(en);
  const amBlocks = splitBlocks(am);
  const length = Math.max(enBlocks.length, amBlocks.length);

  return Array.from({ length }, (_, index) => ({
    type: enBlocks[index]?.type || amBlocks[index]?.type || 'p',
    text: {
      en: enBlocks[index]?.text || '',
      am: amBlocks[index]?.text || '',
    },
  })).filter((block) => block.text.en || block.text.am);
}

export function isBody(value: unknown): value is BodyBlock[] {
  return (
    Array.isArray(value) &&
    value.every(
      (block) =>
        block &&
        (block.type === 'p' || block.type === 'h2') &&
        block.text &&
        typeof block.text.en === 'string' &&
        typeof block.text.am === 'string',
    )
  );
}

export function toPublicPost(row: Post): PublicPost {
  return {
    id: row.id,
    slug: row.slug,
    date: (row.publishedAt ?? row.createdAt).toISOString().slice(0, 10),
    category: { en: row.categoryEn, am: row.categoryAm },
    readTime: { en: row.readTimeEn, am: row.readTimeAm },
    title: { en: row.titleEn, am: row.titleAm },
    excerpt: { en: row.excerptEn, am: row.excerptAm },
    image: row.image,
    imageAlt: { en: row.imageAltEn, am: row.imageAltAm },
    body: isBody(row.body) ? row.body : [],
    published: row.published,
  };
}

export type PostInput = {
  slug?: string;
  titleEn?: string;
  titleAm?: string;
  excerptEn?: string;
  excerptAm?: string;
  categoryEn?: string;
  categoryAm?: string;
  image?: string;
  imageAltEn?: string;
  imageAltAm?: string;
  readTimeEn?: string;
  readTimeAm?: string;
  body?: unknown;
  bodyEn?: string;
  bodyAm?: string;
  published?: boolean | string;
  publishedAt?: string | null;
};

export function parsePostInput(input: PostInput) {
  const titleEn = input.titleEn?.trim() || '';
  const excerptEn = input.excerptEn?.trim() || '';
  const image = input.image?.trim() || '';
  const slug = slugify(input.slug?.trim() || titleEn);

  if (!titleEn) return { error: 'English title is required.' };
  if (!excerptEn) return { error: 'English excerpt is required.' };
  if (!image) return { error: 'Cover image is required. Upload a file or paste an image URL.' };
  if (!slug) return { error: 'A URL slug is required.' };

  const body = isBody(input.body)
    ? input.body
    : parseBody(input.bodyEn || '', input.bodyAm || '');

  if (!body.length) {
    return { error: 'Add at least one English or Amharic body paragraph.' };
  }

  const published = input.published === true || input.published === 'true';
  let publishedAt: Date | null = null;
  if (input.publishedAt) {
    const raw = String(input.publishedAt).trim();
    const parsed = /^\d{4}-\d{2}-\d{2}$/.test(raw)
      ? new Date(`${raw}T12:00:00`)
      : new Date(raw);
    if (Number.isNaN(parsed.getTime())) {
      return { error: 'Published date is invalid.' };
    }
    publishedAt = parsed;
  } else if (published) {
    publishedAt = new Date();
  }

  return {
    data: {
      slug,
      titleEn,
      titleAm: input.titleAm?.trim() || '',
      excerptEn,
      excerptAm: input.excerptAm?.trim() || '',
      categoryEn: input.categoryEn?.trim() || 'Practice',
      categoryAm: input.categoryAm?.trim() || '',
      image,
      imageAltEn: input.imageAltEn?.trim() || titleEn,
      imageAltAm: input.imageAltAm?.trim() || '',
      readTimeEn: input.readTimeEn?.trim() || '5 min read',
      readTimeAm: input.readTimeAm?.trim() || '',
      body,
      published,
      publishedAt,
    },
  };
}
