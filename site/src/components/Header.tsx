'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nav, phoneDisplay, telHref } from '@/lib/site';
import { Logo } from './Logo';
import { Icon } from './Icon';

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const tel = telHref();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const current = (href: string) => (pathname.startsWith(href) ? 'page' : undefined);

  return (
    <header className="header">
      <div className="container header__bar">
        <Link href="/" className="header__brand" aria-label="Rhône Sécu Protection — accueil">
          <Logo />
        </Link>

        <nav className="header__nav" aria-label="Navigation principale">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="header__link" aria-current={current(item.href)}>
              {item.label}
            </Link>
          ))}
          {tel ? (
            <a href={tel} className="header__phone">
              <Icon name="phone" size={18} /> {phoneDisplay()}
            </a>
          ) : null}
        </nav>

        <button
          type="button"
          className="header__burger"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div id="menu-mobile" className="mobile-menu" data-open={open} hidden={!open}>
        <nav aria-label="Navigation mobile">
          <Link href="/" className="mobile-menu__link" aria-current={pathname === '/' ? 'page' : undefined}>
            Accueil
          </Link>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="mobile-menu__link" aria-current={current(item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mobile-menu__cta">
          <Link href="/contact/" className="btn btn--primary btn--block">
            Demander un devis gratuit
          </Link>
          {tel ? (
            <a href={tel} className="btn btn--ghost-light btn--block">
              <Icon name="phone" size={18} /> {phoneDisplay()}
            </a>
          ) : null}
        </div>
      </div>
    </header>
  );
}
