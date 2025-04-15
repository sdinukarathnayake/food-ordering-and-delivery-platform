const { 
    register, viewCustomer, updateCustomer, updateCustomerPassword, updateCustomerLocation, deleteCustomer, viewAllCustomers
} = require('../../Controllers/Customer/CustomerController');

const express = require('express');
const router = express.Router();

router.post('/register', register);

router.get('/view/:id', viewCustomer);

// update details
router.put('/update/:id', updateCustomer);

router.put('/update-password/:id', updateCustomerPassword);
router.put('/update-location/:id', updateCustomerLocation);

router.delete('/delete/:id', deleteCustomer);

// manage all customers - admin
router.get('/view-all', viewAllCustomers );


module.exports = router;