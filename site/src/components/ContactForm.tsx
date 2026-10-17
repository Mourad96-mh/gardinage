'use client';

import { useState } from 'react';
import { site, whatsappUrl } from '@/lib/site';
import { Icon } from './Icon';

const SITE_TYPES = [
  'Entreprise / bureaux',
  'Site industriel / entrepôt',
  'Commerce / magasin',
  'Chantier',
  'Événement',
  'Copropriété / bailleur',
  'ERP (hôtel, clinique, salle…)',
  'Particulier',
  'Autre',
];

/**
 * Formulaire de devis sans serveur (export statique) : il compose une demande structurée puis
 * ouvre la messagerie de l'utilisateur (mailto) ou WhatsApp.
 * À remplacer par un vrai envoi (PHP/SMTP ou API) une fois l'hébergement choisi.
 */
export function ContactForm({ services }: { services: string[] }) {
  const [sent, setSent] = useState(false);
  const hasWhatsapp = Boolean(site.whatsapp || site.phone);

  function compose(form: HTMLFormElement) {
    const d = new FormData(form);
    const v = (k: string) => String(d.get(k) || '').trim() || '—';
    return [
      'Bonjour Rhône Sécu Protection, je souhaite un devis.',
      '',
      `Nom : ${v('nom')}`,
      `Société : ${v('societe')}`,
      `Téléphone : ${v('tel')}`,
      `E-mail : ${v('email')}`,
      '',
      `Prestation : ${v('service')}`,
      `Type de site : ${v('type')}`,
      `Adresse / commune du site : ${v('lieu')}`,
      `Dates : ${v('dates')}`,
      `Horaires : ${v('horaires')}`,
      `Nombre d’agents estimé : ${v('agents')}`,
      '',
      String(d.get('message') || ''),
    ].join('\n');
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const text = compose(form);
    const channel = (e.nativeEvent as SubmitEvent).submitter?.getAttribute('value');
    const wa = whatsappUrl(text);
    if (channel === 'whatsapp' && wa) {
      window.open(wa, '_blank', 'noopener');
    } else {
      const subject = encodeURIComponent('Demande de devis sécurité — site web');
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${encodeURIComponent(text)}`;
    }
    setSent(true);
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <p className="form__legend">Vos coordonnées</p>
      <div className="form__row">
        <label className="field">
          <span>Nom et prénom *</span>
          <input name="nom" required autoComplete="name" />
        </label>
        <label className="field">
          <span>Société / organisme</span>
          <input name="societe" autoComplete="organization" />
        </label>
      </div>
      <div className="form__row">
        <label className="field">
          <span>Téléphone *</span>
          <input name="tel" type="tel" required autoComplete="tel" inputMode="tel" />
        </label>
        <label className="field">
          <span>E-mail</span>
          <input name="email" type="email" autoComplete="email" />
        </label>
      </div>

      <p className="form__legend">Votre besoin</p>
      <div className="form__row">
        <label className="field">
          <span>Prestation *</span>
          <select name="service" required defaultValue="">
            <option value="" disabled>
              Choisir…
            </option>
            {services.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Type de site</span>
          <select name="type" defaultValue="">
            <option value="">Choisir…</option>
            {SITE_TYPES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="field">
        <span>Adresse ou commune du site *</span>
        <input name="lieu" required placeholder="Ex. Lyon 7e, Vénissieux, zone industrielle de Corbas…" />
      </label>
      <div className="form__row">
        <label className="field">
          <span>Dates</span>
          <input name="dates" placeholder="Ex. à partir du 3 novembre, le 12 décembre…" />
        </label>
        <label className="field">
          <span>Horaires</span>
          <input name="horaires" placeholder="Ex. nuits 19 h – 7 h, week-ends…" />
        </label>
      </div>
      <label className="field">
        <span>Nombre d’agents estimé</span>
        <input name="agents" inputMode="numeric" placeholder="Si vous le savez — sinon nous vous conseillons" />
      </label>
      <label className="field">
        <span>Précisions</span>
        <textarea name="message" rows={5} placeholder="Contexte, incidents récents, contraintes du site, public attendu…" />
      </label>
      <div className="form__actions">
        <button type="submit" value="email" className="btn btn--navy">
          <Icon name="mail" size={18} /> Envoyer par e-mail
        </button>
        {hasWhatsapp ? (
          <button type="submit" value="whatsapp" className="btn btn--outline">
            <Icon name="whatsapp" size={18} /> Envoyer sur WhatsApp
          </button>
        ) : null}
      </div>
      <p className="form__note" role="status">
        {sent
          ? 'Votre messagerie s’est ouverte avec votre demande pré-remplie : il ne reste qu’à l’envoyer.'
          : 'Le bouton ouvre votre messagerie (ou WhatsApp) avec votre demande pré-remplie. Vos données servent uniquement à vous répondre.'}
      </p>
    </form>
  );
}
