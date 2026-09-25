# 📋 Inventário de Pendências e Próximos Passos — Biosite Konnected

> **Data de Atualização:** 15/09/2026  
> **Status Geral do Projeto:** Fase de Refinamento de Design & Polimento de Conversão (~75% concluído)

---

## 🎯 Visão Executiva do Que Falta

O ecossistema Konnected passou por uma reformulação visual estratégica: os fundos pretos neon (`cyber-bg`, `text-neon-cyan`, etc.) foram substituídos pelo design system **Minimalist Lux / Clean Slate** (fundo gelo `#d6d6d6`, cartões em vidro fosco `glass-panel` com *lit-edge* zenital, tipografia em `slate-900`/`slate-600` e acentos sutis em esmeralda `#10B981`).

Para que o produto esteja 100% pronto para lançamento e produção, restam **3 fases bem delineadas**:

---

## 🧭 Fase 1: Conclusão do Design da Jornada Principal (Imediato)

Esta fase conclui a padronização das páginas que o cliente percorre no funil de compras.

### 1. Refinamento de `carrinho.html` ✅ (Concluído)
- [x] **Limpeza de Fundo Legado:** Removidas as tags `<div class="cyber-bg"></div>` e `<div class="hero-gradient-mesh"></div>`.
- [x] **Barra de Progresso do Wizard (Etapas 1 e 2):**
  - Ajustada trilha de fundo (`bg-slate-300`) e linha de progresso (`#wizard-progress-bar` em `bg-slate-900`).
  - Padronizados os indicadores circulares das etapas (`#step1-indicator`, `#step2-indicator`):
    - *Etapa ativa:* `bg-slate-900 text-white shadow-lux`.
    - *Etapa inativa:* `bg-white/90 text-slate-400 border border-slate-300 shadow-xs`.
- [x] **Cards dos Itens do Carrinho (`renderCart` inline):**
  - Container `#cart-items` com cantos `rounded-2xl`, borda suave e divisor translúcido `divide-slate-200/70`.
  - Polimento dos botões de incremento/decremento dos itens (botão `-` com `bg-slate-200/70 text-slate-700 hover:bg-slate-300`, botão `+` com `bg-slate-900 text-white hover:bg-slate-800`).
- [x] **Card de Resumo Financeiro (`#cart-summary`):**
  - Total Estimado em destaque (`text-slate-900 font-headline-md font-mono`).
  - Nota de esclarecimento sobre manutenção mensal gerenciada de R$ 75,00/mês (opcional).
- [x] **Etapa 2 — Redirecionamento para o WhatsApp:**
  - Card centralizado em vidro fosco (`glass-panel rounded-2xl`) com ícone elegante.
  - Botão principal `#checkout-btn` em verde oficial WhatsApp (`#25D366`), com elevação `shadow-lux` e cantos arredondados modernos `rounded-xl`.
- [x] **Rodapé Institucional:**
  - Substituído pelo rodapé translúcido `bg-white/40 border-t border-slate-300/80 backdrop-blur-md` com links sociais idêntico a `tabela-de-precos.html`.

### 2. Compilação do Tailwind CSS v4 ✅ (Concluído)
- [x] Build de produção executado com sucesso:
  ```bash
  npm run build
  ```
- [x] Classes compiladas e sincronizadas no `styles.css`.

---

## 💎 Fase 2: Recurso Visual de Destaque — Plaquinha 3D Nativa no Hero (GLB)

Substituição da simulação pseudo-3D pelo modelo binário 3D nativo real `NFC_Model.glb` com renderização WebGL via Google `<model-viewer>`.

### 1. Integração do Componente 3D GLB Nativo ✅ (Concluído)
- [x] **Modelo 3D Real:** Utilização direta do asset `NFC_Model.glb` (~1.8 MB) com calibração PBR metálica em tempo real via JavaScript.
- [x] **Renderização via Google `<model-viewer>`:**
  - Carregamento assíncrono e Shadow DOM isolado.
  - Iluminação PBR fotorrealista com sombras suaves dinâmicas (`shadow-intensity="1.5"`).
  - Rotação 360° interativa e auto-rotação contínua sem delay (`auto-rotate-delay="0"` e retomada imediata em `pointerup`/`touchend`).
  - `touch-action="pan-y"` e `disable-zoom` configurados para prevenir interferência no scroll mobile (*anti-event hijacking*).
- [x] **Composição em Camadas & Hero Backdrop:**
  - Texto e botões na camada superior (`z-20`), imunes a achatamento e com clique prioritário.
  - Modelo 3D posicionado em segundo plano (`z-10`) com escala monumental (~740px a 800px).
- [x] **Hotspots 3D Anotados:**
  - 3 pontos tecnológicos na geometria da bobina (Chip NTAG213, Antena 13.56 MHz e Durabilidade 100k+ leituras) com oclusão automática em rotação (*backface culling*).
- [x] **Limpeza de Código e Otimização:**
  - Remoção de ~110 linhas de código JS legado e remoção da pílula/badge inferior para um visual limpo e focado no produto.
  - Atualização da `Content-Security-Policy` no cabeçalho com `blob:` para suporte a Web Workers gráficos.

---

## 📄 Fase 3: Páginas Secundárias e Políticas Institucionais ✅ (Concluído)

Páginas auxiliares que devem seguir a mesma linguagem antes da publicação final.

### 1. `agendamento.html` ✅ (Concluído)
- [x] **Design Clean Slate:** Fundo `#d6d6d6`, remoção de classes legadas (`cyber-bg`, `border-dark-circuit`).
- [x] **Wizard de 3 Passos Polido:**
  - Diagnóstico em 2 etapas com cartões translúcidos e botões escuros `bg-slate-900`.
  - Embed do Google Calendar integrado em moldura Clean Slate com borda translúcida.
  - Indicadores e linha de progresso sincronizados com a paleta ardósia (`bg-slate-900` ativo e `bg-white/90` inativo).

