const items = [
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
];

exports.handler = async () => ({
  statusCode: 200,
  body: JSON.stringify({ timestamp: new Date().setUTCHours(0, 0, 0, 0), items }),
});
