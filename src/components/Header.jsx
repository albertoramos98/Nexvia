import React, { useState } from 'react';
import { LOGO_WIDE } from '../data/products';
import { Button } from './Button';
import { Menu, X } from './Icons';

export const NAV_LINKS = [
  { href: '#assistente', label: 'Assistente' },
  { href: '#quem-somos', label: 'Quem somos' },
  { href: '#categorias', label: 'Categorias' },
  { href: '#catalogo', label: 'Catálogo' },
  { href: '#diferenciais', label: 'Diferenciais' },
  { href: '#prazos', label: 'Prazos' },
  { href: '#contato', label: 'Contato' }
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="glass fixed inset-x-0 top-0 z-40 border-b border-border">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Logo */}
        <a
          href="#inicio"
          className="logo-fade-x shrink-0 transition-opacity hover:opacity-90"
          aria-label="Nexvia Kapazi Cooperkap – início"
        >
          <img
            src={LOGO_WIDE}
            alt="Logo Nexvia Kapazi Cooperkap"
            width={1370}
            height={300}
            className="h-9 w-auto sm:h-10"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-cyan"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Button asChild variant="hero" size="sm" className="hidden sm:inline-flex">
            <a href="#contato">Orçamento</a>
          </Button>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="grid size-10 place-items-center rounded-xl border border-border bg-card-gradient text-foreground transition-colors hover:border-cyan/50 lg:hidden"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-navy/95 backdrop-blur-xl px-4 py-6 sm:px-6 lg:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4" aria-label="Menu Mobile">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-4 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-cyan"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 pt-2 border-t border-border">
              <Button asChild variant="hero" size="xl" className="w-full">
                <a href="#contato" onClick={() => setMobileMenuOpen(false)}>
                  Orçamento
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

