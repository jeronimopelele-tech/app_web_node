const Usuario = require('../models/usuario');
const usuarioCtrl = {};

// ✅ GET - todos los usuarios
usuarioCtrl.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ POST - crear usuario
usuarioCtrl.createUsuario = async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;
    const nuevoUsuario = new Usuario({ nombre, correo, password });
    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ GET - uno por ID
usuarioCtrl.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ PUT - actualizar usuario
usuarioCtrl.updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, password } = req.body;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      { nombre, correo, contraseña },
      { new: true }
    );
    if (!usuarioActualizado) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ DELETE - eliminar usuario
usuarioCtrl.deleteUsuario = async (req, res) => {
  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuarioEliminado) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = usuarioCtrl;
