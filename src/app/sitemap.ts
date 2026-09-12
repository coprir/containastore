import type { MetadataRoute } from 'next';
import { env } from '@/lib/env';
import { units } from '@content/units';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    '/',
    '/storage',
    '/conversions',
    '/about',
    '/faq',
    '/hints-and-tips',
    '/contact',
    '/cookies',
  ];

  const unitRoutes = units
    .filter((u) => u.hasDetailPage)
    .map((u) => `/storage/${u.slug}`);

  return [...routes, ...unitRoutes].map((path) => ({
    url: `${env.siteUrl}${path === '/' ? '' : path}`,
    lastModified: now,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path.startsWith('/storage') ? 0.8 : 0.5,
  }));
}
