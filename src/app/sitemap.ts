import { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://artin.team';

  let projectUrls: MetadataRoute.Sitemap = [];
  try {
    const projects = await prisma.project.findMany({ select: { id: true, updatedAt: true } });
    projectUrls = projects.flatMap((project) => [
      {
        url: `${baseUrl}/fa/projects/${project.id}`,
        lastModified: project.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/en/projects/${project.id}`,
        lastModified: project.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
    ]);
  } catch (e) {
    console.error('Sitemap DB query error:', e);
  }

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/fa`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/en`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/fa/privacy-policy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/en/privacy-policy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/fa/terms-of-service`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/en/terms-of-service`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  return [...staticPages, ...projectUrls];
}
