const Menu = require('../models/menuModel');
const fs = require('fs');

const addFood = async (req, res) => {
    try {
        let image_filename = req.file.filename;

        const food = new Menu({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: image_filename,
            category: req.body.category,
            restaurantId: req.body.restaurantId
        });

        await food.save();
        res.status(200).json({ success: true, message: 'Food added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error adding food' });
    }
};


const getAllFood = async (req, res) => {
    try {
        const foods = await Menu.find({});
        res.status(200).json({ success: true, data: foods });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error fetching food' });
    }
};

const getFoodById = async (req, res) => {
    try {
        const food = await Menu.findById(req.params.id);
        if (!food) {
            return res.status(404).json({ success: false, message: 'Menu not found' });
        }
        res.status(200).json({ success: true, data: food });
    } catch (error) {
        console.error('Error fetching menu item:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
  };
  

const updateFood = async (req, res) => {
    const { name, description, price, category, restaurantId } = req.body;

    try {
        const food = await Menu.findById(req.params.id);

        if (!food) {
            return res.status(404).json({ success: false, message: 'Food not found' });
        }

        food.name = name || food.name;
        food.description = description || food.description;
        food.price = price || food.price;
        food.category = category || food.category;
        food.restaurantId = restaurantId || food.restaurantId;

        if (req.file) {
            const oldImage = food.image;
            food.image = req.file.filename;

            fs.unlink(`uploads/${oldImage}`, (err) => {
                if (err) console.error('Error deleting old image:', err);
            });
        }

        await food.save();
        res.status(200).json({ success: true, message: 'Food updated successfully', data: food });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error updating food' });
    }
};

const deleteFood = async (req, res) => {
    try {
        const food = await Menu.findByIdAndDelete(req.params.id);
        if (!food) {
            return res.status(404).json({ success: false, message: 'Food not found' });
        }

        fs.unlink(`uploads/${food.image}`, () => {});

        res.status(200).json({ success: true, message: 'Food deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error deleting food' });
    }
};

const searchFood = async (req, res) => {
    const { query } = req.query;

    if (!query || query.trim() === '') {
        return res.status(200).json({ success: true, data: [] });
    }

    let searchFilter = {
        $or: [
            { name: { $regex: query, $options: 'i' } },
            { menuId: { $regex: query, $options: 'i' } },
            { restaurantId: { $regex: query, $options: 'i' } },
            { category: { $regex: query, $options: 'i' } }        ]
    };

    try {
        const foods = await Menu.find(searchFilter);
        res.status(200).json({ success: true, data: foods });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error searching food' });
    }
};


module.exports = { addFood, getAllFood, getFoodById, updateFood, deleteFood, searchFood };
