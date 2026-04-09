const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, forgotPassword, resetPassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// POST /api/auth/register — Create a new account
router.post('/register', registerUser);

// POST /api/auth/login — Log in and receive JWT
router.post('/login', loginUser);

// GET /api/auth/profile — Get logged-in user's profile (protected)
router.get('/profile', protect, getUserProfile);

// POST /api/auth/forgot-password — Verify email exists
router.post('/forgot-password', forgotPassword);

// POST /api/auth/reset-password — Set new password
router.post('/reset-password', resetPassword);

module.exports = router;
