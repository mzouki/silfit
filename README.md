# SilFit — Landing Page

Landing page profissional para a SilFit (marmitas fit/tradicional caseiras de Sílvia, Santo André/SP).

**Stack:** HTML5 + CSS3 + JavaScript vanilla (zero dependências, zero build).
**Deploy:** Cloudflare Pages (free) via GitHub.

---

## Estrutura

```
SilFit/
├── index.html                   # Landing page principal (10 seções)
├── politica-de-privacidade.html # Página LGPD
├── css/
│   └── styles.css               # Estilos completos com CSS variables
├── js/
│   ├── main.js                  # Header scroll, reveals, FAQ, smooth nav
│   ├── popup.js                 # Pop-up LGPD + redirect WhatsApp
│   └── tracking.js              # dataLayer GTM-ready
├── img/
│   └── favicon.svg              # Substituir por imagens reais
├── robots.txt                   # AI bots permitidos (GPT, Claude, Perplexity, Google)
├── sitemap.xml
├── manifest.json                # PWA minimal
├── _headers                     # Cloudflare headers (CSP, cache)
└── PRD-SilFit-Landing-Page-v1.0.md
```

---

## Antes do Go-Live: TODOs obrigatórios

### 1. Imagens reais (`img/`)
Substituir os placeholders:
- `og-image.jpg` (1200×630) — imagem para Open Graph / WhatsApp
- `hero.webp` — foto principal do hero
- `silvia.webp` — foto da Sílvia (seção Sobre)
- `marmita-fit-01.webp` … `marmita-fit-04.webp`
- `marmita-trad-01.webp` … `marmita-trad-04.webp`
- `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`

> Após adicionar, atualize as referências `<div class="photo-placeholder">` no `index.html` para `<img src="...">`.

### 2. Apps Script (captura de leads)
1. Crie uma planilha Google chamada `SilFit Leads` com colunas: Data/Hora, Nome, WhatsApp, Origem, Tipo, Consentimento, User Agent, URL.
2. Em `Extensões → Apps Script`, cole o snippet abaixo:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads');
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(data.timestamp),
    data.nome,
    data.whatsapp,
    data.origem,
    data.tipo,
    data.consentimento_lgpd,
    data.user_agent,
    data.page_url
  ]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true }));
}
```

3. `Implantar → Nova implantação → Tipo: Web app → Acesso: Qualquer pessoa`. Copie o URL.
4. Cole o URL em `js/popup.js` na linha `appsScriptUrl`.

### 3. GTM
1. Criar container Web em `tagmanager.google.com`.
2. Substituir `GTM-XXXXXXX` no `index.html` (linha do script GTM, atualmente comentada — descomentar e colar o ID).
3. Configurar tags no GTM: GA4 Configuration + eventos `cta_click`, `generate_lead`, `whatsapp_redirect`, etc.

### 4. Domínio
- Registrar `silfit.com.br` (recomendado) e configurar no Cloudflare Pages.
- Atualizar todas as URLs absolutas no HTML (`canonical`, `og:url`, schema `@id`) de `silfit.pages.dev` para `silfit.com.br`.

---

## Deploy no Cloudflare Pages — Passo a passo

### 1. Criar repositório no GitHub
```bash
cd /Users/mzouki/Documents/ClaudeCode/WebDev/SilFit
git init
git add .
git commit -m "feat: SilFit landing page v1.0"
gh repo create silfit --public --source=. --push
```

### 2. Conectar ao Cloudflare Pages
1. Acesse [dash.cloudflare.com](https://dash.cloudflare.com)
2. **Workers & Pages → Create → Pages → Connect to Git**
3. Selecione o repositório `silfit`
4. Configurações de build:

| Campo | Valor |
|---|---|
| Framework preset | `None` (ou "Static HTML") |
| Build command | (deixar vazio) |
| Build output directory | `/` |
| Root directory | (deixar vazio) |

5. **Save and Deploy**

Pronto. Em ~30s o site estará no ar em `https://silfit.pages.dev`.

