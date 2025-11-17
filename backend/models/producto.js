const mongoose = require('mongoose');
const { Schema } = mongoose; // Importar Schema para mejor claridad

const productoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio']
    },
    stock: {
        type: Number,
        required: [true, 'El stock es obligatorio'],
        min: [0, 'El stock no puede ser negativo']
    },
    // 🚨 CAMBIO CLAVE: Agregando el campo de la URL de la imagen
    imagenUrl: { 
        type: String, 
        default: null // Es opcional, ya que puede no tener una imagen al crearse
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Producto', productoSchema);