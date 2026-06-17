# Redesign Completo — index.html (Konnected)

> Documento de referência para reconstruir a homepage.
> Mobile-first. Sem dados fictícios. Design premium.

---

## Regras Gerais

### Tipografia — APENAS estas duas fontes

| Uso | Fonte | Pesos |
|-----|-------|-------|
| Headings, brand name, CTAs | **Space Grotesk** | 600, 700 |
| Body, labels, descrições | **Inter** | 400, 500 |

> ❌ **NÃO usar Montserrat.** Remover o import e a classe `.montserrat-font`.

### Paleta de cores (referência rápida)

| Token | Hex | Onde usar |
|-------|-----|-----------|
| `cyber-black` | `#050707` | Background geral |
| `deep-charcoal` | `#0E1111` | Containers, cards |
| `dark-circuit` | `#141919` | Bordas, dividers |
| `electric-emerald` | `#28A789` | CTAs, acentos, glows |
| `primary` | `#66daba` | Texto destaque, ícones |
| `silver-light` | `#E1E3E2` | Texto principal |
| `muted-gray` | `#86948E` | Texto secundário |

---

## Estrutura da Página — Seções em Ordem

A página é um scroll vertical contínuo com 6 seções.

```
┌─────────────────────────────────────────┐
│  1. HERO (fullscreen)                   │
│     Logo + Headline + CTA               │
├─────────────────────────────────────────┤
│  2. MÉTRICAS (3 cards)                  │
│     Brasília · Garantido · 7 dias       │
├─────────────────────────────────────────┤
│  3. O QUE FAZEMOS (3 cards)             │
│     NFC + Biosite + Fotos               │
├─────────────────────────────────────────┤
│  4. COMO FUNCIONA (timeline 4 steps)    │
│     Contato → Análise → Criação →       │
│     Entrega                             │
├─────────────────────────────────────────┤
│  5. CTA FINAL + PACOTES                 │
│     Card de conversão + botões          │
├─────────────────────────────────────────┤
│  6. FOOTER                              │
│     Links sociais + copyright           │
├─────────────────────────────────────────┤
│  [WhatsApp FAB] (flutuante, sempre)     │
└─────────────────────────────────────────┘
```

---

## Seção 1 — HERO (fullscreen)

### Layout Mobile (< 768px)

```
┌──────────────────────────┐
│                          │
│     [Gradient Mesh BG]   │
│                          │
│       ┌────────┐         │
│       │  LOGO  │         │
│       │ 160×160│         │
│       └────────┘         │
│                          │
│    PRESENÇA DIGITAL      │
│         LOCAL            │  ← Space Grotesk 700, 32px
│                          │
│  Seu negócio no topo     │  ← Space Grotesk 600, 20px
│      do Google           │     cor: electric-emerald
│                          │
│  ──── divider ────       │
│                          │
│  Plaquinha NFC + Biosite │  ← Inter 400, 15px
│  + fotos profissionais.  │     cor: silver-light/90
│  Clientes te encontram,  │
│  confiam e ligam.        │
│                          │
│  ┌────────────────────┐  │
│  │   VER PACOTES  →   │  │  ← botão sólido emerald
│  └────────────────────┘  │
│                          │
│    Agendar reunião →     │  ← link de texto, sem botão
│                          │
│     ↓ scroll indicator   │
│                          │
└──────────────────────────┘
```

### Layout Desktop (≥ 768px)

```
┌───────────────────────────────────────────────────────┐
│                                                       │
│  [Gradient Mesh BG + Partículas emerald]              │
│                                                       │
│  ┌─────────────────────┐  ┌────────────────────────┐  │
│  │                     │  │                        │  │
│  │  PRESENÇA           │  │     ┌──────────┐       │  │
│  │  DIGITAL LOCAL      │  │     │   LOGO   │       │  │
│  │                     │  │     │  280×280  │       │  │
│  │  Seu negócio no     │  │     │ (glow)   │       │  │
│  │  topo do Google     │  │     └──────────┘       │  │
│  │                     │  │                        │  │
│  │  ── divider ──      │  │                        │  │
│  │                     │  │                        │  │
│  │  Descrição curta    │  │                        │  │
│  │  ...                │  │                        │  │
│  │                     │  │                        │  │
│  │  [VER PACOTES →]    │  │                        │  │
│  │  Agendar reunião →  │  │                        │  │
│  │                     │  │                        │  │
│  └─────────────────────┘  └────────────────────────┘  │
│                                                       │
│          ↓ scroll indicator (animado)                  │
│                                                       │
└───────────────────────────────────────────────────────┘
```

