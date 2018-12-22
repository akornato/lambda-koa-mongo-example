const Zombie = require('./model');

module.exports.getAllZombies = function() {
  return Zombie.find({}, '_id name').exec();
};

module.exports.createZombie = function(data) {
  return Zombie.create(data);
};

module.exports.getOneZombie = function(zombieId) {
  return Zombie.findById(zombieId).exec();
};

module.exports.updateZombie = function(zombieId, data) {
  return Zombie.findByIdAndUpdate(zombieId, data, { new: true }).exec();
};

module.exports.deleteZombie = function(zombieId) {
  return Zombie.findByIdAndDelete(zombieId).exec();
};