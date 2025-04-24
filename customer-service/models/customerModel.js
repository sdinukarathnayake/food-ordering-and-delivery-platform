
// Rathnayake R. M. S. D.

const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
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

    registrationDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Customer", customerSchema);