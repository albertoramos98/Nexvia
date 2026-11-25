import React from 'react';
import { SectionHeader } from './SectionHeader';
import { CalendarClock, Package, Palette, Truck } from './Icons';

export function Deadlines() {
  const steps = [
    {
      icon: Palette,
      value: '5',
      unit: 'dias úteis',
      title: 'Personalizados',
      text: 'Após aprovação do layout e confirmação do pagamento.'
    },
    {
      icon: Package,
      value: '2 a 5',
      unit: 'dias úteis',
      title: 'Produtos acabados',
      text: 'Prazo de separação e expedição dos itens de linha.'
    },
    {
      icon: Truck,
      value: '2 a 10',
      unit: 'dias úteis',
      title: 'Entrega',
      text: 'Varia conforme a região de destino.'
    }
  ];

  return (
    <section id="prazos" className="relative overflow-hidden border-y border-border bg-navy-soft/40 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Prazos"
          title={
            <>
              Do pedido à <span className="text-gradient-brand">sua porta</span>
            </>
          }
        />

        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <li
                key={step.title}
                className="reveal relative rounded-3xl border border-border bg-background/60 p-6"
                style={{ '--reveal-delay': `${idx * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span className="eyebrow">Etapa {idx + 1}</span>
                  <IconComponent className="size-5 text-cyan" />
                </div>
                <p className="font-brand mt-4 text-5xl text-gradient-brand">{step.value}</p>
                <p className="text-sm font-semibold uppercase tracking-wider text-silver">{step.unit}</p>
                <h3 className="font-brand mt-4 text-lg">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.text}</p>
              </li>
            );
          })}
        </ol>

        <p className="reveal mt-6 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
          <CalendarClock className="size-4 text-cyan" /> Prazos contados em dias úteis.
        </p>
      </div>
    </section>
  );
}

