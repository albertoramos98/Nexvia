import React from 'react';
import { X } from './Icons';
import { CONTACT_INFO } from '../data/products';

export function PrivacyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
    >
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-card-gradient border border-border rounded-3xl p-6 sm:p-8 shadow-2xl text-foreground">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <h2 id="privacy-modal-title" className="font-brand text-2xl text-gradient-brand">
            Política de Privacidade e Proteção de Dados
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-muted-foreground hover:text-cyan hover:bg-foreground/5 transition-colors cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="size-6" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            A <strong>Nexvia – Kapazi Cooperkap</strong>, representante e distribuidora oficial em Recife e região metropolitana, preza pela transparência, segurança e privacidade dos dados de seus clientes corporativos e visitantes, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) e diretrizes de publicidade do Google Ads.
          </p>

          <h3 className="font-brand text-base text-foreground mt-4">1. Coleta e Uso de Informações</h3>
          <p>
            Coletamos dados fornecidos voluntariamente por você ao solicitar um orçamento comercial:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Nome</strong>: para identificação do solicitante e atendimento personalizado.</li>
            <li><strong>Empresa</strong>: para verificação de elegibilidade ao faturamento corporativo (atendimento exclusivo para CNPJ).</li>
            <li><strong>Produto de interesse e mensagem</strong>: para elaboração da proposta técnica e comercial adequada.</li>
          </ul>

          <h3 className="font-brand text-base text-foreground mt-4">2. Cookies e Rastreamento de Conversões (Google Ads)</h3>
          <p>
            Este site utiliza cookies de análise e tags de conversão do <strong>Google Ads</strong> e <strong>Google Analytics</strong>. Essas ferramentas registram interações anônimas (como cliques no botão do WhatsApp e envio de formulário) para avaliar a eficácia de nossas campanhas publicitárias e otimizar a experiência de navegação. Nenhuma informação pessoal sensível é compartilhada com terceiros para fins alheios ao atendimento comercial.
          </p>

          <h3 className="font-brand text-base text-foreground mt-4">3. Finalidade e Não Compartilhamento</h3>
          <p>
            Os dados coletados destinam-se exclusivamente ao envio de orçamentos, esclarecimento de dúvidas técnicas e formalização de pedidos de pisos e tapetes personalizados. Nós <strong>não</strong> comercializamos, alugamos ou repassamos seus dados a terceiros.
          </p>

          <h3 className="font-brand text-base text-foreground mt-4">4. Seus Direitos (LGPD)</h3>
          <p>
            Você pode solicitar a confirmação, correção ou exclusão de seus dados de nossa base de contatos a qualquer momento entrando em contato pelo e-mail oficial:
            <br />
            <a href={`mailto:${CONTACT_INFO.email}`} className="text-cyan font-semibold hover:underline">
              {CONTACT_INFO.email}
            </a>{' '}
            ou pelo WhatsApp{' '}
            <strong className="text-foreground">{CONTACT_INFO.phoneFormatted}</strong>.
          </p>

          <p className="pt-2 text-xs text-muted-foreground/80 border-t border-border">
            Última atualização: {new Date().getFullYear()} · Nexvia – Kapazi Cooperkap · Recife/PE.
          </p>
        </div>

        {/* Footer button */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-brand-gradient text-navy font-semibold hover:brightness-110 transition-all cursor-pointer"
          >
            Entendi e concordo
          </button>
        </div>
      </div>
    </div>
  );
}
