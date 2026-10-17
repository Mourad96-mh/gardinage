import Link from 'next/link';
import { site, phoneDisplay, telHref } from '@/lib/site';
import { Icon } from './Icon';

export function AsideCta({ title = 'Besoin d’agents ?' }: { title?: string }) {
  const tel = telHref();
  return (
    <div className="aside-cta">
      <p className="aside-cta__title">{title}</p>
      <p>Devis gratuit et détaillé, à Lyon et dans tout le Rhône.</p>
      <Link href="/contact/" className="btn btn--primary btn--block">
        Demander un devis
      </Link>
      {tel ? (
        <a href={tel} className="aside-cta__line">
          <Icon name="phone" size={18} /> {phoneDisplay()}
        </a>
      ) : null}
      <a href={`mailto:${site.email}`} className="aside-cta__line">
        <Icon name="mail" size={18} /> {site.email}
      </a>
    </div>
  );
}
