const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Registration with OTP
router.post('/register/send-otp', authController.sendRegisterOtp);
router.post('/register/verify-otp', authController.verifyRegisterOtp);

// Login (existing users)
router.post('/login', authController.login);
router.get('/me', authMiddleware, authController.me);

// Forgot password flows
router.post('/forgot-password/send-otp', authController.sendForgotPasswordOtp);
router.post('/forgot-password/verify-otp', authController.verifyForgotPasswordOtp);

module.exports = router;
