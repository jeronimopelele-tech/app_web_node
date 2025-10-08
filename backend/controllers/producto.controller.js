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

// ✅ POST - Crear producto
productoCtrl.createProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock } = req.body;

    if (!nombre || !descripcion || !precio || stock === undefined) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const nuevoProducto = new Producto({ nombre, descripcion, precio, stock });
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

// ✅ PUT - Actualizar producto
productoCtrl.updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock } = req.body;

    const actualizado = await Producto.findByIdAndUpdate(
      id,
      { nombre, descripcion, precio, stock },
      { new: true }
    );

    if (!actualizado) return res.status(404).json({ error: 'Producto no encontrado' });

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
