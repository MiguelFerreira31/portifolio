# Portfólio — Miguel Cezar Ferreira

Portfólio pessoal de **Miguel Cezar Ferreira**, Desenvolvedor Full Stack (São Paulo, SP).
Site estático de página única, com estética *cyber/terminal*, animações dirigidas por scroll
e um hero renderizado em Canvas 2D.

🔗 **Online:** [singlefuture.com.br/miguel-ferreira](https://singlefuture.com.br/miguel-ferreira/)

---

## 📑 Índice

- [Visão geral](#-visão-geral)
- [Tecnologias utilizadas](#-tecnologias-utilizadas)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Arquitetura do CSS](#-arquitetura-do-css)
- [Arquitetura do JavaScript](#-arquitetura-do-javascript)
- [Seções do site](#-seções-do-site)
- [Design system](#-design-system)
- [Como executar](#-como-executar)
- [Como personalizar](#-como-personalizar)
- [Responsividade](#-responsividade)
- [Deploy](#-deploy)
- [Roadmap](#-roadmap)
- [Contato](#-contato)

---

## 🎯 Visão geral

O projeto foi construído **sem framework e sem build step**: é HTML, CSS e JavaScript puros,
servidos diretamente. A decisão é intencional — o site carrega rápido, não depende de
`node_modules`, não precisa de compilação e pode ser publicado em qualquer hospedagem
estática (GitHub Pages, Vercel, Netlify, S3, Apache).

Apesar de não haver bundler, o código é **modularizado à mão**: o CSS é dividido por camada e
por seção, e o JavaScript é dividido por responsabilidade, com cada módulo isolado em uma
IIFE e comunicação explícita através de um namespace único (`window.Portfolio`).

**Destaques técnicos:**

| Recurso | Implementação |
| --- | --- |
| Preloader animado | Barra de progresso simulada + glitch no nome + saída com timeline GSAP |
| Fundo do hero | Canvas 2D com nebulosa, campo de estrelas e meteoros gerados proceduralmente |
| Terminal | Efeito de digitação linha a linha com syntax highlighting manual |
| Animações de entrada | GSAP `timeline()` encadeada, disparada ao fim do preloader |
| Animações de scroll | GSAP **ScrollTrigger** (reveals, timeline de experiência, barras de progresso) |
| Navegação | GSAP **ScrollToPlugin** com `offsetY` para compensar a navbar fixa |
| Contadores | Números das estatísticas animados de 0 até o alvo ao entrar na viewport |
| Cursor customizado | Dot + ring com easing por `requestAnimationFrame` |
| Filtro de projetos | Filtro por categoria via `data-filter` / `data-cat` com transição GSAP |
| Marquee de stack | Faixa infinita em CSS puro (`@keyframes` + `translateX`), pausa no hover |
| Botão de WhatsApp | Botão flutuante com anéis de pulso, tooltip e entrada animada |

---

## 🛠 Tecnologias utilizadas

### Linguagens e marcação

| Tecnologia | Uso no projeto |
| --- | --- |
| **HTML5** | Marcação semântica (`<section>`, `<nav>`, `<footer>`), atributos `data-*` para ligar comportamento ao markup e `aria-label` nos elementos interativos sem texto |
| **CSS3** | Custom Properties (design tokens), Grid, Flexbox, `clamp()` para tipografia fluida, `@keyframes`, gradientes, `backdrop-filter`, pseudo-elementos e media queries |
| **JavaScript (ES6+)** | `const`/`let`, arrow functions, template literals, IIFEs, `requestAnimationFrame` e Canvas 2D API |

### Bibliotecas (via CDN)

| Biblioteca | Versão | Para que serve |
| --- | --- | --- |
| [**GSAP**](https://gsap.com/) | 3.12.5 | Motor de animação — timelines do hero, preloader, filtros, hovers e micro-interações |
| [**ScrollTrigger**](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) | 3.12.5 | Plugin GSAP — dispara animações conforme o scroll (reveals, parallax, contadores) |
| [**ScrollToPlugin**](https://gsap.com/docs/v3/Plugins/ScrollToPlugin/) | 3.12.5 | Plugin GSAP — scroll suave e programático entre as seções |

> As bibliotecas são carregadas do **cdnjs (Cloudflare)** no fim do `<body>`, para não bloquear
> a renderização inicial.

### Tipografia

| Fonte | Aplicação |
| --- | --- |
| **Orbitron** (400/600/700/900) | Títulos, nome do hero e números — reforça o tom tecnológico |
| **Rajdhani** (300–700) | Fonte base do corpo do texto |
| **Share Tech Mono** | Terminal, labels, tags e todo elemento monoespaçado |

Servidas pelo **Google Fonts** com `preconnect` e `display=swap`.

### APIs do navegador

- **Canvas 2D API** — nebulosa, estrelas e meteoros do hero
- **IntersectionObserver (via ScrollTrigger)** — controle de entrada das seções
- **`requestAnimationFrame`** — loop do cursor customizado e do canvas

### Ferramentas

- **Git / GitHub** — versionamento
- **VS Code** — desenvolvimento

---

## 📁 Estrutura do projeto

```
portifolio/
├── index.html                      # Único arquivo HTML — apenas markup, sem CSS/JS inline
├── README.md
└── assets/
    ├── css/
    │   ├── base.css                # Reset, design tokens, tipografia base, fundo (grid + scanlines)
    │   ├── layout.css              # Navbar, menu mobile, estrutura base das seções, footer
    │   ├── components.css          # Cursor customizado, utilitários de reveal, botão de WhatsApp
    │   ├── responsive.css          # Breakpoints globais (1024px / 768px / 480px)
    │   └── sections/
    │       ├── preloader.css
    │       ├── hero.css            # Canvas, terminal, texto, stats, foto e chips
    │       ├── skills.css
    │       ├── experience.css
    │       ├── projects.css
    │       ├── marquee.css
    │       ├── about.css
    │       └── contact.css
    └── js/
        ├── main.js                 # Bootstrap: registra plugins GSAP e cria o namespace
        └── modules/
            ├── preloader.js
            ├── cursor.js
            ├── nav.js              # Estado no scroll, menu mobile e scroll suave
            ├── hero-canvas.js      # Nebulosa, estrelas e meteoros (Canvas 2D)
            ├── terminal.js         # Efeito de digitação
            ├── hero-animations.js  # Timeline de entrada, parallax e float da foto
            ├── reveal.js           # ScrollTrigger dos elementos e split dos títulos
            ├── counters.js         # Contadores animados
            ├── projects-filter.js  # Filtro por categoria
            ├── skills.js           # Glow nos cards
            ├── contact-form.js     # Feedback visual do envio
            └── whatsapp.js         # Botão flutuante
```

**Princípio adotado:** o `index.html` contém **somente markup**. Nenhuma tag `<style>`,
nenhum bloco `<script>` inline e nenhum handler `onclick=` — todo comportamento é registrado
via `addEventListener` nos módulos, e a ligação entre markup e comportamento é feita por
`id`, classe ou atributo `data-*`.

---

## 🎨 Arquitetura do CSS

Os arquivos seguem uma ordem de cascata deliberada, declarada no `<head>`:

```
base → layout → sections/* → components → responsive
```

1. **`base.css`** — reset, `:root` com os design tokens, `html`/`body`, scrollbar customizada e
   as camadas de fundo (grid e scanlines aplicadas via `body::before` / `body::after`).
2. **`layout.css`** — o que se repete na página inteira: navbar, menu mobile, cabeçalho padrão
   de seção (`.sec-head`, `.sec-title`, `.sec-label`) e footer.
3. **`sections/*.css`** — um arquivo por seção da página. Para mexer no hero, só o
   `sections/hero.css` precisa ser aberto.
4. **`components.css`** — componentes que não pertencem a nenhuma seção: cursor customizado,
   classes utilitárias de animação (`.reveal`, `.split-char`) e o botão flutuante de WhatsApp.
5. **`responsive.css`** — sempre por último, para que os breakpoints sobrescrevam tudo que veio
   antes sem depender de `!important`.

> ⚠️ **A ordem dos `<link>` importa.** Ao adicionar um arquivo novo, insira-o na posição
> correta da cascata dentro do `<head>` do `index.html`.

---

## ⚙️ Arquitetura do JavaScript

### Carregamento

Os scripts ficam no fim do `<body>`, nesta ordem:

1. GSAP + ScrollTrigger + ScrollToPlugin (CDN)
2. `assets/js/main.js` — **sempre antes dos módulos**
3. `assets/js/modules/*.js`

São *classic scripts* (não ES Modules) de propósito: assim o site também funciona ao abrir o
`index.html` direto do disco (`file://`), sem servidor e sem erro de CORS.

### Isolamento e comunicação

Cada módulo é embrulhado em uma **IIFE**, de modo que suas variáveis não vazam para o escopo
global nem colidem com as dos outros arquivos. O que precisa ser chamado de fora é publicado
explicitamente no namespace criado pelo `main.js`:

```js
// main.js
window.Portfolio = window.Portfolio || {};

// terminal.js
window.Portfolio.renderTerminal = renderLines;

// hero-animations.js
window.Portfolio.startHero = startHero;
```

O fluxo de inicialização é encadeado:

```
preloader.js  ──►  Portfolio.startHero()  ──►  Portfolio.renderTerminal()
  (ao terminar)      (hero-animations.js)        (terminal.js)
```

O scroll fica travado (`overflow-y: hidden`) durante o preloader e é liberado por ele ao final
do carregamento.

### Ligação markup ↔ comportamento

| Markup | Módulo responsável |
| --- | --- |
| `data-filter="web"` nos botões e `data-cat="web"` nos cards | `projects-filter.js` |
| `data-target="20"` nos números | `counters.js` |
| Classe `.reveal` | `reveal.js` |
| `#hbg`, `#mobileMenu`, `a[href^="#"]` | `nav.js` |
| `#submitBtn` | `contact-form.js` |

---

## 🧩 Seções do site

| # | Seção | Conteúdo |
| --- | --- | --- |
| 0 | **Preloader** | Barra de progresso e nome com efeito glitch |
| 1 | **Hero** | Nome, cargo, stats animadas, foto com badges e terminal simulado |
| 2 | **Skills** | 7 cards: Back-End, Front-End, IA/Agentes, Cloud & DevOps, Banco de Dados, CMS/WordPress e Práticas |
| 3 | **Experiência** | Timeline com Senac SP, Grupo Webnauta, Engecommerce e Single Future |
| 4 | **Projetos** | Cards filtráveis (Todos / Web App / Arquitetura · IA) |
| 5 | **Stack** | Marquee infinito com as tecnologias dominadas |
| 6 | **Sobre** | Bio, bloco de código `miguel.profile.ts`, formação e certificações |
| 7 | **Contato** | Canais diretos (e-mail, LinkedIn, GitHub, site) e formulário |
| 8 | **Footer** | Links sociais e copyright |

### Projetos em destaque

| Projeto | Stack | Links |
| --- | --- | --- |
| **Cardápio Digital** | React 19, Node.js, Socket.io, PostgreSQL, Prisma, Supabase, Pix EMV, Jest, Zod | [Demo](https://cardapio-digital-delta-two.vercel.app/) · [GitHub](https://github.com/singlefutureadm-agency/cardapio-digital) |
| **Encurtador de URLs** | React, TypeScript, Node.js, Prisma, Bootstrap | [GitHub](https://github.com/MiguelFerreira31/url-shortener) |
| **EXFE** | PHP (MVC próprio), SCSS, SwiperJS | [GitHub](https://github.com/MiguelFerreira31/exfe) |
| **Desafio DevFullStack** | Arquitetura, IA/LLM, API REST | [Proposta](https://singlefuture.com.br/desafio/) |

---

## 🎨 Design system

Todas as cores e medidas recorrentes são **CSS Custom Properties** declaradas em `:root`,
dentro de `assets/css/base.css`:

```css
:root {
    --cyan:   #00e5a8;   /* cor primária — links, bordas, destaques */
    --pink:   #ff0080;   /* acento secundário */
    --purple: #8b00ff;   /* acento terciário */
    --green:  #00ff88;   /* status "disponível" */
    --amber:  #f59e0b;   /* avisos e badges */

    --bg0: #050f14;      /* fundo da página */
    --bg1: #081820;      /* superfícies */
    --bg2: #0d2030;      /* superfícies elevadas */
    --bg3: #112535;      /* bordas e divisores */

    --text:   #cceedd;   /* texto principal */
    --muted:  #4a7a65;   /* texto secundário */
    --muted2: #2d5043;   /* texto desabilitado */

    --glass:  rgba(0, 229, 168, 0.04);
    --border: rgba(0, 229, 168, 0.14);
    --nav-h:  72px;      /* altura da navbar — usada nos offsets de scroll */
}
```

Para trocar a identidade visual do site inteiro, basta alterar esses valores.

---

## 🚀 Como executar

O projeto não tem dependências nem etapa de build.

**Opção 1 — abrir direto:**

```bash
git clone https://github.com/MiguelFerreira31/portifolio.git
cd portifolio
# basta abrir o index.html no navegador
```

**Opção 2 — servidor local (recomendado):**

```bash
# Python 3
python -m http.server 5500

# ou Node.js
npx serve .

# ou, no VS Code, a extensão Live Server → "Open with Live Server"
```

Acesse `http://localhost:5500`.

> ⚠️ É necessária conexão com a internet no primeiro carregamento: GSAP e as fontes vêm de CDN.

---

## ✏️ Como personalizar

| O que mudar | Onde |
| --- | --- |
| Cores, fundo e espaçamento base | `:root` em `assets/css/base.css` |
| Foto do hero | `src` da `<img class="photo-img">` no `index.html` |
| Textos, projetos e experiências | `index.html` (as seções são marcadas por comentários) |
| Números das estatísticas | atributo `data-target` nos elementos `.stat-n` |
| Linhas do terminal | array `lines` em `assets/js/modules/terminal.js` |
| Nova categoria de projeto | `data-filter` no botão + `data-cat` no card |
| Velocidade das animações | parâmetros `duration` / `ease` dos módulos GSAP |
| Número do WhatsApp | link `https://wa.me/...` no `index.html` |

---

## 📱 Responsividade

Layout **desktop-first**, com três breakpoints em `assets/css/responsive.css`:

| Breakpoint | Ajustes principais |
| --- | --- |
| `≤ 1024px` | Hero passa a uma coluna, foto vai para o topo, grids se reorganizam |
| `≤ 768px` | Menu hamburguer assume, timeline e cards viram coluna única, tooltip do WhatsApp some |
| `≤ 480px` | Tipografia reduzida, foto menor, badges flutuantes ocultos |

---

## ☁️ Deploy

Por ser 100% estático, funciona em qualquer host sem configuração:

- **GitHub Pages** — *Settings → Pages → Branch: `main` / root*
- **Vercel / Netlify** — importar o repositório; sem build command, output = raiz
- **Hospedagem tradicional** — enviar `index.html` + a pasta `assets/` via FTP

Preserve a pasta `assets/` junto do `index.html`: os caminhos são relativos.

---

## 🗺 Roadmap

- [ ] Back-end real para o formulário de contato (hoje o envio é apenas feedback visual)
- [ ] Meta tags de SEO e Open Graph
- [ ] Versão em inglês
- [ ] Respeitar `prefers-reduced-motion` nas animações
- [ ] Otimizar a imagem do hero (WebP + `loading="lazy"`)

---

## 📬 Contato

**Miguel Cezar Ferreira** — Full Stack Developer · São Paulo, SP

- 🌐 [singlefuture.com.br/miguel-ferreira](https://singlefuture.com.br/miguel-ferreira/)
- 💼 [linkedin.com/in/miguelcezarferreira](https://linkedin.com/in/miguelcezarferreira)
- 💻 [github.com/MiguelFerreira31](https://github.com/MiguelFerreira31)
- ✉️ miguelccezarferreira@gmail.com

---

<p align="center">Feito com GSAP, Canvas e muito café ☕</p>
