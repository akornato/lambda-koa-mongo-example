const Router = require('koa-router');
const router = new Router();

const {
  getAllZombies,
  createZombie,
  getOneZombie,
  updateZombie,
  deleteZombie,
  getAllZombieItems,
  addZombieItem,
  deleteZombieItem,
} = require('./handlers');

router
  .get('/', getAllZombies)
  .post('/', createZombie)
  .put('/:zombieId', updateZombie)
  .del('/:zombieId', deleteZombie)
  .get('/:zombieId', getOneZombie)
  .get('/:zombieId/items', getAllZombieItems)
  .post('/:zombieId/items/:itemId', addZombieItem)
  .del('/:zombieId/items/:itemId', deleteZombieItem);

module.exports = router;
