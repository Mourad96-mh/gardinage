// Généré par scripts/images.mjs — ne pas éditer à la main.
export type Photo = { src: string; width: number; height: number };

export const media = {
  "hero": {
    "src": "/media/hero.webp",
    "width": 2000,
    "height": 1333
  },
  "gardiennage": {
    "src": "/media/gardiennage.webp",
    "width": 1400,
    "height": 933
  },
  "cynophile": {
    "src": "/media/cynophile.webp",
    "width": 1400,
    "height": 933
  },
  "ssiap": {
    "src": "/media/ssiap.webp",
    "width": 1400,
    "height": 933
  },
  "evenementiel": {
    "src": "/media/evenementiel.webp",
    "width": 1400,
    "height": 933
  },
  "rondes": {
    "src": "/media/rondes.webp",
    "width": 1400,
    "height": 933
  },
  "magasin": {
    "src": "/media/magasin.webp",
    "width": 1400,
    "height": 933
  },
  "chantier": {
    "src": "/media/chantier.webp",
    "width": 1400,
    "height": 933
  },
  "zones": {
    "src": "/media/zones.webp",
    "width": 1400,
    "height": 933
  },
  "apropos": {
    "src": "/media/apropos.webp",
    "width": 1400,
    "height": 933
  },
  "recrutement": {
    "src": "/media/recrutement.webp",
    "width": 1400,
    "height": 933
  },
  "cameras": {
    "src": "/media/cameras.webp",
    "width": 1400,
    "height": 933
  },
  "nuit-route": {
    "src": "/media/nuit-route.webp",
    "width": 1400,
    "height": 933
  },
  "sortie": {
    "src": "/media/sortie.webp",
    "width": 1400,
    "height": 933
  },
  "engin": {
    "src": "/media/engin.webp",
    "width": 1400,
    "height": 933
  },
  "alarme": {
    "src": "/media/alarme.webp",
    "width": 1400,
    "height": 933
  }
} as const satisfies Record<string, Photo>;

export type MediaKey = keyof typeof media;
