import Image from 'next/image';
import { media } from '@/lib/media';
import { pageMeta } from '@/lib/seo';
import { site } from '@/lib/site';
import { breadcrumbLd } from '@/lib/jsonld';
import { Breadcrumbs, JsonLd } from '@/components/bits';
import { Icon } from '@/components/Icon';

export const metadata = pageMeta({
  title: 'Recrutement agent de sécurité à Lyon | RSP',
  description:
    'Agent de sécurité APS, SSIAP, agent cynophile, agent événementiel : envoyez votre candidature à Rhône Sécu Protection pour des missions à Lyon et dans le Rhône.',
  path: '/recrutement/',
});

const crumbs = [
  { name: 'Accueil', path: '/' },
  { name: 'Recrutement', path: '/recrutement/' },
];

const profiles = [
  { title: 'Agent de prévention et de sécurité (APS)', text: 'Surveillance de sites, contrôle d’accès, accueil, rondes.' },
  { title: 'Agent de sécurité incendie (SSIAP 1 / SSIAP 2)', text: 'ERP, IGH, centres commerciaux, hôtels, établissements de santé.' },
  { title: 'Agent cynophile', text: 'Avec votre chien, pour des sites étendus et des missions de nuit.' },
  { title: 'Agent de sécurité événementielle', text: 'Missions ponctuelles : concerts, salons, soirées, événements sportifs.' },
];

const subject = encodeURIComponent('Candidature — agent de sécurité');
const body = encodeURIComponent(
  'Bonjour,\n\nPoste visé : \nCarte professionnelle CNAPS n° : \nDiplômes (SSIAP, SST…) : \nPermis / véhicule : \nDisponibilités : \nCommune de résidence : \n\nCV en pièce jointe.\n',
);

export default function RecrutementPage() {
  return (
    <>
      <header className="page-head">
        <div className="container">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow">Recrutement</p>
          <h1 className="page-head__title">Rejoignez Rhône Sécu Protection</h1>
          <p className="page-head__lead">
            Nous recherchons régulièrement des agents sérieux et qualifiés pour des missions à Lyon et partout en France,
            en poste fixe ou en renfort ponctuel.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container split">
          <div>
            <h2 className="section__title">Les profils que nous recherchons</h2>
            <ul className="reasons">
              {profiles.map((p) => (
                <li key={p.title} className="reason">
                  <span className="reason__icon">
                    <Icon name="badge" size={24} />
                  </span>
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Image
              src={media.recrutement.src}
              width={media.recrutement.width}
              height={media.recrutement.height}
              alt="Agent marchant dans un couloir d’immeuble de bureaux"
              className="split__img"
              sizes="(min-width: 960px) 45vw, 100vw"
            />
            <div className="contact__card contact__card--navy" style={{ marginTop: '1.5rem' }}>
              <h2>Postuler</h2>
              <p>Prérequis indispensable : une carte professionnelle CNAPS en cours de validité (ou le diplôme SSIAP pour les postes incendie).</p>
              <ul className="checklist">
                <li>
                  <Icon name="check" size={18} /> CV à jour
                </li>
                <li>
                  <Icon name="check" size={18} /> Numéro de carte professionnelle
                </li>
                <li>
                  <Icon name="check" size={18} /> Diplômes : SSIAP, SST, permis
                </li>
                <li>
                  <Icon name="check" size={18} /> Disponibilités (jour, nuit, week-end)
                </li>
              </ul>
              <a href={`mailto:${site.email}?subject=${subject}&body=${body}`} className="btn btn--primary">
                <Icon name="mail" size={18} /> Envoyer ma candidature
              </a>
            </div>
          </div>
        </div>
      </section>
      <JsonLd data={breadcrumbLd(crumbs)} />
    </>
  );
}
