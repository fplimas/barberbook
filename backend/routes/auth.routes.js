const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

// Rotas de autenticação públicas
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);

// Rotas protegidas (requerem autenticação)
router.use(protect); // Middleware que verifica se o usuário está logado

router.patch('/update-password', authController.updatePassword);
router.get('/me', authController.getMe);
router.patch('/update-me', authController.updateMe);
router.delete('/delete-me', authController.deleteMe);

module.exports = router; 