import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

function getDatabaseUrl() {
  if (process.env.VERCEL) {
    const tmpDbPath = '/tmp/dev.db';
    if (!fs.existsSync(/*turbopackIgnore: true*/ tmpDbPath)) {
      const sourcePaths = [
        path.join(process.cwd(), 'prisma', 'dev.db'),
        path.join(process.cwd(), 'dev.db'),
      ];
      for (const sourcePath of sourcePaths) {
        if (fs.existsSync(/*turbopackIgnore: true*/ sourcePath)) {
          try {
            fs.copyFileSync(sourcePath, tmpDbPath);
            fs.chmodSync(tmpDbPath, 0o666);
            break;
          } catch (e) {
            console.error('Failed to copy database to /tmp:', e);
          }
        }
      }
    }
    return 'file:/tmp/dev.db';
  }
  return process.env.DATABASE_URL || 'file:./dev.db';
}

const dbUrl = getDatabaseUrl();
process.env.DATABASE_URL = dbUrl;

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
