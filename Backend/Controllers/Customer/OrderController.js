const Order = require('../../Models/Customer/OrderModel');
const getDrivingDistance = require('../../utils/getDrivingDistance');

// Create a new order
const creatOrder = async (req, res) => {
    try {
        const {
            cartId,
            customerId,
            customerName,
            customerPhone,
            customerEmail,
            restaurantId,
            restaurantName,
            restaurantPhone,
            restaurantLocationLatitude,
            restaurantLocationLongitude,
            items,
            deliveryLocationLatitude,
            deliveryLocationLongitude,
            paymentMethod,
            notes
        } = req.body;

        // Validate required fields
        if (
            !cartId || !customerId || !customerName || !customerPhone || !customerEmail ||
            !restaurantId || !restaurantName || !restaurantPhone ||
            !restaurantLocationLatitude || !restaurantLocationLongitude ||
            !items || !deliveryLocationLatitude || !deliveryLocationLongitude || !paymentMethod
        ) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        // Calculate subtotal from items
        const subtotal = items.reduce((acc, item) => {
            return acc + (item.price * item.quantity);
        }, 0);

        console.log("Coords from restaurant:", restaurantLocationLatitude, restaurantLocationLongitude);
        console.log("Coords to delivery:", deliveryLocationLatitude, deliveryLocationLongitude);


        // Step 1: Get driving distance in KM
        const distance = await getDrivingDistance(
            restaurantLocationLatitude,
            restaurantLocationLongitude,
            deliveryLocationLatitude,
            deliveryLocationLongitude
        );

        if (!distance) {
            return res.status(500).json({ message: "Failed to calculate delivery distance." });
        }

        // Step 2: Calculate delivery charge
        const DELIVERY_RATE_PER_KM = 50; // example: 50 LKR/km
        const deliveryCharge = Math.ceil(distance * DELIVERY_RATE_PER_KM);

        // Step 3: Calculate total
        const calculatedTotal = subtotal + deliveryCharge;

        const newOrder = new Order({
            cartId,
            customerId,
            customerName,
            customerPhone,
            customerEmail,
            restaurantId,
            restaurantName,
            restaurantPhone,
            restaurantLocationLatitude,
            restaurantLocationLongitude,
            items,
            subtotal,
            deliveryLocationLatitude,
            deliveryLocationLongitude,
            deliveryCharge,
            totalAmount: calculatedTotal,
            paymentMethod,
            notes
        });

        await newOrder.save();

        res.status(201).json({ message: "Order created successfully", order: newOrder });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create order" });
    }
};


// View all orders
const viewAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve orders" });
    }
};

// View a specific order
const viewOrder = async (req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.id });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve order" });
    }
};

// View customer's order history
const viewCustomerOrderHistory = async (req, res) => {
    try {
        const orders = await Order.find({ customerId: req.params.id });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve order history" });
    }
};

// Update order
const updateOrder = async (req, res) => {
    try {
        const {
            cartId,
            customerId,
            customerName,
            customerPhone,
            customerEmail,
            restaurantId,
            restaurantName,
            restaurantPhone,
            restaurantLocationLatitude,
            restaurantLocationLongitude,
            items,
            subtotal,
            deliveryLocationLatitude,
            deliveryLocationLongitude,
            deliveryCharge,
            totalAmount,
            paymentStatus,
            paymentMethod,
            orderStatus,
            deliveryPersonId,
            deliveryPersonName,
            deliveryPersonPhone,
            deliveredTime,
            notes
        } = req.body;

        const orderId = req.params.id;
        const order = await Order.findOne({ orderId });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const updatedOrder = await Order.findOneAndUpdate(
            { orderId },
            {
                cartId,
                customerId,
                customerName,
                customerPhone,
                customerEmail,
                restaurantId,
                restaurantName,
                restaurantPhone,
                restaurantLocationLatitude,
                restaurantLocationLongitude,
                items,
                subtotal,
                deliveryLocationLatitude,
                deliveryLocationLongitude,
                deliveryCharge,
                totalAmount,
                paymentStatus,
                paymentMethod,
                orderStatus,
                deliveryPersonId,
                deliveryPersonName,
                deliveryPersonPhone,
                deliveredTime,
                notes
            },
            { new: true }
        );

        res.status(200).json({ message: "Order updated", updatedOrder });

    } catch (err) {
        res.status(500).json({ message: "Unable to update order" });
    }
};

// Update order payment status
const updateOrderPaymentStatus = async (req, res) => {
    try {
        const { paymentStatus } = req.body;
        const orderId = req.params.id;

        const updatedOrder = await Order.findOneAndUpdate(
            { orderId },
            { paymentStatus },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Payment status updated", updatedOrder });

    } catch (err) {
        res.status(500).json({ message: "Failed to update payment status" });
    }
};

// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { orderStatus } = req.body;
        const orderId = req.params.id;

        const updatedOrder = await Order.findOneAndUpdate(
            { orderId },
            { orderStatus },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order status updated", updatedOrder });

    } catch (err) {
        res.status(500).json({ message: "Failed to update order status" });
    }
};

// Update delivery person info
const updateOrderDeliveryPerson = async (req, res) => {
    try {
        const { deliveryPersonId, deliveryPersonName, deliveryPersonPhone } = req.body;
        const orderId = req.params.id;

        const updatedOrder = await Order.findOneAndUpdate(
            { orderId },
            { deliveryPersonId, deliveryPersonName, deliveryPersonPhone },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Delivery person updated", updatedOrder });

    } catch (err) {
        res.status(500).json({ message: "Failed to update delivery person" });
    }
};

// Delete order
const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findOneAndDelete({ orderId: req.params.id });
        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete order" });
    }
};

module.exports = {
    creatOrder,
    viewAllOrders,
    viewOrder,
    viewCustomerOrderHistory,
    updateOrder,
    updateOrderPaymentStatus,
    updateOrderStatus,
    updateOrderDeliveryPerson,
    deleteOrder
};
