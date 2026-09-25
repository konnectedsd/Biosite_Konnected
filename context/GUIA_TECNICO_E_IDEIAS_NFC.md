# 📡 Dossiê Técnico: Ecossistema NFC e Viabilidade de Placas PIX Inteligentes

Este documento consolida a arquitetura de funcionamento dos chips NFC, limites físicos de hardware, formatos de payload e um estudo aprofundado sobre a viabilidade comercial de **Plaquinhas PIX de Balcão Dinâmicas** frente às tradicionais maquininhas POS de cartão.

---

## 1. 🔬 Hardware, Física e Limites do NFC

### A. Como o Chip Funciona Sem Bateria?
As tags NFC comerciais de balcão (como as da família **NXP NTAG**) são dispositivos **passivos**. Elas não possuem pilha nem bateria interna.
1. O smartphone possui um controlador NFC ativo que emite uma onda eletromagnética na frequência padrão internacional de **13.56 MHz**.
2. Ao aproximar o celular a uma distância de até 4 cm da plaquinha, a espira de cobre ou alumínio do adesivo NFC sofre **acoplamento indutivo** (indução de Faraday).
3. Essa radiofrequência gera uma corrente elétrica de microamperes suficiente para energizar o minúsculo chip de silício acoplado à antena.
4. O chip é ligado por frações de segundo, lê os blocos da sua memória **EEPROM** e responde modulando o próprio campo eletromagnético (*load modulation*), entregando o payload gravado ao smartphone.

---

### B. Tabela Comparativa de Memória e Capacidade

| Modelo do Chip | Memória Bruta | Memória Útil Livre | Aplicação Típica | Custo Médio Unitário |
| :--- | :--- | :--- | :--- | :--- |
| **NXP NTAG213** | 180 bytes | **144 bytes** | Links de URLs, Avaliação Google, Biosites, Chave PIX | ~R$ 1,80 a R$ 2,50 |
| **NXP NTAG215** | 540 bytes | **504 bytes** | vCard simples, Wi-Fi com senha média, Amiibos Nintendo | ~R$ 3,20 a R$ 4,50 |
| **NXP NTAG216** | 924 bytes | **888 bytes** | Cartão de contato completo (vCard denso), credenciais | ~R$ 5,50 a R$ 7,50 |
| **NXP NTAG 424 DNA** | Criptográfico | Variável + Cripto | URLs com token dinâmico (SUN - Anti-Fraude e Anti-Cópia) | ~R$ 12,00 a R$ 18,00 |

> **⚠️ Fato Técnico Fundamental:**  
> Chips NFC comuns **não possuem CPU de uso geral nem memória RAM**. Eles são memórias de leitura e escrita. Por isso, **não é possível instalar nem rodar aplicativos ou programas executáveis dentro da tag**. O chip apenas entrega bytes estruturados no padrão **NDEF (*NFC Data Exchange Format*)** para o sistema operacional do celular processar.

---

## 2. 🧰 Catálogo de Payloads e Soluções com NFC

### A. Recursos Nativos (Sem necessidade de o cliente instalar aplicativo)
1. **Redirecionamento Web Inteligente (URL / URI):**
   - Abre a página de avaliações do Google Meu Negócio, cardápios interativos ou o Biosite da Konnected.
2. **Wi-Fi Handover (Conexão Automática à Rede Sem Digitar Senha):**
   - Payload `application/vnd.wfa.wsc`. O cliente encosta o aparelho na plaquinha e surge um pop-up nativo do iOS/Android: *"Deseja conectar-se à rede Wi-Fi da Loja?"*. Elimina plaquinhas de papel com senhas ilegíveis.
3. **Cartão de Contato Comercial (vCard / MeCard):**
   - Payload VCF estruturado. O celular do cliente abre imediatamente a tela de novo contato com Nome, Cargo, WhatsApp, Instagram e E-mail comercial prontos para salvar.
4. **Disparo Direto de Mensagem / Ligação:**
   - URIs como `https://wa.me/556199771492`, `tel:+556199771492` ou `mailto:konnected.sd@gmail.com`.
5. **Localização Geográfica no Mapa:**
   - Payload `geo:-15.8643,-47.9542`: abre diretamente no Google Maps ou Apple Maps com o pin do local.

---

### B. Automações de Hardware (O Chip como Gatilho / Trigger)
Cada chip NFC possui um **UID (Identificador Único de 7 bytes) gravado de fábrica e imutável**.
- **Apple Atalhos (Shortcuts) / Android (Tasker):** O celular do lojista pode ser configurado para, ao encostar na plaquinha do caixa:
  - Abrir o aplicativo de vendas do dia.
  - Conectar ao som Bluetooth do estabelecimento e dar play na playlist ambiente da loja.
  - Ao fechar o caixa, desligar as luzes inteligentes e ativar o alarme.

---

## 3. 💳 Estudo de Viabilidade: Plaquinha PIX Dinâmico vs. Maquininhas POS

