const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  menuItemId: {
    type: String,
    unique: true
  },
  restaurantId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  }
});

// Auto-generate menuItemId
menuItemSchema.pre('save', async function (next) {
  if (!this.menuItemId) {
    const MenuItem = mongoose.model('MenuItem', menuItemSchema);
    const count = await MenuItem.countDocuments();
    this.menuItemId = `ITEM${(count + 1).toString().padStart(3, '0')}`;
  }
  next();
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
