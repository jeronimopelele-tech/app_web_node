const Producto = require('../models/producto');
const productoCtrl = {};

// ✅ GET - Todos los productos
productoCtrl.getProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ POST - Crear producto (Actualizado para incluir imagenUrl)
productoCtrl.createProducto = async (req, res) => {
    try {
        // 🚨 CAMBIO: Incluir 'imagenUrl' al desestructurar req.body
        const { nombre, descripcion, precio, stock, imagenUrl } = req.body; 

        if (!nombre || !descripcion || !precio || stock === undefined) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        // 🚨 CAMBIO: Incluir 'imagenUrl' al crear el nuevo objeto
        const nuevoProducto = new Producto({ nombre, descripcion, precio, stock, imagenUrl });
        await nuevoProducto.save();

        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ GET - Producto por ID
productoCtrl.getProductoById = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(producto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ PUT - Actualizar producto (Actualizado para incluir imagenUrl)
productoCtrl.updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        // 🚨 CAMBIO: Incluir 'imagenUrl' al desestructurar req.body
        const { nombre, descripcion, precio, stock, imagenUrl } = req.body;

        // 🚨 CAMBIO: Crear objeto de actualización con todos los campos, incluido 'imagenUrl'
        const updateFields = { nombre, descripcion, precio, stock, imagenUrl };

        const actualizado = await Producto.findByIdAndUpdate(
            id,
            updateFields, // <-- Se pasa el objeto completo
            { new: true } // Esto asegura que Mongoose devuelva el documento actualizado
        );

        if (!actualizado) return res.status(404).json({ error: 'Producto no encontrado' });

        // 'actualizado' ahora incluye 'imagenUrl'
        res.json(actualizado); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ DELETE - Eliminar producto
productoCtrl.deleteProducto = async (req, res) => {
    try {
        const eliminado = await Producto.findByIdAndDelete(req.params.id);
        if (!eliminado) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = productoCtrl;