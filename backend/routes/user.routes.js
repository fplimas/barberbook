const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { protect, restrictTo } = require('../middleware/auth.middleware');

// Rotas públicas
router.get('/barbers', userController.getAllBarbers);
router.get('/barbers/:id', userController.getBarberProfile);

// Rotas protegidas (requerem autenticação)
router.use(protect);

// Rotas para o próprio usuário
router.get('/profile', userController.getMyProfile);
router.patch('/profile', userController.updateMyProfile);

// Rotas apenas para barbeiros
router.use(restrictTo('barber', 'admin'));
router.patch('/barber-profile', userController.updateBarberProfile);
router.patch('/working-hours', userController.updateWorkingHours);

// Rotas apenas para administradores
router.use(restrictTo('admin'));
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router; 