# GUIA DE CONTEXTO E ESPECIFICAÇÕES DO SISTEMA — KONNECTED BIOSITE

> **Status:** Documento Mestre de Referência / Single Source of Truth (SSOT)  
> **Última Atualização:** Março/2026  
> **Projeto:** Biosite Konnected (Presença Digital Local para Negócios Físicos)

---

## 1. Visão Geral do Produto e Modelo de Negócio

A **Konnected** fornece soluções completas de **Presença Digital Local** para comércios, prestadores de serviços e empresas físicas que necessitam de destaque nas buscas locais do Google e conversão direta de clientes via canais digitais (WhatsApp, Instagram, Agendamentos).

### Pilares de Entrega:
1. **Plaquinhas e Displays Físicos Inteligentes com NFC / QR Code:** Conexão física entre o balcão/mesa da loja e o ambiente digital (avaliações no Google, cardápios, biosite).
2. **Biosites de Alta Performance:** Landing pages ultrarrápidas, mobile-first, sem dependência de plataformas lentas como Linktree.
3. **Google Meu Negócio (GMN):** Otimização, cadastro e ranqueamento no topo do mapa local de buscas.
4. **Fotografia Comercial:** Produção visual profissional de ambientes, produtos e equipe para alimentar o GMN e o Biosite.
5. **Pacotes Integrados:** Soluções combinadas que entregam valor unificado com desconto para o cliente final.

---

## 2. Stack Tecnológica e Infraestrutura

O sistema é construído como uma aplicação web estática de altíssima performance, com zero custo fixo de backend e carregamento instantâneo.

| Camada | Tecnologia / Ferramenta | Detalhes & Configuração |
| :--- | :--- | :--- |
| **Markup** | HTML5 Semântico | Arquitetura de arquivos estáticos acessíveis |
| **Estilização** | Tailwind CSS v4 | Compilador CLI nativo (`@tailwindcss/cli` `^4.3.2`) |
| **CSS de Entrada** | `input.css` | Define `@theme`, fontes, animações e tokens de cor |
| **CSS Gerado** | `styles.css` | Artefato gerado via `npm run build` |
| **Scripts Interativos** | JavaScript Vanilla (`ES6+`) | Sem frameworks pesados; foco em agilidade |
| **Estado Local** | Web Storage API (`localStorage`) | Persistência do carrinho sob a chave `'konnected_cart'` |
| **Integrações** | WhatsApp API (`wa.me`) & Google Calendar | Conversão consultiva direta e agendamento via embed |
| **Tipografia** | Google Fonts | `Space Grotesk` (Títulos), `Inter` (Corpo), `JetBrains Mono` (Dados) |

### Scripts do `package.json`:
- `npm run build`: `tailwindcss -i ./input.css -o ./styles.css`
- `npm run watch`: `tailwindcss -i ./input.css -o ./styles.css --watch`

---

## 3. Mapa de Arquitetura de Páginas

```
/ (Raiz do Projeto)
│
├── index.html                  # Landing page principal (Hero, Proposta, Destaques, Conversão)
├── servicos-e-produtos.html     # Catálogo detalhado das soluções individuais
├── pacotes-integrados.html     # Tabela comparativa e vitrine dos combos/pacotes
├── tabela-de-precos.html       # Catálogo interativo com botões de adicionar ao carrinho
├── carrinho.html               # Wizard de 2 etapas: revisão de produtos e checkout para WhatsApp
├── agendamento.html            # Embed do Google Calendar para agendamento de reuniões
│
├── input.css                   # Definição do Tailwind v4, temas e animações
├── styles.css                  # CSS compilado de produção (NÃO editar manualmente)
│
├── js/
│   └── cart.js                 # Gerenciamento de estado do carrinho (get, add, remove, UI sync)
│
├── context/                    # Documentos de diretrizes, design e contexto para IAs e devs
│   ├── GUIA_SISTEMA_CONTEXTO.md # [ESTE ARQUIVO] Documento mestre do sistema
│   ├── DESIGN.md               # Especificação visual original
│   ├── hero.md                 # Diretrizes de copy realista para a seção Hero
│   ├── redesign-index.md       # Planejamento do redesign da página inicial
│   └── resumo-produtos-servicos.md # Tabela de preços e regras de cobrança
│
└── demos_biosites/             # Demos e exemplos visuais de biosite para clientes
```

---

## 4. Tabela Canônica de Preços e Serviços

> **Regra de Negócio Crucial:** A manutenção mensal do Biosite (**R$ 75,00/mês** para hospedagem, domínio, SSL e suporte) é opcional e cobrada separadamente em todos os produtos e pacotes. O cliente tem autonomia para manter e hospedar por conta própria.

