const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  orderId: String,
  customerId: String,
  amount: Number,
  status: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending'
  },
  method: String, // e.g., "PayHere", "Stripe", "Cash"
  paidAt: Date
});

module.exports = mongoose.model('Payment', paymentSchema);
