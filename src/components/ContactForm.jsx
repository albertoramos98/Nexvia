import React, { useState } from 'react';
import { SectionHeader } from './SectionHeader';
import { Button } from './Button';
import { ArrowRight, Mail, WhatsAppIcon } from './Icons';
import { trackConversion } from '../utils/analytics';
import {
  CATEGORIES,
  CONTACT_INFO,
  PRODUCTS,
  getWhatsAppUrl
} from '../data/products';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    product: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Informe seu nome';
    }
    if (!formData.company.trim() || formData.company.trim().length < 2) {
      newErrors.company = 'Informe a empresa';
    }
    if (!formData.product) {
      newErrors.product = 'Escolha um produto';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildMessageLines = () => {
    const lines = [
      'Olá! Vim pelo site da Nexvia – Kapazi Cooperkap.',
      '',
      `Nome: ${formData.name.trim()}`,
      `Empresa: ${formData.company.trim()}`,
      `Produto de interesse: ${formData.product}`
    ];
    if (formData.message.trim()) {
      lines.push(`Mensagem: ${formData.message.trim()}`);
    }
    return lines.join('\n');
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    // Dispara evento de conversão de lead do formulário via WhatsApp
    trackConversion('lead_form_whatsapp_submit', {
      product: formData.product,
      company: formData.company.trim()
    });

    const text = buildMessageLines();
    const url = getWhatsAppUrl(text);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleEmailSubmit = () => {
    if (!validate()) return;

    // Dispara evento de conversão de lead do formulário via E-mail
    trackConversion('lead_form_email_submit', {
      product: formData.product,
      company: formData.company.trim()
    });

    const body = buildMessageLines();
    const subject = `Orçamento - ${formData.company.trim()} (${formData.product})`;
    const mailto = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  const handleDirectWhatsAppCard = () => {
    trackConversion('whatsapp_click_contact_card', { label: 'Card Direto Contato' });
  };

  const handleDirectEmailCard = () => {
    trackConversion('email_click_contact_card', { label: 'Card Direto E-mail' });
  };

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const inputClass =
    'w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-cyan focus:outline-none focus:ring-2 focus:ring-ring/30';

  return (
    <section id="contato" className="bg-hero relative isolate overflow-hidden py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
        {/* Left Column: Info & Direct links */}
        <div className="reveal">
          <p className="eyebrow">Fale com a gente</p>
          <h2 className="font-brand mt-3 text-3xl leading-tight sm:text-4xl lg:text-5xl">
            Peça seu <span className="text-gradient-brand">orçamento</span>
          </h2>
          <p className="mt-4 text-muted-foreground sm:text-lg">
            Conte o que você precisa. Respondemos com a indicação do produto ideal e o orçamento para a sua empresa.
          </p>

          <div className="mt-8 space-y-3">
            {/* WhatsApp Card */}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDirectWhatsAppCard}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card-gradient p-4 transition-colors hover:border-whatsapp/60"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-whatsapp text-whatsapp-foreground">
                <WhatsAppIcon className="size-6" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-muted-foreground">
                  WhatsApp
                </span>
                <span className="font-brand text-lg">{CONTACT_INFO.phoneFormatted}</span>
              </span>
              <ArrowRight className="ml-auto size-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </a>

            {/* Email Card */}
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              onClick={handleDirectEmailCard}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card-gradient p-4 transition-colors hover:border-cyan/60"
            >
              <span className="bg-brand-gradient grid size-12 shrink-0 place-items-center rounded-xl text-navy">
                <Mail className="size-6" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs uppercase tracking-wider text-muted-foreground">
                  E-mail
                </span>
                <span className="block truncate font-semibold sm:text-lg">{CONTACT_INFO.email}</span>
              </span>
              <ArrowRight className="ml-auto size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Right Column: Quote Form */}
        <form
          onSubmit={handleWhatsAppSubmit}
          noValidate
          className="reveal bg-card-gradient shadow-card rounded-3xl border border-border p-6 sm:p-8"
          style={{ '--reveal-delay': '120ms' }}
          aria-label="Formulário de orçamento"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-silver">
                Nome
              </label>
              <input
                id="name"
                autoComplete="name"
                maxLength={100}
                value={formData.name}
                onChange={handleChange('name')}
                className={inputClass}
                placeholder="Seu nome"
              />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-silver">
                Empresa
              </label>
              <input
                id="company"
                autoComplete="organization"
                maxLength={120}
                value={formData.company}
                onChange={handleChange('company')}
                className={inputClass}
                placeholder="Nome da empresa"
              />
              {errors.company && <p className="mt-1 text-xs text-destructive">{errors.company}</p>}
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="product" className="mb-1.5 block text-sm font-medium text-silver">
              Produto de interesse
            </label>
            <select
              id="product"
              value={formData.product}
              onChange={handleChange('product')}
              className={`${inputClass} appearance-none`}
            >
              <option value="">Selecione um produto</option>
              {CATEGORIES.map((cat) => (
                <optgroup key={cat.id} label={cat.name}>
                  {PRODUCTS.filter((p) => p.category === cat.id).map((p) => (
                    <option key={p.slug} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </optgroup>
              ))}
              <option value="Ainda não sei / quero indicação">Ainda não sei / quero indicação</option>
            </select>
            {errors.product && <p className="mt-1 text-xs text-destructive">{errors.product}</p>}
          </div>

          <div className="mt-4">
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-silver">
              Mensagem
            </label>
            <textarea
              id="message"
              rows={4}
              maxLength={1000}
              value={formData.message}
              onChange={handleChange('message')}
              className={`${inputClass} resize-none`}
              placeholder="Medidas, quantidade, local de instalação..."
            />
            {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button type="submit" variant="whatsapp" size="xl" className="sm:flex-1">
              <WhatsAppIcon className="size-5" /> Enviar pelo WhatsApp
            </Button>
            <Button
              type="button"
              variant="glass"
              size="xl"
              className="sm:flex-1"
              onClick={handleEmailSubmit}
            >
              <Mail className="size-5" /> Enviar por e-mail
            </Button>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Atendimento exclusivo para empresas com CNPJ.
          </p>
        </form>
      </div>
    </section>
  );
}
