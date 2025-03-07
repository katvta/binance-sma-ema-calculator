```markdown
# Binance SMA/EMA Caulculator

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

Monitora e calcula as Médias Móveis Simples (SMA) e Exponenciais (EMA) de pares de criptomoedas na Binance em tempo real, utilizando dados históricos de velas (candles).

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) (v18.x ou superior)
- [npm](https://www.npmjs.com/) (v9.x ou superior)
- Conta na Binance (não obrigatória para uso da API pública)

## 🚀 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/katvta/binance-sma-ema-calculator.git
   cd binance-sma-ema-calculator
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

## 📂 Estrutura do Projeto

```
binance-sma-ema/
├── .env                # Configurações do projeto (personalize antes de executar)
├── index.js            # Código principal: busca dados e calcula indicadores
├── package.json        # Configuração do projeto e dependências
└── README.md           # Documentação do projeto
```

## 📜 Funcionalidades Principais

1. **Coleta de Dados em Tempo Real**  
   - Busca dados históricos de velas (candles) da Binance via API pública
   - Atualiza os cálculos automaticamente em intervalos configuráveis

2. **Cálculo de Indicadores Técnicos**  
   - **SMA (Média Móvel Simples):** Média aritmética dos preços de fechamento
   - **EMA (Média Móvel Exponencial):** Média ponderada que dá mais importância aos preços recentes

3. **Monitoramento Contínuo**  
   - Executa cálculos periodicamente (padrão: a cada 3 segundos)
   - Exibe resultados formatados no terminal

## 🛠️ Como Usar

1. **Configure o arquivo `.env`:**
   ```env
   API_URL=https://api.binance.com/api
   SYMBOL=BTCUSDT  # Par de moedas (ex: ETHUSDT, XRPUSDT)
   INTERVAL=1h     # Intervalo das velas (1m, 5m, 1h, 1d)
   PERIOD=20       # Período para cálculo das médias
   REFRESH_INTERVAL=3000  # Intervalo de atualização em ms
   ```

2. **Execute o monitor:**
   ```bash
   npm start
   ```

3. **Visualize os resultados no terminal:**
   ```
   --- Resultados ---
   Par: BTCUSDT
   Intervalo: 1h
   Período: 20
   SMA: 26,543.25
   EMA: 26,789.12
   ------------------
   ```

## 📊 Exemplo de Saída

```bash
Iniciando monitoramento...

--- Resultados ---
Par: BTCUSDT
Intervalo: 1h
Período: 20
SMA: 26543.25
EMA: 26789.12
------------------

--- Resultados ---
Par: BTCUSDT
Intervalo: 1h
Período: 20
SMA: 26560.80
EMA: 26795.40
------------------
```

## 🧩 Estrutura do Código

1. **`fetchCandleData()`**  
   - Busca até 1000 velas históricas via API da Binance
   - Extrai preços de fechamento para cálculos

2. **`calculateSMA()`**  
   - Implementa fórmula: `SMA = Σ(close) / período`

3. **`calculateEMA()`**  
   - Usa SMA como base inicial
   - Aplica fórmula exponencial: `EMA = (close - EMA_anterior) * multiplicador + EMA_anterior`

4. **Loop Principal**  
   - Atualiza cálculos periodicamente
   - Trata erros de rede e dados insuficientes

## 🔧 Configurações Personalizáveis

| Variável           | Descrição                                  | Exemplo       |
|--------------------|--------------------------------------------|---------------|
| `SYMBOL`           | Par de negociação                          | BTCUSDT       |
| `INTERVAL`         | Intervalo das velas                        | 1h, 4h, 1d    |
| `PERIOD`           | Quantidade de velas para cálculo           | 20            |
| `REFRESH_INTERVAL` | Frequência de atualização (milissegundos)  | 3000 (3 segundos) |

## 🛠️ Comandos Úteis

| Ação               | Comando                     |
|--------------------|-----------------------------|
| Instalar dependências | `npm install`           |
| Executar monitor   | `npm start`                |
| Testar cálculos    | Modifique `PERIOD=5` no .env para testes rápidos |

## 🔍 Possíveis Melhorias

- Adicionar alertas sonoros/visuais para cruzamentos SMA/EMA
- Implementar outros indicadores (RSI, MACD, Bandas de Bollinger)
- Armazenar histórico de cálculos em banco de dados
- Adicionar autenticação para contas Binance (para operações reais)

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

**Desenvolvido com ❤️ por Katriel Amorim**  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/katriel-amorim-a330b4322/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/katvta)