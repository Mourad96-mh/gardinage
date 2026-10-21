/**
 * Coordonnées et réglages du site — la seule source à modifier quand le client fournit ses infos.
 *
 * Un champ vide masque proprement ce qui en dépend : pas de `phone` → ni WhatsApp ni lien d'appel ;
 * pas de `address.street` → l'entreprise est déclarée `Organization` (et non `ProfessionalService`)
 * dans le JSON-LD ; pas de `cnapsNumber` → la mention légale affiche « en cours de renseignement ».
 * ATTENTION : la loi impose d'afficher le n° d'autorisation CNAPS sur le site (CSI art. L612-15).
 * Ne pas mettre en ligne sans lui.
 */
export const site = {
  name: 'Rhône Sécu Protection',
  shortName: 'RSP',
  legalName: 'Rhône Sécu Protection',
  tagline: 'Société de sécurité privée à Lyon et partout en France',
  // Domaine encore à choisir avec le client : sert aux canoniques, au sitemap et au JSON-LD.
  baseUrl: 'https://www.rhone-secu-protection.fr',
  email: 'lyoncasa@hotmail.fr',
  /** Format international sans espaces ni « + ». 06 24 49 04 96 lu comme un mobile français : à confirmer. */
  phone: '33624490496' as string,
  /** Numéro WhatsApp si différent du téléphone ; vide = même numéro. */
  whatsapp: '' as string,
  address: {
    street: '' as string,
    postalCode: '' as string,
    city: 'Lyon',
    region: 'Auvergne-Rhône-Alpes',
    country: 'FR',
  },
  /** Autorisation d'exercer délivrée par le CNAPS, ex. « AUT-069-2119-02-03-2019xxxxxxx ». */
  cnapsNumber: 'AUT-0983834' as string,
  /** Identité légale (mentions légales). */
  legalForm: '' as string, // ex. SASU au capital de …
  siren: '942 646 597' as string,
  siret: '942 646 597 00016' as string,
  rcs: '' as string, // ex. RCS Lyon 000 000 000
  director: '' as string, // directeur de la publication
  host: '' as string, // hébergeur : nom, adresse, téléphone
  locale: 'fr_FR',
  /** Communes desservies (affichées en page Zones, pied de page et JSON-LD areaServed). À valider par le client. */
  zones: {
    lyon: ['Lyon 1er', 'Lyon 2e', 'Lyon 3e', 'Lyon 4e', 'Lyon 5e', 'Lyon 6e', 'Lyon 7e', 'Lyon 8e', 'Lyon 9e'],
    metropole: [
      'Villeurbanne',
      'Vénissieux',
      'Vaulx-en-Velin',
      'Bron',
      'Saint-Priest',
      'Caluire-et-Cuire',
      'Rillieux-la-Pape',
      'Décines-Charpieu',
      'Meyzieu',
      'Oullins-Pierre-Bénite',
      'Saint-Fons',
      'Écully',
      'Tassin-la-Demi-Lune',
      'Sainte-Foy-lès-Lyon',
      'Givors',
      'Corbas',
    ],
    rhone: ['Villefranche-sur-Saône', 'Tarare', 'Brignais', 'Genas', 'Mions', 'Saint-Genis-Laval', 'Chaponost', 'Neuville-sur-Saône'],
  },
  /** Date de publication des guides (contenu rédigé le 2026-10-17). */
  published: '2026-10-17',
} as const;

/** Communes principales, pour les mentions courtes (pied de page, hero). */
export const mainCities = ['Lyon', 'Villeurbanne', 'Vénissieux', 'Vaulx-en-Velin', 'Bron', 'Saint-Priest', 'Caluire-et-Cuire', 'Villefranche-sur-Saône'];

export const nav = [
  { href: '/services/', label: 'Services' },
  { href: '/zones-intervention/', label: 'Zones' },
  { href: '/a-propos/', label: 'À propos' },
  { href: '/conseils/', label: 'Conseils' },
  { href: '/recrutement/', label: 'Recrutement' },
  { href: '/contact/', label: 'Devis & contact' },
] as const;

/** Mention imposée par le CSI (art. L612-14) sur tout document d'une entreprise de sécurité privée. */
export const cnapsNotice =
  'L’autorisation d’exercice délivrée par le CNAPS ne confère aucune prérogative de puissance publique à l’entreprise ou aux personnes qui en bénéficient.';

export function phoneDisplay(): string {
  const p = site.phone;
  if (!p) return '';
  // 33624490496 -> 06 24 49 04 96 (format national français)
  if (p.startsWith('33')) return `0${p.slice(2)}`.replace(/(\d{2})(?=\d)/g, '$1 ');
  return `+${p}`;
}

export function telHref(): string {
  return site.phone ? `tel:+${site.phone}` : '';
}

export function whatsappUrl(message: string): string | null {
  const n = site.whatsapp || site.phone;
  if (!n) return null;
  // encodeURIComponent garde les retours à la ligne (%0A) — ne jamais repasser l'URL dans un échappement qui les supprime.
  return `https://wa.me/${n}?text=${encodeURIComponent(message)}`;
}

export const defaultWhatsappMessage =
  'Bonjour Rhône Sécu Protection, je souhaite un devis.\nPrestation : \nAdresse du site : \nDates et horaires : ';
