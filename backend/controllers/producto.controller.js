const Producto = require('../models/producto');
const productoCtrl = {};

// GET - todos los productos
productoCtrl.getProductos = async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
};

// POST - crear producto
productoCtrl.createProducto = async (req, res) => {
  try {
    if (req.body._id === '') delete req.body._id;
    const producto = new Producto(req.body);
    await producto.save();
    res.status(201).json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET - uno por ID
productoCtrl.getProductoById = async (req, res) => {
  const producto = await Producto.findById(req.params.id);
  res.json(producto);
};

// PUT - actualizar producto
productoCtrl.updateProducto = async (req, res) => {
  const { id } = req.params;
  const data = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    stock: req.body.stock
  };
  await Producto.findByIdAndUpdate(id, { $set: data }, { new: true });
  res.json({ status: 'Producto actualizado' });
};

// DELETE - eliminar producto
productoCtrl.deleteProducto = async (req, res) => {
  await Producto.findByIdAndDelete(req.params.id);
  res.json({ status: 'Producto eliminado' });
};

module.exports = productoCtrl;
