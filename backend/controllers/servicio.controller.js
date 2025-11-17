const Servicio = require('../models/servicio');
const servicioCtrl = {};

// --- Función Auxiliar para manejar números ---
const parseNumber = (value) => {
    if (value === null || value === undefined || value === "") {
        return 0;
    }
    return parseFloat(value); 
};

// ✅ GET - Todos los servicios
servicioCtrl.getServicios = async (req, res) => {
    try {
        // Al no excluir campos, 'imagenUrl' será enviado al frontend si está en el modelo
        const servicios = await Servicio.find(); 
        res.json(servicios); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ POST - Crear servicio (CORREGIDO)
servicioCtrl.createServicio = async (req, res) => {
    try {
        // 🚨 CAMBIO CLAVE: Incluir imagenUrl
        const { nombre, descripcion, precio, duracion, imagenUrl } = req.body;

        if (!nombre || !descripcion || !precio || !duracion) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }
        
        const parsedPrecio = parseNumber(precio);
        const parsedDuracion = parseNumber(duracion); 

        const nuevoServicio = new Servicio({ 
            nombre, 
            descripcion, 
            precio: parsedPrecio,
            duracion: parsedDuracion,
            imagenUrl: imagenUrl // 🚨 AHORA SE GUARDA EN LA BASE DE DATOS
        });
        
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

// ✅ PUT - Actualizar servicio (MEJORADO PARA CLARIDAD)
servicioCtrl.updateServicio = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        
        // **!!! SOLUCIÓN DE CONVERSIÓN PARA ACTUALIZACIÓN !!!**
        if (updates.precio !== undefined) {
            updates.precio = parseNumber(updates.precio);
        }
        if (updates.duracion !== undefined) {
            updates.duracion = parseNumber(updates.duracion);
        }

        // NO NECESITAS MODIFICAR 'updates' para incluir imagenUrl, 
        // ya que `const updates = req.body;` lo incluye por defecto.
        // Solo necesita existir en el modelo de Mongoose.

        const actualizado = await Servicio.findByIdAndUpdate(
            id,
            updates, // 'updates' contiene todos los campos enviados, incluido imagenUrl.
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