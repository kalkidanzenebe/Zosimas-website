import { Prisma } from '@prisma/client';
import { Router } from 'express';
import { prisma } from '../prisma.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { parsePostInput, toPublicPost } from '../lib/posts.js';
import { payloadFromRequest, postImageUpload } from '../lib/uploads.js';

export const adminPostsRouter = Router();

adminPostsRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const rows = await prisma.post.findMany({
      orderBy: [{ createdAt: 'desc' }],
    });
    res.json({ posts: rows.map(toPublicPost) });
  }),
);

adminPostsRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const row = await prisma.post.findUnique({ where: { id: req.params.id } });
    if (!row) {
      res.status(404).json({ error: 'Article not found.' });
      return;
    }
    res.json({ post: toPublicPost(row) });
  }),
);

adminPostsRouter.post(
  '/',
  postImageUpload.single('imageFile'),
  asyncHandler(async (req, res) => {
    const parsed = parsePostInput(payloadFromRequest(req));
    if ('error' in parsed) {
      res.status(400).json({ error: parsed.error });
      return;
    }

    try {
      const row = await prisma.post.create({ data: parsed.data });
      res.status(201).json({ post: toPublicPost(row) });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        res.status(409).json({ error: 'That slug is already in use.' });
        return;
      }
      throw error;
    }
  }),
);

adminPostsRouter.put(
  '/:id',
  postImageUpload.single('imageFile'),
  asyncHandler(async (req, res) => {
    const parsed = parsePostInput(payloadFromRequest(req));
    if ('error' in parsed) {
      res.status(400).json({ error: parsed.error });
      return;
    }

    try {
      const row = await prisma.post.update({
        where: { id: req.params.id },
        data: parsed.data,
      });
      res.json({ post: toPublicPost(row) });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        res.status(404).json({ error: 'Article not found.' });
        return;
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        res.status(409).json({ error: 'That slug is already in use.' });
        return;
      }
      throw error;
    }
  }),
);

adminPostsRouter.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    try {
      await prisma.post.delete({ where: { id: req.params.id } });
      res.json({ ok: true });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        res.status(404).json({ error: 'Article not found.' });
        return;
      }
      throw error;
    }
  }),
);
