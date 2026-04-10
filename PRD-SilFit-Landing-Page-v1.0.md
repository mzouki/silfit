# PRD — SilFit Landing Page
### Documento de Requisitos de Produto v1.0
**Data:** 08/04/2026
**Autor:** Marcelo (MZK Performance Digital)
**Cliente:** Sílvia — SilFit Marmitas
**Status:** Aprovado para desenvolvimento

---

## 1. Visão Geral

### 1.1 Contexto
A SilFit é um negócio artesanal de marmitas (fit e tradicional) operado pela Sílvia a partir de sua cozinha em Santo André, SP. O negócio não possui site, cardápio online estruturado nem presença em redes sociais ativa. Atualmente, os pedidos são feitos exclusivamente via WhatsApp.

### 1.2 Problema
Sem presença digital, o alcance da SilFit é limitado ao boca-a-boca. Não há como ser encontrada por busca orgânica (Google) nem por plataformas de IA (ChatGPT, Gemini, Perplexity). Não existe infraestrutura para rastrear visitantes, capturar leads ou preparar campanhas pagas futuras.

### 1.3 Solução Proposta
Criar uma landing page estática de alta conversão, otimizada para SEO local (ABCD Paulista + bairros vizinhos de SP), otimizada para descoberta em plataformas de IA (GEO/AEO), com design moderno premiado, e infraestrutura de tracking pronta para escalar com tráfego pago (Google Ads + Meta Ads via GTM).

### 1.4 Brand
- **Nome:** SilFit
- **Tagline:** "Da minha Cozinha Pra Sua"
- **WhatsApp:** (11) 98653-1708
- **Instagram:** @silfit_marmita
- **Domínio:** temporariamente subdomínio Cloudflare Pages (.pages.dev); domínio definitivo pendente (ver seção 8)

---

## 2. Objetivos de Negócio (Metas SMART)

| # | Objetivo | Métrica | Meta | Prazo |
|---|----------|---------|------|-------|
| O1 | Gerar visibilidade orgânica local | Impressões no Google Search Console (queries locais ABCD) | 500 impressões/mês | 90 dias pós-lançamento |
| O2 | Converter visitantes em leads qualificados | Taxa de preenchimento do pop-up (nome + WhatsApp) | ≥ 15% dos visitantes | 60 dias pós-lançamento |
| O3 | Gerar pedidos via WhatsApp | Cliques no CTA WhatsApp (GA4 event) | 50 cliques/mês | 90 dias pós-lançamento |
| O4 | Ranquear no top 10 para keywords locais primárias | Posição média no GSC | Top 10 para 3+ keywords | 120 dias pós-lançamento |
| O5 | Aparecer em respostas de IA para buscas locais de marmita | Menção em respostas do ChatGPT/Gemini/Perplexity (verificação manual) | Presença em 2+ plataformas | 180 dias pós-lançamento |

---

## 3. Público-Alvo / Personas

### Persona 1 — "Fernanda Correria"
- **Idade:** 28-40 anos
- **Perfil:** Mulher que trabalha fora (ou home office), não tem tempo de cozinhar, busca alimentação saudável e prática
- **Localização:** Santo André, São Caetano, São Bernardo, bairros limítrofes de SP (Ipiranga, Sacomã, Cursino, Vila Prudente)
- **Comportamento:** Pesquisa "marmita fit perto de mim" no Google; pede indicação em grupos de WhatsApp; compra em combo semanal para congelar
- **Dor:** Não quer cozinhar, mas quer comer bem sem pagar caro
- **Gatilho de decisão:** Preço acessível (R$17-19), cardápio variado, facilidade de pedir pelo WhatsApp

### Persona 2 — "Carlos Praticidade"
- **Idade:** 25-45 anos
- **Perfil:** Homem que mora sozinho ou casal sem tempo, busca marmita tradicional caseira ("comida de mãe")
- **Localização:** Mesma região do ABCD
- **Comportamento:** Pesquisa "marmita caseira Santo André entrega"; valoriza porção generosa e preço justo
- **Dor:** Cansou de delivery caro e fast food
- **Gatilho de decisão:** Sabor caseiro, preço do combo (economia), entrega na porta

