const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller');

// GET todos
router.get('/', authCtrl.getAll);

// POST registro
router.post('/register', authCtrl.register);

// POST login
router.post('/login', authCtrl.login);

// PUT actualizar
router.put('/:id', authCtrl.update);

// DELETE eliminar
router.delete('/:id', authCtrl.remove);

module.exports = router;

