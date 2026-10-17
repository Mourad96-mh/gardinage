import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticle, getArticles, getService } from '@/lib/content';
import { media } from '@/lib/media';
import { site } from '@/lib/site';
import { pageMeta } from '@/lib/seo';
import { articleLd, breadcrumbLd, faqLd } from '@/lib/jsonld';
import { DocPage } from '@/components/DocPage';
import { AsideCta } from '@/components/AsideCta';
import { CtaBand, JsonLd } from '@/components/bits';
import { Icon } from '@/components/Icon';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const a = getArticle((await params).slug);
  if (!a) return {};
  return pageMeta({ title: a.metaTitle, description: a.description, path: a.path, type: 'article' });
}

export default async function ArticlePage({ params }: Props) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  const crumbs = [
    { name: 'Accueil', path: '/' },
    { name: 'Conseils', path: '/conseils/' },
    { name: a.h1.split(' : ')[0], path: a.path },
  ];
  const service = a.relatedService ? getService(a.relatedService) : undefined;
  const all = getArticles();
  const related = [
    ...all.filter((o) => o.slug !== a.slug && o.category === a.category),
    ...all.filter((o) => o.slug !== a.slug && o.category !== a.category && o.relatedService === a.relatedService),
    ...all.filter((o) => o.slug !== a.slug),
  ]
    .filter((o, i, arr) => arr.findIndex((x) => x.slug === o.slug) === i)
    .slice(0, 3);
  const date = new Date(site.published).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <>
      <DocPage
        doc={a}
        crumbs={crumbs}
        eyebrow={`Conseils · ${a.category}`}
        image={media[a.image]}
        imageAlt=""
        meta={
          <>
            <span>
              <Icon name="file" size={16} /> {date}
            </span>
            <span>
              <Icon name="clock" size={16} /> {a.readingMinutes} min de lecture
            </span>
          </>
        }
        aside={
          <>
            {service ? (
              <Link href={service.path} className="aside-service">
                <span className="aside-service__label">Notre service</span>
                <span className="aside-service__name">{service.short}</span>
                <Icon name="arrow" size={18} />
              </Link>
            ) : null}
            <AsideCta title="Une question sur votre site ?" />
          </>
        }
        related={{ title: 'À lire aussi', items: related }}
      />
      <CtaBand />
      <JsonLd data={articleLd({ ...a, image: media[a.image].src })} />
      <JsonLd data={faqLd(a.faqs)} />
      <JsonLd data={breadcrumbLd(crumbs)} />
    </>
  );
}