### Persona 3 — "Roberta Fitness"
- **Idade:** 22-35 anos
- **Perfil:** Praticante de atividade física que busca marmita com macros equilibrados
- **Localização:** ABCD + academia da região
- **Comportamento:** Pesquisa "marmita fitness ABCD", "marmita low carb Santo André"; compra em lote semanal
- **Dor:** Precisa de refeições controladas sem perder tempo com prep
- **Gatilho de decisão:** Opção integral sob pedido, ingredientes light, preço do combo Fit

---

## 4. User Stories

### Visitante Orgânico
- **US01:** Como visitante, quero encontrar a SilFit ao pesquisar "marmita fit Santo André" no Google, para que eu possa conhecer o cardápio sem pedir indicação.
- **US02:** Como visitante, quero ver o cardápio completo com preços e fotos na página, para que eu possa decidir o que pedir antes de ir ao WhatsApp.
- **US03:** Como visitante, quero clicar em um botão e já cair no WhatsApp com uma mensagem pronta, para que eu não precise digitar tudo do zero.
- **US04:** Como visitante, quero saber quais regiões a SilFit atende, para que eu confirme se entregam na minha casa.

### Lead (Pop-up)
- **US05:** Como visitante interessado, quero preencher só meu nome e WhatsApp antes de ser redirecionado, para que o processo seja rápido e eu não desista.
- **US06:** Como visitante, quero entender claramente por que estão pedindo meu dado e dar consentimento explícito, para que eu me sinta seguro (LGPD).

### Operador (Sílvia)
- **US07:** Como dona do negócio, quero receber o pedido no WhatsApp já identificando o que a pessoa quer (Fit, Tradicional ou Combo), para que eu responda mais rápido.
- **US08:** Como dona do negócio, quero ver os leads coletados numa planilha simples, para que eu possa fazer follow-up sem precisar de sistema.

### Administrador (Marcelo/MZK)
- **US09:** Como administrador, quero que os eventos de conversão estejam no dataLayer, para que eu configure GTM → GA4 → Google Ads / Meta CAPI sem tocar no código da página.
- **US10:** Como administrador, quero atualizar o cardápio editando um arquivo JSON ou bloco HTML simples no GitHub, para que a manutenção não exija dev.

---

## 5. Requisitos Funcionais

### 5.1 Arquitetura de Seções (top → bottom)

| Ordem | Seção | Conteúdo | CTA |
|-------|-------|----------|-----|
| 1 | **Hero** | Título H1 com keyword principal + subtítulo + imagem hero + CTA primário | "Quero Pedir Minha Marmita" |
| 2 | **Sobre** | História da Sílvia, foto pessoal (placeholder), proposta de valor ("Da minha Cozinha Pra Sua"), badges de confiança (ABCD, caseira, ingredientes frescos) | — |
| 3 | **Cardápio Fit** | Cards com as 4 opções Fit 300g, preço R$17,90, ingredientes, opção integral sob pedido | "Pedir Marmita Fit" → WhatsApp |
| 4 | **Cardápio Tradicional** | Cards com as 4 opções Tradicional 400g, preço R$19,90, ingredientes | "Pedir Marmita Tradicional" → WhatsApp |
| 5 | **Combos Promocionais** | Tabela/cards: Fit (10=R$170, 20=R$340) e Tradicional (10=R$190, 20=R$380) + nota "Acima de 20, chama no WhatsApp" | "Quero um Combo" → WhatsApp |
| 6 | **Área de Entrega** | Lista das cidades/bairros atendidos + mapa visual estático ou embed leve. Menção: entrega pessoal ou via Uber (Entrega Moto) | — |
| 7 | **Depoimentos** | Seção com 3 cards placeholder (avatar genérico + texto editável). Estrutura pronta para Schema `Review` | — |
| 8 | **FAQ** | 5-8 perguntas frequentes com Schema `FAQPage`. Ex: "Vocês entregam em São Paulo?", "Posso trocar arroz branco por integral?", "Como funciona o combo?", "Qual o prazo de validade?", "Aceita Pix?" | — |
| 9 | **CTA Final** | Bloco de fechamento com urgência/escassez + CTA principal | "Fazer Meu Pedido Agora" → WhatsApp |
| 10 | **Footer** | Logo, WhatsApp, Instagram, link para Política de Privacidade, crédito MZK | — |

