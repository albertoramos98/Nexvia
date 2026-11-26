import React from 'react';
import { getWhatsAppUrl } from '../data/products';
import { WhatsAppIcon } from './Icons';
import { trackConversion } from '../utils/analytics';

export function WhatsAppFloat() {
  const handleClick = () => {
    trackConversion('whatsapp_click_floating', { label: 'Botão Flutuante' });
  };

  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label="Falar no WhatsApp"
      className="pulse-ring fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lg transition-transform hover:scale-110 sm:size-16 cursor-pointer"
    >
      <WhatsAppIcon className="size-7 sm:size-8" />
    </a>
  );
}
