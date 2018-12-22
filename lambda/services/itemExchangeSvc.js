const axios = require('axios');
const { itemExchangeURL } = require('../../config');

let cache = { timestamp: 0, items: [] };

async function getItemExchangeRates() {
  const now = new Date();
  const cacheDate = new Date(cache.timestamp);

  if (
    now.getDate() !== cacheDate.getDate() ||
    now.getMonth() !== cacheDate.getMonth() ||
    now.getFullYear() !== cacheDate.getFullYear()
  ) {
    try {
      const response = await axios.get(itemExchangeURL);
      cache = response.data;
    } catch (error) {
      console.error(error);
    }
  }

  return cache.items;
}

getItemExchangeRates();

module.exports = { getItemExchangeRates };
