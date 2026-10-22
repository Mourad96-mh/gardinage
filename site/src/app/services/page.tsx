import { getServices } from '@/lib/content';
import { pageMeta } from '@/lib/seo';
import { breadcrumbLd, itemListLd } from '@/lib/jsonld';
import { Breadcrumbs, CtaBand, JsonLd } from '@/components/bits';
import { ServiceCard, ServiceCtaCard } from '@/components/cards';

export const metadata = pageMeta({
  title: 'Prestations de sécurité privée à Lyon | RSP',
  description:
    'Gardiennage, maître-chien, SSIAP, événementiel, rondes, magasin et chantier : nos prestations de sécurité privée à Lyon et partout en France, 24h/24.',
  path: '/services/',
});

const crumbs = [
  { name: 'Accueil', path: '/' },
  { name: 'Services', path: '/services/' },
];

export default function ServicesPage() {
  const services = getServices();
  return (
    <>
      <header className="page-head">
        <div className="container">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow">Nos services</p>
          <h1 className="page-head__title">Prestations de sécurité privée à Lyon et partout en France</h1>
          <p className="page-head__lead">
            Sept métiers complémentaires, combinables selon votre site : de l’agent en poste fixe à l’équipe
            cynophile, du contrôle des entrées d’un concert à la levée de doute sur alarme.
          </p>
        </div>
      </header>
      <section className="section section--tight">
        <div className="container grid grid--services">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
          <ServiceCtaCard />
        </div>
      </section>
      <CtaBand />
      <JsonLd data={breadcrumbLd(crumbs)} />
      <JsonLd data={itemListLd(services.map((s) => ({ name: s.short, path: s.path })))} />
    </>
  );
}
