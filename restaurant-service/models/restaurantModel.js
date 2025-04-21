const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
  restaurantId: {
    type: String,
    unique: true
  },
  restaurantName: {
    type: String,
    required: true
  },
  restaurantLocation: {
    type: String,
    required: true
  },
  restaurantPhoto: {
    type: String,
    required: true
  },
  paymentStatus: {
    type: Boolean,
    default: false
  },
  lat: {
    type: String,
    required: true
  },
  lng: {
    type: String,
    required: true
  }
});

// Auto-generate restaurantId before saving
restaurantSchema.pre('save', async function (next) {
  if (!this.restaurantId) {
    const Restaurant = mongoose.model('Restaurant', restaurantSchema);
    const count = await Restaurant.countDocuments();
    this.restaurantId = `REST${(count + 1).toString().padStart(3, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
