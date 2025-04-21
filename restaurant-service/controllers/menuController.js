const MenuItem = require('../models/menuItem');

// Add a new menu item
exports.addMenuItem = async (req, res) => {
  try {
    const menuItem = new MenuItem(req.body);
    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all menu items of a restaurant
exports.getMenuByRestaurant = async (req, res) => {
  try {
    const items = await MenuItem.find({ restaurantId: req.params.restaurantId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single menu item by menuItemId
exports.getMenuItemById = async (req, res) => {
  try {
    const item = await MenuItem.findOne({ menuItemId: req.params.menuItemId });
    if (!item) return res.status(404).json({ error: 'Menu item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a menu item
exports.updateMenuItem = async (req, res) => {
  try {
    const updated = await MenuItem.findOneAndUpdate(
      { menuItemId: req.params.menuItemId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Menu item not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a menu item
exports.deleteMenuItem = async (req, res) => {
  try {
    const deleted = await MenuItem.findOneAndDelete({ menuItemId: req.params.menuItemId });
    if (!deleted) return res.status(404).json({ error: 'Menu item not found' });
    res.json({ message: 'Menu item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
