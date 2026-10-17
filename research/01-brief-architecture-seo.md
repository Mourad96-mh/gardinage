# Rhône Sécu Protection (RSP) : brief, audit SEO de départ et architecture

Rédigé le 2026-10-17 à partir de ce que le client a envoyé (`file.txt` + 2 images WhatsApp).

## 1. Ce que le client a fourni

| Élément | Contenu | Lecture |
|---|---|---|
| Logo | Écusson marine + or, laurier, étoile, « RSP · RHÔNE SÉCU PROTECTION » | Identité premium et institutionnelle. Palette : marine `#0b1a33`, or `#d4a62a` |
| Image de référence | Plaquette de **CABSEC Sécurité Privée** (Vaulx-en-Velin, 69) trouvée sur Google | C'est un **concurrent direct à 10 km**. Le client veut le même périmètre de services, en mieux |
| `file.txt` | Lien de recherche Google « cabsec security », e-mail `lyoncasa@hotmail.fr`, tél. `06 24 49 04 96` | Coordonnées du client. Le 06 est lu comme un mobile français (+33) : **à confirmer** |

Le dossier s'appelle « gardinage » = **gardiennage**. Activité : entreprise de sécurité privée, marché France, **Lyon et le Rhône (69)**.

## 2. Audit SEO de départ