### 5.2 Pop-up de Captura (LGPD-Compliant)

**Trigger:** Dispara ao clicar em qualquer CTA de WhatsApp (não é pop-up de entrada/saída).

**Campos:**
- Nome (obrigatório)
- WhatsApp (obrigatório, máscara: (XX) XXXXX-XXXX)

**Consentimento LGPD:**
- Checkbox obrigatório: "Concordo com a [Política de Privacidade] e autorizo o uso dos meus dados para contato comercial."
- Link para /politica-de-privacidade.html

**Ação ao submeter:**
1. Dados enviados para Google Sheets via Google Apps Script (POST assíncrono)
2. Evento `generate_lead` pushado no dataLayer com parâmetros: `lead_name`, `lead_phone`, `lead_source` (seção de origem: fit/tradicional/combo/hero/cta_final)
3. Redirect para WhatsApp com mensagem personalizada:
   - Template: `Oi Sílvia! Meu nome é {nome}. Quero fazer um pedido de {tipo_marmita}! 🍱`
   - Exemplo Fit: `Oi Sílvia! Meu nome é Ana. Quero fazer um pedido de Marmita Fit! 🍱`
   - Exemplo Combo: `Oi Sílvia! Meu nome é Carlos. Quero saber sobre o Combo Promocional! 🍱`

**Timeout/Fallback:** Se o Apps Script falhar, o redirect para WhatsApp acontece mesmo assim (nunca bloquear a conversão).

### 5.3 Página de Política de Privacidade

- Página separada: `/politica-de-privacidade.html`
- Conteúdo: Identificação do controlador (Sílvia / SilFit), dados coletados (nome, WhatsApp), finalidade (contato comercial), base legal (consentimento), direitos do titular, canal de contato (WhatsApp da Sílvia)
- Design consistente com a LP principal (header/footer compartilhados)

### 5.4 Tracking & dataLayer

**Eventos a serem configurados no dataLayer (GTM-ready):**

| Evento | Trigger | Parâmetros |
|--------|---------|------------|
| `page_view` | Carregamento da página | `page_location`, `page_title` |
| `section_view` | Seção entra no viewport (Intersection Observer) | `section_name` |
| `cta_click` | Clique em qualquer CTA | `cta_text`, `cta_section`, `cta_destination` |
| `popup_open` | Pop-up de captura é exibido | `popup_trigger_section` |
| `popup_close` | Pop-up fechado sem preencher | `popup_trigger_section` |
| `generate_lead` | Formulário do pop-up submetido com sucesso | `lead_name`, `lead_phone`, `lead_source` |
| `whatsapp_redirect` | Redirect para WhatsApp executado | `wa_message_type` (fit/tradicional/combo/geral) |
| `faq_expand` | FAQ item expandido | `faq_question` |

**Container GTM:** Placeholder para ID do container (`GTM-XXXXXXX`) — Marcelo configura após lançamento.

---

## 6. Requisitos Não-Funcionais

### 6.1 Performance
- **Lighthouse Mobile:** ≥ 90 em Performance, Accessibility, Best Practices, SEO
- **LCP (Largest Contentful Paint):** < 2.5s em 4G
- **CLS (Cumulative Layout Shift):** < 0.1
- **FID/INP:** < 200ms
- **Tamanho total da página:** < 500KB (sem imagens externas)
- **Imagens:** WebP com fallback, lazy loading, srcset responsivo, compressão ≤ 80KB por imagem

### 6.2 SEO On-Page

**Meta Tags:**
- Title: `Marmita Fit e Tradicional em Santo André | SilFit - Entrega no ABCD`
- Description: `Marmitas fit a partir de R$17,90 e tradicionais a R$19,90 com entrega em Santo André, São Caetano e São Bernardo. Cardápio semanal, combos promocionais. Peça pelo WhatsApp!`
- Open Graph e Twitter Cards completos
- Canonical URL definida

