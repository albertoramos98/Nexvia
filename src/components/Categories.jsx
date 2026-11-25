import React from 'react';
import { SectionHeader } from './SectionHeader';
import { CATEGORIES, PRODUCTS, getProductImage } from '../data/products';

export function Categories({ onSelectCategory }) {
  const handleCategoryClick = (categoryId) => {
    if (onSelectCategory) {
      onSelectCategory(categoryId);
    }
    const catalogElement = document.getElementById('catalogo');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categorias" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Linhas de produto"
          title={
            <>
              Uma solução para <span className="text-gradient-brand">cada ambiente</span>
            </>
          }
          text="Da recepção à quadra, escolha a categoria e veja os produtos indicados."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.map((category, idx) => {
            const count = PRODUCTS.filter((p) => p.category === category.id).length;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryClick(category.id)}
                className="reveal group relative isolate flex min-h-64 flex-col justify-end overflow-hidden rounded-3xl border border-border p-6 text-left transition-all hover:border-cyan/60 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                style={{ '--reveal-delay': `${idx * 80}ms` }}
              >
                {/* Background image with hover zoom */}
                <img
                  src={getProductImage(category.cover)}
                  alt={category.name}
                  loading="lazy"
                  width={300}
                  height={472}
                  className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Dark gradient overlay for readability */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/80 to-transparent" />

                <span className="eyebrow text-[0.65rem] text-cyan">
                  {count} {count === 1 ? 'produto' : 'produtos'}
                </span>
                <h3 className="font-brand mt-1 text-xl leading-tight text-foreground transition-colors group-hover:text-cyan">
                  {category.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                  {category.summary}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

