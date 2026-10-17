/**
 * Chargement des pages de contenu rédigées en Markdown (src/content/services, src/content/conseils).
 *
 * Lu au build uniquement (export statique). Chaque fichier a un en-tête `clé: valeur` entre `---`,
 * puis un corps Markdown dont le premier `# Titre` devient le H1 de la page. On en extrait aussi
 * la FAQ (pour le JSON-LD FAQPage) et les intertitres (pour le sommaire des articles).
 */
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { Marked, Renderer } from 'marked';
import type { MediaKey } from './media';

export type Faq = { q: string; a: string };
export type Heading = { id: string; text: string };

export type Doc = {
  slug: string;
  path: string;
  title: string;
  metaTitle: string;
  description: string;
  keyword: string;
  h1: string;
  lead: string;
  html: string;
  faqs: Faq[];
  headings: Heading[];
  readingMinutes: number;
  relatedService?: string;
};

export type Service = Doc & { short: string; excerpt: string; image: MediaKey; icon: IconName };
export type Article = Doc & { image: MediaKey; category: string; excerpt: string };

export type IconName = 'shield' | 'dog' | 'flame' | 'users' | 'flashlight' | 'cart' | 'crane';

/** Ce que le Markdown ne dit pas : libellé court, accroche de carte, photo, pictogramme. Ordre = ordre d'affichage. */
const SERVICE_META: Record<string, { short: string; excerpt: string; image: MediaKey; icon: IconName }> = {
  'gardiennage-agent-de-securite': {
    short: 'Gardiennage et agent de sécurité',
    excerpt: 'Surveillance de site, contrôle d’accès, accueil et rondes intérieures, en poste fixe ou en renfort.',
    image: 'gardiennage',
    icon: 'shield',
  },
  'agent-cynophile-maitre-chien': {
    short: 'Agent cynophile (maître-chien)',
    excerpt: 'Un duo homme-chien pour les sites étendus et isolés : détection précoce et forte dissuasion, surtout la nuit.',
    image: 'cynophile',
    icon: 'dog',
  },
  'securite-incendie-ssiap': {
    short: 'Sécurité incendie SSIAP',
    excerpt: 'Agents SSIAP 1 et chefs d’équipe SSIAP 2 pour vos ERP et IGH : prévention, PC sécurité, évacuation.',
    image: 'ssiap',
    icon: 'flame',
  },
  'securite-evenementielle': {
    short: 'Sécurité événementielle',
    excerpt: 'Contrôle des entrées, gestion de foule et filtrage pour vos concerts, salons, soirées et réceptions.',
    image: 'evenementiel',
    icon: 'users',
  },
  'rondes-intervention-alarme': {
    short: 'Rondes et intervention sur alarme',
    excerpt: 'Passages à heures variables et levée de doute sur déclenchement d’alarme : la sécurité sans poste permanent.',
    image: 'rondes',
    icon: 'flashlight',
  },
  'agent-prevention-vol-magasin': {
    short: 'Agent de sécurité magasin',
    excerpt: 'Agent en entrée, prévention des vols et arrière-caisse pour réduire la démarque de votre commerce.',
    image: 'magasin',
    icon: 'cart',
  },
  'gardiennage-chantier': {
    short: 'Gardiennage de chantier',
    excerpt: 'Agents de nuit, maître-chien et rondes pour protéger engins, matériaux et cuivre de vos chantiers.',
    image: 'chantier',
    icon: 'crane',
  },
};

const ARTICLE_META: Record<string, { image: MediaKey; category: string }> = {
  'choisir-societe-securite-privee': { image: 'cameras', category: 'Bien choisir' },
  'prix-agent-de-securite': { image: 'nuit-route', category: 'Budget' },
  'ssiap-1-2-3-differences': { image: 'sortie', category: 'Sécurité incendie' },
  'prevenir-vols-chantier': { image: 'engin', category: 'Chantier' },
  'intervention-alarme-levee-de-doute': { image: 'alarme', category: 'Alarme' },
};

const CONTENT = path.join(process.cwd(), 'src', 'content');

