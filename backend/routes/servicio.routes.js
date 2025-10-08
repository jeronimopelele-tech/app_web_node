const express = require('express');
const router = express.Router();
const servicioCtrl = require('../controllers/servicio.controller');

// CRUD
router.get('/', servicioCtrl.getServicios);          // Obtener todos
router.get('/:id', servicioCtrl.getServicioById);    // Obtener uno
router.post('/', servicioCtrl.createServicio);       // Crear
router.put('/:id', servicioCtrl.updateServicio);     // Actualizar
router.delete('/:id', servicioCtrl.deleteServicio);  // Eliminar

module.exports = router;