**Schema Markup (JSON-LD):**
- `LocalBusiness` (type: `FoodEstablishment`) com: name, address (Santo André), telephone, priceRange, areaServed (ABCD + bairros SP), servesCuisine
- `Product` para cada categoria (Fit/Tradicional/Combo) com offers e priceSpecification
- `FAQPage` para a seção de FAQ
- `Review` (placeholder, ativar quando tiver depoimentos reais)
- `BreadcrumbList`
- `WebSite` com `SearchAction` (sitelinks search box)

**Heading Hierarchy:**
- H1 único no Hero com keyword primária
- H2 por seção
- H3 para sub-itens (opções do cardápio)
- Sem pular níveis

**Keywords Primárias (SEO Local):**
- marmita fit Santo André
- marmita caseira ABCD
- marmita fitness São Caetano
- marmita congelada São Bernardo
- marmita saudável entrega ABCD Paulista
- marmita tradicional Santo André delivery

**Keywords Secundárias:**
- marmita low carb ABC
- comida caseira delivery Santo André
- marmita barata ABCD
- combo marmita fit
- refeição saudável congelada ABC

### 6.3 Otimização para Plataformas de IA (GEO/AEO)

**Generative Engine Optimization (GEO):**
- Conteúdo estruturado em formato pergunta-resposta (FAQ) que LLMs possam citar como fonte
- Frases declarativas e objetivas no copy (ex: "A SilFit entrega marmitas fit e tradicionais em Santo André, São Caetano e São Bernardo")
- Dados factuais citáveis: preços exatos, bairros atendidos, opções do cardápio — informações que uma IA pode extrair e apresentar ao usuário
- Entidade nomeada consistente: "SilFit" sempre grafado igual em todo o site

**Answer Engine Optimization (AEO):**
- Schema markup robusto (ver 6.2) para que motores de IA identifiquem tipo de negócio, localização e oferta
- FAQ section com perguntas reais dos clientes, formatadas para featured snippets e citações por IA
- Conteúdo semântico rico: usar variações naturais das keywords sem keyword stuffing

**Citabilidade:**
- Incluir dados que IAs procuram para recomendar negócios locais: endereço da região, faixa de preço, tipo de cozinha, diferenciais, horário/disponibilidade
- Meta description otimizada para ser "citável" por LLMs como resumo

### 6.4 Design & UX

**Princípios:**
- Mobile-first (estimativa: 85%+ do tráfego via mobile)
- Design autoral anti-genérico — não pode parecer template
- Paleta de cores derivada da identidade visual existente (verde da logo SilFit + tons terrosos/naturais que remetem a comida saudável)
- Tipografia moderna: 2 fontes no máximo (1 display + 1 body), preferencialmente Google Fonts de alto rendimento (ex: variações de Inter, DM Sans, Plus Jakarta Sans, ou similar)
- Espaçamento generoso (whitespace como elemento de design)
- Ícones consistentes (Lucide, Phosphor ou similar)

**Animações & Transições:**
- Scroll-triggered animations (Intersection Observer, sem library pesada)
- Fade-in + slide-up nos cards de cardápio ao entrar no viewport
- Hover effects nos CTAs (scale + shadow transition)
- Números animados (contagem de marmitas vendidas ou similar — se houver dado real)
- Transições de 300-400ms, ease-out, GPU-accelerated (transform/opacity apenas)
- Zero layout shift causado por animação

**Responsividade:**
- Breakpoints: 375px (mobile), 768px (tablet), 1024px (desktop), 1440px (wide)
- Todas as seções devem funcionar em 375px sem scroll horizontal
- CTAs com área de toque mínima de 48x48px
- Pop-up responsivo: bottom-sheet em mobile, modal centralizado em desktop

