const Restaurant = require('../models/restaurantModel');

// Create a new restaurant
exports.addRestaurant = async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all restaurants
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get restaurant by restaurantId
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ restaurantId: req.params.restaurantId });
    if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update restaurant by restaurantId
exports.updateRestaurant = async (req, res) => {
  try {
    const updated = await Restaurant.findOneAndUpdate(
      { restaurantId: req.params.restaurantId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Restaurant not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete restaurant by restaurantId
exports.deleteRestaurant = async (req, res) => {
  try {
    const deleted = await Restaurant.findOneAndDelete({ restaurantId: req.params.restaurantId });
    if (!deleted) return res.status(404).json({ error: 'Restaurant not found' });
    res.json({ message: 'Restaurant deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
