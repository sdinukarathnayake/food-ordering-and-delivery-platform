
// Rathnayake R. M. S. D.

const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({

    customerId: {
        type: String, 
        unique: true,
    },

    customerName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    phone: {
        type: String,
        required: true,
    },

    currentLocationLatitude: { 
        type: String, 
        required: true 
    },  
    
    currentLocationLongitude: { 
        type: String, 
        required: true 
    },

    name: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    registrationDate: {
        type: Date,
        default: Date.now,
    },
});

// Generate customerlId before saving
customerSchema.pre('save', async function (next) {

    if (!this.isNew) {
        return next();
    }

    try {
        const lastCustomer= await this.constructor.findOne({}, {}, { sort: { 'customerId': -1 } });
        let newCustomerId = 'C-0001'; 

        if (lastCustomer && lastCustomer.customerId) {
            const lastCustomerIdNumber = parseInt(lastCustomer.customerId.split('-')[1], 10);
            newCustomerId = `C-${String(lastCustomerIdNumber + 1).padStart(4, '0')}`;
        }

        this.customerId = newCustomerId;
        next();

    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model("Customer", customerSchema);