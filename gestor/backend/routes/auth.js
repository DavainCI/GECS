const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta de login
router.post('/login', authController.login);

// Ruta para obtener perfil (protegida)
router.get('/profile', authController.getProfile);

module.exports = router;