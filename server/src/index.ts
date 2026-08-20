import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import { env } from './env.js';
import { prisma } from './prisma.js';
import { authRouter, ensureAdmin } from './routes/auth.js';
import { postsRouter } from './routes/posts.js';
import { adminPostsRouter } from './routes/adminPosts.js';
import { requireAdmin } from './middleware/auth.js';
import { uploadsDir } from './lib/uploads.js';

const app = express();

app.set('trust proxy', 1);
app.use(
  cors({
    origin: env.clientOrigin,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json({ limit: '1mb' }));
app.use('/uploads', express.static(uploadsDir));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/admin/posts', requireAdmin, adminPostsRouter);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err instanceof multer.MulterError) {
    const message = err.code === 'LIMIT_FILE_SIZE' ? 'Image must be 5MB or smaller.' : err.message;
    res.status(400).json({ error: message });
    return;
  }
  if (err instanceof Error && err.message.startsWith('Upload a JPG')) {
    res.status(400).json({ error: err.message });
    return;
  }
  console.error(err);
  res.status(500).json({ error: 'Something went wrong.' });
});

async function start() {
  await prisma.$connect();
  await ensureAdmin();
  app.listen(env.port, () => {
    console.log(`ZOSIMAS API listening on http://localhost:${env.port}`);
  });
}

start().catch((error) => {
  console.error('Failed to start API', error);
  process.exit(1);
});
