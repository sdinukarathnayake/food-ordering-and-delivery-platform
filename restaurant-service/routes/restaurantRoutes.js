const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

// CRUD routes for restaurants
router.post('/', restaurantController.addRestaurant);
router.get('/', restaurantController.getAllRestaurants);
router.get('/:restaurantId', restaurantController.getRestaurantById);
router.put('/:restaurantId', restaurantController.updateRestaurant);
router.delete('/:restaurantId', restaurantController.deleteRestaurant);

module.exports = router;