### 6.5 Acessibilidade (a11y)
- WCAG 2.1 nível AA
- Contraste mínimo 4.5:1 para texto, 3:1 para elementos grandes
- Labels em todos os inputs do pop-up
- Focus visible nos CTAs e links
- Alt text descritivo em todas as imagens
- Semântica HTML5 correta (nav, main, section, article, footer)
- Skip-to-content link

### 6.6 Segurança & Privacidade
- HTTPS obrigatório (Cloudflare garante por padrão)
- CSP (Content Security Policy) headers via Cloudflare
- Sanitização dos inputs do pop-up no client-side (regex WhatsApp, trim nome) + server-side no Apps Script
- Nenhum dado sensível armazenado no browser (localStorage/sessionStorage)
- Consentimento LGPD explícito e registrado (timestamp + IP no Google Sheets)

---

## 7. Stack Técnica & Arquitetura

### 7.1 Stack
| Camada | Tecnologia |
|--------|------------|
| Frontend | HTML5 semântico + CSS3 (custom properties) + JavaScript vanilla (ES6+) |
| Hosting | Cloudflare Pages (free tier) |
| Repositório | GitHub (público ou privado) |
| Tracking | Google Tag Manager (container web) + GA4 |
| Captura de leads | Google Sheets + Google Apps Script (endpoint POST) |
| Imagens | WebP, servidas via Cloudflare CDN |
| DNS/SSL | Cloudflare (SSL automático) |

### 7.2 Estrutura de Arquivos
```
silfit-landing/
├── index.html                    # Landing page principal
├── politica-de-privacidade.html  # Página de privacidade LGPD
├── css/
│   └── styles.css                # Estilos com CSS custom properties
├── js/
│   ├── main.js                   # Lógica principal (animações, scroll)
│   ├── popup.js                  # Lógica do pop-up de captura
│   └── tracking.js               # dataLayer events
├── img/
│   ├── hero.webp
│   ├── silvia.webp               # Foto pessoal (placeholder)
│   ├── marmita-fit-*.webp        # Fotos do cardápio
│   ├── marmita-trad-*.webp
│   └── og-image.jpg              # Open Graph (1200x630)
├── robots.txt
├── sitemap.xml
├── manifest.json                 # PWA minimal (ícone na home)
└── _headers                      # Cloudflare custom headers (CSP, cache)
```

### 7.3 Fluxo do Pop-up & CTA

```
[Usuário clica CTA "Pedir Marmita Fit"]
        │
        ▼
[Pop-up abre — campos: Nome, WhatsApp, checkbox LGPD]
        │
        ├── [Fecha sem preencher] → dataLayer: popup_close
        │
        └── [Preenche e submete]
                │
                ├── dataLayer: generate_lead (nome, phone, source=fit)
                │
                ├── POST assíncrono → Google Apps Script → Google Sheets
                │   (se falhar, não bloqueia o redirect)
                │
                └── Redirect → wa.me/5511986531708?text=Oi+Sílvia!+Meu+nome+é+{nome}.+Quero+fazer+um+pedido+de+Marmita+Fit!+🍱
```

### 7.4 Google Apps Script — Especificação

**Endpoint:** Google Apps Script publicado como Web App (acesso: "Qualquer pessoa")

**Payload esperado (POST JSON):**
```json
{
  "nome": "Ana",
  "whatsapp": "(11) 98765-4321",
  "origem": "cardapio_fit",
  "timestamp": "2026-04-08T14:30:00-03:00",
  "consentimento_lgpd": true,
  "user_agent": "Mozilla/5.0...",
  "page_url": "https://silfit.pages.dev"
}
```

**Planilha de destino — Colunas:**
| Data/Hora | Nome | WhatsApp | Origem (Seção) | Consentimento LGPD | User Agent | URL |

---

## 8. Dúvidas em Aberto / Riscos

### Dúvidas em Aberto

