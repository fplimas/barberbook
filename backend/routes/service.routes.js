const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.controller');
const { protect, restrictTo } = require('../middleware/auth.middleware');

// Rotas públicas
router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getService);

// Rotas protegidas apenas para administradores
router.use(protect, restrictTo('admin'));
router.post('/', serviceController.createService);
router.route('/:id')
  .patch(serviceController.updateService)
  .delete(serviceController.deleteService);

module.exports = router; 