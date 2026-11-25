import React from 'react';
import { CONTACT_INFO, LOGO_MAIN, getWhatsAppUrl } from '../data/products';

export function Footer() {
  return (
    <footer className="border-t border-border pb-28 pt-12 sm:pb-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center sm:px-6">
        <img
          src={LOGO_MAIN}
          alt="Logo Nexvia Kapazi Cooperkap"
          loading="lazy"
          width={1600}
          height={800}
          className="logo-fade w-56 sm:w-64"
        />

        <p className="font-brand text-gradient-brand text-2xl">A Escolha que fica!</p>

        <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:gap-6">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan transition-colors"
          >
            WhatsApp {CONTACT_INFO.phoneFormatted}
          </a>
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="hover:text-cyan transition-colors"
          >
            {CONTACT_INFO.email}
          </a>
        </div>

        <p className="text-xs text-muted-foreground/70">
          © {new Date().getFullYear()} Nexvia – Kapazi Cooperkap. Distribuidores e representante oficial · Recife e região metropolitana.
        </p>
      </div>
    </footer>
  );
}

