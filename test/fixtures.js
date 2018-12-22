module.exports.newZombie = {
  name: 'abc',
};

module.exports.createdZombie = {
  id: '12345',
  name: 'abc',
  items: [],
};

module.exports.updatedZombie = {
  id: '12345',
  name: 'def',
  items: [],
};

module.exports.itemExchangeReply = {
  timestamp: 1545436800000,
  items: [
    { id: 1, name: 'Raw Beef', price: 35 },
    { id: 2, name: 'Cyan Dye', price: 90 },
    { id: 3, name: 'Golden Helmet', price: 120 },
    { id: 4, name: 'Totem of Undying', price: 100 },
    { id: 5, name: 'Ghast Tear', price: 30 },
    { id: 6, name: 'Gold Nugget', price: 70 },
    { id: 7, name: 'Rabbits Foot', price: 90 },
    { id: 8, name: 'Magma Cream', price: 200 },
    { id: 9, name: 'Iron Ingot', price: 180 },
    { id: 10, name: 'Phantom Membrane', price: 10 },
    { id: 11, name: 'Heart of the Sea', price: 60 },
    { id: 12, name: 'Poppet Chorus Fruit', price: 80 },
    { id: 13, name: 'Glass Bottle', price: 30 },
    { id: 14, name: 'Firework Rocket', price: 1590 },
    { id: 15, name: 'Pumpkin Pie', price: 110 },
  ],
};

module.exports.currencyExchangeReply = [
  {
    table: 'C',
    no: '248/C/NBP/2018',
    tradingDate: '2018-12-20',
    effectiveDate: '2018-12-21',
    rates: [
      { currency: 'dolar amerykański', code: 'USD', bid: 3.7052, ask: 3.78 },
      { currency: 'dolar australijski', code: 'AUD', bid: 2.6407, ask: 2.6941 },
      { currency: 'dolar kanadyjski', code: 'CAD', bid: 2.7509, ask: 2.8065 },
      { currency: 'euro', code: 'EUR', bid: 4.2422, ask: 4.328 },
      { currency: 'forint (Węgry)', code: 'HUF', bid: 0.01319, ask: 0.013456 },
      { currency: 'frank szwajcarski', code: 'CHF', bid: 3.7408, ask: 3.8164 },
      { currency: 'funt szterling', code: 'GBP', bid: 4.6904, ask: 4.7852 },
      { currency: 'jen (Japonia)', code: 'JPY', bid: 0.033213, ask: 0.033883 },
      { currency: 'korona czeska', code: 'CZK', bid: 0.1645, ask: 0.1679 },
      { currency: 'korona duńska', code: 'DKK', bid: 0.5682, ask: 0.5796 },
      { currency: 'korona norweska', code: 'NOK', bid: 0.4277, ask: 0.4363 },
      { currency: 'korona szwedzka', code: 'SEK', bid: 0.4132, ask: 0.4216 },
      { currency: 'SDR (MFW)', code: 'XDR', bid: 5.1542, ask: 5.2584 },
    ],
  },
];
