const express = require('express');
const router = express.Router();

const authController = require('../controller/auth');

router.post('/signup',authController.postSignUp);

router.post('/login',authController.postLogin);

module.exports = router;