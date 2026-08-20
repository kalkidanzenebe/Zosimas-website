import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../env.js';

export const ADMIN_COOKIE = 'zosimas_admin_token';

export type AdminToken = {
  sub: string;
  email: string;
};

declare global {
  namespace Express {
    interface Request {
      admin?: AdminToken;
    }
  }
}

export function readAdminToken(req: Request): AdminToken | null {
  const cookieToken = req.cookies?.[ADMIN_COOKIE];
  const header = req.headers.authorization;
  const bearer = header?.startsWith('Bearer ') ? header.slice(7) : null;
  const token = cookieToken || bearer;
  if (!token) return null;

  try {
    const payload = jwt.verify(token, env.jwtSecret) as AdminToken;
    if (!payload?.sub || !payload?.email) return null;
    return { sub: payload.sub, email: payload.email };
  } catch {
    return null;
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const admin = readAdminToken(req);
  if (!admin) {
    res.status(401).json({ error: 'Sign in to continue.' });
    return;
  }
  req.admin = admin;
  next();
}

export function signAdminToken(admin: AdminToken) {
  return jwt.sign(admin, env.jwtSecret, { expiresIn: '7d' });
}
