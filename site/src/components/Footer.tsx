import Link from 'next/link';
import { site, mainCities, phoneDisplay, telHref, cnapsNotice } from '@/lib/site';
import { getServices } from '@/lib/content';
import { Logo } from './Logo';
import { Icon } from './Icon';

export function Footer() {
  const services = getServices();
  const year = new Date().getFullYear();
  const tel = telHref();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__about">
          <Logo />
          <p>
            Entreprise de sécurité privée à Lyon et partout en France, 24h/24 et 7j/7. Gardiennage, maître-chien, sécurité incendie,
            événementiel, rondes et intervention.
          </p>
          <div className="footer__contact">
            {tel ? (
              <a href={tel}>
                <Icon name="phone" size={18} /> {phoneDisplay()}
              </a>
            ) : null}
            <a href={`mailto:${site.email}`}>
              <Icon name="mail" size={18} /> {site.email}
            </a>
          </div>
        </div>

        <div>
          <p className="footer__title">Nos services</p>
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={s.path}>{s.short}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="footer__title">L’entreprise</p>
          <ul>
            <li>
              <Link href="/a-propos/">À propos</Link>
            </li>
            <li>
              <Link href="/conseils/">Conseils et guides</Link>
            </li>
            <li>
              <Link href="/recrutement/">Recrutement</Link>
            </li>
            <li>
              <Link href="/contact/">Devis gratuit</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="footer__title">Zones d’intervention</p>
          <p className="footer__zones">{mainCities.join(' · ')}</p>
          <Link href="/zones-intervention/" className="link-arrow">
            Toutes les communes <Icon name="arrow" size={16} />
          </Link>
        </div>
      </div>

      <div className="container footer__legal">
        <p>
          {site.legalName}
          {site.legalForm ? ` — ${site.legalForm}` : ''}
          {site.rcs ? ` — ${site.rcs}` : site.siren ? ` — SIREN ${site.siren}` : ''}. Autorisation d’exercer délivrée par le CNAPS
          {site.cnapsNumber ? ` n° ${site.cnapsNumber}` : ' (numéro en cours de renseignement)'}.
        </p>
        <p>{cnapsNotice}</p>
      </div>

      <div className="container footer__bottom">
        <p>
          © {year} {site.name}
        </p>
        <nav aria-label="Liens légaux">
          <Link href="/mentions-legales/">Mentions légales et confidentialité</Link>
          <Link href="/contact/">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