### A. A Ideia: Como Funcionaria a "Plaquinha PIX Dinâmico Konnected"?
1. Cada caixa ou balcão da loja recebe uma plaquinha física com uma URL fixa e limpa (ex: `pay.konnected.sd/loja/caixa1`).
2. O vendedor possui uma interface web simples no computador do caixa ou no seu próprio celular:
   - Digita o valor da venda: `R$ 45,00`.
   - Clica em **"Cobrar no Balcão"**.
3. O servidor da Konnected comunica via API com um PSP bancário (Asaas, Efí/Gerencianet, Mercado Pago ou Banco Inter) e gera um **PIX Dinâmico com expiração rápida**.
4. O cliente encosta o celular na plaquinha NFC do balcão (ou escaneia o QR Code impresso nela):
   - Abre imediatamente a tela do caixa com o valor `R$ 45,00`, identificação da loja e o botão **"Copiar Código PIX"** (ou deep link para o banco).
5. O cliente paga pelo app do seu banco.
6. Em menos de 2 segundos, o banco dispara um **Webhook** para o servidor, a tela do caixa do vendedor emite um alerta sonoro verde *"Pagamento Confirmado! ✅"* e a tela do cliente redireciona para: *"Obrigado pela preferência! Que tal nos avaliar no Google Maps?"*.

---

### B. Comparativo Direto: Plaquinha PIX Dinâmico vs. Maquininha POS de Cartão

| Critério de Comparação | Maquininha POS Tradicional (Stone, PagBank, Cielo, Ton) | Plaquinha PIX Dinâmico (Solução Web Konnected) |
| :--- | :--- | :--- |
| **Taxa sobre o PIX (Take Rate)** | **0,49% a 1,49% por transação** (custo mensal pesado para o comerciante). | **R$ 0,00 a taxa fixa de R$ 0,35 por transação** (economia real e brutal de margem). |
| **Custo de Hardware** | R$ 300 a R$ 800 (compra) ou aluguel mensal de R$ 50 a R$ 150. | **Apenas o acrílico com NFC (~R$ 59,90 taxa única)**. |
| **Disponibilidade / Filas** | Se a loja tiver só 1 máquina e o garçom foi à mesa, o caixa fica travado. | **Ilimitado**: pode ter uma plaquinha em cada balcão ou em cada mesa. |
| **Risco de Golpes / Fake PIX** | O lojista precisa esperar a máquina emitir o bip ou conferir papel. | **Impossível fraudar**: o Webhook do banco avisa a tela do lojista em tempo real. |
| **Aceitação de Cartão de Crédito/Débito** | **Sim, nativo com chip e tarja física.** | **Não**: focado exclusivamente em transferências PIX. |
| **Comprovante Impresso em Papel** | Sim (bobina térmica). | Comprovante 100% digital (SMS, WhatsApp ou tela). |
| **Pós-Venda e Marketing** | Nenhum. O cliente paga e vai embora. | **Alavanca de Reputação**: após o pagamento, a tela já pede avaliação 5 estrelas no Google. |

---

### C. Veredito Estratégico: Vale a Pena Desenvolver?

#### 1. Por que NÃO substitui 100% da Maquininha POS?
O comerciante físico **ainda precisa da maquininha** para clientes que pagam em **cartão de crédito parcelado ou cartão de débito físico**. Portanto, vender a plaquinha dizendo "jogue sua maquininha fora" criaria resistência comercial.

#### 2. Onde está a OPORTUNIDADE DE OURO para a Konnected?
Vender como o **"Terminal Exclusivo de PIX sem Taxas Percentuais e Sem Fila"**:
- **O Argumento de Vendas Irrefutável:**  
  *"Seu comércio vende R$ 40.000 no PIX por mês? Sua maquininha está te cobrando cerca de R$ 400 a R$ 600 só de taxas desnecessárias. Com a nossa plaquinha no balcão integrada à sua conta bancária direta, essa taxa cai para centavos, você economiza milhares de reais por ano e ainda ganha avaliações no Google a cada pagamento finalizado."*

---

## 4. 🗺️ Roadmap de Produtos NFC para a Konnected

### Fase 1: Produtos de Prateleira (Venda Imediata B2B)
- **Plaquinha Avaliação Google 5 Estrelas:** Foco em autoridade e ranqueamento local.
- **Plaquinha Dupla Função (Wi-Fi Balcão + Avaliação):** Conexão automática ao Wi-Fi em um toque.
- **Plaquinha PIX Estático no Acrílico:** Com QR Code e Chave PIX fixa da empresa para balcão simples.
- **Cartão Executivo de Visitas (Executive NFC Card):** Cartão de acrílico/PVC premium para empresários compartilharem seus contatos (vCard) em reuniões corporativas.

### Fase 2: Plataforma de Software Sob Medida (Alto Ticket)
- **Konnected Pay (PIX Dinâmico de Balcão):** Sistema web com conciliação via Webhook bancário e tela de operador para lojas com grande fluxo de balcão (lanchonetes, mercados de bairro, oficinas, barbearias).
- **Comanda de Mesa Interativa:** Plaquinha em cada mesa com parâmetro (`mesa=05`) que recebe o pedido do cardápio e direciona o pagamento diretamente para a cozinha.
