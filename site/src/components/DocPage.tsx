import Image from 'next/image';
import Link from 'next/link';
import type { Article, Doc } from '@/lib/content';
import type { Photo } from '@/lib/media';
import { Breadcrumbs } from './bits';
import { ArticleCard } from './cards';

/** Gabarit commun aux fiches service et aux articles : en-tête, photo, corps Markdown, sommaire. */
export function DocPage({
  doc,
  crumbs,
  eyebrow,
  image,
  imageAlt,
  meta,
  aside,
  related,
}: {
  doc: Doc;
  crumbs: { name: string; path: string }[];
  eyebrow: string;
  image: Photo;
  imageAlt: string;
  meta?: React.ReactNode;
  aside?: React.ReactNode;
  related?: { title: string; items: Article[] };
}) {
  return (
    <>
      <header className="page-head">
        <div className="container">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="page-head__title">{doc.h1}</h1>
          <p className="page-head__lead" dangerouslySetInnerHTML={{ __html: doc.lead }} />
          {meta ? <div className="page-head__meta">{meta}</div> : null}
        </div>
      </header>

      <div className="page-photo-wrap">
        <div className="container">
          <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt={imageAlt}
          className="page-photo"
          priority
          fetchPriority="high"
          sizes="(min-width: 1200px) 1140px, 100vw"
          />
        </div>
      </div>

      <div className="container doc">
        <aside className="doc__aside">
          {doc.headings.length > 2 ? (
            <nav className="toc" aria-label="Sommaire">
              <p className="toc__title">Sommaire</p>
              <ol>
                {doc.headings.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`}>{h.text}</a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
          {aside}
        </aside>
        <article className="prose" dangerouslySetInnerHTML={{ __html: doc.html }} />
      </div>

      {related && related.items.length ? (
        <section className="section section--mist">
          <div className="container">
            <div className="section__head section__head--row">
              <h2 className="section__title">{related.title}</h2>
              <Link href="/conseils/" className="link-arrow">
                Tous les conseils
              </Link>
            </div>
            <div className="grid grid--3">
              {related.items.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
