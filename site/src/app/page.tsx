import Image from 'next/image';
import Link from 'next/link';
import { getArticles, getServices } from '@/lib/content';
import { media } from '@/lib/media';
import { pageMeta } from '@/lib/seo';
import { mainCities, phoneDisplay, telHref } from '@/lib/site';
import { faqLd, itemListLd } from '@/lib/jsonld';
import { Icon } from '@/components/Icon';
import { CtaBand, Faq, JsonLd } from '@/components/bits';
import { ServiceCard, ServiceCtaCard, ArticleCard } from '@/components/cards';

export const metadata = pageMeta({
  title: 'Société de sécurité privée à Lyon | Rhône Sécu Protection',
  description:
    'Gardiennage, agents de sécurité, maître-chien, SSIAP, sécurité événementielle, rondes et intervention à Lyon et dans le Rhône. Devis gratuit.',
  path: '/',
});

const sectors = [
  { icon: 'building' as const, title: 'Entreprises et bureaux', text: 'Accueil sécurité, contrôle d’accès, surveillance hors heures d’ouverture.' },
  { icon: 'factory' as const, title: 'Industrie et logistique', text: 'Entrepôts, plateformes, zones d’activité : flux de camions, grands périmètres.' },
  { icon: 'store' as const, title: 'Commerces', text: 'Prévention des vols, agent en entrée, renforts pour les fêtes et les soldes.' },
  { icon: 'crane' as const, title: 'BTP et chantiers', text: 'Gardiennage de nuit et de week-end, maître-chien, rondes.' },
  { icon: 'users' as const, title: 'Événements', text: 'Concerts, salons, soirées d’entreprise, mariages : contrôle des entrées et des flux.' },
  { icon: 'home' as const, title: 'Copropriétés et bailleurs', text: 'Présence dissuasive dans les halls, parkings et parties communes.' },
  { icon: 'hospital' as const, title: 'ERP et santé', text: 'Hôtels, cliniques, salles : agents SSIAP et sécurité des occupants.' },
  { icon: 'key' as const, title: 'Locaux vides', text: 'Prévention des squats, des vols de métaux et des dégradations.' },
];

const reasons = [
  {
    icon: 'badge' as const,
    title: 'Des agents en règle, vérifiables',
    text: 'Chaque agent est titulaire de sa carte professionnelle CNAPS. Nous vous communiquons la liste des agents affectés et leurs numéros de carte.',
  },
  {
    icon: 'file' as const,
    title: 'Des consignes écrites, des comptes rendus',
    text: 'Avant le démarrage, nous rédigeons avec vous les consignes de poste. Pendant la mission, tout est consigné dans la main courante.',
  },
  {
    icon: 'handshake' as const,
    title: 'Un interlocuteur unique',
    text: 'Un responsable suit votre dossier, contrôle les postes et organise les remplacements. Vous savez toujours qui appeler.',
  },
  {
    icon: 'pin' as const,
    title: 'Une entreprise du Rhône',
    text: 'Nous connaissons Lyon, sa métropole et ses zones d’activité : des agents proches de vos sites, des déplacements courts.',
  },
];

const steps = [
  { title: 'Échange et visite', text: 'Nous comprenons votre site, vos horaires et les risques, sur place si nécessaire.' },
  { title: 'Devis détaillé', text: 'Nombre d’agents, qualifications, horaires, majorations : tout est écrit, sans surprise.' },
  { title: 'Mise en place', text: 'Consignes de poste rédigées avec vous, agent présenté et formé à votre site.' },
  { title: 'Suivi', text: 'Contrôles de poste, comptes rendus, ajustement du dispositif quand vos besoins changent.' },
];

const faqs = [
  {
    q: 'Le devis est-il gratuit ?',
    a: 'Oui. L’échange, la visite du site si elle est utile et le devis sont gratuits et sans engagement.',
  },
  {
    q: 'Pouvez-vous intervenir pour une mission ponctuelle ?',
    a: 'Oui : une nuit, un week-end, un événement, un inventaire ou un renfort de quelques semaines, comme un contrat permanent.',
  },
  {
    q: 'Vos agents sont-ils déclarés et autorisés ?',
    a: 'Oui. Chaque agent est titulaire de sa carte professionnelle délivrée par le CNAPS et l’entreprise exerce sous autorisation administrative, dont le numéro figure en bas de chaque page.',
  },
  {
    q: 'Dans quelles villes intervenez-vous ?',
    a: 'À Lyon et dans toute la Métropole (Villeurbanne, Vénissieux, Vaulx-en-Velin, Bron, Saint-Priest, Caluire…) ainsi que dans le département du Rhône, jusqu’à Villefranche-sur-Saône.',
  },
  {
    q: 'Quelle différence entre un agent de sécurité et une ronde ?',
    a: 'L’agent reste en poste sur votre site pendant toute la vacation. Le rondier passe plusieurs fois, à des heures variables, et intervient en cas d’alarme. Les rondes coûtent moins cher quand une présence continue n’est pas nécessaire.',
  },
  {
    q: 'Un agent de sécurité peut-il fouiller les sacs ?',
    a: 'Il peut procéder à une inspection visuelle. La fouille et la palpation ne sont possibles qu’avec le consentement de la personne ; en cas de refus, l’accès peut être refusé.',
  },
];

