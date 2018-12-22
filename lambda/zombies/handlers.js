const HttpStatus = require('http-status-codes');
const ZombieSvc = require('./service.js');
const { getCurrencyExchangeRates } = require('../services/currencyExchangeSvc');
const { getItemExchangeRates } = require('../services/itemExchangeSvc');

const loadZombie = async function(ctx) {
  const { zombieId } = ctx.params;
  const zombie = await ZombieSvc.getOneZombie(zombieId);
  if (!zombie) ctx.throw(HttpStatus.NOT_FOUND, 'zombieId not found');
  return zombie;
};

module.exports.getAllZombies = async function(ctx) {
  const zombies = await ZombieSvc.getAllZombies();
  ctx.body = zombies;
};

module.exports.createZombie = async function(ctx) {
  const { name, items } = ctx.request.body;

  if (!name) {
    return ctx.throw(HttpStatus.BAD_REQUEST, 'name is required');
  }

  const zombie = await ZombieSvc.createZombie({ name, items });
  ctx.body = zombie;
};

module.exports.getOneZombie = async function(ctx) {
  const zombie = await loadZombie(ctx);

  const itemExchangeRates = await getItemExchangeRates();
  const { usdAskRate, eurAskRate } = await getCurrencyExchangeRates();

  const totalItemWorthPLN = zombie.items.reduce((total, itemId) => {
    const itemExchangeRate = itemExchangeRates.find(item => item.id === itemId);
    if (!itemExchangeRate) {
      return total;
    }
    return total + itemExchangeRate.price;
  }, 0);

  ctx.body = {
    ...zombie.toJSON(),
    totalItemWorth: {
      pln: totalItemWorthPLN,
      usd: totalItemWorthPLN / usdAskRate,
      eur: totalItemWorthPLN / eurAskRate,
    },
  };
};

module.exports.updateZombie = async function(ctx) {
  const { zombieId } = ctx.params;
  const { name, items } = ctx.request.body;

  if (!name) {
    ctx.throw(HttpStatus.BAD_REQUEST, 'name is required');
  }

  ctx.body = await ZombieSvc.updateZombie(zombieId, { name, items: items || [] });
};

module.exports.deleteZombie = async function(ctx) {
  const { zombieId } = ctx.params;

  await ZombieSvc.deleteZombie(zombieId);
  ctx.status = HttpStatus.OK;
};

module.exports.getAllZombieItems = async function(ctx) {
  const zombie = await loadZombie(ctx);

  ctx.body = zombie.items;
};

module.exports.addZombieItem = async function(ctx) {
  const { zombieId, itemId } = ctx.params;
  const zombie = await loadZombie(ctx);

  if (zombie.items.length >= 5) {
    ctx.throw(HttpStatus.BAD_REQUEST, 'The zombie already has maximum 5 items');
  }

  await ZombieSvc.updateZombie(zombieId, { items: zombie.items.concat([Number(itemId)]) });
  ctx.status = HttpStatus.OK;
};

module.exports.deleteZombieItem = async function(ctx) {
  const { zombieId, itemId } = ctx.params;
  const zombie = await loadZombie(ctx);

  await ZombieSvc.updateZombie(zombieId, {
    items: zombie.items.filter(item => item !== Number(itemId)),
  });
  ctx.status = HttpStatus.OK;
};
