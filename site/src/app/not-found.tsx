import Link from 'next/link';

export const metadata = { title: 'Page introuvable | Rhône Sécu Protection', robots: { index: false } };

export default function NotFound() {
  return (
    <section className="section">
      <div className="container narrow center">
        <p className="eyebrow">Erreur 404</p>
        <h1 className="section__title">Cette page n’existe pas (ou plus)</h1>
        <p className="section__lead" style={{ marginBottom: '2rem' }}>
          Elle a peut-être été déplacée. Voici où reprendre :
        </p>
        <p className="row-actions">
          <Link href="/" className="btn btn--navy">
            Accueil
          </Link>
          <Link href="/services/" className="btn btn--outline">
            Nos services
          </Link>
          <Link href="/contact/" className="btn btn--primary">
            Devis gratuit
          </Link>
        </p>
      </div>
    </section>
  );
}
