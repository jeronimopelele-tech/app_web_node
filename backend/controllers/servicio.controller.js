const Servicio = require('../models/servicio');
const servicioCtrl = {};

// ✅ GET - Todos los servicios
servicioCtrl.getServicios = async (req, res) => {
  try {
    const servicios = await Servicio.find();
    res.json(servicios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ POST - Crear servicio
servicioCtrl.createServicio = async (req, res) => {
  try {
    const { nombre, descripcion, precio, duracion } = req.body;

    if (!nombre || !descripcion || !precio || !duracion) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const nuevoServicio = new Servicio({ nombre, descripcion, precio, duracion });
    await nuevoServicio.save();

    res.status(201).json(nuevoServicio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ GET - Servicio por ID
servicioCtrl.getServicioById = async (req, res) => {
  try {
    const servicio = await Servicio.findById(req.params.id);
    if (!servicio) return res.status(404).json({ error: 'Servicio no encontrado' });
    res.json(servicio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ PUT - Actualizar servicio
servicioCtrl.updateServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, duracion } = req.body;

    const actualizado = await Servicio.findByIdAndUpdate(
      id,
      { nombre, descripcion, precio, duracion },
      { new: true }
    );

    if (!actualizado) return res.status(404).json({ error: 'Servicio no encontrado' });

    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ DELETE - Eliminar servicio
servicioCtrl.deleteServicio = async (req, res) => {
  try {
    const eliminado = await Servicio.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ error: 'Servicio no encontrado' });
    res.json({ message: 'Servicio eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = servicioCtrl;
