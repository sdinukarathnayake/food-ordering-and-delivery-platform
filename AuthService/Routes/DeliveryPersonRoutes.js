const{getPendingDeliveryPerson,approveDeliveryPerson,registerDeliveryPerson} = require('../Controller/DeliveryPersonController');
const verifyRole = require('../Middleware/verifyRole')
const verifyToken = require('../Middleware/verifyToken')
const upload = require('../Middleware/multerConfig');
const express = require('express');
const router = express.Router();

router.post('/registerDelivery',upload,registerDeliveryPerson);
router.get('/pending', verifyToken,verifyRole("SystemAdmin") ,getPendingDeliveryPerson);
router.put('/approve', verifyToken,verifyRole("SystemAdmin") ,approveDeliveryPerson);

module.exports = router;