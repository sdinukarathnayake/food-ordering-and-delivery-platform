
// Rathnayake R. M. S. D.

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    orderId: {
        type: String,
        unique: true
    },
    
    cartId: {
        type: String,
        required: true
    },

    orderDate: {
        type: Date,
        default: Date.now
    },

    customerUsername: {
        type: String,
        required: true
    },

    customerName: {
        type: String,
        required: true
    },

    customerPhone: {
        type: String,
        required: true
    },

    customerEmail: {
        type: String,
        required: true
    },

    restaurantId: {
        type: String,
        required: true
    },

    restaurantName: {
        type: String,
        required: true
    },

    restaurantPhone: {
        type: String,
        required: true
    },

    restaurantLocationLatitude: { 
        type: String, 
        required: true 
    },  
    
    restaurantLocationLongitude: { 
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
    
    deliveryLocationLatitude: { 
        type: String, 
        required: true 
    },  
    
    deliveryLocationLongitude: { 
        type: String, 
        required: true 
    },

    deliveryCharge: {
        type: Number,
    },

    totalAmount: {
        type: Number,
    },

    paymentMethod: {
        type: String,
        enum: ['Card'],
        required: true
    },

    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed', 'PaymentDevided'],
        default: 'Pending'
    },

    orderStatus: {  
        type: String,  
        enum: [  
            'pending', 'confirmed','preparing',  'readyForPickup',  
            'driverAssigned', 'driverAccepted', 'outForDelivery',  'delivered',  
            'cancelled'  
        ],  
        default: 'pending',  
        required: true  
    },


    deliveryPersonId: {
        type: String,
    },

    deliveryPersonName: {
        type: String,
    },

    deliveryPersonPhone: {
        type: String,
    },

    deliveredTime: {
        type: Date
    },

    notes: {
        type: String
    }
});

// Generate orderId before saving
orderSchema.pre('save', async function (next) {

    if (!this.isNew) {
        return next();
    }

    try {
        const lastOrder = await this.constructor.findOne({}, {}, { sort: { 'orderId': -1 } });
        let newOrderId = 'O-0001'; 

        if (lastOrder && lastOrder.orderId) {
            const lastOrderIdNumber = parseInt(lastOrder.orderId.split('-')[1], 10);
            newOrderId = `O-${String(lastOrderIdNumber + 1).padStart(4, '0')}`;
        }

        this.orderId = newOrderId;
        next();

    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model("Order", orderSchema);