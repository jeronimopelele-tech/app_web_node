const mongoose = require('mongoose');

const servicioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del servicio es obligatorio']
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria']
  },
  precio: {
    type: Number,
    required: [true, 'El precio es obligatorio']
  },
  duracion: {
    type: String,
    required: [true, 'La duración del servicio es obligatoria']
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Servicio', servicioSchema);
