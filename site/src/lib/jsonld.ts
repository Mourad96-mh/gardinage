import { site, mainCities } from './site';
import { canonical } from './seo';
import { media } from './media';
import type { Faq } from './content';

const BUSINESS_ID = `${site.baseUrl}/#entreprise`;
const WEBSITE_ID = `${site.baseUrl}/#site`;

const RHONE = {
  '@type': 'AdministrativeArea',
  name: 'Rhône',
  containedInPlace: { '@type': 'Country', name: 'France', identifier: 'FR' },
};

/** Communes desservies : chaque ville rattachée au Rhône, lui-même en France. */
function areaServed() {
  const cities = [...new Set(['Lyon', ...site.zones.metropole, ...site.zones.rhone])];
  return [
    ...cities.map((name) => ({ '@type': 'City', name, containedInPlace: RHONE })),
    { '@type': 'AdministrativeArea', name: 'Métropole de Lyon' },
    RHONE,
  ];
}

/**
 * L'entreprise. `ProfessionalService` (sous-type de LocalBusiness) seulement quand l'adresse est
 * connue : un LocalBusiness sans rue est un balisage incomplet. Sinon `Organization`.
 * Aucune note, aucun avis, aucune date de création inventés.
 */
export function businessLd() {
  const hasAddress = Boolean(site.address.street);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': hasAddress ? 'ProfessionalService' : 'Organization',
        '@id': BUSINESS_ID,
        name: site.name,
        alternateName: site.shortName,
        description:
          'Entreprise de sécurité privée à Lyon et dans le Rhône : gardiennage, agents de sécurité, maître-chien, sécurité incendie SSIAP, sécurité événementielle, rondes et intervention sur alarme, prévention des vols en magasin, gardiennage de chantier.',
        url: canonical('/'),
        logo: { '@type': 'ImageObject', url: `${site.baseUrl}/brand/logo-rsp.png` },
        image: `${site.baseUrl}${media.hero.src}`,
        email: site.email,
        ...(site.phone ? { telephone: `+${site.phone}` } : {}),
        address: {
          '@type': 'PostalAddress',
          ...(site.address.street ? { streetAddress: site.address.street } : {}),
          ...(site.address.postalCode ? { postalCode: site.address.postalCode } : {}),
          addressLocality: site.address.city,
          addressRegion: site.address.region,
          addressCountry: site.address.country,
        },
        ...(site.siren ? { identifier: { '@type': 'PropertyValue', propertyID: 'SIREN', value: site.siren } } : {}),
        areaServed: areaServed(),
        knowsAbout: [
          'Gardiennage',
          'Surveillance humaine',
          'Agent cynophile',
          'Sécurité incendie SSIAP',
          'Sécurité événementielle',
          'Intervention sur alarme',
          'Prévention des vols',
          'Gardiennage de chantier',
        ],
        knowsLanguage: 'fr',
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: canonical('/'),
        name: site.name,
        inLanguage: 'fr-FR',
        publisher: { '@id': BUSINESS_ID },
      },
    ],
  };
}

export function serviceLd(s: { h1: string; description: string; path: string; short: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.short,
    serviceType: s.short,
    description: s.description,
    url: canonical(s.path),
    provider: { '@id': BUSINESS_ID },
    areaServed: mainCities.map((name) => ({ '@type': 'City', name, containedInPlace: RHONE })),
  };
}

export function itemListLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: canonical(it.path),
    })),
  };
}

export function articleLd(a: { h1: string; description: string; path: string; image: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.h1,
    description: a.description,
    url: canonical(a.path),
    mainEntityOfPage: canonical(a.path),
    image: `${site.baseUrl}${a.image}`,
    datePublished: site.published,
    dateModified: site.published,
    inLanguage: 'fr-FR',
    author: { '@type': 'Organization', name: site.name, url: canonical('/') },
    publisher: {
      '@type': 'Organization',
      '@id': BUSINESS_ID,
      name: site.name,
      logo: { '@type': 'ImageObject', url: `${site.baseUrl}/brand/logo-rsp.png` },
    },
  };
}

export function faqLd(faqs: Faq[]) {
  if (!faqs.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: canonical(it.path),
    })),
  };
}
