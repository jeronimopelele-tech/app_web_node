const Usuario = require('../models/usuario');
const usuarioCtrl = {};

// GET - todos los usuarios
usuarioCtrl.getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
};

// POST - crear usuario
usuarioCtrl.createUsuario = async (req, res) => {
  try {
    if (req.body._id === '') delete req.body._id;
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.status(201).json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET - uno por ID
usuarioCtrl.getUsuarioById = async (req, res) => {
  const usuario = await Usuario.findById(req.params.id);
  res.json(usuario);
};

// PUT - actualizar usuario
usuarioCtrl.updateUsuario = async (req, res) => {
  const { id } = req.params;
  const data = {
    nombre: req.body.nombre,
    correo: req.body.correo,
    contraseña: req.body.contraseña
  };
  await Usuario.findByIdAndUpdate(id, { $set: data }, { new: true });
  res.json({ status: 'Usuario actualizado' });
};

// DELETE - eliminar usuario
usuarioCtrl.deleteUsuario = async (req, res) => {
  await Usuario.findByIdAndDelete(req.params.id);
  res.json({ status: 'Usuario eliminado' });
};

module.exports = usuarioCtrl;
