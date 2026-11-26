# Guia Rápido de Google Ads – Nexvia Kapazi Cooperkap

Este documento explica como ativar e aproveitar ao máximo os anúncios do Google Ads no site. Tudo já foi estruturado no código para facilitar o trabalho do seu tio ou do gestor de tráfego.

---

## 1. O que já está pronto no código?

1. **Tag Global do Google (`gtag.js`) com carregamento automático**:
   - Localizado em `index.html`.
2. **Rastreamento de Conversões em todos os botões de contato**:
   - Cada vez que um visitante clica em **Falar no WhatsApp** ou em **Pedir Orçamento** em qualquer um dos 30 produtos, um evento de conversão (`generate_lead`) é disparado automaticamente para o Google Ads.
   - Envio do formulário de orçamento também dispara o evento de Lead.
3. **Compatibilidade com Google Tag Manager (GTM)**:
   - Os eventos alimentam o `window.dataLayer`, permitindo que qualquer agência ou gestor use o GTM sem precisar mexer em uma linha de código.
4. **Política de Privacidade e LGPD completa**:
   - Modal interativo já linkado no rodapé com os termos de cookies e tratamento de dados, **evitando que o Google Ads reprove os anúncios** por falta de política de privacidade.
5. **Arquivo `robots.txt` e Meta Tags de SEO**:
   - Otimizado com palavras-chave de alta intenção comercial para Recife e região metropolitana (*"tapetes personalizados recife"*, *"capacho condomínio"*, *"pisos kapazi"*, etc.).

---

## 2. Como ativar a conta do Google Ads (Passo Único)

Abra o arquivo `index.html` e localize a linha 46:

```javascript
// Substitua "AW-SEU-ID-AQUI" pelo código da sua conta do Google Ads:
window.GOOGLE_ADS_ID = "AW-123456789";
```

Pronto! Assim que você salvar essa alteração, o script oficial do Google Ads (`googletagmanager.com/gtag/js`) passará a carregar automaticamente em todo o site.

> **Dica**: Se você usar arquivo de ambiente, também pode definir no `.env`:
> `VITE_GOOGLE_ADS_ID=AW-123456789`

---

## 3. Eventos de Conversão Rastreados

No painel do Google Ads (*Metas > Conversões > Nova ação de conversão*), configure uma conversão do tipo **Site** com base no evento:

- **Nome do Evento**: `generate_lead`
- **Ações mapeadas**:
  - `whatsapp_click_hero` (botão principal do Hero)
  - `whatsapp_click_floating` (botão flutuante no canto da tela)
  - `whatsapp_click_product` (botão de orçamento em qualquer produto)
  - `whatsapp_click_ai_rec` (sugestão aceita do Assistente de IA)
  - `lead_form_whatsapp_submit` (envio do formulário de orçamento)
  - `lead_form_email_submit` (envio do formulário por e-mail)

---

## 4. Dicas de Ouro para a Campanha em Recife/PE

1. **Localização**: Configure a campanha de pesquisa no Google Ads restrita para:
   - Recife, Jaboatão dos Guararapes, Olinda, Paulista, Cabo de Santo Agostinho, Ipojuca e Região Metropolitana.
2. **Palavras-Chave de Alta Intenção de Compra**:
   - `[tapete personalizado recife]`
   - `[capacho para condomínio recife]`
   - `"kapazi distribuidor recife"`
   - `[piso emborrachado academia recife]`
   - `[piso tátil pernambuco]`
   - `[grama sintética recife]`
3. **Estratégia de Lances**:
   - Comece com **Maximizar Cliques** na primeira semana para gerar tráfego inicial.
   - Assim que acumular de 15 a 30 conversões no WhatsApp, mude para **Maximizar Conversões** (o algoritmo foca nas pessoas com mais probabilidade de chamar no WhatsApp).
4. **Extensão de Anúncios**:
   - Cadastre o número de telefone do WhatsApp nos anúncios: `(81) 99123-8004`.
   - Adicione extensões de sitelinks para as categorias: *Tapetes Personalizados*, *Alto Tráfego*, *Pisos Emborrachados* e *Áreas Molhadas*.
