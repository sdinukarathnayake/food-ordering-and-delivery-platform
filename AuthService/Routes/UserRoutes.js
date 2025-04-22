const express = require('express');
const router = express.Router();
const upload = require('../Middleware/multerConfig');

const{login,logout,checkToken,register} = require('../Controller/UserController');

router.post('/login',login);
router.post('/logout',logout);
router.get('/checkToken',checkToken);
router.post('/register',upload,register);

module.exports=router;