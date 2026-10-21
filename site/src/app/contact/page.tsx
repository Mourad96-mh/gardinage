import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import { breadcrumbLd } from '@/lib/jsonld';
import { getServices } from '@/lib/content';
import { site, mainCities, phoneDisplay, telHref, whatsappUrl, defaultWhatsappMessage } from '@/lib/site';
import { Breadcrumbs, JsonLd } from '@/components/bits';
import { Icon } from '@/components/Icon';
import { ContactForm } from '@/components/ContactForm';

export const metadata = pageMeta({
  title: 'Devis sécurité privée gratuit à Lyon | Rhône Sécu Protection',
  description:
    'Demandez un devis gratuit pour du gardiennage, un maître-chien, des agents SSIAP, la sécurité d’un événement ou des rondes à Lyon et partout en France. Disponibles 24h/24 et 7j/7.',
  path: '/contact/',
});

const crumbs = [
  { name: 'Accueil', path: '/' },
  { name: 'Devis et contact', path: '/contact/' },
];

export default function ContactPage() {
  const services = [...getServices().map((s) => s.short), 'Plusieurs prestations / je ne sais pas'];
  const tel = telHref();
  const wa = whatsappUrl(defaultWhatsappMessage);
  return (
    <>
      <header className="page-head">
        <div className="container">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow">Devis gratuit</p>
          <h1 className="page-head__title">Demandez votre devis de sécurité</h1>
          <p className="page-head__lead">
            Quelques informations sur votre site et votre besoin suffisent. Nous vous recontactons pour préciser la
            mission, puis vous adressons un devis détaillé et sans engagement.
          </p>
        </div>
      </header>

      <section className="section section--tight">
        <div className="container contact">
          <ContactForm services={services} />

          <aside className="contact__aside">
            <div className="contact__card contact__card--navy">
              <h2>Une urgence ?</h2>
              <p>Pour un besoin immédiat (effraction, renfort pour ce soir), appelez-nous directement.</p>
              {tel ? (
                <p>
                  <a href={tel} className="contact__line">
                    <Icon name="phone" size={20} /> <span>{phoneDisplay()}</span>
                  </a>
                </p>
              ) : null}
              {wa ? (
                <p>
                  <a href={wa} className="contact__line" target="_blank" rel="noopener">
                    <Icon name="whatsapp" size={20} /> <span>WhatsApp</span>
                  </a>
                </p>
              ) : null}
              <p style={{ margin: 0 }}>
                <a href={`mailto:${site.email}`} className="contact__line">
                  <Icon name="mail" size={20} /> <span>{site.email}</span>
                </a>
              </p>
            </div>
            <div className="contact__card">
              <h2>Zones d’intervention</h2>
              <p className="footer__zones">{mainCities.join(' · ')}</p>
              <Link href="/zones-intervention/" className="link-arrow">
                Toutes les communes <Icon name="arrow" size={16} />
              </Link>
            </div>
            <div className="contact__card">
              <h2>Vous cherchez un emploi ?</h2>
              <p className="contact__hint">
                Les candidatures passent par notre page <Link href="/recrutement/">Recrutement</Link>.
              </p>
            </div>
          </aside>
        </div>
      </section>
      <JsonLd data={breadcrumbLd(crumbs)} />
    </>
  );
}
