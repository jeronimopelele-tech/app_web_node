const Auth = require('../models/auth');
const jwt = require('jsonwebtoken');

const authCtrl = {};

// 🔸 GET: Obtener todos los usuarios autenticados
authCtrl.getAll = async (req, res) => {
  try {
    const usuarios = await Auth.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔸 POST: Registrar usuario
authCtrl.register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const existente = await Auth.findOne({ email });
    if (existente) return res.status(400).json({ message: 'Email ya registrado' });

    const nuevo = new Auth({ nombre, email, password });
    await nuevo.save();

    const token = jwt.sign({ id: nuevo._id }, 'secreto_jwt', { expiresIn: '1d' });
    res.status(201).json({ token, usuario: nuevo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔸 POST: Login de usuario
authCtrl.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Auth.findOne({ email });
    if (!usuario) return res.status(400).json({ message: 'Usuario no encontrado' });

    const match = await usuario.comparePassword(password);
    if (!match) return res.status(400).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: usuario._id }, 'secreto_jwt', { expiresIn: '1d' });
    res.json({ token, usuario });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔸 PUT: Actualizar usuario
authCtrl.update = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizado = await Auth.findByIdAndUpdate(id, req.body, { new: true });
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔸 DELETE: Eliminar usuario
authCtrl.remove = async (req, res) => {
  try {
    await Auth.findByIdAndDelete(req.params.id);
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = authCtrl;
