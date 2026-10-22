import Link from 'next/link';
import { getServices } from '@/lib/content';
import { pageMeta } from '@/lib/seo';
import { breadcrumbLd } from '@/lib/jsonld';
import { Breadcrumbs, CtaBand, JsonLd } from '@/components/bits';
import { Icon } from '@/components/Icon';

export const metadata = pageMeta({
  title: 'Zones d’intervention : Lyon et partout en France | RSP',
  description:
    'Société de sécurité privée à Lyon et partout en France : gardiennage, maître-chien, SSIAP, rondes. Un agent sur votre site en moins d’une heure, 24h/24.',
  path: '/zones-intervention/',
});

const crumbs = [
  { name: 'Accueil', path: '/' },
  { name: 'Zones d’intervention', path: '/zones-intervention/' },
];

const groups = [
  {
    title: 'Lyon',
    text: 'Bureaux et sièges, commerces, établissements de santé, résidences, chantiers et événements : nous sécurisons vos sites à Lyon, de jour comme de nuit.',
  },
  {
    title: 'Partout en France',
    text: 'Votre site est ailleurs en France ? Nous intervenons partout en France, 24h/24 et 7j/7, 365 jours par an : un agent de sécurité sur votre site en moins d’une heure, pour une mission ponctuelle comme pour un contrat.',
  },
];

export default function ZonesPage() {
  const services = getServices();
  return (
    <>
      <header className="page-head">
        <div className="container">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow">Zones d’intervention</p>
          <h1 className="page-head__title">Sécurité privée à Lyon et partout en France</h1>
          <p className="page-head__lead">
            Rhône Sécu Protection intervient à Lyon et partout en France, 24h/24 et 7j/7. Où que soit votre site,
            contactez-nous : un agent peut être sur place en moins d’une heure.
          </p>
        </div>
      </header>

      <section className="section section--tight">
        <div className="container zone-groups">
          {groups.map((g) => (
            <article key={g.title} className="zone-group">
              <h2>{g.title}</h2>
              <p>{g.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--mist">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Partout où vous êtes</p>
            <h2 className="section__title">Toutes nos prestations, partout en France</h2>
          </div>
          <ul className="checklist" style={{ columns: '18rem', display: 'block' }}>
            {services.map((s) => (
              <li key={s.slug} style={{ marginBottom: '0.65rem', breakInside: 'avoid' }}>
                <Icon name="check" size={18} />{' '}
                <Link href={s.path}>
                  {s.short} à Lyon et partout en France
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Votre site est à Lyon ou ailleurs en France ?" />
      <JsonLd data={breadcrumbLd(crumbs)} />
    </>
  );
}
