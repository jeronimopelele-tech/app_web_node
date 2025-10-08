const mongoose = require('mongoose');
const { Schema } = mongoose;

const ServicioSchema = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  duracion: { type: String } // ej: "30 min", "2 horas"
}, {
  timestamps: true
});

module.exports = mongoose.model('Servicio', ServicioSchema);
