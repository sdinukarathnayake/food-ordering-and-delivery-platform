const { 
    createCart, viewAllCarts, viewCart, updateCart, deleteCart
} = require('../controllers/cartController');

const express = require('express');
const router = express.Router();

router.post('/', createCart);

router.get('/view/:id', viewCart);

router.put('/update/:id', updateCart);

router.delete('/delete/:id', deleteCart);

// manage all carts - admin
router.get('/view-all', viewAllCarts );

module.exports = router;