const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
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
    lat: { 
        type: String, 
        required: true 
    },
    lng: { 
        type: String, 
        required: true 
    },
    /*admin: {
        type: mongoose.Schema.ObjectId,
        ref: 'UserModel',
        required: true
    },*/
    status: {
        type: String,
        enum: ['Opened', 'Closed'],
        required: true
    },
    /*balance: {
        type: Number,
        default: 0
    }*/
});

// Generate restaurantId before saving
restaurantSchema.pre('save', async function(next) {
    if(!this.isNew) {
        return next();
    }

    try{
        const lastRestaurant = await this.constructor.findOne({}, {}, { sort: { 'restaurantId': -1 } });
        let newRestaurantId = 'R-0001';

        if (lastRestaurant && lastRestaurant.restaurantId) {
            const lastIdNum = parseInt(lastRestaurant.restaurantId.split('-')[1], 10);
            newRestaurantId = `R-${String(lastIdNum + 1).padStart(4, '0')}`;
        } 

        this.restaurantId = newRestaurantId;
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
