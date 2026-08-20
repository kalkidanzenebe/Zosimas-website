import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import multer from 'multer';
import type { Request } from 'express';
import { rootDir } from '../env.js';
import type { PostInput } from './posts.js';

export const uploadsDir = path.join(rootDir, 'uploads');
export const postUploadsDir = path.join(uploadsDir, 'posts');

fs.mkdirSync(postUploadsDir, { recursive: true });

const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const allowedExt = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, postUploadsDir),
  filename: (_req, file, cb) => {
    const ext = allowedExt.has(path.extname(file.originalname).toLowerCase())
      ? path.extname(file.originalname).toLowerCase()
      : '.jpg';
    cb(null, `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`);
  },
});

export const postImageUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!allowedTypes.has(file.mimetype)) {
      cb(new Error('Upload a JPG, PNG, WebP, or GIF image.'));
      return;
    }
    cb(null, true);
  },
});

export function publicUploadPath(filename: string) {
  return `/uploads/posts/${filename}`;
}

export function payloadFromRequest(req: Request): PostInput {
  const body = { ...(req.body as PostInput) };
  if (req.file?.filename) {
    body.image = publicUploadPath(req.file.filename);
  }
  if (typeof body.published === 'string') {
    body.published = body.published === 'true';
  }
  return body;
}