function slugify(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function stripInline(md: string): string {
  return md
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`]/g, '')
    .trim();
}

function parse(file: string): Doc {
  const raw = readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) throw new Error(`En-tête manquant : ${file}`);
  const front: Record<string, string> = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) front[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }

  let body = raw.slice(m[0].length).replace(/<!--[\s\S]*?-->/g, '').trim();

  const h1Match = body.match(/^# (.+)$/m);
  const h1 = h1Match ? stripInline(h1Match[1]) : front.title;
  if (h1Match) body = body.replace(h1Match[0], '').trim();

  // Le premier paragraphe devient le chapeau, affiché dans l'en-tête de page.
  const leadMatch = body.match(/^([^\n#>|-][^\n]*(?:\n[^\n#>|-][^\n]*)*)/);
  const leadMd = leadMatch ? leadMatch[1] : '';
  if (leadMatch) body = body.slice(leadMatch[0].length).trim();

  // FAQ : section « Questions fréquentes », paires **question** / réponse.
  const faqs: Faq[] = [];
  const faqSection = body.match(/## Questions fréquentes\n([\s\S]*?)(?=\n## |\n---|\n> |$)/);
  if (faqSection) {
    const re = /\*\*(.+?)\*\*\n([^\n]+(?:\n(?!\*\*)[^\n]+)*)/g;
    let f: RegExpExecArray | null;
    while ((f = re.exec(faqSection[1]))) faqs.push({ q: stripInline(f[1]), a: stripInline(f[2]) });
  }

  const headings: Heading[] = [];
  const used = new Set<string>();
  const marked = new Marked({ gfm: true });
  marked.use({
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        const plain = text.replace(/<[^>]+>/g, '');
        let id = slugify(plain);
        while (used.has(id)) id += '-2';
        used.add(id);
        if (depth === 2) headings.push({ id, text: plain });
        return `<h${depth} id="${id}">${text}</h${depth}>\n`;
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const external = /^https?:\/\//.test(href);
        // Export statique en trailingSlash : on ajoute la barre finale aux liens internes.
        const url = !external && href.startsWith('/') && !href.endsWith('/') && !href.includes('#') ? `${href}/` : href;
        const t = title ? ` title="${title}"` : '';
        return external
          ? `<a href="${url}"${t} target="_blank" rel="noopener">${text}</a>`
          : `<a href="${url}"${t}>${text}</a>`;
      },
      table(token) {
        const html = Renderer.prototype.table.call(this, token);
        return `<div class="table-wrap">${html}</div>`;
      },
    },
  });

  const html = marked.parse(body, { async: false }) as string;
  const lead = marked.parseInline(leadMd, { async: false }) as string;
  const words = raw.split(/\s+/).length;
  const urlPath = front.slug.endsWith('/') ? front.slug : `${front.slug}/`;

  return {
    slug: urlPath.split('/').filter(Boolean).pop()!,
    path: urlPath,
    title: front.title,
    metaTitle: front.title,
    description: front.meta_description,
    keyword: front.mot_cle,
    h1,
    lead,
    html,
    faqs,
    headings,
    readingMinutes: Math.max(2, Math.round(words / 200)),
    relatedService: front.service_lie?.split('/').filter(Boolean).pop(),
  };
}

function load(dir: string): Doc[] {
  const full = path.join(CONTENT, dir);
  return readdirSync(full)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => parse(path.join(full, f)));
}

let servicesCache: Service[] | null = null;
let articlesCache: Article[] | null = null;

export function getServices(): Service[] {
  if (servicesCache) return servicesCache;
  servicesCache = load('services').map((d) => {
    const meta = SERVICE_META[d.slug];
    if (!meta) throw new Error(`Service sans métadonnées : ${d.slug}`);
    return { ...d, ...meta };
  });
  return servicesCache;
}

export function getArticles(): Article[] {
  if (articlesCache) return articlesCache;
  articlesCache = load('conseils').map((d) => {
    const meta = ARTICLE_META[d.slug];
    if (!meta) throw new Error(`Article sans métadonnées : ${d.slug}`);
    const plainLead = d.lead
      .replace(/<[^>]+>/g, '')
      .replace(/&#39;/g, '’')
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&');
    const excerpt = plainLead.length > 170 ? `${plainLead.slice(0, 167).replace(/\s+\S*$/, '')}…` : plainLead;
    return { ...d, ...meta, excerpt };
  });
  return articlesCache;
}

export const getService = (slug: string) => getServices().find((s) => s.slug === slug);
export const getArticle = (slug: string) => getArticles().find((a) => a.slug === slug);
