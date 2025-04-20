const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: String,

  restaurantId: String,
  
  items: [
    {
      itemId: String,
      quantity: Number
    }
  ],

  totalAmount: Number,

  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered'],
    default: 'Pending'
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