### Conteúdo do Hero

```
Brand:     "Konnected"          → NÃO é mais o <h1>, usar como label/badge pequeno acima do headline
h1:        "PRESENÇA DIGITAL LOCAL"
Subtítulo: "Seu negócio no topo do Google"
Descrição: "Plaquinha NFC + Biosite + fotos profissionais. 
            Clientes te encontram, confiam e ligam."

CTA 1:     "Ver pacotes"        → botão sólido bg-electric-emerald text-black
CTA 2:     "Agendar reunião"    → link de texto text-primary (SEM botão)
```

### Efeitos Premium do Hero

#### A. Gradient Mesh Animado (fundo)

Substituir o fundo plano por um gradient mesh orgânico que se move lentamente.
Implementar com CSS usando múltiplos `radial-gradient` animados com `@keyframes`:

```css
.hero-gradient-mesh {
    position: absolute;
    inset: 0;
    background: 
        radial-gradient(ellipse at 20% 50%, rgba(40, 167, 137, 0.15) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, rgba(102, 218, 186, 0.08) 0%, transparent 40%),
        radial-gradient(ellipse at 50% 80%, rgba(40, 167, 137, 0.1) 0%, transparent 45%);
    animation: mesh-drift 15s ease-in-out infinite alternate;
    pointer-events: none;
}

@keyframes mesh-drift {
    0% { 
        background-position: 0% 0%, 100% 0%, 50% 100%; 
        filter: blur(60px);
    }
    50% { 
        background-position: 30% 20%, 70% 50%, 20% 60%; 
        filter: blur(80px);
    }
    100% { 
        background-position: 10% 40%, 90% 10%, 60% 80%; 
        filter: blur(60px);
    }
}
```

#### B. Scroll Indicator Animado

Um chevron `↓` que pulsa suavemente no bottom do hero:

```css
.scroll-indicator {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    animation: bounce-gentle 2s ease-in-out infinite;
    opacity: 0.6;
    color: var(--primary);
}

@keyframes bounce-gentle {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(8px); }
}
```

#### C. Logo com Glow Melhorado

Manter o pulse-glow mas com intensidade reduzida (mais sutil, mais premium):

```css
.logo-glow {
    animation: logo-pulse 4s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
}

@keyframes logo-pulse {
    0%, 100% { box-shadow: 0 0 20px rgba(40, 167, 137, 0.15), 0 0 60px rgba(40, 167, 137, 0.05); }
    50% { box-shadow: 0 0 30px rgba(40, 167, 137, 0.25), 0 0 80px rgba(40, 167, 137, 0.1); }
}
```

---

## Seção 2 — MÉTRICAS (Trust Badges)

> **IMPORTANTE:** Como não há clientes ainda, usar métricas de COMPROMISSO, não de prova social.

### Layout Mobile

```
┌──────────────────────────┐
│                          │
│  ┌──────┐┌──────┐┌──────┐│
│  │  📍  ││  ✅  ││  ⏱   ││
│  │Brasí-││Resul-││Entre-││
│  │lia,  ││tado  ││ga em ││
│  │ DF   ││garan-││7 dias││
│  │      ││tido  ││      ││
│  └──────┘└──────┘└──────┘│
│                          │
└──────────────────────────┘
```

### Conteúdo dos 3 Cards

| Ícone (Material) | Headline | Subtext |
|-------------------|----------|---------|
| `location_on` | **Brasília, DF** | Atendimento presencial na sua região |
| `verified` | **Resultado garantido** | Se não gostar, refazemos sem custo |
| `schedule` | **Entrega em 7 dias** | Do primeiro contato ao site publicado |

### Implementação

- 3 colunas iguais em todas as telas (usar `grid grid-cols-3 gap-3`)
- Glass panel com borda emerald/20
- Ícone em `text-primary`, tamanho 28px
- Texto em `font-label-sm`, uppercase, tracking-wider
- No mobile: texto com `text-[10px]`, ícone `text-[22px]`
- Animação: reveal com stagger de 100ms entre cada card

---

## Seção 3 — O QUE FAZEMOS (Serviços)

### Layout Mobile

