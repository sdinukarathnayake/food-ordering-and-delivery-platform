const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const Order = require('../models/Order'); // your Order model

// Initialize Stripe instance
const stripe = new Stripe('..'); // << put your secret key here

router.post('/create-checkout-session', async (req, res) => {
  try {
      const { orderId, amount, customerEmail, customerName } = req.body;

      const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          mode: 'payment',
          line_items: [{
              price_data: {
                  currency: 'lkr',
                  product_data: {
                      name: `Order ${orderId}`,
                  },
                  unit_amount: Math.round(amount * 100), // Important
              },
              quantity: 1,
          }],
          success_url: `http://localhost:5173/payment-success?orderId=${orderId}`,
          cancel_url: 'http://localhost:5173/payment-cancel',
          customer_email: customerEmail,
      });

      res.json({ url: session.url }); // Important: send back session URL

  } catch (error) {
      console.error('Stripe checkout error:', error);
      res.status(500).json({ error: error.message });
  }
});

module.exports = router;
