import React from 'react';
import { Building2 } from './Icons';

export function CnpjNotice() {
  return (
    <section className="px-4 py-14 sm:px-6" aria-label="Aviso sobre faturamento">
      <div className="reveal relative mx-auto flex max-w-4xl flex-col items-center gap-4 overflow-hidden rounded-3xl border border-cyan/40 bg-card-gradient p-6 text-center shadow-glow sm:flex-row sm:p-8 sm:text-left">
        <div className="bg-brand-gradient grid size-14 shrink-0 place-items-center rounded-2xl text-navy">
          <Building2 className="size-7" />
        </div>
        <div>
          <p className="font-brand text-lg sm:text-xl text-foreground">
            Atendimento exclusivo para CNPJ
          </p>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Valores exclusivos para faturamento em pessoa jurídica (CNPJ).
          </p>
        </div>
      </div>
    </section>
  );
}