```
┌──────────────────────────┐
│                          │
│  O que fazemos pelo      │  ← h2 Space Grotesk 24px
│  seu negócio             │
│  ── emerald underline ── │
│                          │
│  ┌────────────────────┐  │
│  │  ┌──┐              │  │
│  │  │🔖│ Plaquinha     │  │  Card 1 (full width)
│  │  └──┘  NFC + QR    │  │
│  │  Avaliações auto-  │  │
│  │  máticas via chip  │  │
│  │  de aproximação    │  │
│  └────────────────────┘  │
│                          │
│  ┌────────────────────┐  │
│  │  ┌──┐              │  │
│  │  │🌐│ Biosite      │  │  Card 2 (full width)
│  │  └──┘  Profissional│  │
│  │  Site compacto,    │  │
│  │  ultra-rápido, no  │  │
│  │  seu domínio       │  │
│  └────────────────────┘  │
│                          │
│  ┌────────────────────┐  │
│  │  ┌──┐              │  │
│  │  │📷│ Sessão       │  │  Card 3 (full width)
│  │  └──┘  Fotográfica │  │
│  │  Fotos premium do  │  │
│  │  seu estabeleci-   │  │
│  │  mento             │  │
│  └────────────────────┘  │
│                          │
│  [VER TODOS OS SERVIÇOS]→│  ← link texto
│                          │
└──────────────────────────┘
```

### Layout Desktop — 3 colunas

```
┌───────────────────────────────────────────────────────┐
│                                                       │
│  O que fazemos pelo seu negócio                       │
│  ────── emerald underline ──────                      │
│                                                       │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐         │
│  │   🔖 NFC  │  │  🌐 Bio   │  │  📷 Foto  │         │
│  │           │  │   site    │  │           │         │
│  │  Avalia-  │  │  Site     │  │  Fotos    │         │
│  │  ções ... │  │  compact..│  │  premium..│         │
│  │           │  │           │  │           │         │
│  └───────────┘  └───────────┘  └───────────┘         │
│                                                       │
│             [ VER TODOS OS SERVIÇOS → ]               │
│                                                       │
└───────────────────────────────────────────────────────┘
```

### Conteúdo dos 3 Cards

| Ícone (Material) | Título | Descrição |
|-------------------|--------|-----------|
| `nfc` | **Plaquinha NFC + QR Code** | Avaliações automáticas no Google via chip de aproximação. O cliente encosta o celular e já avalia. |
| `language` | **Biosite Profissional** | Site compacto, ultra-rápido, publicado no seu domínio. Carrega em < 1 segundo. |
| `photo_camera` | **Sessão Fotográfica** | Fotos profissionais do seu estabelecimento para Google, redes sociais e biosite. |

### Estilo dos Cards

```
- bg-surface-container (ou glass-panel)
- border: 1px solid dark-circuit
- hover: border-primary + neon-glow sutil
- border-top: 1px solid rgba(255,255,255,0.05) — "lit edge"
- rounded-xl (12px)
- padding: 20px
- Ícone: 32px, cor primary, dentro de um círculo bg-primary/10
- Título: Space Grotesk 18px semibold, text-primary
- Descrição: Inter 14px, text-muted-gray
- Transição: hover scale(1.02) + glow
```

---

## Seção 5 — COMO FUNCIONA (Timeline)

> Mostra o processo em 4 passos visuais. Gera confiança para quem não te conhece.

### Layout Mobile (vertical)

```
┌──────────────────────────┐
│                          │
│  Como funciona           │  ← h2
│  ── emerald underline ── │
│                          │
│  ① ─── linha vertical    │
│  │                       │
│  ┌────────────────────┐  │
│  │ 01  Contato        │  │
│  │ Você entra em      │  │
│  │ contato pelo       │  │
│  │ WhatsApp ou agenda │  │
│  │ uma reunião        │  │
│  └────────────────────┘  │
│  │                       │
│  ② ─── linha vertical    │
│  │                       │
│  ┌────────────────────┐  │
│  │ 02  Análise        │  │
│  │ Analisamos o seu   │  │
│  │ negócio e criamos  │  │
│  │ a estratégia       │  │
│  └────────────────────┘  │
│  │                       │
│  ③ ─── linha vertical    │
│  │                       │
│  ┌────────────────────┐  │
│  │ 03  Criação        │  │
│  │ Produzimos o       │  │
│  │ biosite, plaquinha  │  │
│  │ e sessão de fotos  │  │
│  └────────────────────┘  │
│  │                       │
│  ④                       │
│  ┌────────────────────┐  │
│  │ 04  Entrega        │  │
│  │ Tudo pronto e      │  │
│  │ funcionando em     │  │
│  │ até 7 dias         │  │
│  └────────────────────┘  │
│                          │
└──────────────────────────┘
```

