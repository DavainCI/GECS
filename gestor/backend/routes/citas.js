const express = require('express');
const router = express.Router();
const citasController = require('../controllers/citasController');

// Obtener citas por mes
router.get('/mes', citasController.getCitasByMonth);

// Crear nueva cita
router.post('/', citasController.createCita);

// Obtener citas del usuario
router.get('/mis-citas', citasController.getMisCitas);

// Obtener todos los servicios
router.get('/servicios', citasController.getServicios);

module.exports = router;