- **Présence en ligne : nulle.** Une recherche « Rhône Sécu Protection » ne renvoie ni site, ni fiche Google, ni annuaire. On part de zéro : pas de dette (redirections, pénalités), mais pas d'autorité non plus.
- **Le nom de marque n'est pas recherché** : tout le trafic viendra des requêtes métier + ville (« société de gardiennage Lyon », « maître-chien Lyon », « agent SSIAP Lyon »…). L'architecture est donc construite **page = intention de recherche**.
- **Concurrence locale** (recherche du 2026-10-17) : Alliance Rhône-Alpes Sécurité Privée (Lyon 2e, depuis 2010, interventions en deux-roues), Opadjelé Sécurité Privée (métropole), Triomphe Sécurité (Lyon 2e), Cats Eyes Sécurité (Irigny, événementiel), Gardis (Lyon 3e), CABSEC (Vaulx-en-Velin), plus les nationaux (Securitas, Onet, Fiducial). Les acteurs locaux visibles vivent surtout d'annuaires (PagesJaunes, 118712) et ont des sites minces. **Un site rapide, une page par service, des guides utiles et une fiche Google Business Profile suffisent à se placer.**
- **Ce que CABSEC fait et que RSP doit égaler** : 6 domaines (agent de sécurité, magasin/prévention vol, événementiel, cynophile, incendie SSIAP, rondier), « intervention 24h/24 7j/7 », devis gratuit, numéro d'autorisation CNAPS affiché.
- **Ce que personne ne fait bien localement (nos angles)** :
  1. une page dédiée au **gardiennage de chantier** (très recherché dans une métropole en travaux permanents, absent chez CABSEC) ;
  2. des **guides** qui répondent aux questions des acheteurs (comment choisir une société, ce qui fait le prix, SSIAP 1/2/3, levée de doute) : c'est ce que Google et les assistants IA citent ;
  3. une **page Zones** qui nomme les communes de la Métropole et du Rhône ;
  4. un **formulaire de devis qualifié** (type de site, dates, horaires, nombre d'agents) au lieu d'un simple « contactez-nous ».

## 3. Obligation légale propre au secteur (bloquant avant mise en ligne)

Code de la sécurité intérieure, art. L612-15 : tout document informatif, contractuel ou publicitaire d'une entreprise de sécurité privée (le site en est un) doit reproduire **le numéro de l'autorisation d'exercer délivrée par le CNAPS** et la mention de l'art. L612-14 : *« L'autorisation d'exercice délivrée par le CNAPS ne confère aucune prérogative de puissance publique à l'entreprise ou aux personnes qui en bénéficient. »*
→ Le site affiche ces deux éléments dans le pied de page de **chaque page** et dans les mentions légales, alimentés par `site.ts` (`cnapsNumber`). **Tant que le client n'a pas fourni son numéro AUT-069-…, le site ne doit pas être mis en ligne.** (Formulation à faire valider par le client, qui la connaît : elle figure sur son autorisation.)

Autres règles reprises dans les contenus (vérifiées, prudentes) : carte professionnelle CNAPS obligatoire pour chaque agent ; agents limités aux lieux dont ils ont la garde (pas de surveillance sur la voie publique sans autorisation préfectorale) ; inspection visuelle des sacs, fouille et palpation uniquement avec le consentement de la personne ; convention collective IDCC 1351.

## 4. Mots-clés → pages (une intention = une page, pas de cannibalisation)

| Page | Requête principale | Requêtes secondaires |
|---|---|---|
| `/` | société de sécurité privée Lyon | entreprise de gardiennage Lyon, société de sécurité Rhône, agent de sécurité Lyon |
| `/services/` | prestations de sécurité privée Lyon | services de gardiennage |
| `/services/gardiennage-agent-de-securite/` | gardiennage Lyon | agent de sécurité Lyon, surveillance de site, contrôle d'accès, agent d'accueil sécurité |
| `/services/agent-cynophile-maitre-chien/` | maître-chien Lyon | agent cynophile Lyon, gardiennage avec chien |
| `/services/securite-incendie-ssiap/` | agent SSIAP Lyon | agent de sécurité incendie, SSIAP 1, SSIAP 2, ERP |
| `/services/securite-evenementielle/` | sécurité événementielle Lyon | agent de sécurité soirée, concert, salon, contrôle des entrées |
| `/services/rondes-intervention-alarme/` | rondes de surveillance Lyon | intervention sur alarme, levée de doute, rondier |
| `/services/agent-prevention-vol-magasin/` | agent de sécurité magasin Lyon | agent prévention vol, sécurité commerce, arrière-caisse |
| `/services/gardiennage-chantier/` | gardiennage de chantier Lyon | surveillance chantier, vol sur chantier BTP |
| `/zones-intervention/` | sécurité privée Villeurbanne / Vénissieux / Vaulx-en-Velin… | communes de la Métropole et du Rhône |
| `/a-propos/` | (marque) Rhône Sécu Protection | engagements, conformité CNAPS |
| `/recrutement/` | recrutement agent de sécurité Lyon | emploi agent de sécurité, candidature APS/SSIAP |
| `/conseils/…` (5 guides) | comment choisir une société de sécurité ; prix d'un agent de sécurité ; SSIAP 1 2 3 différence ; vol sur chantier ; levée de doute alarme | longue traîne informationnelle, citée par les IA |
| `/contact/` | devis sécurité privée Lyon | |

## 5. Arborescence et maillage

```
Accueil
├── Services (hub) ──► 7 fiches service ──► guides liés + devis
├── Zones d'intervention
├── Conseils (hub) ──► 5 guides ──► fiche service liée + devis
├── À propos
├── Recrutement
├── Contact / devis
└── Mentions légales (+ confidentialité)
```

- Toutes les pages argent (fiches service, contact) sont à **1 clic** de l'accueil (menu + pied de page).
- Chaque guide renvoie vers sa fiche service (`service_lie`) ; chaque fiche affiche ses guides.
- Pied de page : 7 services, communes desservies, coordonnées, **n° CNAPS + mention L612-14** sur 100 % des pages.

## 6. Choix techniques

- **Next.js 15, export statique** (`output: 'export'`), TypeScript, CSS pur avec jetons de design. HTML complet pour Google et les IA, hébergeable partout (Vercel, Hostinger, o2switch…).
- Fiches service et guides rédigés en **Markdown** (`site/src/content/`), le client ou nous les modifions sans toucher au code.
- **Une seule source de vérité** pour les coordonnées : `site/src/lib/site.ts`. Un champ vide (téléphone, CNAPS, SIREN, adresse) masque proprement l'élément correspondant.
- **SEO technique** : titres et descriptions uniques, canonique par page, Open Graph + image de partage, `sitemap.xml`, `robots.txt` (robots IA explicitement autorisés), `llms.txt`.
- **Données structurées** : schema.org n'a pas de type « société de sécurité » ; on utilise **`ProfessionalService`** (sous-type de LocalBusiness) si l'adresse est connue, sinon `Organization`, + `Service` par fiche, `Article` par guide, `FAQPage`, `BreadcrumbList`, `areaServed` = communes (`City` ⊂ Rhône ⊂ France).
- **Conversion** : formulaire de devis qualifié (ouvre l'e-mail ou WhatsApp pré-rempli, sans serveur), bouton WhatsApp flottant, lien d'appel.
- **Build isolé hors OneDrive** (`npm run build`) et contrôle responsive automatique (`npm run qa`).

## 7. À obtenir du client (voir PROGRESS.md)

Numéro d'autorisation CNAPS · SIREN/RCS, forme juridique, siège · adresse (ou zone d'intervention seule) · confirmation du téléphone (+33 ?) et d'un WhatsApp · nom de domaine · disponibilité réelle (24/7 ? intervention sur alarme ?) · services réellement assurés (cynophile, SSIAP, chantier) · communes desservies · photos réelles des agents/véhicules · e-mail professionnel (une adresse hotmail « lyoncasa » nuit à la confiance B2B : prévoir contact@domaine).
