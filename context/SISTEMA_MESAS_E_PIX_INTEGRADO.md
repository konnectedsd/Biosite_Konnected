# 🍽️ Arquitetura de Mesas Inteligentes e Sistema de Pagamento PIX sem Intermediadores

Este documento detalha a engenharia de software, modelos de hardware e viabilidade financeira para transformar restaurantes e estabelecimentos físicos em **ambientes com comanda digital e pagamento autônomo na mesa**, eliminando a dependência de maquininhas de cartão.

---

## 1. 💡 A Grande Dúvida: Precisa de API Bancária para Cobrar um Valor Específico no PIX?

### ❌ Mito: "Só dá para definir o valor do PIX se pagar uma API ou intermediador"
Muitos acreditam que para o cliente pagar um valor exato (ex: **R$ 87,50**) sem ter que digitar o valor na mão, é obrigatório contratar plataformas como Mercado Pago, Asaas ou pagar taxas bancárias. **Isso é falso.**

### ✅ Realidade da Engenharia: O Padrão BR Code EMV do Banco Central
O Banco Central do Brasil desenhou o PIX baseado no padrão internacional **EMV QRCPS-MPM** (o mesmo utilizado por bandeiras globais de cartão).
- O "PIX Copia e Cola" ou o QR Code nada mais é do que uma **cadeia de texto formatada com tags matemáticas**.
- Um algoritmo simples no frontend (JavaScript) ou no backend consegue concatenar:
  1. A Chave PIX do restaurante (CNPJ, e-mail ou telefone).
  2. O Nome do Titular e Cidade.
  3. O **Valor Exato da Conta daquela mesa** (Tag `54`).
  4. Um código de verificação de integridade **CRC16-CCITT** (Tag `6304`).

```
Exemplo de Payload Gerado Matematicamente no Navegador (Sem API):
00020126360014br.gov.bcb.pix011467202316000137520400005303986540587.505802BR592567202316 DIMITRI LOPES6008BRASILIA62070503***6304ABCD
                                                          ^^^^^
                                                  Valor travado em R$ 87.50
```

---

### Tabela Comparativa: PIX Direto (Sem API) vs. PIX Automatizado (Com API)

| Dimensão Técnica | PIX Direto (Geração Matemática Local) | PIX com API Bancária (Open Finance / PSP) |
| :--- | :--- | :--- |
| **Taxa por Transação** | **R$ 0,00 (Totalmente Gratuito)**. O dinheiro vai 100% da conta do cliente para a conta do lojista. | R$ 0,35 a R$ 0,99 por transação ou 0,49% a 0,99%. |
| **Burocracia de Contratação** | **Zero**. O lojista só precisa informar a Chave PIX dele (CNPJ). | Exige aprovação de conta PJ em gateway e envio de contratos. |
| **Valor Travado na Tela?** | **Sim**. O cliente clica em "Copiar PIX" e ao colar no app do banco, o valor de R$ 87,50 já vem travado. | **Sim**. O valor também vem travado. |
| **Confirmação no Caixa** | O operador do caixa precisa olhar a notificação do app do banco ou o comprovante do cliente. | **Automática em 1 segundo via Webhook**: o sistema do restaurante fecha a mesa sozinho. |
| **Melhor Caso de Uso** | **Fase 1 (MVP Rápido):** Bares, lanchonetes e restaurantes de pequeno/médio porte. | **Fase 2 (SaaS Avançado):** Grandes redes com múltiplos caixas sem conferência manual. |

---

## 2. 🖲️ Hardware na Mesa: NFC Passivo vs. Mini-Tela LCD com Bateria

Você pensou na possibilidade de colocar um hardware com tela em cada mesa ou um adesivo NFC. Analisemos a física e os custos reais:

```
                  ┌─────────────────────────────────────────────────────────────┐
                  │                 MODELO 1: NFC PASSIVO (Recomendado)         │
                  ├─────────────────────────────────────────────────────────────┤
                  │ • Placa de acrílico cristal de R$ 15,00 fixa na mesa.       │
                  │ • Zero bateria: dura 10 anos sem manutenção.                │
                  │ • À prova d'água, chopp ou refrigerante derramado.          │
                  │ • URL estática fixa da mesa (ex: site.com/restaurante/m/04).│
                  │ • O celular do cliente é a tela interativa.                 │
                  └─────────────────────────────────────────────────────────────┘

                                                VS

                  ┌─────────────────────────────────────────────────────────────┐
                  │                 MODELO 2: TELA FÍSICA NA MESA               │
                  ├─────────────────────────────────────────────────────────────┤
                  │ • LCD tradicional: consome muita bateria (dura poucas horas)│
                  │ • E-Paper / E-Ink: gasta zero bateria parado (dura meses).  │
                  │ • Custo por mesa: R$ 120 a R$ 250 (microcontrolador ESP32). │
                  │ • Risco alto de roubo, queda ou danos por líquidos.         │
                  │ • Exige recarga periódica de baterias pela equipe.          │
                  └─────────────────────────────────────────────────────────────┘
```

