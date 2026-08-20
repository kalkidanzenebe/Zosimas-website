import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { posts } from '../../src/data/posts.js';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
dotenv.config({ path: path.join(rootDir, '.env') });

const prisma = new PrismaClient();

async function main() {
  const email = (process.env.ADMIN_EMAIL || 'admin@zosimas.et').trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.admin.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });

  for (const post of posts) {
    const data = {
      slug: post.slug,
      titleEn: post.title.en,
      titleAm: post.title.am,
      excerptEn: post.excerpt.en,
      excerptAm: post.excerpt.am,
      body: post.body,
      categoryEn: post.category.en,
      categoryAm: post.category.am,
      image: post.image,
      imageAltEn: post.imageAlt.en,
      imageAltAm: post.imageAlt.am,
      readTimeEn: post.readTime.en,
      readTimeAm: post.readTime.am,
      published: true,
      publishedAt: new Date(post.date),
    };

    await prisma.post.upsert({
      where: { slug: post.slug },
      create: data,
      update: {},
    });
  }

  console.log(`Seeded admin ${email} and ${posts.length} posts.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
