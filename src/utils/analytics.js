/**
 * Módulo de Rastreamento de Conversões para Google Ads & Google Analytics
 * Suporta gtag.js e Google Tag Manager (dataLayer) de forma automática.
 */

// Se o usuário configurar no window ou nas variáveis de ambiente:
export const GOOGLE_ADS_ID =
  (typeof window !== 'undefined' && window.GOOGLE_ADS_ID) ||
  import.meta.env.VITE_GOOGLE_ADS_ID ||
  'AW-CONVERSAO-AQUI';

/**
 * Dispara evento de conversão/lead para o Google Ads e GA4
 * @param {string} action Nome da ação (ex: 'whatsapp_click', 'form_submit')
 * @param {object} params Parâmetros extras (produto, empresa, origem)
 */
export function trackConversion(action, params = {}) {
  try {
    const eventPayload = {
      event_category: 'Conversao_Nexvia',
      event_label: params.product || params.label || action,
      value: 1.0,
      currency: 'BRL',
      ...params
    };

    // 1. Envia via dataLayer (compatível com Google Tag Manager)
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'generate_lead',
        action: action,
        ...eventPayload
      });
    }

    // 2. Envia via gtag (Google Ads / Google Analytics 4 direto)
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      // Evento de Lead padrão
      window.gtag('event', 'generate_lead', eventPayload);

      // Evento customizado com o nome exato da ação
      window.gtag('event', action, eventPayload);

      // Se houver um Conversion Label específico do Google Ads configurado
      if (window.GOOGLE_ADS_CONVERSION_LABEL) {
        window.gtag('event', 'conversion', {
          send_to: `${GOOGLE_ADS_ID}/${window.GOOGLE_ADS_CONVERSION_LABEL}`,
          value: 1.0,
          currency: 'BRL'
        });
      }

      console.log(`[Google Ads Tracking] Evento registrado: ${action}`, eventPayload);
    }
  } catch (err) {
    console.warn('[Tracking Error]', err);
  }
}
