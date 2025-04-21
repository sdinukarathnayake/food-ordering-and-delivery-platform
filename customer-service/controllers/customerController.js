const Customer = require('../models/customerModel');

// register a new customer
const register = async (req, res) => {
    try {
        const { name, email, phone, username, password, currentLocationLatitude, currentLocationLongitude } = req.body;

        // Check for duplicate email or username
        const existingEmail = await Customer.findOne({ email });
        const existingUsername = await Customer.findOne({ username });

        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists." });
        }

        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists." });
        }

        const newCustomer = new Customer({ name, email, phone, username, password, currentLocationLatitude, currentLocationLongitude });
        await newCustomer.save();

        res.status(201).json({ message: "Customer registered successfully", customer: newCustomer });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to register customer" });
    }
};

// view all customers
const viewAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve customers" });
    }
};


// view a specific customer by customerId
const viewCustomer = async (req, res) => {
    try {
        const customer = await Customer.findOne({ customerId: req.params.id });
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json(customer);
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve customer" });
    }
};


// update customer by customerId
const updateCustomer = async (req, res) => {
    try {
        const {  name, email, phone } = req.body;
        const customerId = req.params.id;

        const customer = await Customer.findOne({ customerId });

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        const updatedCustomer = await Customer.findOneAndUpdate(
            { customerId },
            {  name, email, phone },
            { new: true }
        );

        res.status(200).json({ message: "Customer updated", updatedCustomer });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to update customer" });
    }
};


// update customer password only
const updateCustomerPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const customerId = req.params.id;

        const customer = await Customer.findOne({ customerId });

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        const updatedCustomer = await Customer.findOneAndUpdate(
            { customerId },
            { password },
            { new: true }
        );

        res.status(200).json({ message: "Password updated", updatedCustomer });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to update password" });
    }
};


// Update customer location only
const updateCustomerLocation = async (req, res) => {
    try {
        const { currentLocationLatitude, currentLocationLongitude } = req.body;
        const customerId = req.params.id;

        const customer = await Customer.findOne({ customerId });
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        const updatedCustomer = await Customer.findOneAndUpdate(
            { customerId },
            { currentLocationLatitude, currentLocationLongitude },
            { new: true }
        );

        res.status(200).json({ message: "Location updated", updatedCustomer });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to update location" });
    }
};


// Delete customer by customerId
const deleteCustomer = async (req, res) => {
    try {
        const deletedCustomer = await Customer.findOneAndDelete({ customerId: req.params.id });
        if (!deletedCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete customer" });
    }
};

module.exports = {
    register,
    viewAllCustomers,
    viewCustomer,
    updateCustomer,
    updateCustomerPassword,
    updateCustomerLocation,
    deleteCustomer
};
