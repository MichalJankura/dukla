import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/config/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl('/'), changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/cookies/'), changeFrequency: 'yearly', priority: 0.2 },
  ];
}
