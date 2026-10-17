import type { MetadataRoute } from 'next';
import { getArticles, getServices } from '@/lib/content';
import { canonical } from '@/lib/seo';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const published = new Date(site.published);
  return [
    { url: canonical('/'), lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: canonical('/services/'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    ...getServices().map((s) => ({
      url: canonical(s.path),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    { url: canonical('/zones-intervention/'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: canonical('/contact/'), lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
    { url: canonical('/a-propos/'), lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: canonical('/recrutement/'), lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: canonical('/conseils/'), lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    ...getArticles().map((a) => ({
      url: canonical(a.path),
      lastModified: published,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ];
}
