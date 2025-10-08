const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Para usar variables del .env

const app = express();

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/miapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

//  Configuraciones
app.set('port', process.env.PORT || 3000);

//  Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//  Rutas (importación)
const empleadoRoutes = require('./routes/empleado.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const productoRoutes = require('./routes/producto.routes');
const servicioRoutes = require('./routes/servicio.routes');
const authRoutes = require('./routes/auth.routes');

//  Registro de rutas
app.use('/api/empleados', empleadoRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/servicios', servicioRoutes);
app.use('/api/auth', authRoutes);

// Inicio del servidor
app.listen(app.get('port'), () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${app.get('port')}`);
});
