const express = require('express');
const router = express.Router();
const { addFood, getAllFood, getFoodById, updateFood, deleteFood, searchFood } = require('../controllers/menuController');
const upload = require('../middleware/multerConfig');

router.post('/add', upload.single("image"), addFood);
router.get('/list', getAllFood);
router.get('/list/:id', getFoodById);
router.get('/search', searchFood);
router.put('/update/:id', upload.single('image'), updateFood);
router.delete('/delete/:id', deleteFood);


module.exports = router;