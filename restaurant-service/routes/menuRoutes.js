const express = require('express');
const router = express.Router();
const { addFood, getAllFood, getFoodById, updateFood, deleteFood, searchFood } = require('../controllers/menuController');
const upload = require('../Middleware/multerConfig');
const verifyToken = require('../../AuthService/Middleware/verifyToken');
const verifyRole = require('../../AuthService/Middleware/verifyRole');

router.post('/add', verifyToken, verifyRole("ResturantAdmin"), upload.single("image"), addFood);
router.get('/list', verifyToken, verifyRole("ResturantAdmin", "Customer"), getAllFood);
router.get('/list/:id', verifyToken, verifyRole("ResturantAdmin"), getFoodById);
router.get('/search', verifyToken, verifyRole("ResturantAdmin"), searchFood);
router.put('/update/:id', verifyToken, verifyRole("ResturantAdmin"), upload.single('image'), updateFood);
router.delete('/delete/:id', verifyToken, verifyRole("ResturantAdmin"), deleteFood);


module.exports = router;