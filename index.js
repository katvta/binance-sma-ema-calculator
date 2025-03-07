// Importa dependências
const axios = require('axios');

// Carrega variáveis de ambiente do .env
const {
  API_URL,
  SYMBOL,
  INTERVAL,
  PERIOD,
  REFRESH_INTERVAL
} = process.env;

// Validação das variáveis de ambiente
if (!API_URL || !SYMBOL || !INTERVAL || !PERIOD || !REFRESH_INTERVAL) {
  console.error('ERRO: Variáveis de ambiente não configuradas!');
  process.exit(1); // Encerra o processo em caso de erro
}

// Função para calcular a Média Móvel Simples (SMA)
function calculateSMA(closes) {
  try {
    if (closes.length === 0) throw new Error('Nenhum dado disponível para SMA');
    const sum = closes.reduce((acc, val) => acc + val, 0);
    return sum / closes.length;
  } catch (error) {
    console.error('Erro no cálculo do SMA:', error.message);
    return null;
  }
}

// Função para calcular a Média Móvel Exponencial (EMA)
function calculateEMA(closes, period) {
  try {
    if (closes.length < period) {
      throw new Error(`Dados insuficientes para EMA (necessário ${period} períodos)`);
    }

    // Calcula o multiplicador de suavização
    const multiplier = 2 / (parseInt(period) + 1);

    // Calcula o SMA inicial para os primeiros 'period' dados
    let ema = calculateSMA(closes.slice(0, period));
    if (ema === null) throw new Error('Falha ao calcular SMA inicial');

    // Itera sobre os dados restantes para calcular EMA
    for (let i = period; i < closes.length; i++) {
      ema = (closes[i] - ema) * multiplier + ema;
    }

    return ema;
  } catch (error) {
    console.error('Erro no cálculo do EMA:', error.message);
    return null;
  }
}

// Função para buscar dados históricos de velas da Binance
async function fetchCandleData() {
  try {
    const response = await axios.get(`${API_URL}/v3/klines`, {
      params: {
        symbol: SYMBOL,
        interval: INTERVAL,
        limit: 1000 // Máximo de velas permitidas pela Binance
      }
    });

    // Valida a estrutura da resposta
    if (!Array.isArray(response.data)) {
      throw new Error('Resposta da API inválida');
    }

    // Extrai os preços de fechamento (índice 4 do array de cada vela)
    const closes = response.data.map(candle => {
      if (!candle[4]) throw new Error('Dados de fechamento ausentes');
      return parseFloat(candle[4]);
    });

    return closes;
  } catch (error) {
    console.error('Erro ao buscar dados da Binance:', error.message);
    return null;
  }
}

// Função principal que coordena o fluxo
async function main() {
  try {
    const closes = await fetchCandleData();
    if (!closes) return;

    // Calcula SMA e EMA apenas se houver dados suficientes
    if (closes.length >= PERIOD) {
      const sma = calculateSMA(closes.slice(-PERIOD));
      const ema = calculateEMA(closes, PERIOD);

      // Formata os resultados para exibição
      console.log('\n--- Resultados ---');
      console.log(`Par: ${SYMBOL}`);
      console.log(`Intervalo: ${INTERVAL}`);
      console.log(`Período: ${PERIOD}`);
      console.log(`SMA: ${sma ? sma.toFixed(2) : 'Erro'}`);
      console.log(`EMA: ${ema ? ema.toFixed(2) : 'Erro'}`);
      console.log('------------------\n');
    } else {
      console.log('Dados insuficientes para cálculo');
    }
  } catch (error) {
    console.error('Erro crítico:', error.message);
  }
}

// Inicia o loop de atualização automática
console.log('Iniciando monitoramento...');
main(); // Executa imediatamente
setInterval(main, REFRESH_INTERVAL); // Repete a cada REFRESH_INTERVAL ms