### O Veredito de Engenharia
O **NFC Passivo no Acrílico** é de 10 a 20 vezes superior operacionalmente:
- A mesa física **não precisa mudar de tela**.
- O que é dinâmico é a **aplicação web no servidor**.
- Quando o cliente senta na Mesa 4 e encosta o celular na placa, o celular dele se conecta ao servidor da Konnected na rota `/mesa/04`.
- Tudo o que o caixa faz no computador (adicionar chopp, pedir a conta) é refletido no smartphone do cliente via **WebSockets ou Server-Sent Events (SSE)** em tempo real.

---

## 3. 🔄 O Fluxo Operacional da Mesa Inteligente (End-to-End)

```
[1. Cliente Senta] ────────> Encosta o celular no NFC da Mesa 04
                                │
                                ▼
[2. Navegação Web] ────────> Abre o Biosite/Cardápio dedicado da Mesa 04
                                │
                                ▼
[3. Pedidos no Site] ──────> Cliente seleciona os pratos -> Notificação no balcão/cozinha
                                │
                                ▼
[4. Consumo Centralizado] ─> O operador/garçom vê a comanda aberta da Mesa 04 no painel
                                │
                                ▼
[5. Fechamento de Conta] ──> Cliente clica em "Pedir a Conta" no celular
                                │
                                ▼
[6. Geração do PIX] ───────> Sistema calcula o subtotal (ex: R$ 112,00)
                             Gera na hora o payload PIX com valor travado
                                │
                                ▼
[7. Pagamento & Reputação] ─> Cliente paga pelo app do banco
                             Tela redireciona para: "Avalie nosso atendimento no Google Maps 5★"
```

---

## 4. 💰 Proposta de Valor Comercial para Restaurantes (Argumento de Fechamento B2B)

Quando você for vender essa solução para donos de restaurantes ou cafeterias, apresente a matemática que dói no bolso dele:

1. **Eliminação do Custo de Aluguel de Maquininhas:**  
   Um restaurante de 20 mesas gasta entre 3 e 6 maquininhas sem fio para os garçons levarem até a mesa (custo de R$ 300 a R$ 600/mês de aluguel ou manutenção de bateria).
2. **Economia de Taxas Percentuais sobre PIX:**  
   Em um restaurante com faturamento de R$ 60.000 no PIX:
   - Pagando 1% na maquininha = **R$ 600,00 de prejuízo todo mês**.
   - Com o PIX direto da Konnected = **R$ 0,00 de taxa**.
   - Em 1 ano, a economia passa de **R$ 7.200,00** líquidos.
3. **Aumento de Giro de Mesa:**  
   Em horários de pico (almoço de domingo), o cliente espera até 15 minutos apenas para o garçom achar a maquininha, digitar o valor e levar à mesa. Com a placa, o cliente paga e libera a mesa imediatamente.
4. **Alavancagem no Google Maps:**  
   Cada fechamento de conta direciona o cliente satisfeito para a avaliação 5 estrelas.

---

## 5. 🗺️ Roadmap Técnico de Implementação

### Etapa 1: Validação do Gerador de PIX BR Code (Sem API)
- Implementar uma biblioteca leve em JavaScript/Node que recebe `chave_pix`, `nome`, `cidade` e `valor` e cospe a string pronta do Copia e Cola com checksum CRC16.
- Testar a leitura e pagamento direto em bancos reais (Nubank, Itaú, Bradesco, Inter).

### Etapa 2: Módulo Web de Comandas por Mesa
- Painel simples para o comerciante cadastrar o cardápio e gerenciar mesas ativas (`/admin/mesas`).
- Rotas dinâmicas por mesa para os clientes (`/r/nomedaloja/mesa/:id`).

### Etapa 3: Integração com Webhook Bancário (Opcional - Fase SaaS)
- Para clientes enterprise que exigem conciliação automática sem conferência humana, conectar a API de parceiros como Asaas ou Efí Bank para liquidação autônoma em milissegundos.
