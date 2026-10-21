import Link from 'next/link';
import { getServices } from '@/lib/content';
import { pageMeta } from '@/lib/seo';
import { site } from '@/lib/site';
import { breadcrumbLd } from '@/lib/jsonld';
import { Breadcrumbs, CtaBand, JsonLd } from '@/components/bits';
import { Icon } from '@/components/Icon';

export const metadata = pageMeta({
  title: 'Zones d’intervention : Lyon, Rhône et toute la France | RSP',
  description:
    'Agents de sécurité à Lyon, Villeurbanne, Vénissieux, Vaulx-en-Velin, Bron, Saint-Priest, Caluire, dans tout le Rhône et partout en France. Un agent sur site en moins d’une heure, 24h/24.',
  path: '/zones-intervention/',
});

const crumbs = [
  { name: 'Accueil', path: '/' },
  { name: 'Zones d’intervention', path: '/zones-intervention/' },
];

const groups = [
  {
    title: 'Lyon, les 9 arrondissements',
    cities: site.zones.lyon,
    text: 'Bureaux et sièges de la Part-Dieu et de Confluence, commerces de la Presqu’île, établissements de santé, résidences et chantiers de Gerland ou de Vaise : nous intervenons dans tous les arrondissements, de jour comme de nuit.',
  },
  {
    title: 'La Métropole de Lyon',
    cities: site.zones.metropole,
    text: 'Zones d’activité et plateformes logistiques de l’Est lyonnais, grands centres commerciaux, copropriétés et bailleurs de Villeurbanne, Vénissieux ou Vaulx-en-Velin, parcs d’entreprises de l’Ouest : nos agents connaissent ces sites et leurs contraintes d’accès.',
  },
  {
    title: 'Le département du Rhône',
    cities: site.zones.rhone,
    text: 'Au-delà de la Métropole, nous sécurisons entreprises, chantiers et événements dans le Rhône, du Beaujolais à l’Ouest lyonnais, avec des missions planifiées ou ponctuelles.',
  },
  {
    title: 'Partout en France',
    cities: [] as string[],
    text: 'Votre site est hors du Rhône ? Nous intervenons partout en France, 24h/24 et 7j/7, 365 jours par an : un agent de sécurité sur votre site en moins d’une heure, pour une mission ponctuelle comme pour un contrat.',
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
            Rhône Sécu Protection intervient à Lyon, dans tout le Rhône et partout en France, 24h/24 et 7j/7. Votre ville ne
            figure pas dans la liste ? Contactez-nous : un agent peut être sur place en moins d’une heure.
          </p>
        </div>
      </header>

      <section className="section section--tight">
        <div className="container zone-groups">
          {groups.map((g) => (
            <article key={g.title} className="zone-group">
              <h2>{g.title}</h2>
              <p>{g.text}</p>
              {g.cities.length > 0 && (
                <ul className="zones">
                {g.cities.map((c) => (
                  <li key={c}>
                    <Icon name="pin" size={16} /> {c}
                  </li>
                ))}
                </ul>
              )}
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
