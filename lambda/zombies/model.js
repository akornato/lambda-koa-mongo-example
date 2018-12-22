const mongoose = require('mongoose');

const zombieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [Number],
  created_at: { type: Date, required: true, default: Date.now },
});

zombieSchema.set('toJSON', {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const Zombie = mongoose.model('Zombie', zombieSchema);

module.exports = Zombie;
