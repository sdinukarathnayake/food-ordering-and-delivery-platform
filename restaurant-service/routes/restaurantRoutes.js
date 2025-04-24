const express = require('express');
const router = express.Router();
const { addRestaurant, getAllRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant, searchRestaurant } = require('../controllers/restaurantController');
const upload = require('../Middleware/multerConfig');
const verifyToken = require('../../AuthService/Middleware/verifyToken');
const verifyRole = require('../../AuthService/Middleware/verifyRole');

router.post('/add', upload.single("restaurantPhoto"), addRestaurant);
router.get('/list', getAllRestaurants);
router.get('/list/:id', verifyToken, verifyRole("ResturantAdmin"), getRestaurantById);
router.get('/search', verifyToken, verifyRole("ResturantAdmin"), searchRestaurant);
router.put('/update/:id', verifyToken, verifyRole("ResturantAdmin"), upload.single("restaurantPhoto"), updateRestaurant);
router.delete('/delete/:id', verifyToken, verifyRole("ResturantAdmin"), deleteRestaurant);

module.exports = router;