### Produtos Individuais:
- **Plaquinha Básica sem NFC:** R$ 44,90
- **Plaquinha Básica com NFC:** R$ 59,90
- **Plaquinha Premium sem NFC:** R$ 69,90
- **Plaquinha Premium com NFC:** R$ 89,90
- **Cartão de Visita NFC (unidade):** R$ 30,00 *(Mínimo recomendado: 4 unidades)*
- **Biosite (Criação + Publicação):** R$ 150,00 *(Valor único) + R$ 75,00/mês ou R$ 750,00/ano (opcional)*
- **Google Meu Negócio:**
  - Configuração Completa (sem fotos): R$ 97,00
  - Configuração + Fotos do cliente: R$ 137,00
  - Configuração + Sessão Fotográfica Profissional: R$ 297,00
- **Fotografia Comercial:**
  - Sessão Básica (20 fotos editadas): R$ 197,00
  - Sessão Completa (40 fotos editadas): R$ 347,00

### Pacotes Integrados:
1. **Entrada (R$ 227,00):** Plaquinha Básica NFC + Biosite + Google Meu Negócio.
2. **Profissional (R$ 547,00):** Plaquinha Premium NFC + Biosite + Google Meu Negócio + 20 fotos profissionais.
3. **Completo (R$ 697,00):** Plaquinha Premium NFC + Biosite + Google Meu Negócio + 40 fotos profissionais.
4. **Digital Total (R$ 747,00):** Versão expandida com combos adicionais.

---

## 5. Design System & Evolução Visual

O projeto passou por uma evolução visual documentada no `input.css`:

### Paleta Vigente (Minimalist Lux / Clean Slate):
- **Background Principal:** `#d6d6d6` (Tom "Gelo" sofisticado, quebrando o padrão genérico de branco estourado).
- **Surface / Cards:** `glass-panel` com `rgba(255, 255, 255, 0.6)` e `backdrop-filter: blur(24px)`.
- **Texto Principal e Destaques Primários:** `--color-slate-900: #0F172A`.
- **Texto Secundário / Corpo:** `--color-slate-600: #475569`.
- **Detalhes e Bordas:** `--color-slate-300: #CBD5E1` e `--color-slate-200: #E2E8F0`.

### Retrocompatibilidade de Classes:
Para evitar quebra em páginas legadas, classes como `.selection:bg-electric-emerald` ou referências a `electric-emerald` foram remapeadas no `@theme` para apontar para o tom ardósia escuro `--color-slate-900` (`#0F172A`).

### Tipografia:
- **Títulos (`font-display-xl`, `font-headline-lg`, `font-headline-md`):** `Space Grotesk`, peso 600 ou 700.
- **Corpo e Rótulos (`font-body-lg`, `font-body-md`, `font-label-sm`):** `Inter`.
- **Preços e Códigos (`font-mono`):** `JetBrains Mono`.

---

## 6. Fluxo Lógico do Carrinho e Conversão

1. **Seleção de Produtos:** O cliente interage com a página `tabela-de-precos.html`.
2. **Funções do `js/cart.js`:**
   - `addToCart(id, name, price)`: Incrementa a quantidade no objeto do carrinho.
   - `removeFromCart(id)`: Decrementa ou remove o item se chegar a zero.
   - `saveCart(cart)`: Serializa no `localStorage` sob a chave `'konnected_cart'` e chama `updateCartUI()`.
   - `updateCartUI()`: Atualiza badge flutuante de carrinho e os contadores de itens na tela.
3. **Página `carrinho.html` (Wizard de 2 Passos):**
   - **Passo 1 (Revisão):** Lista os itens selecionados, quantidades, subtotal e total geral.
   - **Passo 2 (Contato / Envio):** Solicita nome e WhatsApp do cliente, gera o texto do pedido estruturado e dispara para o WhatsApp comercial da Konnected com mensagem pré-formatada.

---

## 7. Diretrizes para Futuras Alterações e Prompts

Ao solicitar alterações ou implementar melhorias neste projeto, siga as diretrizes abaixo:

1. **Sempre rodar o build do CSS:** Toda alteração de estilos deve ser feita no `input.css`. Nunca edite `styles.css` diretamente. Após alterar o CSS, execute `npm run build`.
2. **Respeitar o Tom e a Honestidade de Copy:** Conforme documentado em `context/hero.md`, nunca inclua números fictícios (ex.: "mais de 10.000 clientes atendidos"). Destaque métricas honestas: Atendimento Local em Brasília-DF, Entrega em 7 dias, Comprometimento com resultado.
3. **Manter a Integração com WhatsApp Fluida:** Ao alterar `carrinho.html` ou `js/cart.js`, garantir que a montagem da URL `https://wa.me/...` continue codificando corretamente quebras de linha (`%0A`) e caracteres especiais (`encodeURIComponent`).
4. **Consistência de Preços:** Qualquer reajuste de preço deve ser sincronizado obrigatoriamente em:
   - `context/resumo-produtos-servicos.md`
   - `pacotes-integrados.html`
   - `tabela-de-precos.html`
   - `carrinho.html` (itens padrão / cálculos)
5. **Aderência aos Padrões Antigravity:** Qualquer mudança de código deve seguir rigorosamente o protocolo explicativo pré-mudança de 4 seções pedagógicas (`RULE[user_global]`).
