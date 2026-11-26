import React, { useMemo } from 'react';
import { SectionHeader } from './SectionHeader';
import { Button } from './Button';
import { WhatsAppIcon } from './Icons';
import { trackConversion } from '../utils/analytics';
import {
  CATEGORIES,
  PRODUCTS,
  formatSpecLabel,
  getProductImage,
  getProductWhatsAppUrl
} from '../data/products';

export function Catalog({ filter = 'todos', onFilterChange }) {
  const filteredProducts = useMemo(() => {
    if (filter === 'todos') return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === filter);
  }, [filter]);

  const tabs = [
    { id: 'todos', label: 'Todos' },
    ...CATEGORIES.map((c) => ({ id: c.id, label: c.name }))
  ];

  const handleProductWhatsApp = (product) => {
    trackConversion('whatsapp_click_product', {
      product: product.name,
      category: product.category,
      spec: product.spec
    });
  };

  return (
    <section id="catalogo" className="relative border-y border-border bg-navy-soft/40 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Catálogo"
          title={
            <>
              30 soluções em pisos, <span className="text-gradient-brand">tapetes e revestimentos</span>
            </>
          }
          text="Filtre por categoria e peça seu orçamento direto pelo WhatsApp."
        />

        {/* Filter Tabs */}
        <div className="-mx-4 mt-10 overflow-x-auto px-4 pb-2 [scrollbar-width:none]">
          <div
            className="flex w-max gap-2 sm:mx-auto sm:w-auto sm:flex-wrap sm:justify-center"
            role="tablist"
            aria-label="Filtrar por categoria"
          >
            {tabs.map((tab) => {
              const isSelected = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => onFilterChange(tab.id)}
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'border-transparent bg-brand-gradient text-navy shadow-glow'
                      : 'border-border text-muted-foreground hover:border-cyan/50 hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Count */}
        <p className="mt-6 text-center text-sm text-muted-foreground" aria-live="polite">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'produto' : 'produtos'}
        </p>

        {/* Products Grid */}
        <div className="mt-6 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product, idx) => {
            const categoryName = CATEGORIES.find((c) => c.id === product.category)?.name;
            return (
              <article
                key={product.slug}
                className="bg-card-gradient shadow-card group flex flex-col overflow-hidden rounded-3xl border border-border transition-all duration-300 hover:-translate-y-1 hover:border-cyan/50 animate-in fade-in slide-in-from-bottom-4 fill-mode-both"
                style={{
                  animationDelay: `${Math.min(idx, 12) * 40}ms`,
                  animationDuration: '500ms'
                }}
              >
                {/* Image Container with Badge */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={getProductImage(product.slug)}
                    alt={`${product.name} – ${categoryName}`}
                    loading="lazy"
                    decoding="async"
                    width={300}
                    height={472}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="glass absolute left-3 top-3 rounded-full border border-border px-3 py-1 text-[0.7rem] font-semibold text-cyan">
                    {product.origin}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-brand text-xl">{product.name}</h3>
                  <div className="mt-2 h-0.5 w-10 rounded-full bg-brand-gradient" />
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>

                  {/* Specifications */}
                  <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-xl bg-foreground/5 px-3 py-2">
                      <dt className="text-muted-foreground">{formatSpecLabel(product.spec)}</dt>
                      <dd className="mt-0.5 font-semibold text-foreground">{product.spec}</dd>
                    </div>
                    <div className="rounded-xl bg-foreground/5 px-3 py-2">
                      <dt className="text-muted-foreground">Garantia</dt>
                      <dd className="mt-0.5 font-semibold text-foreground">{product.warranty}</dd>
                    </div>
                  </dl>

                  {/* CTA Button */}
                  <Button asChild variant="glass" className="mt-4 rounded-full">
                    <a
                      href={getProductWhatsAppUrl(product.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleProductWhatsApp(product)}
                    >
                      <WhatsAppIcon className="size-4" /> Pedir orçamento
                    </a>
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
