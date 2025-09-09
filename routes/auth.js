const express = require('express');
const { 
  login, 
  register, 
  getCurrentUser, 
  logout, 
  refreshToken,
  me 
} = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Routes públiques
router.post('/login', login);
router.post('/register', register);

// Routes protegides
router.get('/me', authenticateToken, me);
router.post('/logout', authenticateToken, logout);
router.post('/refresh', authenticateToken, refreshToken);

module.exports = router;
