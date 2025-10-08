const express = require('express');
const router = express.Router();

const servicioCtrl = require('../controllers/servicio.controller');

router.get('/', servicioCtrl.getServicios);
router.post('/', servicioCtrl.createServicio);
router.get('/:id', servicioCtrl.getServicioById);
router.put('/:id', servicioCtrl.updateServicio);
router.delete('/:id', servicioCtrl.deleteServicio);

module.exports = router;
