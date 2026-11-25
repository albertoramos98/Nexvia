import React from 'react';
import { SectionHeader } from './SectionHeader';
import { Award, Handshake, MapPin } from './Icons';

export function About() {
  const cards = [
    {
      icon: Award,
      title: 'Distribuidores e representante oficial',
      text: 'Distribuidores e representante oficial Kapazi Cooperkap, a maior indústria de tapetes da América Latina.'
    },
    {
      icon: MapPin,
      title: 'Recife e região metropolitana',
      text: 'Atuação em Recife e em toda a região metropolitana.'
    },
    {
      icon: Handshake,
      title: 'Atendimento próximo',
      text: 'Orientação direta para escolher o produto certo para o seu espaço.'
    }
  ];

  return (
    <section id="quem-somos" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Quem somos"
          title={
            <>
              Distribuidores e representante oficial da{' '}
              <span className="text-gradient-brand">maior indústria de tapetes</span> da América Latina
            </>
          }
          text="A Nexvia é distribuidora e representante oficial Kapazi Cooperkap, a maior indústria de tapetes da América Latina, atuando em Recife e em toda a região metropolitana."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {cards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.title}
                className="reveal bg-card-gradient rounded-3xl border border-border p-6"
                style={{ '--reveal-delay': `${idx * 80}ms` }}
              >
                <div className="bg-brand-gradient shadow-glow grid size-12 place-items-center rounded-2xl text-navy">
                  <IconComponent className="size-6" />
                </div>
                <h3 className="font-brand mt-5 text-lg leading-tight">{card.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{card.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

