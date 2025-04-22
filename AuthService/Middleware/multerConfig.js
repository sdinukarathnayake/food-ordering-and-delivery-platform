const multer = require('multer');
const path = require('path');

console.log("multer hit")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads')); 
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); 
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.test(ext)) {
        cb(null, true);  
    } else {
        cb(new Error('Only JPEG, JPG, or PNG files are allowed'), false);  
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 },  
}).fields([
    { name: 'resturantPhoto', maxCount: 1 },  
    { name: 'adminPhoto', maxCount: 1 },  
    {name:'customerPhoto',maxCount:1},
    {name:'diliveryPhoto',maxCount:1}    
]);

module.exports = upload;
