import type { Metadata } from 'next';
import { site } from './site';

export function canonical(p: string): string {
  const clean = p === '/' ? '/' : `/${p.replace(/^\/|\/$/g, '')}/`;
  return `${site.baseUrl}${clean}`;
}

/** Carte de partage unique (logo + accroche, générée par scripts/logo.mjs). */
const OG = { url: '/brand/og-default.jpg', width: 1200, height: 630 };

export function pageMeta(opts: {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  noindex?: boolean;
}): Metadata {
  return {
    title: { absolute: opts.title },
    description: opts.description,
    alternates: { canonical: canonical(opts.path) },
    openGraph: {
      type: opts.type ?? 'website',
      locale: site.locale,
      siteName: site.name,
      url: canonical(opts.path),
      title: opts.title,
      description: opts.description,
      images: [{ url: `${site.baseUrl}${OG.url}`, width: OG.width, height: OG.height, alt: site.name }],
    },
    twitter: { card: 'summary_large_image', title: opts.title, description: opts.description },
    ...(opts.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