export default function HomePage() {
  const services = getServices();
  const articles = getArticles().slice(0, 3);
  const tel = telHref();

  return (
    <>
      <section className="hero">
        <Image
          src={media.hero.src}
          width={media.hero.width}
          height={media.hero.height}
          alt="Place des Terreaux et Hôtel de Ville de Lyon la nuit"
          className="hero__img"
          priority
          sizes="100vw"
        />
        <div className="hero__veil" aria-hidden="true" />
        <div className="container hero__content">
          <p className="eyebrow eyebrow--light">Sécurité privée · Lyon &amp; Rhône</p>
          <h1 className="hero__title">
            Société de sécurité privée à <em>Lyon</em>
          </h1>
          <p className="hero__lead">
            Rhône Sécu Protection protège vos sites, vos équipes et votre public : gardiennage, maître-chien, sécurité
            incendie, événementiel, rondes et intervention sur alarme, dans la Métropole de Lyon et tout le Rhône.
          </p>
          <div className="hero__actions">
            <Link href="/contact/" className="btn btn--primary">
              Demander un devis gratuit <Icon name="arrow" size={18} />
            </Link>
            {tel ? (
              <a href={tel} className="btn btn--ghost-light">
                <Icon name="phone" size={18} /> {phoneDisplay()}
              </a>
            ) : (
              <Link href="/services/" className="btn btn--ghost-light">
                Nos services
              </Link>
            )}
          </div>
          <ul className="hero__trust">
            <li>
              <Icon name="badge" size={18} /> Agents titulaires de la carte CNAPS
            </li>
            <li>
              <Icon name="clock" size={18} /> Jour, nuit, week-ends et jours fériés
            </li>
            <li>
              <Icon name="check" size={18} /> Missions ponctuelles ou contrats
            </li>
          </ul>
        </div>
      </section>

      <div className="values">
        <ul className="container values__list" aria-label="Notre mission">
          <li>
            <Icon name="eye" size={22} /> Dissuader
          </li>
          <li>
            <Icon name="shield" size={22} /> Protéger
          </li>
          <li>
            <Icon name="bolt" size={22} /> Intervenir
          </li>
          <li>
            <Icon name="file" size={22} /> Rendre compte
          </li>
        </ul>
      </div>

      <section className="section">
        <div className="container">
          <div className="section__head section__head--row">
            <div>
              <p className="eyebrow">Nos domaines d’intervention</p>
              <h2 className="section__title">Une réponse adaptée à chaque risque</h2>
            </div>
            <Link href="/services/" className="link-arrow">
              Tous nos services <Icon name="arrow" size={18} />
            </Link>
          </div>
          <div className="grid grid--services">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
            <ServiceCtaCard />
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Secteurs</p>
            <h2 className="section__title">Nous sécurisons tous types de sites</h2>
            <p className="section__lead">
              Du commerce de quartier au site industriel, du chantier à l’événement de plusieurs milliers de personnes.
            </p>
          </div>
          <ul className="sectors">
            {sectors.map((s) => (
              <li key={s.title} className="sector">
                <Icon name={s.icon} size={30} />
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <p className="eyebrow">Pourquoi Rhône Sécu Protection</p>
            <h2 className="section__title">Une présence humaine, une protection efficace</h2>
            <p className="section__lead">
              La sécurité est un métier de confiance. Elle repose sur des agents sérieux, bien encadrés, qui savent
              exactement ce que vous attendez d’eux.
            </p>
            <Image
              src={media.gardiennage.src}
              width={media.gardiennage.width}
              height={media.gardiennage.height}
              alt="Agent de sécurité en poste dans le hall d’un immeuble de bureaux"
              className="split__img"
              style={{ marginTop: '2rem' }}
              sizes="(min-width: 960px) 45vw, 100vw"
            />
          </div>
          <ul className="reasons">
            {reasons.map((r) => (
              <li key={r.title} className="reason">
                <span className="reason__icon">
                  <Icon name={r.icon} size={26} />
                </span>
                <div>
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--mist">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Notre méthode</p>
            <h2 className="section__title">De la demande à la mission, en quatre étapes</h2>
          </div>
          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s.title} className="step">
                <span className="step__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container split split--center">
          <Image
            src={media.zones.src}
            width={media.zones.width}
            height={media.zones.height}
            alt="Autoroute A7 et Lyon de nuit"
            className="split__img"
            sizes="(min-width: 960px) 45vw, 100vw"
          />
          <div>
            <p className="eyebrow">Zones d’intervention</p>
            <h2 className="section__title">Lyon, la Métropole et tout le Rhône</h2>
            <p>
              Nos agents interviennent dans les 9 arrondissements de Lyon, dans les communes de la Métropole et dans le
              département du Rhône.
            </p>
            <ul className="zones" style={{ marginBottom: '1.5rem' }}>
              {mainCities.map((c) => (
                <li key={c}>
                  <Icon name="pin" size={16} /> {c}
                </li>
              ))}
            </ul>
            <Link href="/zones-intervention/" className="btn btn--outline">
              Toutes les communes desservies <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--mist">
        <div className="container">
          <div className="section__head section__head--row">
            <div>
              <p className="eyebrow">Conseils et guides</p>
              <h2 className="section__title">Bien choisir, bien s’organiser</h2>
            </div>
            <Link href="/conseils/" className="link-arrow">
              Tous les guides <Icon name="arrow" size={18} />
            </Link>
          </div>
          <div className="grid grid--3">
            {articles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <div className="section__head">
            <p className="eyebrow">Questions fréquentes</p>
            <h2 className="section__title">Vos questions, nos réponses</h2>
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      <CtaBand />
      <JsonLd data={faqLd(faqs)} />
      <JsonLd data={itemListLd(services.map((s) => ({ name: s.short, path: s.path })))} />
    </>
  );
}
