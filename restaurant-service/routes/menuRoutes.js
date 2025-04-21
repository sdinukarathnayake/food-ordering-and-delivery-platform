const express = require('express');
const router = express.Router();
const controller = require('../controllers/menuController');

// CRUD routes for menu items
router.post('/', controller.addMenuItem);
router.get('/restaurant/:restaurantId', controller.getMenuByRestaurant);
router.get('/:menuItemId', controller.getMenuItemById);
router.put('/:menuItemId', controller.updateMenuItem);
router.delete('/:menuItemId', controller.deleteMenuItem);

module.exports = router;
