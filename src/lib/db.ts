import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

function getDatabaseUrl() {
  if (process.env.VERCEL) {
    const tmpDbPath = '/tmp/dev.db';
    if (!fs.existsSync(/*turbopackIgnore: true*/ tmpDbPath)) {
      const sourcePath = path.join(process.cwd(), 'prisma', 'dev.db');
      if (fs.existsSync(/*turbopackIgnore: true*/ sourcePath)) {
        try {
          fs.copyFileSync(sourcePath, tmpDbPath);
        } catch (e) {
          console.error('Failed to copy database to /tmp:', e);
        }
      }
    }
    return 'file:/tmp/dev.db';
  }
  return process.env.DATABASE_URL || 'file:./dev.db';
}

process.env.DATABASE_URL = getDatabaseUrl();

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
