const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    menuId: {
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
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Sides', 'Pizza', 'Dessert', 'Beverage', 'Soup', 'Dish'],
        required: true
    }
});

// Generate menuId before saving
menuSchema.pre('save', async function (next) {
    if (!this.isNew) return next();

    try {
        const lastMenu = await this.constructor.findOne({}, {}, { sort: { 'menuId': -1 } });
        let newMenuId = 'M-0001';

        if (lastMenu && lastMenu.menuId) {
            const lastIdNum = parseInt(lastMenu.menuId.split('-')[1], 10);
            newMenuId = `M-${String(lastIdNum + 1).padStart(4, '0')}`;
        }

        this.menuId = newMenuId;
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Menu', menuSchema);