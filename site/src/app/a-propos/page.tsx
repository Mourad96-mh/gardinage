import Image from 'next/image';
import { media } from '@/lib/media';
import { pageMeta } from '@/lib/seo';
import { breadcrumbLd } from '@/lib/jsonld';
import { Breadcrumbs, CnapsBox, CtaBand, JsonLd } from '@/components/bits';
import { Icon } from '@/components/Icon';

export const metadata = pageMeta({
  title: 'À propos de Rhône Sécu Protection, sécurité à Lyon',
  description:
    'Rhône Sécu Protection, entreprise de sécurité privée du Rhône : nos engagements, notre cadre réglementaire CNAPS et notre façon de travailler.',
  path: '/a-propos/',
});

const crumbs = [
  { name: 'Accueil', path: '/' },
  { name: 'À propos', path: '/a-propos/' },
];

const commitments = [
  {
    icon: 'badge' as const,
    title: 'Professionnalisme',
    text: 'Des agents titulaires de leur carte professionnelle, formés, en tenue, ponctuels. Nous ne confions pas un poste à quelqu’un qui ne connaît pas vos consignes.',
  },
  {
    icon: 'eye' as const,
    title: 'Prévention',
    text: 'La meilleure intervention est celle qu’on évite. Nous repérons les failles de votre site et vous proposons des mesures simples, humaines ou techniques.',
  },
  {
    icon: 'bolt' as const,
    title: 'Réactivité',
    text: 'Un responsable joignable, des remplacements organisés, des renforts possibles quand vos besoins changent.',
  },
  {
    icon: 'handshake' as const,
    title: 'Confiance',
    text: 'Des devis détaillés, des comptes rendus écrits, des règles claires sur ce que nos agents peuvent et ne peuvent pas faire.',
  },
];

export default function AboutPage() {
  return (
    <>
      <header className="page-head">
        <div className="container">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow">À propos</p>
          <h1 className="page-head__title">Votre sécurité, notre priorité</h1>
          <p className="page-head__lead">
            Rhône Sécu Protection est une entreprise de sécurité privée implantée dans le Rhône. Notre mission :
            protéger les personnes, les biens et les sites qui nous sont confiés, avec rigueur et discrétion.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container split split--center">
          <div>
            <p className="eyebrow">Qui sommes-nous</p>
            <h2 className="section__title">Une présence humaine, une protection efficace</h2>
            <p>
              Entreprises, commerces, chantiers, copropriétés, organisateurs d’événements : nos clients ont des sites
              très différents, mais la même attente. Ils veulent des agents fiables, présents à l’heure, qui
              connaissent leurs consignes, et un interlocuteur qui répond quand il y a un problème.
            </p>
            <p>
              C’est ce que nous construisons, mission après mission : une sécurité réactive, à Lyon et partout en
              France, 24h/24 et 7j/7, avec des agents qualifiés et une organisation qui laisse peu de place à l’improvisation.
            </p>
          </div>
          <Image
            src={media.apropos.src}
            width={media.apropos.width}
            height={media.apropos.height}
            alt="Salle d’exposition surveillée la nuit"
            className="split__img"
            sizes="(min-width: 960px) 45vw, 100vw"
          />
        </div>
      </section>

      <section className="section section--mist">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Nos engagements</p>
            <h2 className="section__title">Quatre valeurs qui guident chaque mission</h2>
          </div>
          <div className="features">
            {commitments.map((c) => (
              <div key={c.title} className="feature">
                <span className="reason__icon">
                  <Icon name={c.icon} size={26} />
                </span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <div className="section__head">
            <p className="eyebrow">Un métier réglementé</p>
            <h2 className="section__title">Un cadre légal strict, que nous respectons</h2>
          </div>
          <ul className="checklist">
            <li>
              <Icon name="check" size={18} /> L’entreprise exerce sous <strong>autorisation administrative</strong>{' '}
              délivrée par le CNAPS (Conseil national des activités privées de sécurité), placé sous la tutelle du
              ministère de l’Intérieur.
            </li>
            <li>
              <Icon name="check" size={18} /> Chaque agent détient une <strong>carte professionnelle</strong> en cours
              de validité, correspondant à l’activité exercée.
            </li>
            <li>
              <Icon name="check" size={18} /> Nos agents relèvent de la <strong>convention collective</strong> des
              entreprises de prévention et de sécurité.
            </li>
            <li>
              <Icon name="check" size={18} /> Ils exercent dans les <strong>lieux dont ils ont la garde</strong> et
              respectent les libertés : pas de fouille ni de palpation sans le consentement de la personne.
            </li>
          </ul>
          <CnapsBox />
        </div>
      </section>

      <CtaBand />
      <JsonLd data={breadcrumbLd(crumbs)} />
    </>
  );
}
