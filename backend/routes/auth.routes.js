const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller');

// Rutas de autenticación
router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);

// CRUD de usuarios
router.get('/', authCtrl.getUsuarios);
router.put('/:id', authCtrl.updateUsuario);
router.delete('/:id', authCtrl.deleteUsuario);

module.exports = router;
