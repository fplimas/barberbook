const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.controller');
const { protect, restrictTo } = require('../middleware/auth.middleware');

// Todas as rotas de agendamento requerem autenticação
router.use(protect);

// Rotas públicas para usuários autenticados
router.post('/', appointmentController.createAppointment);
router.get('/my-appointments', appointmentController.getMyAppointments);
router.get('/available-slots', appointmentController.getAvailableSlots);

// Obter, atualizar e cancelar um agendamento específico
router.route('/:id')
  .get(appointmentController.getAppointment)
  .patch(appointmentController.updateAppointment)
  .delete(appointmentController.cancelAppointment);

// Rota para avaliação após o serviço
router.patch('/:id/rate', appointmentController.rateAppointment);

// Rotas apenas para barbeiros
router.use(restrictTo('barber', 'admin'));
router.get('/barber-schedule', appointmentController.getBarberSchedule);
router.patch('/:id/confirm', appointmentController.confirmAppointment);
router.patch('/:id/complete', appointmentController.completeAppointment);
router.patch('/:id/mark-no-show', appointmentController.markNoShow);

// Rotas apenas para administradores
router.use(restrictTo('admin'));
router.get('/all', appointmentController.getAllAppointments);
router.delete('/:id/force', appointmentController.forceDeleteAppointment);

module.exports = router; 