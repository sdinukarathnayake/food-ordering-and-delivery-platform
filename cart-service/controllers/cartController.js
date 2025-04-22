const Cart = require('../models/cartModel');

const createCart = async (req, res) => {
    try {
        const {
            customerId,
            restaurantId,
            items,
            subtotal
        } = req.body;

        // Basic validation
        if (!customerId || !restaurantId || !items || !subtotal) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        const newCart = new Cart({
            customerId,
            restaurantId,
            items,
            subtotal
        });

        await newCart.save();

        res.status(201).json({ message: "Cart created successfully", cart: newCart });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create cart" });
    }
};


// View all carts
const viewAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve carts" });
    }
};

// View a specific cart by cartId
const viewCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ cartId: req.params.id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve cart" });
    }
};


// Update cart by cartId
const updateCart = async (req, res) => {
    try {
        const { customerId, restaurantId, items, subtotal } = req.body;
        const cartId = req.params.id;

        const cart = await Cart.findOne({ cartId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const updatedCart = await Cart.findOneAndUpdate(
            { cartId },
            { customerId, restaurantId, items, subtotal },
            { new: true }
        );

        res.status(200).json({ message: "Cart updated", updatedCart });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to update cart" });
    }
};


// Delete cart by cartId
const deleteCart = async (req, res) => {
    try {
        const deletedCart = await Cart.findOneAndDelete({ cartId: req.params.id });
        if (!deletedCart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json({ message: "Cart deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete cart" });
    }
};

module.exports = {
    createCart,
    viewAllCarts,
    viewCart,
    updateCart,
    deleteCart
};
