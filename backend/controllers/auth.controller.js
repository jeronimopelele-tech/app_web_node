const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const authCtrl = {};

// ✅ REGISTRO - POST /api/auth/register
authCtrl.register = async (req, res) => {
  try {
    const { nombre, correo, contraseña } = req.body;

    if (!nombre || !correo || !contraseña)
      return res.status(400).json({ error: 'Todos los campos son requeridos' });

    const existe = await Usuario.findOne({ correo });
    if (existe)
      return res.status(400).json({ error: 'El correo ya está registrado' });

    const nuevoUsuario = new Usuario({ nombre, correo, contraseña });
    await nuevoUsuario.save();

    const token = jwt.sign({ id: nuevoUsuario._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ message: 'Usuario registrado correctamente', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ LOGIN - POST /api/auth/login
authCtrl.login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const usuario = await Usuario.findOne({ correo });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const valido = await usuario.compararContraseña(contraseña);
    if (!valido) return res.status(400).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: 'Login exitoso', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ GET - Obtener todos los usuarios (solo admin, ejemplo simple)
authCtrl.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find({}, '-contraseña'); // No mostrar contraseñas
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ PUT - Actualizar usuario
authCtrl.updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, contraseña } = req.body;

    const data = { nombre, correo };
    if (contraseña) data.contraseña = contraseña;

    const actualizado = await Usuario.findByIdAndUpdate(id, data, { new: true });
    if (!actualizado) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json({ message: 'Usuario actualizado correctamente', actualizado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ DELETE - Eliminar usuario
authCtrl.deleteUsuario = async (req, res) => {
  try {
    const eliminado = await Usuario.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = authCtrl;
