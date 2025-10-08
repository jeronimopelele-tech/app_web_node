const Servicio = require('../models/servicio');
const servicioCtrl = {};

// GET - todos los servicios
servicioCtrl.getServicios = async (req, res) => {
  const servicios = await Servicio.find();
  res.json(servicios);
};

// POST - crear servicio
servicioCtrl.createServicio = async (req, res) => {
  try {
    if (req.body._id === '') delete req.body._id;
    const servicio = new Servicio(req.body);
    await servicio.save();
    res.status(201).json(servicio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET - uno por ID
servicioCtrl.getServicioById = async (req, res) => {
  const servicio = await Servicio.findById(req.params.id);
  res.json(servicio);
};

// PUT - actualizar servicio
servicioCtrl.updateServicio = async (req, res) => {
  const { id } = req.params;
  const data = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    duracion: req.body.duracion
  };
  await Servicio.findByIdAndUpdate(id, { $set: data }, { new: true });
  res.json({ status: 'Servicio actualizado' });
};

// DELETE - eliminar servicio
servicioCtrl.deleteServicio = async (req, res) => {
  await Servicio.findByIdAndDelete(req.params.id);
  res.json({ status: 'Servicio eliminado' });
};

module.exports = servicioCtrl;
