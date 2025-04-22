const express = require('express');
const router  = express.Router();

const{sendNotifications} = require('../Controllers/AdminNotificationController');

router.post('/send-notifications', sendNotifications);

module.exports = router;