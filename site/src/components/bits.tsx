import Link from 'next/link';
import { site, whatsappUrl, defaultWhatsappMessage, phoneDisplay, telHref, cnapsNotice } from '@/lib/site';
import { Icon } from './Icon';

export function JsonLd({ data }: { data: object | null }) {
  if (!data) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Fil d’Ariane">
      <ol>
        {items.map((it, i) => (
          <li key={it.path}>
            {i < items.length - 1 ? <Link href={it.path}>{it.name}</Link> : <span aria-current="page">{it.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Bouton WhatsApp flottant — affiché seulement quand un numéro est renseigné. */
export function WhatsAppFloat() {
  const url = whatsappUrl(defaultWhatsappMessage);
  if (!url) return null;
  return (
    <a className="wa-float" href={url} target="_blank" rel="noopener" aria-label="Écrire à Rhône Sécu Protection sur WhatsApp">
      <Icon name="whatsapp" size={28} />
    </a>
  );
}

/** Bandeau d'appel à l'action de fin de page. */
export function CtaBand({
  title = 'Parlons de la sécurité de votre site',
  text = 'Décrivez votre besoin : nous vous rappelons pour en parler et vous adressons un devis gratuit et détaillé.',
}: {
  title?: string;
  text?: string;
}) {
  const tel = telHref();
  return (
    <section className="cta-band">
      <div className="container cta-band__inner">
        <div>
          <h2 className="cta-band__title">{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta-band__actions">
          <Link href="/contact/" className="btn btn--primary">
            Demander un devis gratuit <Icon name="arrow" size={18} />
          </Link>
          {tel ? (
            <a href={tel} className="btn btn--ghost-light">
              <Icon name="phone" size={18} /> {phoneDisplay()}
            </a>
          ) : (
            <a href={`mailto:${site.email}`} className="btn btn--ghost-light">
              <Icon name="mail" size={18} /> Écrire un e-mail
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q} className="faq__item">
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/** Encadré réglementaire (n° CNAPS + mention L612-14), pour les pages À propos et Mentions légales. */
export function CnapsBox() {
  return (
    <div className="legal-box">
      <Icon name="shield" size={32} />
      <div>
        <p>
          <strong>Autorisation d’exercer délivrée par le CNAPS</strong>
          {site.cnapsNumber ? ` : n° ${site.cnapsNumber}` : ' : numéro en cours de renseignement'}.
        </p>
        <p>{cnapsNotice}</p>
      </div>
    </div>
  );
}
