import { Router } from 'express';
import { prisma } from '../prisma.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { toPublicPost } from '../lib/posts.js';

export const postsRouter = Router();

postsRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const rows = await prisma.post.findMany({
      where: { published: true },
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
    });
    res.json({ posts: rows.map(toPublicPost) });
  }),
);

postsRouter.get(
  '/:slug',
  asyncHandler(async (req, res) => {
    const row = await prisma.post.findFirst({
      where: { slug: req.params.slug, published: true },
    });
    if (!row) {
      res.status(404).json({ error: 'Article not found.' });
      return;
    }
    res.json({ post: toPublicPost(row) });
  }),
);