### Implementação da Timeline

```
- Container: flex flex-col gap-0
- Cada step: flex flex-row gap-4
  - Lado esquerdo: número (01-04) + linha vertical conectando
  - Lado direito: card com título + descrição
- Número: Space Grotesk 40px, text-primary/30 (bem transparente)
- Linha vertical: 2px width, bg-outline-variant, height auto (flex grow)
- Card: bg-surface-container-low, border-l-2 border-primary, pl-4, py-3
- Animação: cada step revela com delay progressivo (stagger)
```

### 4 Steps — Conteúdo

| # | Título | Descrição | Ícone |
|---|--------|-----------|-------|
| 01 | **Contato** | Você entra em contato pelo WhatsApp ou agenda uma reunião gratuita. | `chat` |
| 02 | **Análise** | Analisamos o seu negócio, concorrência e região para montar a melhor estratégia. | `analytics` |
| 03 | **Criação** | Produzimos tudo: biosite, plaquinha NFC, fotos profissionais e configuração do Google. | `build` |
| 04 | **Entrega** | Em até 7 dias, tudo pronto e funcionando. Você começa a receber avaliações. | `rocket_launch` |

---

## Seção 6 — CTA FINAL + CARD DE PACOTES

### Layout Mobile

```
┌──────────────────────────┐
│                          │
│  ┌────────────────────┐  │
│  │ ╔═══════════════╗  │  │
│  │ ║  Glow corner  ║  │  │
│  │ ╚═══════════════╝  │  │
│  │                    │  │
│  │  Pronto para      │  │
│  │  dominar o        │  │
│  │  Google Maps?     │  │  ← Space Grotesk 24px
│  │                    │  │
│  │  Pacotes a partir │  │
│  │  de R$ 227        │  │  ← Inter 16px, muted
│  │                    │  │
│  │  ┌──────────────┐ │  │
│  │  │ VER PACOTES →│ │  │  ← botão sólido
│  │  └──────────────┘ │  │
│  │                    │  │
│  │  Agendar reunião →│  │  ← link texto
│  │                    │  │
│  └────────────────────┘  │
│                          │
└──────────────────────────┘
```

### Estilo do Card

```
- glass-panel com borda electric-emerald/50
- rounded-xl (16px)
- padding: 32px no mobile, 40px no desktop
- Gradient glow no canto superior direito (bg-gradient-top-right at 5% opacity)
- hover: borda fica full emerald + glow expande
- CTA primário: bg-electric-emerald text-black, full width no mobile
- CTA secundário: text-primary com underline on hover
```

---

## Seção 7 — FOOTER

### Layout (igual em todos os breakpoints)

```
┌──────────────────────────┐
│  ── divider (circuit) ── │
│                          │
│  [WhatsApp] [Instagram]  │
│  [E-mail]                │
│                          │
│  Konnected © 2026        │
│  Presença Digital Local  │
│                          │
└──────────────────────────┘
```

### Conteúdo

- 3 ícones sociais em row, com labels (`text-[10px]`)
- Copyright em `text-[10px]` uppercase tracking-widest
- **Script JS movido PARA FORA do footer** — colocar antes de `</body>`

### Links Sociais

| Ícone | Label | URL |
|-------|-------|-----|
| `chat` | WhatsApp | `https://wa.me/5561981659192?text=...` |
| `photo_camera` | Instagram | `https://www.instagram.com/konnected.sd/` |
| `mail` | E-mail | `mailto:contato@konnected.sd` (substituir pelo email real) |

---

## Elemento Flutuante — WhatsApp FAB

Um botão de WhatsApp fixo no canto inferior direito, em TODAS as páginas.

```
┌──────────────────────────┐
│                          │
│                          │
│                          │
│                    ┌──┐  │
│                    │💬│  │  ← 56×56px, bg-[#25D366]
│                    └──┘  │     position: fixed
│                          │     bottom: 20px, right: 20px
└──────────────────────────┘
```

### Implementação

