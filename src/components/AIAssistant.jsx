import React, { useState } from 'react';
import { SectionHeader } from './SectionHeader';
import { Button } from './Button';
import { LoaderCircle, Sparkles, WhatsAppIcon } from './Icons';
import { getProductImage, getProductWhatsAppUrl, getWhatsAppUrl, PRODUCTS } from '../data/products';

export const PROMPT_EXAMPLES = [
  'Recepção de condomínio com muita gente entrando em dias de chuva.',
  'Academia com área de musculação e sala de yoga.',
  'Entrada de loja; quero o tapete com a nossa logo.',
  'Área da piscina e vestiário de uma escola.'
];

export function AIAssistant() {
  const [needs, setNeeds] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const getSmartRecommendations = (text) => {
    const lower = text.toLowerCase();

    // 1. Condomínio / Chuva / Água na entrada
    if (lower.includes('chuva') || lower.includes('condomínio') || lower.includes('condominio') || lower.includes('lama') || lower.includes('molhado')) {
      return {
        summary: 'Para ambientes residenciais ou comerciais com fluxo intenso em dias chuvosos, recomendamos produtos de máxima absorção de umidade e retenção de sujeira:',
        recommendations: [
          {
            slug: 'waterkap',
            name: 'Waterkap',
            reason: 'Retém até 4 litros de água por metro quadrado e captura a lama dos calçados antes de sujar o piso, garantindo segurança contra escorregões.'
          },
          {
            slug: 'cleankap',
            name: 'Cleankap',
            reason: 'Tecnologia de secagem rápida com nylon e base de borracha antiderrapante, ideal para posicionar após a barreira primária com o nome do condomínio.'
          }
        ]
      };
    }

    // 2. Academia / Musculação / Yoga
    if (lower.includes('academia') || lower.includes('musculação') || lower.includes('musculacao') || lower.includes('yoga') || lower.includes('crossfit') || lower.includes('peso')) {
      return {
        summary: 'Para espaços fitness que demandam absorção de impacto biomecânico e conforto postural:',
        recommendations: [
          {
            slug: 'rubberkap',
            name: 'Rubberkap',
            reason: 'Piso emborrachado de alta densidade projetado para suportar o impacto de halteres, anilhas e proteger a estrutura contra quedas de peso livre.'
          },
          {
            slug: 'yogakap',
            name: 'Yogakap',
            reason: 'Tapete com espessura e amortecimento específicos para práticas de solo, yoga e pilates, sendo higiênico, macio e antiderrapante.'
          }
        ]
      };
    }

    // 3. Logo / Loja / Personalizado
    if (lower.includes('logo') || lower.includes('loja') || lower.includes('marca') || lower.includes('personaliz') || lower.includes('identidade')) {
      return {
        summary: 'Para valorizar a identidade visual da sua empresa na entrada mantendo alta durabilidade:',
        recommendations: [
          {
            slug: 'cleankap',
            name: 'Cleankap',
            reason: 'Personalização premium com tecnologia Jet Print de até 11 cores, permitindo detalhes nítidos e sofisticados do seu logotipo.'
          },
          {
            slug: 'vinil',
            name: 'Vinil',
            reason: 'Tapete tradicional de vinil vulcanizado 100% PVC, altamente resistente ao tráfego contínuo, fácil de lavar e com grande durabilidade.'
          }
        ]
      };
    }

    // 4. Piscina / Vestiário / Escola / Banheiro
    if (lower.includes('piscina') || lower.includes('vestiário') || lower.includes('vestiario') || lower.includes('escola') || lower.includes('molhad')) {
      return {
        summary: 'Para áreas molhadas que exigem drenagem constante de água e ação antibacteriana e antifúngica:',
        recommendations: [
          {
            slug: 'acquakap',
            name: 'Acquakap',
            reason: 'Estrutura aberta que permite o escoamento imediato de água na borda da piscina, proporcionando conforto ao caminhar descalço e evitando acidentes.'
          },
          {
            slug: 's-kap',
            name: 'S-Kap',
            reason: 'Estrado flexível em padrão onda com acabamento antiderrapante e antibacteriano, ideal para pisos úmidos de vestiários e saunas.'
          }
        ]
      };
    }

    // 5. Quadra / Playground / Lazer
    if (lower.includes('quadra') || lower.includes('playground') || lower.includes('brinquedo') || lower.includes('criança') || lower.includes('sintetica') || lower.includes('grama')) {
      return {
        summary: 'Para áreas recreativas, infantis e esportivas com alta durabilidade e segurança:',
        recommendations: [
          {
            slug: 'playkap',
            name: 'Playkap',
            reason: 'Piso modular com absorção de impacto para crianças, drenante e com garantia de até 10 anos.'
          },
          {
            slug: 'grama-sintetica',
            name: 'Grama Sintética',
            reason: 'Proteção contra queimaduras, toque agradável, resistência UV e manutenção praticamente zero.'
          }
        ]
      };
    }

    // Default intelligent match
    return {
      summary: 'Com base no perfil do seu espaço, indicamos as seguintes soluções de alta durabilidade e eficiência:',
      recommendations: [
        {
          slug: 'cleankap',
          name: 'Cleankap',
          reason: 'Excelente retenção de partículas finas e umidade, com opção de personalização que valoriza o ambiente corporativo.'
        },
        {
          slug: 'duo-opera',
          name: 'Duo Ópera',
          reason: 'Barreira elegante e de alto tráfego com 5 anos de garantia de fábrica, perfeita para entradas e recepções comerciais.'
        }
      ]
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!needs.trim() || needs.trim().length < 10) {
      setError('Descreva o espaço com pelo menos 10 caracteres');
      return;
    }
    setError(null);
    setLoading(true);
    setResult(null);

    // Simula o processamento inteligente da IA
    setTimeout(() => {
      const rec = getSmartRecommendations(needs);
      setResult(rec);
      setLoading(false);
    }, 700);
  };

  return (
    <section id="assistente" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Assistente de escolha"
          title={
            <>
              Conte sobre o seu espaço, <span className="text-gradient-brand">indicamos o produto</span>
            </>
          }
          text="Descreva o ambiente, o fluxo de pessoas e o que você precisa. Nosso assistente com IA sugere os produtos do catálogo mais indicados e explica o porquê."
        />

        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="reveal bg-card-gradient shadow-card mt-10 rounded-3xl border border-border p-6 sm:p-8"
          aria-label="Assistente de recomendação de produtos"
        >
          <label htmlFor="needs" className="text-sm font-semibold text-foreground">
            Descreva o espaço e suas necessidades
          </label>

          <textarea
            id="needs"
            rows={4}
            maxLength={1000}
            value={needs}
            onChange={(e) => {
              setNeeds(e.target.value);
              if (error) setError(null);
            }}
            aria-invalid={!!error}
            aria-describedby={error ? 'needs-error' : undefined}
            placeholder="Ex.: Escritório com recepção e cerca de 200 pessoas por dia. Queremos um tapete na entrada com a nossa marca."
            className="mt-2 w-full resize-none rounded-xl border border-input bg-background/60 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-cyan focus:outline-none focus:ring-2 focus:ring-ring/30"
          />

          {/* Quick example chips */}
          <div className="mt-3 flex flex-wrap gap-2">
            {PROMPT_EXAMPLES.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => {
                  setNeeds(example);
                  setError(null);
                }}
                className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-cyan/50 hover:text-foreground cursor-pointer"
              >
                {example}
              </button>
            ))}
          </div>

          {error && (
            <p id="needs-error" role="alert" className="mt-4 text-sm text-destructive">
              {error}
            </p>
          )}

          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <p className="text-xs text-muted-foreground">
              Sugestões automáticas. Confirme com nosso time antes de fechar.
            </p>
            <Button type="submit" variant="hero" size="xl" disabled={loading} className="w-full sm:w-auto">
              {loading ? (
                <>
                  <LoaderCircle className="animate-spin size-5" /> Analisando...
                </>
              ) : (
                <>
                  <Sparkles className="size-5" /> Recomendar produtos
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Results Area */}
        <div aria-live="polite">
          {result && (
            <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {result.summary && <p className="text-center text-muted-foreground">{result.summary}</p>}

              {result.recommendations.length > 0 && (
                <ol className="mt-6 grid gap-4 md:grid-cols-2">
                  {result.recommendations.map((item, idx) => (
                    <li
                      key={item.slug}
                      className={`bg-card-gradient shadow-card flex gap-4 overflow-hidden rounded-3xl border border-border p-4 ${
                        idx === 0 ? 'border-cyan/50' : ''
                      }`}
                    >
                      <img
                        src={getProductImage(item.slug)}
                        alt={item.name}
                        loading="lazy"
                        width={112}
                        height={112}
                        className="size-24 shrink-0 rounded-2xl object-cover sm:size-28"
                      />
                      <div className="flex min-w-0 flex-1 flex-col">
                        <span className="eyebrow text-[0.65rem]">{idx === 0 ? 'Mais indicado' : `Opção ${idx + 1}`}</span>
                        <h3 className="font-brand mt-1 text-lg leading-tight">{item.name}</h3>
                        <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">{item.reason}</p>
                        <a
                          href={getProductWhatsAppUrl(item.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan hover:underline"
                        >
                          <WhatsAppIcon className="size-4 shrink-0" /> Pedir orçamento
                        </a>
                      </div>
                    </li>
                  ))}
                </ol>
              )}

              {/* Consultation CTA */}
              <div className="mt-6 text-center">
                <Button asChild variant="whatsapp" size="lg">
                  <a
                    href={getWhatsAppUrl(`Olá! Vim pelo site da Nexvia – Kapazi Cooperkap. Meu espaço: ${needs.trim()}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon className="size-5" /> Falar com um consultor
                  </a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

