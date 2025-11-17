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
        type: Number,
        required: [true, 'La duración es obligatoria'],
        min: [0, 'La duración no puede ser negativa']
    },
    // 🚨 CAMBIO CLAVE: Agregar el campo de la URL de la imagen
    imagenUrl: { 
        type: String, 
        default: null // Permitir que sea opcional
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Servicio', servicioSchema);