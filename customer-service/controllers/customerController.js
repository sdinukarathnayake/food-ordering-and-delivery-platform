const Customer = require('../models/customerModel');

const register = async (req, res) => {
    try {
        const { customerName, email, phone, name, password, currentLocationLatitude, currentLocationLongitude } = req.body;

        const existingEmail = await Customer.findOne({ email });
        const existingUsername = await Customer.findOne({ name });

        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists." });
        }

        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists." });
        }

        const newCustomer = new Customer({ customerName, email, phone, name, password, currentLocationLatitude, currentLocationLongitude });
        await newCustomer.save();

        res.status(201).json({ message: "Customer registered successfully", customer: newCustomer });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to register customer" });
    }
};


const viewAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve customers" });
    }
};


const viewCustomer = async (req, res) => {
    try {
        const customer = await Customer.findOne({ name: req.params.id });
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json(customer);
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve customer" });
    }
};


const updateCustomer = async (req, res) => {
    try {
        const {  customerName, email, phone } = req.body;
        const name = req.params.id;

        const customer = await Customer.findOne({ name });

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        const updatedCustomer = await Customer.findOneAndUpdate(
            { name },
            {  customerName, email, phone },
            { new: true }
        );

        res.status(200).json({ message: "Customer updated", updatedCustomer });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to update customer" });
    }
};


const updateCustomerPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const name = req.params.id;

        const customer = await Customer.findOne({ name });

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        const updatedCustomer = await Customer.findOneAndUpdate(
            { name },
            { password },
            { new: true }
        );

        res.status(200).json({ message: "Password updated", updatedCustomer });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to update password" });
    }
};


const updateCustomerLocation = async (req, res) => {
    try {
        const { currentLocationLatitude, currentLocationLongitude } = req.body;
        const name = req.params.id;

        const customer = await Customer.findOne({ name });
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        const updatedCustomer = await Customer.findOneAndUpdate(
            { name },
            { currentLocationLatitude, currentLocationLongitude },
            { new: true }
        );

        res.status(200).json({ message: "Location updated", updatedCustomer });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to update location" });
    }
};


const deleteCustomer = async (req, res) => {
    try {
        const deletedCustomer = await Customer.findOneAndDelete({ name: req.params.id });
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
