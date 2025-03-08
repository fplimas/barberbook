const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment'); // Certifique-se do caminho correto

// Rota para listar todos os agendamentos
router.get('/appointments', async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('client', 'name email') // Pega nome e email do cliente
            .populate('barber', 'name email'); // Pega nome e email do barbeiro
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar agendamentos', error });
    }
});

module.exports = router;