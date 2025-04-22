const express = require('express');
const router = express.Router();
const { addRestaurant, getAllRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant, searchRestaurant } = require('../controllers/restaurantController');
const upload = require('../middleware/multerConfig');

router.post('/add', upload.single("restaurantPhoto"), addRestaurant);
router.get('/list', getAllRestaurants);
router.get('/list/:id', getRestaurantById);
router.get('/search', searchRestaurant);
router.put('/update/:id', upload.single("restaurantPhoto"), updateRestaurant);
router.delete('/delete/:id', deleteRestaurant);

module.exports = router;
