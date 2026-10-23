import type { Metadata, Viewport } from 'next';
import { Barlow_Condensed, Inter } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { JsonLd, WhatsAppFloat } from '@/components/bits';
import { businessLd } from '@/lib/jsonld';
import { site } from '@/lib/site';
import '@/styles/global.css';

const display = Barlow_Condensed({
  subsets: ['latin', 'latin-ext'],
  weight: ['600', '700'],
  variable: '--font-barlow',
  display: 'swap',
});
const body = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.baseUrl),
  title: { default: `${site.name} — sécurité privée à Lyon`, template: '%s' },
  description: site.tagline,
  formatDetection: { telephone: false },
  // Search Console (propriété https://www.rhone-secu.fr)
  verification: { google: '1tL7tL5Rubes52uTgl6NrZi_pQ7_ZeUwQmpZ35lkBuY' },
};

export const viewport: Viewport = {
  themeColor: '#060f22',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Les variables de police vont sur <html> : les jetons --font-* sont déclarés sur :root.
    <html lang="fr-FR" className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <JsonLd data={businessLd()} />
      </body>
    </html>
  );
}
