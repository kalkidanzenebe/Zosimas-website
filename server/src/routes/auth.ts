import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../prisma.js';
import { env, isProduction } from '../env.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { ADMIN_COOKIE, readAdminToken, signAdminToken } from '../middleware/auth.js';

const loginAttempts = new Map<string, { count: number; resetAt: number }>();

function tooManyAttempts(ip: string) {
  const now = Date.now();
  const current = loginAttempts.get(ip);
  if (!current || current.resetAt < now) {
    loginAttempts.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return false;
  }
  current.count += 1;
  return current.count > 12;
}

export const authRouter = Router();

authRouter.post(
  '/login',
  asyncHandler(async (req, res) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    if (tooManyAttempts(ip)) {
      res.status(429).json({ error: 'Too many sign-in attempts. Try again later.' });
      return;
    }

    const email = String(req.body?.email || '')
      .trim()
      .toLowerCase();
    const password = String(req.body?.password || '');

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required.' });
      return;
    }

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
      res.status(401).json({ error: 'Invalid email or password.' });
      return;
    }

    const token = signAdminToken({ sub: admin.id, email: admin.email });
    res.cookie(ADMIN_COOKIE, token, {
      httpOnly: true,
      sameSite: isProduction ? 'none' : 'lax',
      secure: isProduction,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    res.json({ admin: { id: admin.id, email: admin.email }, token });
  }),
);

authRouter.post('/logout', (_req, res) => {
  res.clearCookie(ADMIN_COOKIE, {
    path: '/',
    sameSite: isProduction ? 'none' : 'lax',
    secure: isProduction,
  });
  res.json({ ok: true });
});

authRouter.get('/me', asyncHandler(async (req, res) => {
  const token = readAdminToken(req);
  if (!token) {
    res.status(401).json({ error: 'Not signed in.' });
    return;
  }

  const admin = await prisma.admin.findUnique({
    where: { id: token.sub },
    select: { id: true, email: true },
  });
  if (!admin) {
    res.status(401).json({ error: 'Not signed in.' });
    return;
  }

  res.json({ admin });
}));

export async function ensureAdmin() {
  const passwordHash = await bcrypt.hash(env.adminPassword, 12);
  await prisma.admin.upsert({
    where: { email: env.adminEmail },
    update: { passwordHash },
    create: { email: env.adminEmail, passwordHash },
  });
}
