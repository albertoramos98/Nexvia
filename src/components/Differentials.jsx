import React from 'react';
import { SectionHeader } from './SectionHeader';
import { Award, Handshake, Package, Palette } from './Icons';

export function Differentials() {
  const differentials = [
    {
      icon: Palette,
      title: 'Personalização com sua marca',
      text: 'Tapetes com logo e cores da sua empresa, com impressão de alta definição em até 24 cores.'
    },
    {
      icon: Award,
      title: 'Garantia de fábrica',
      text: 'Produtos Kapazi Cooperkap com garantia de 3 meses a 10 anos, conforme a linha.'
    },
    {
      icon: Package,
      title: 'Linha nacional e importada',
      text: 'Portfólio completo para equilibrar desempenho, estética e investimento.'
    },
    {
      icon: Handshake,
      title: 'Atendimento consultivo',
      text: 'Analisamos o ambiente e o fluxo de pessoas para indicar a solução certa.'
    }
  ];

  return (
    <section id="diferenciais" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Por que a Nexvia"
          title={
            <>
              Qualidade que <span className="text-gradient-brand">fica</span>
            </>
          }
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {differentials.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.title}
                className="reveal bg-card-gradient rounded-3xl border border-border p-6 transition-colors hover:border-cyan/50"
                style={{ '--reveal-delay': `${idx * 80}ms` }}
              >
                <div className="bg-brand-gradient shadow-glow grid size-12 place-items-center rounded-2xl text-navy">
                  <IconComponent className="size-6" />
                </div>
                <h3 className="font-brand mt-5 text-lg leading-tight">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

