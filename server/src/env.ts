import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
dotenv.config({ path: path.join(rootDir, '.env') });

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable ${name}. Copy .env.example to .env and fill it in.`);
  }
  return value;
}

function parseOrigins() {
  const fromEnv = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((value) => value.trim().replace(/\/$/, ''))
    .filter(Boolean);

  return Array.from(
    new Set([
      ...fromEnv,
      'http://localhost:5173',
      'https://zosimas-website.vercel.app',
    ]),
  );
}

export const env = {
  port: Number(process.env.PORT) || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: required('DATABASE_URL'),
  jwtSecret: required('JWT_SECRET'),
  adminEmail: required('ADMIN_EMAIL').toLowerCase(),
  adminPassword: required('ADMIN_PASSWORD'),
  clientOrigins: parseOrigins(),
};

export const isProduction = env.nodeEnv === 'production';

export function isAllowedOrigin(origin?: string | string[]) {
  const value = Array.isArray(origin) ? origin[0] : origin;
  if (!value) return true;
  if (env.clientOrigins.includes(value)) return true;
  try {
    const host = new URL(value).hostname;
    return host === 'zosimas-website.vercel.app' || host.endsWith('.vercel.app');
  } catch {
    return false;
  }
}
