const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsuarioSchema = new Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true }
}, {
  timestamps: true // guarda createdAt y updatedAt automáticamente
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
