const express = require('express');
const router = express.Router();
const barberController = require('../controllers/barber.controller');
const { protect, restrictTo } = require('../middleware/auth.middleware');

// Rotas públicas
router.get('/', barberController.getAllBarbers);
router.get('/:id', barberController.getBarberProfile);
router.get('/:id/availability', barberController.getBarberAvailability);
router.get('/:id/services', barberController.getBarberServices);
router.get('/:id/reviews', barberController.getBarberReviews);

// Rotas protegidas para barbeiros
router.use(protect, restrictTo('barber', 'admin'));
router.get('/dashboard/stats', barberController.getBarberStats);
router.get('/dashboard/upcoming', barberController.getUpcomingAppointments);
router.get('/dashboard/today', barberController.getTodayAppointments);
router.patch('/services', barberController.updateBarberServices);
router.patch('/availability', barberController.updateBarberAvailability);

module.exports = router; 