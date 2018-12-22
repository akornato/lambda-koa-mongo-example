module.exports = {
  port: 3000,
  apiPrefix: '/.netlify/functions/zombies',
  itemExchangeURL: `${process.env.URL ||
    'http://localhost:9000'}/.netlify/functions/itemExchange`,
  currencyExchangeURL: 'http://api.nbp.pl/api/exchangerates/tables/C',
};
