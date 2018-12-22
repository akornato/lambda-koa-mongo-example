const axios = require('axios');
const { currencyExchangeURL } = require('../../config');

let cache = { timestamp: 0, exchangeRates: { eur: 0, usd: 0 } };

async function getCurrencyExchangeRates() {
  const now = new Date();
  const cacheDate = new Date(cache.timestamp);

  if (
    now.getDate() !== cacheDate.getDate() ||
    now.getMonth() !== cacheDate.getMonth() ||
    now.getFullYear() !== cacheDate.getFullYear()
  ) {
    try {
      const response = await axios.get(currencyExchangeURL);
      const eurAskRate = response.data[0].rates.find(rate => rate.code === 'EUR').ask;
      const usdAskRate = response.data[0].rates.find(rate => rate.code === 'USD').ask;
      cache = { timestamp: Date.now(), exchangeRates: { eurAskRate, usdAskRate } };
    } catch (e) {
      console.error(e);
    }
  }

  return cache.exchangeRates;
}

getCurrencyExchangeRates();

module.exports = { getCurrencyExchangeRates };