### 3. Custom domain (opcional)
1. No projeto do Cloudflare Pages → **Custom domains → Set up a custom domain**
2. Digite `silfit.com.br` (ou `www.silfit.com.br`)
3. Siga as instruções de DNS

---

## Testes pós-deploy

Antes de divulgar, validar:

- [ ] **Lighthouse mobile ≥ 90** em todas as métricas (Performance, A11y, Best Practices, SEO)
- [ ] [Rich Results Test](https://search.google.com/test/rich-results) — validar todos os schemas JSON-LD
- [ ] [WhatsApp link preview](https://developers.facebook.com/tools/debug/) — testar OG image
- [ ] CTAs do popup → WhatsApp com mensagem correta para cada tipo
- [ ] Pop-up envia para Apps Script (verificar planilha)
- [ ] dataLayer eventos disparando (GTM Preview)
- [ ] Mobile 375px sem scroll horizontal
- [ ] FAQ accordion expande/colapsa
- [ ] Smooth scroll funciona
- [ ] Política de Privacidade abre

---

## Otimizações já implementadas

### SEO Técnico
- ✅ Title + meta description otimizadas (keywords primárias)
- ✅ Schema.org **FoodEstablishment** completo (LocalBusiness)
- ✅ Schema **Menu** com todos os pratos e preços
- ✅ Schema **FAQPage** (todas as 7 perguntas)
- ✅ Schema **WebSite** + **BreadcrumbList**
- ✅ Open Graph + Twitter Cards
- ✅ Canonical URL
- ✅ Sitemap.xml e robots.txt
- ✅ Geo meta tags (Santo André/SP)
- ✅ Heading hierarchy (H1 único → H2 por seção → H3)

### GEO/AEO (otimização para IAs)
- ✅ Bots de IA explicitamente permitidos no robots.txt: GPTBot, ChatGPT-User, OAI-SearchBot, Google-Extended, PerplexityBot, anthropic-ai, ClaudeBot, CCBot
- ✅ Conteúdo estruturado em formato Q&A (FAQ) citável por LLMs
- ✅ Frases declarativas e factuais no copy ("A SilFit entrega marmitas fit em Santo André...")
- ✅ Dados citáveis: preços exatos, bairros, cardápio completo
- ✅ Entidade nomeada consistente ("SilFit")
- ✅ Schema rich para identificação de tipo de negócio + localização

### Performance
- ✅ Sem framework, sem build, ~50KB gzip total (HTML+CSS+JS)
- ✅ Fontes preconnect + display=swap
- ✅ Imagens lazy loading (quando reais forem adicionadas)
- ✅ CSS critical inline-ready (já é único arquivo otimizado)
- ✅ JS defer (não bloqueia render)
- ✅ Cache headers via `_headers`
- ✅ `prefers-reduced-motion` respeitado

### Acessibilidade
- ✅ WCAG 2.1 AA: contraste, focus states, ARIA labels
- ✅ Skip-to-content link
- ✅ Semântica HTML5 (header/main/section/article/footer)
- ✅ Pop-up com `role="dialog"` + `aria-modal`
- ✅ Touch targets ≥ 48×48px
- ✅ Form labels + aria

### LGPD
- ✅ Pop-up com checkbox de consentimento explícito
- ✅ Link para Política de Privacidade
- ✅ Página de Política completa (10 seções)
- ✅ Timestamp + IP registrados

---

## Manutenção do cardápio

Para atualizar pratos/preços:
1. Edite os blocos `<article class="menu-card">` no `index.html` (Cardápio Fit / Tradicional)
2. Atualize também o **Schema** JSON-LD no `<head>` (seção `hasMenu`)
3. Commit + push → Cloudflare faz rebuild automático

---

## Suporte

**Cliente:** Sílvia (SilFit)
**Desenvolvedor:** Marcelo Zouki — MZK Performance Digital
**Versão atual:** 1.0
**Última atualização:** 8 de abril de 2026