### 2. Páginas de Conformidade Legal e Políticas ✅ (Concluído)
- [x] [`politica-privacidade.html`](file:///h:/DIMITRI/Trabalho/Konnected/4.%20Projetos%20e%20Sistemas/Biosite_Konnected/politica-privacidade.html):
  - Criada em estrita conformidade com a LGPD (Lei nº 13.709/2018), detalhando finalidades de dados para WhatsApp, NFC e Biosites.
- [x] [`termos-uso.html`](file:///h:/DIMITRI/Trabalho/Konnected/4.%20Projetos%20e%20Sistemas/Biosite_Konnected/termos-uso.html):
  - Criada estipulando regras claras sobre o escopo de serviços, taxa de manutenção de R$ 75,00/mês (opcional), prazos de entrega (7 dias) e garantia de 90 dias nas plaquinhas NFC.
- [x] **Links de Navegação Cruzada nos Rodapés:**
  - Inseridos links diretos nos rodapés de `index.html`, `carrinho.html`, `tabela-de-precos.html`, `pacotes-integrados.html`, `servicos-e-produtos.html` e `agendamento.html`.

---

## 🧪 Fase 4: Auditoria de Ponta a Ponta & Checklist de Validação ✅ (Concluído)

- [x] **Fluxo de Adição ao Carrinho:**
  - `tabela-de-precos.html`: Adição de itens sincronizada com badge flutuante `#cart-counter` e botão `#floating-cart`. Contraste de cor corrigido para `bg-slate-900 text-white`.
  - Transição para `carrinho.html`: Leitura de itens do `localStorage ('konnected_cart')` com cálculos em tempo real de quantidade, subtotal e total.
- [x] **Fluxo dos Pacotes Integrados:**
  - `pacotes-integrados.html`: Botão "Selecionar Pacote" conectado à função global `selectPackage(id, name, price)`, gravando o combo no carrinho e redirecionando instantaneamente com link alternativo para agendamento. Botão `#floating-cart` adicionado.
- [x] **Disparo do WhatsApp:**
  - Montagem de URL (`https://wa.me/5561981659192?text=...`) sanitizada em `carrinho.html`, eliminando entidades HTML artificiais (`escapeHTML`) da mensagem e codificando exclusivamente via `encodeURIComponent` com formatação limpa.
- [x] **Responsividade Mobile:**
  - Steppers `+` e `-` ajustados com área de toque ergonômica (36x36px com padding touch de 44px) e espaçamento flexível entre elementos em telas menores (375px e 414px).
  - Títulos e wizards do carrinho e agendamento sem estouro horizontal.

---

## 📊 Matriz de Status Atual

| Página / Recurso | Status Visual | Status Lógico | Próxima Ação |
| :--- | :---: | :---: | :--- |
| [`input.css`](file:///h:/DIMITRI/Trabalho/Konnected/4.%20Projetos%20e%20Sistemas/Biosite_Konnected/input.css) | ✅ 100% | ✅ 100% | Pronto para Produção |
| [`index.html`](file:///h:/DIMITRI/Trabalho/Konnected/4.%20Projetos%20e%20Sistemas/Biosite_Konnected/index.html) | ✅ 100% | ✅ 100% | Pronto (Glass Header + Hero 3D + Vitrine Demos + FAQ) |
| [`pacotes-integrados.html`](file:///h:/DIMITRI/Trabalho/Konnected/4.%20Projetos%20e%20Sistemas/Biosite_Konnected/pacotes-integrados.html) | ✅ 100% | ✅ 100% | Pronto (R$ 75,00/mês opcional + Banner Autonomia) |
| [`tabela-de-precos.html`](file:///h:/DIMITRI/Trabalho/Konnected/4.%20Projetos%20e%20Sistemas/Biosite_Konnected/tabela-de-precos.html) | ✅ 100% | ✅ 100% | Pronto (R$ 75,00/mês e R$ 750,00/ano no Carrinho) |
| [`carrinho.html`](file:///h:/DIMITRI/Trabalho/Konnected/4.%20Projetos%20e%20Sistemas/Biosite_Konnected/carrinho.html) | ✅ 100% | ✅ 100% | Pronto (Wizard + WhatsApp Payload Sanitizado) |
| **Plaquinha 3D Nativa (GLB)** | ✅ 100% | ✅ 100% | **Pronto para Produção (`<model-viewer>`)** |
| [`agendamento.html`](file:///h:/DIMITRI/Trabalho/Konnected/4.%20Projetos%20e%20Sistemas/Biosite_Konnected/agendamento.html) | ✅ 100% | ✅ 100% | **Pronto (Clean Slate + Google Calendar)** |
| [`politica-privacidade.html`](file:///h:/DIMITRI/Trabalho/Konnected/4.%20Projetos%20e%20Sistemas/Biosite_Konnected/politica-privacidade.html) | ✅ 100% | ✅ 100% | **Pronto (LGPD Compliant)** |
| [`termos-uso.html`](file:///h:/DIMITRI/Trabalho/Konnected/4.%20Projetos%20e%20Sistemas/Biosite_Konnected/termos-uso.html) | ✅ 100% | ✅ 100% | **Pronto (Contratos & R$ 75,00/mês opcional)** |
| **Build Tailwind CSS v4** | ✅ 100% | ✅ 100% | **Compilado (`styles.css` 100% sincronizado)** |
