import { getArticles } from '@/lib/content';
import { pageMeta } from '@/lib/seo';
import { breadcrumbLd } from '@/lib/jsonld';
import { Breadcrumbs, CtaBand, JsonLd } from '@/components/bits';
import { ArticleCard } from '@/components/cards';

export const metadata = pageMeta({
  title: 'Guides sécurité privée : conseils pratiques | RSP',
  description:
    'Choisir une société de sécurité, comprendre le prix d’un agent, SSIAP 1, 2 et 3, vols sur chantier, levée de doute : nos guides pour sécuriser votre site.',
  path: '/conseils/',
});

const crumbs = [
  { name: 'Accueil', path: '/' },
  { name: 'Conseils', path: '/conseils/' },
];

export default function ConseilsPage() {
  return (
    <>
      <header className="page-head">
        <div className="container">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow">Conseils et guides</p>
          <h1 className="page-head__title">Sécuriser son site : nos guides pratiques</h1>
          <p className="page-head__lead">
            Ce qu’il faut savoir avant de faire appel à une société de sécurité privée : la réglementation, les prix,
            les bons réflexes. Des réponses claires, sans jargon.
          </p>
        </div>
      </header>
      <section className="section section--tight">
        <div className="container grid grid--3">
          {getArticles().map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
      <CtaBand />
      <JsonLd data={breadcrumbLd(crumbs)} />
    </>
  );
}
