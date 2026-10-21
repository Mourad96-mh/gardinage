import { notFound } from 'next/navigation';
import { getArticles, getService, getServices } from '@/lib/content';
import { media } from '@/lib/media';
import { pageMeta } from '@/lib/seo';
import { breadcrumbLd, faqLd, serviceLd } from '@/lib/jsonld';
import { DocPage } from '@/components/DocPage';
import { AsideCta } from '@/components/AsideCta';
import { CtaBand, JsonLd } from '@/components/bits';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) return {};
  return pageMeta({ title: s.metaTitle, description: s.description, path: s.path });
}

const ALT: Record<string, string> = {
  'gardiennage-agent-de-securite': 'Agent de sécurité en poste dans le hall d’un immeuble',
  'agent-cynophile-maitre-chien': 'Berger allemand attentif, chien de garde',
  'securite-incendie-ssiap': 'Véhicule de pompiers stationné la nuit',
  'securite-evenementielle': 'Public d’un concert sous les projecteurs',
  'rondes-intervention-alarme': 'Ronde dans un parking souterrain',
  'agent-prevention-vol-magasin': 'Escalators d’une galerie commerciale',
  'gardiennage-chantier': 'Grues de chantier au crépuscule',
};

export default async function ServicePage({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const crumbs = [
    { name: 'Accueil', path: '/' },
    { name: 'Services', path: '/services/' },
    { name: s.short, path: s.path },
  ];
  const related = getArticles()
    .filter((a) => a.relatedService === s.slug)
    .slice(0, 3);

  return (
    <>
      <DocPage
        doc={s}
        crumbs={crumbs}
        eyebrow="Service · Lyon et partout en France"
        image={media[s.image]}
        imageAlt={ALT[s.slug] ?? s.short}
        aside={<AsideCta />}
        related={{ title: 'Nos guides sur le sujet', items: related }}
      />
      <CtaBand />
      <JsonLd data={serviceLd(s)} />
      <JsonLd data={faqLd(s.faqs)} />
      <JsonLd data={breadcrumbLd(crumbs)} />
    </>
  );
}
