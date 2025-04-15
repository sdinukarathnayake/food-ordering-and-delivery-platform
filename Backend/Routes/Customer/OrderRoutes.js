const { 
    creatOrder, viewOrder, viewCustomerOrderHistory, updateOrder, updateOrderPaymentStatus, updateOrderStatus, 
    updateOrderDeliveryPerson, deleteOrder, viewAllOrders
} = require('../../Controllers/Customer/OrderController');

const express = require('express');
const router = express.Router();

router.post('/create-order', creatOrder);

router.get('/view/:id', viewOrder);
router.get('/view-history/:id', viewCustomerOrderHistory);

// update details
router.put('/update/:id', updateOrder);
router.put('/update-payment-status/:id', updateOrderPaymentStatus);
router.put('/update-order-status/:id', updateOrderStatus);

router.put('/update-delivery-person/:id', updateOrderDeliveryPerson);

router.delete('/delete/:id', deleteOrder);

// manage all orders - admin
router.get('/view-all-orders', viewAllOrders);

module.exports = router;