| # | Dúvida | Impacto | Ação Necessária |
|---|--------|---------|-----------------|
| D1 | **Domínio definitivo:** `silfit.com.br` vs `silviafit.com.br` | SEO (brand consistency), backlinks, citações | Marcelo decidir e registrar. Recomendação: `silfit.com.br` para consistência com a brand |
| D2 | **Fotos reais das marmitas:** as imagens do cardápio são de baixa resolução e feitas para print, não para web | UX, conversão, Schema Product | Sílvia tirar novas fotos com luz natural, fundo neutro, celular na horizontal. Guia simples a ser fornecido |
| D3 | **Foto da Sílvia para seção "Sobre"** | E-E-A-T, confiança, conversão | Sílvia fornecer foto pessoal na cozinha ou com as marmitas |
| D4 | **Horário de funcionamento / dias de entrega** | Copy da página, Schema, FAQ | Confirmar com Sílvia: aceita pedidos todo dia? Entrega em quais dias? |
| D5 | **Formas de pagamento aceitas** | FAQ, copy, conversão | Confirmar: Pix? Dinheiro? Cartão? |
| D6 | **Cardápio rotativo ou fixo?** | Arquitetura de manutenção: se rotativo, precisa de um JSON editável; se fixo, hardcode resolve | Confirmar com Sílvia |

### Riscos

| # | Risco | Probabilidade | Impacto | Mitigação |
|---|-------|--------------|---------|-----------|
| R1 | **Sem Google Business Profile:** SEO local opera com ~50% do potencial. Sem GBP não aparece no pack local (mapa) | Alta (confirmado: não tem) | Alto | **Pré-requisito recomendado:** criar GBP antes ou junto com o lançamento. Guia a ser fornecido para Sílvia |
| R2 | **Sem prova social:** seção de depoimentos placeholder reduz confiança | Alta (confirmado: não tem) | Médio | **Tarefa pós-lançamento (sprint 1):** Sílvia coletar 3-5 prints de elogios no WhatsApp (com autorização) nos primeiros 15 dias |
| R3 | **Fotos de baixa qualidade:** imagens do cardápio atual são para print, não performam bem em web (resolução, enquadramento, cor) | Alta | Alto | Sessão de fotos caseira com briefing simples (luz natural, prato branco, ângulo 45°) |
| R4 | **Google Apps Script rate limits:** free tier permite ~20k execuções/dia — suficiente para o volume esperado, mas se viralizar, pode falhar | Baixa | Médio | Fallback no JS: se POST falhar, redirect para WhatsApp acontece mesmo assim. Monitorar via GA4 (comparar `generate_lead` vs linhas na planilha) |
| R5 | **Subdomínio .pages.dev para SEO:** subdomínios gratuitos têm menos autoridade que domínio próprio | Alta | Médio | Migrar para domínio próprio assim que possível. Configurar redirect 301 do .pages.dev para o domínio definitivo |
| R6 | **Manutenção do cardápio:** se Sílvia mudar o cardápio, depende de alguém editar HTML/commit no GitHub | Média | Médio | Estruturar o cardápio em um bloco JSON ou data-attributes que facilite edição por Marcelo sem mexer no layout |

---

## 9. Métricas de Sucesso (KPIs)

### Dashboard Mínimo (GA4 + GSC)

| KPI | Fonte | Meta Mês 1 | Meta Mês 3 | Meta Mês 6 |
|-----|-------|-----------|-----------|-----------|
| Sessões orgânicas | GA4 | 200 | 800 | 2.000 |
| Impressões locais (ABCD) | GSC | 300 | 1.500 | 5.000 |
| CTR no GSC | GSC | 3% | 5% | 7% |
| Posição média keywords primárias | GSC | Top 20 | Top 10 | Top 5 |
| Taxa de conversão pop-up (lead) | GA4 (generate_lead / cta_click) | 10% | 15% | 20% |
| Leads capturados na planilha | Google Sheets | 20 | 80 | 200 |
| Cliques WhatsApp | GA4 (whatsapp_redirect) | 30 | 120 | 300 |
| Lighthouse Mobile Score | Lighthouse | ≥ 90 | ≥ 90 | ≥ 90 |
| Citações em plataformas de IA | Verificação manual | 0 | 1 | 2+ |

