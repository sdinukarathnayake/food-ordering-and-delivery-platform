
// Rathnayake R. M. S. D.

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({

    cartId: {
        type: String,
        unique: true
    },

    customerId: {
        type: String,
        required: true
    },

    restaurantId: {
        type: String,
        required: true
    },

    items: [
        {
            itemId: {
                type: String,
                required: true
            },

            quantity: {
                type: Number,
                required: true,
                min: 1
            },

            price: {
                type: Number,
                required: true
            }
        }
    ],

    subtotal: {
        type: Number,
        required: true
    },    
});

// Generate cartId before saving
cartSchema.pre('save', async function (next) {

    if (!this.isNew) {
        return next();
    }

    try {
        const lastCart = await this.constructor.findOne({}, {}, { sort: { 'cartId': -1 } });
        let newCartId = 'CRT-0001'; 

        if (lastCart && lastCart.cartId) {
            const lastCartIdNumber = parseInt(lastCart.cartId.split('-')[1], 10);
            newCartId = `CRT-${String(lastCartIdNumber + 1).padStart(4, '0')}`;
        }

        this.cartId = newCartId;
        next();

    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model("Cart", cartSchema);