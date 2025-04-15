const { 
    creatCart, viewAllCarts, viewCart, updateCart, deleteCart
} = require('../../Controllers/Customer/CartController');

const express = require('express');
const router = express.Router();

router.post('/add-to-cart', creatCart);

router.get('/view/:id', viewCart);

router.put('/update/:id', updateCart);

router.delete('/delete/:id', deleteCart);

// manage all carts - admin
router.get('/view-all', viewAllCarts );

module.exports = router;