### Critério de Sucesso do Projeto
O projeto é considerado bem-sucedido se, em 90 dias pós-lançamento:
1. A página estiver indexada no Google com ≥ 3 keywords locais no top 20
2. Houver ≥ 50 leads capturados na planilha
3. Sílvia reportar aumento perceptível de pedidos vindos "do site"

---

## 10. Roadmap de Implementação

### Fase 1 — Fundação (Semana 1)
- [ ] Decidir domínio definitivo (D1)
- [ ] Criar Google Business Profile da SilFit (R1)
- [ ] Sessão de fotos das marmitas com briefing (R3)
- [ ] Foto da Sílvia para seção Sobre (D3)
- [ ] Confirmar informações operacionais: horários, pagamento, cardápio fixo/rotativo (D4, D5, D6)
- [ ] Configurar repositório GitHub
- [ ] Configurar Google Apps Script + planilha de leads

### Fase 2 — Desenvolvimento (Semanas 2-3)
- [ ] Desenvolver landing page (HTML/CSS/JS)
- [ ] Implementar Schema markup completo
- [ ] Implementar pop-up LGPD + integração Sheets
- [ ] Implementar dataLayer + eventos de tracking
- [ ] Criar página de Política de Privacidade
- [ ] Testes de responsividade (375px → 1440px)
- [ ] Testes de acessibilidade (axe, Lighthouse)
- [ ] Deploy no Cloudflare Pages

### Fase 3 — Lançamento (Semana 4)
- [ ] Configurar Google Search Console + submeter sitemap
- [ ] Configurar GA4 + conectar GTM
- [ ] Validar Schema no Rich Results Test
- [ ] Validar tracking (dataLayer → GTM → GA4)
- [ ] Testar todos os CTAs → WhatsApp (mensagens corretas)
- [ ] Testar fluxo pop-up → Sheets (dados chegando)
- [ ] PageSpeed check (meta ≥ 90)
- [ ] Go live

### Fase 4 — Pós-Lançamento (Semanas 5-8)
- [ ] Coletar depoimentos reais (R2)
- [ ] Monitorar GSC: queries, posições, impressões
- [ ] Monitorar GA4: sessões, eventos, conversões
- [ ] Verificar citabilidade em ChatGPT/Gemini/Perplexity
- [ ] Ajustar meta description e títulos baseado em dados reais do GSC
- [ ] Migrar para domínio próprio quando registrado

---

## Apêndice A — Cardápio Completo (Dados Estruturados)

### Marmitas Fit — 300g — R$ 17,90

| Código | Prato | Ingredientes |
|--------|-------|-------------|
| Fit 1 | Escondidinho de Frango Cremoso | Requeijão light, molho de tomate, arroz branco (ou integral sob pedido) |
| Fit 2 | Carne Moída | Arroz branco (ou integral sob pedido), purê de mandioquinha |
| Fit 3 | Strogonoff de Frango | Arroz branco (ou integral sob pedido), cenoura refogada |
| Fit 4 | Panqueca de Frango Desfiado | Requeijão light, arroz de brócolis, cenoura refogada |

### Marmitas Tradicional — 400g — R$ 19,90

| Código | Prato | Ingredientes |
|--------|-------|-------------|
| Trad 1 | Picadinho de Carne | Arroz, feijão, cenoura refogada |
| Trad 2 | Linguine com Almôndegas | — |
| Trad 3 | Carne Moída | Purê de mandioquinha, arroz |
| Trad 4 | Sobrecoxa de Frango Desossada em Cubos | Molho, arroz, feijão, legumes refogados |

### Combos Promocionais

| Categoria | Qtd | Preço | Preço Unitário |
|-----------|-----|-------|----------------|
| Fit | 10 | R$ 170,00 | R$ 17,00 |
| Fit | 20 | R$ 340,00 | R$ 17,00 |
| Tradicional | 10 | R$ 190,00 | R$ 19,00 |
| Tradicional | 20 | R$ 380,00 | R$ 19,00 |
| Qualquer | 20+ | Sob consulta (WhatsApp) | — |

---

*Documento gerado em 08/04/2026 — PRD SilFit v1.0*
*MZK Performance Digital — Marcelo Zouki*
