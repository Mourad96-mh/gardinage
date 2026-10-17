import { pageMeta } from '@/lib/seo';
import { site, phoneDisplay } from '@/lib/site';
import { breadcrumbLd } from '@/lib/jsonld';
import { Breadcrumbs, CnapsBox, JsonLd } from '@/components/bits';

export const metadata = pageMeta({
  title: 'Mentions légales et confidentialité | Rhône Sécu Protection',
  description: 'Mentions légales, autorisation CNAPS et politique de confidentialité du site de Rhône Sécu Protection.',
  path: '/mentions-legales/',
  noindex: true,
});

const crumbs = [
  { name: 'Accueil', path: '/' },
  { name: 'Mentions légales', path: '/mentions-legales/' },
];

/** Valeur ou marqueur visible « à compléter » : ces champs sont obligatoires avant la mise en ligne. */
function Val({ v }: { v: string }) {
  return v ? <>{v}</> : <span className="todo">à compléter</span>;
}

export default function LegalPage() {
  const address = [site.address.street, site.address.postalCode, site.address.city].filter(Boolean).join(', ');
  return (
    <>
      <header className="page-head">
        <div className="container">
          <Breadcrumbs items={crumbs} />
          <h1 className="page-head__title">Mentions légales et confidentialité</h1>
        </div>
      </header>

      <div className="container legal-page">
        <div className="prose">
          <h2>Éditeur du site</h2>
          <p>
            <strong>{site.legalName}</strong>
            <br />
            Forme juridique et capital : <Val v={site.legalForm} />
            <br />
            Siège social : <Val v={site.address.street ? address : ''} />
            <br />
            SIREN : <Val v={site.siren} /> — <Val v={site.rcs} />
            <br />
            Téléphone : {phoneDisplay() || <Val v="" />} — E-mail : {site.email}
            <br />
            Directeur de la publication : <Val v={site.director} />
          </p>

          <h2>Autorisation d’exercer</h2>
          <CnapsBox />
          <p style={{ marginTop: '1rem' }}>
            Activité soumise au livre VI du Code de la sécurité intérieure. Conseil national des activités privées de
            sécurité (CNAPS), ministère de l’Intérieur.
          </p>

          <h2>Hébergement</h2>
          <p>
            <Val v={site.host} />
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            Les textes, le logo et la charte graphique de ce site sont la propriété de {site.legalName}. Toute
            reproduction sans autorisation est interdite. Les photographies d’illustration proviennent de banques
            d’images libres de droits (licence CC0).
          </p>

          <h2>Données personnelles</h2>
          <p>
            Le formulaire de devis ne transmet aucune donnée à un serveur : il ouvre votre messagerie ou WhatsApp avec
            votre demande pré-remplie, que vous choisissez d’envoyer. Les informations que vous nous adressez (nom,
            coordonnées, description du besoin) servent uniquement à répondre à votre demande et à établir un devis.
            Elles ne sont ni vendues ni cédées.
          </p>
          <p>
            Elles sont conservées le temps nécessaire au traitement de la demande et, en l’absence de suite, au plus
            trois ans après le dernier contact. Les candidatures sont conservées au plus deux ans.
          </p>
          <p>
            Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d’un droit d’accès, de
            rectification, d’effacement, d’opposition et de limitation, en écrivant à {site.email}. Vous pouvez
            également saisir la CNIL (cnil.fr).
          </p>

          <h2>Cookies</h2>
          <p>
            Ce site ne dépose aucun cookie de mesure d’audience ni de publicité. Si un outil de mesure est ajouté, il
            sera mentionné ici et soumis à votre consentement lorsque la loi l’exige.
          </p>
        </div>
      </div>
      <JsonLd data={breadcrumbLd(crumbs)} />
    </>
  );
}
