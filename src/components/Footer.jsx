import React from 'react';
import { CONTACT_INFO, LOGO_MAIN, getWhatsAppUrl } from '../data/products';
import { trackConversion } from '../utils/analytics';

export function Footer({ onOpenPrivacy }) {
  const handleWhatsAppFooter = () => {
    trackConversion('whatsapp_click_footer', { label: 'Rodapé' });
  };

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
            onClick={handleWhatsAppFooter}
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

        {/* Links Institucionais e LGPD */}
        <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground/80">
          <button
            type="button"
            onClick={onOpenPrivacy}
            className="hover:text-cyan underline underline-offset-4 cursor-pointer transition-colors"
          >
            Política de Privacidade e LGPD
          </button>
          <span>·</span>
          <span>Atendimento Exclusivo para Pessoa Jurídica (CNPJ)</span>
          <span>·</span>
          <span>Recife e Região Metropolitana</span>
        </div>

        <p className="text-xs text-muted-foreground/70">
          © {new Date().getFullYear()} Nexvia – Kapazi Cooperkap. Distribuidores e representante oficial · Recife e região metropolitana.
        </p>
      </div>
    </footer>
  );
}
