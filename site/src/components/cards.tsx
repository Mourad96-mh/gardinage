import Image from 'next/image';
import Link from 'next/link';
import type { Article, Service } from '@/lib/content';
import { media } from '@/lib/media';
import { Icon } from './Icon';

export function ServiceCard({ service: s }: { service: Service }) {
  const img = media[s.image];
  return (
    <Link href={s.path} className="card">
      <div className="card__media">
        <Image src={img.src} width={img.width} height={img.height} alt="" sizes="(min-width: 960px) 33vw, (min-width: 640px) 50vw, 100vw" />
        <span className="card__badge">
          <Icon name={s.icon} size={22} />
        </span>
      </div>
      <div className="card__body">
        <h3 className="card__title">{s.short}</h3>
        <p>{s.excerpt}</p>
        <span className="card__more">
          Découvrir <Icon name="arrow" size={16} />
        </span>
      </div>
    </Link>
  );
}

export function ArticleCard({ article: a }: { article: Article }) {
  const img = media[a.image];
  return (
    <Link href={a.path} className="card">
      <div className="card__media">
        <Image src={img.src} width={img.width} height={img.height} alt="" sizes="(min-width: 960px) 33vw, (min-width: 640px) 50vw, 100vw" />
      </div>
      <div className="card__body">
        <p className="card__meta">
          {a.category} · {a.readingMinutes} min
        </p>
        <h3 className="card__title">{a.h1}</h3>
        <p>{a.excerpt}</p>
      </div>
    </Link>
  );
}

/** 8e case de la grille des services : complète 7 services en 2 rangées de 4 et ouvre sur le devis. */
export function ServiceCtaCard() {
  return (
    <Link href="/contact/" className="card card--cta">
      <div className="card__body">
        <span className="reason__icon">
          <Icon name="handshake" size={26} />
        </span>
        <h3 className="card__title">Un besoin sur mesure ?</h3>
        <p>Plusieurs prestations, un site particulier, une urgence : décrivez-nous votre situation, nous composons le dispositif adapté.</p>
        <span className="card__more">
          Demander un devis gratuit <Icon name="arrow" size={16} />
        </span>
      </div>
    </Link>
  );
}
