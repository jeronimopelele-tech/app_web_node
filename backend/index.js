const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error al conectar a MongoDB', err));

// Rutas
app.use('/api/auth', require('./routes/auth.routes'));  // 👈 Autenticación
app.use('/api/usuarios', require('./routes/usuario.routes')); // 👈 Usuarios
app.use('/api/productos', require('./routes/producto.routes')); // 👈 Productos
app.use('/api/servicios', require('./routes/servicio.routes')); // 👈 Servicios

// Ruta base
app.get('/', (req, res) => {
  res.send('🌐 API funcionando correctamente');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