```html
<a href="https://wa.me/5561981659192?text=Oi!%20Quero%20saber%20mais%20sobre%20a%20Konnected"
   target="_blank"
   rel="noopener noreferrer"
   class="fixed bottom-5 right-5 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
   aria-label="Fale conosco pelo WhatsApp">
    <span class="material-symbols-outlined text-white text-[28px]">chat</span>
    <!-- Pulse ring -->
    <span class="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
</a>
```

---

## Dicas Extras de Premium

### 1. Cursor Glow (desktop only)

Um círculo suave que segue o cursor, criando um efeito de lanterna:

```css
@media (hover: hover) {
    .cursor-glow {
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(40, 167, 137, 0.06) 0%, transparent 70%);
        pointer-events: none;
        z-index: 1;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s;
    }
}
```

```javascript
// Apenas no desktop
if (window.matchMedia('(hover: hover)').matches) {
    const glow = document.createElement('div');
    glow.classList.add('cursor-glow');
    document.body.appendChild(glow);
    
    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });
}
```

### 2. Text Reveal com Gradient (headline)

O headline aparece com um gradiente que "preenche" da esquerda para direita:

```css
.text-gradient-reveal {
    background: linear-gradient(90deg, #E1E3E2 0%, #E1E3E2 50%, rgba(225,227,226,0.3) 50%, rgba(225,227,226,0.3) 100%);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: text-fill 1.2s ease-out forwards;
}

@keyframes text-fill {
    from { background-position: 100% 0; }
    to { background-position: 0% 0; }
}
```

### 3. Número Animado (opcional, para futuro)

Quando tiver clientes reais, adicionar contadores que animam de 0 até o número:

```javascript
function animateCounter(el, target) {
    let current = 0;
    const step = target / 60; // 60 frames (~1 segundo)
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current);
        }
    }, 16);
}
```

### 4. Imagens com Parallax Sutil

Aplicar parallax leve (5-15%) nas imagens ao scrollar:

```css
.parallax-img {
    transform: translateY(var(--parallax-offset, 0));
    transition: transform 0.1s linear;
}
```

```javascript
window.addEventListener('scroll', () => {
    document.querySelectorAll('.parallax-img').forEach(img => {
        const rect = img.getBoundingClientRect();
        const offset = (rect.top - window.innerHeight / 2) * 0.08;
        img.style.setProperty('--parallax-offset', offset + 'px');
    });
});
```

---

## Checklist de Mudanças vs. Atual

| Item | Antes | Depois |
|------|-------|--------|
| Headline `<h1>` | "Konnected" (brand name) | "PRESENÇA DIGITAL LOCAL" |
| Subtítulo | "Soluções Digitais" | "Seu negócio no topo do Google" |
| Descrição | Texto longo genérico | Texto curto e direto |
| Fonte do brand | Montserrat | Space Grotesk |
| CTA principal | "VER SERVIÇOS E PRODUTOS" | "Ver pacotes" |
| CTA secundário | "Agendar Reunião" (botão) | "Agendar reunião" (link texto) |
| Métricas | "Resultado Rápido / Atendimento Local / Clientes Satisfeitos" | "Brasília, DF / Resultado garantido / Entrega em 7 dias" |
| Seção vídeo | ❌ Não existe | ✅ Scroll-driven video |
| Seção Como Funciona | ❌ Não existe | ✅ Timeline 4 steps |
| WhatsApp FAB | ❌ Não existe | ✅ Botão fixo |
| Gradient mesh | ❌ Fundo plano | ✅ Gradient orgânico animado |
| Cursor glow | ❌ Não existe | ✅ Desktop only |
| Script no footer | ❌ Dentro do `<footer>` | ✅ Antes de `</body>` |
| Import Montserrat | ❌ Carregando sem usar | ✅ Removido |

---

## Prioridade de Implementação

1. **Reestruturar HTML** — novas seções, novo conteúdo, script fora do footer
2. **Hero redesign** — gradient mesh, novo copy, CTAs corretos
3. **Métricas honestas** — 3 cards com dados reais
4. **Seção "Como Funciona"** — timeline 4 steps
5. **WhatsApp FAB** — botão flutuante
6. **Scroll video** — implementar o player (pode ser sem vídeo inicialmente, usando poster)
7. **Efeitos premium** — cursor glow, text reveal, parallax
8. **Limpar CSS** — remover Montserrat, unificar config
