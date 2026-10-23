# Rhône Sécu Protection (RSP) — avancement

Site vitrine d'une entreprise de sécurité privée (gardiennage) à Lyon / Rhône. Brief : `file.txt` + logo + plaquette du concurrent CABSEC (images WhatsApp).

## Contenu du dossier

| Dossier | Rôle |
|---|---|
| `research/01-brief-architecture-seo.md` | Lecture du brief, audit SEO de départ, concurrents, obligation légale CNAPS, carte mots-clés → pages, arborescence, choix techniques |
| `site/` | Site Next.js 15 en export statique (TypeScript, CSS pur) |
| `site/assets-src/` | Logo et plaquette d'origine du client (non publiés) |

## Le site (`site/`)

- `npm run build` : build isolé dans `%TEMP%` (OneDrive corrompt `.next`), sortie dans `site/out/` (22 fichiers HTML, 21 pages indexables).
- `node scripts/seo-check.mjs` : title/description/h1/canonique/og/JSON-LD/liens cassés sur le HTML construit.
- `npm run qa` : contrôle responsive CDP (390/768/1280 px), menu mobile, console ; captures dans `%TEMP%/rsp-qa`.
- `npm run logo` : détoure le logo client → `public/brand/logo-rsp.png`, favicon, apple-icon, image de partage `og-default.jpg`.
- `npm run images` : photos CC0 (archive Unsplash de Wikimedia Commons, `scripts/photos.json`) → `public/media/*.webp`.
- Fiches service (7) et guides (5) : Markdown dans `site/src/content/`. Modifier le `.md` puis rebuild.
- **Toutes les coordonnées et données légales : `site/src/lib/site.ts`.** Un champ vide masque ce qui en dépend.

## État au 2026-10-17

Construit et vérifié : 21 pages indexables, 0 défaut SEO (titres ≤ 60, descriptions 110-160, 1 h1, canoniques, JSON-LD valide : Organization, WebSite, Service ×7, Article ×5, FAQPage ×13, BreadcrumbList, ItemList), 0 lien interne cassé, aucun débordement à 390/768/1280 px, aucune erreur console. `sitemap.xml`, `robots.txt` (robots IA autorisés), `llms.txt`.

## BLOQUANT avant mise en ligne

- [ ] **Numéro d'autorisation CNAPS** (AUT-069-…) → `site.cnapsNumber`. Obligatoire sur le site (CSI L612-15). Le pied de page affiche « en cours de renseignement » tant qu'il manque.
- [ ] **Mentions légales** : forme juridique + capital, SIREN/RCS, adresse du siège, directeur de publication, hébergeur → `site.ts` (les champs manquants s'affichent « à compléter » en jaune).

## À obtenir du client

- [ ] Confirmer le téléphone `06 24 49 04 96` (mobile français ? WhatsApp sur ce numéro ?)
- [x] Nom de domaine : **rhone-secu.fr** (OVH, 2026-10-22) → `site.baseUrl` = https://www.rhone-secu.fr
- [ ] E-mail pro (contact@rhone-secu.fr, MX Plan OVH à activer) à la place de l'hotmail
- [ ] Adresse : si elle est publique, le JSON-LD passe en `ProfessionalService` (meilleur pour le SEO local) et on crée la fiche Google Business Profile
- [ ] Services réellement assurés (cynophile ? SSIAP ? chantier ?) : retirer un `.md` + son entrée `SERVICE_META` si non
- [ ] Disponibilités réelles : le site dit « jour, nuit, week-ends et jours fériés » ; ajouter « 24 h/24 » et un délai d'intervention seulement si c'est vrai
- [x] Zones : « Lyon et partout en France » (choix du client le 2026-10-22, listes de communes retirées)
- [ ] Photos réelles (agents en tenue RSP, véhicules) pour remplacer les illustrations CC0
- [ ] Hébergement : le formulaire ouvre la messagerie/WhatsApp (pas de serveur) ; à remplacer par un vrai envoi si l'hébergeur le permet

## Après la mise en ligne

Search Console + envoi du sitemap, fiche Google Business Profile (catégorie « Service de sécurité », zone desservie), inscriptions annuaires (PagesJaunes, 118712) avec le même NAP, demande d'avis clients.

## Dépôt et déploiement

- Dépôt propre à ce dossier (imbriqué dans le dépôt Bureau) : **github.com/Mourad96-mh/gardinage** (public, branche `main`). Le credential helper gh est posé en local : faire `gh auth switch -u Mourad96-mh` avant de pousser.
- Exclus du dépôt public : `file.txt`, les images WhatsApp d'origine et la plaquette CABSEC (document d'un concurrent).
- Vercel, équipe `mourad2`, projet `gardinage`, **connecté au dépôt** avec Root Directory = `site` : chaque push sur `main` redéploie.
- En ligne : **https://gardinage.vercel.app** (provisoire, sans le n° CNAPS : à ne pas communiquer publiquement avant de l'avoir renseigné).

## Pas encore fait

Pas de page Réalisations/Avis tant qu'il n'y a ni références ni avis réels. Domaine rhone-secu.fr à brancher dans Vercel (projet `gardinage`) + DNS OVH : A `@` → 76.76.21.21, CNAME `www` → cname.vercel-dns.com.
