import React from 'react';
import { LOGO_MAIN, getProductImage, getWhatsAppUrl } from '../data/products';
import { Button } from './Button';
import { ArrowRight, Swoosh, WhatsAppIcon } from './Icons';
import { trackConversion } from '../utils/analytics';

export function Hero() {
  const previewProducts = ['cleankap', 'conectado', 'grama-esportiva'];
  const metrics = [
    { value: '30', label: 'soluções' },
    { value: '5', label: 'linhas de produto' },
    { value: '10 anos', label: 'de garantia máx.' }
  ];

  const handleWhatsAppClick = () => {
    trackConversion('whatsapp_click_hero', { label: 'Hero Principal' });
  };

  return (
    <section id="inicio" className="bg-hero relative isolate overflow-hidden pt-24 pb-16 sm:pt-28 lg:pt-32 lg:pb-24">
      {/* Background Swoosh Effect */}
      <Swoosh className="swoosh pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-56 w-[140%] -translate-x-[15%] opacity-80 sm:h-72" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        {/* Left Column */}
        <div className="text-center lg:text-left">
          {/* Logo visible on mobile/tablet */}
          <img
            src={LOGO_MAIN}
            alt="Nexvia Kapazi Cooperkap"
            width={1600}
            height={800}
            fetchPriority="high"
            className="logo-fade mx-auto -mb-2 w-64 sm:w-80 lg:hidden"
          />

          <p className="eyebrow reveal">Distribuidores e representante oficial · Recife e região</p>

          <h1
            className="reveal font-brand mt-4 text-4xl leading-[1.02] sm:text-5xl lg:text-6xl xl:text-7xl"
            style={{ '--reveal-delay': '80ms' }}
          >
            Pisos e tapetes que <span className="text-gradient-brand">protegem</span>,{' '}
            <span className="text-gradient-silver">valorizam</span> e duram
          </h1>

          <p
            className="reveal mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg lg:mx-0"
            style={{ '--reveal-delay': '160ms' }}
          >
            Soluções para empresas, condomínios, academias, escolas e comércios. Personalizamos com a sua marca e indicamos o produto certo para cada ambiente.
          </p>

          <div
            className="reveal mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start"
            style={{ '--reveal-delay': '240ms' }}
          >
            <Button asChild variant="whatsapp" size="xl">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
              >
                <WhatsAppIcon className="size-5" /> Falar no WhatsApp
              </a>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href="#catalogo">
                Ver catálogo <ArrowRight className="size-5" />
              </a>
            </Button>
          </div>

          <p
            className="reveal font-brand mt-8 text-sm tracking-[0.2em] text-silver/80"
            style={{ '--reveal-delay': '320ms' }}
          >
            — A Escolha que fica! —
          </p>
        </div>

        {/* Right Column (Desktop) */}
        <div className="relative hidden lg:block">
          <img
            src={LOGO_MAIN}
            alt="Nexvia Kapazi Cooperkap"
            width={1600}
            height={800}
            fetchPriority="high"
            className="logo-fade reveal relative z-10 w-full"
          />
          <div className="-mt-6 grid grid-cols-3 gap-4 px-6">
            {previewProducts.map((slug, idx) => (
              <div
                key={slug}
                className="reveal shadow-card overflow-hidden rounded-2xl border border-border"
                style={{
                  '--reveal-delay': `${200 + idx * 120}ms`,
                  transform: `rotate(${(idx - 1) * 3}deg)`
                }}
              >
                <img
                  src={getProductImage(slug)}
                  alt={`Amostra de tapete ${slug}`}
                  width={300}
                  height={472}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics dl */}
      <dl className="mx-auto mt-14 grid max-w-5xl grid-cols-3 gap-3 px-4 sm:px-6">
        {metrics.map(({ value, label }) => (
          <div key={label} className="reveal rounded-2xl border border-border bg-foreground/[0.03] p-4 text-center">
            <dt className="sr-only">{label}</dt>
            <dd className="font-brand text-2xl text-gradient-brand sm:text-3xl">{value}</dd>
            <dd className="mt-1 text-xs text-muted-foreground sm:text-sm">{label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
