const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();
console.log('📄 process.env:', process.env);


const app = express();

// --- MIDDLEWARES ---

// 🚨 CAMBIO CLAVE: Configuración de CORS
// Especifica el origen (Origin) para permitir peticiones SOLO desde tu frontend React (puerto 3001)
app.use(cors({
    origin: 'http://localhost:3001', // <--- TU FRONTEND EN REACT
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}));

app.use(express.json());
app.use(morgan('dev'));

// Conexión a MongoDB
console.log("🌍 MONGODB_URI desde .env:", process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error al conectar a MongoDB', err));

// Rutas
app.use('/api/auth', require('./routes/auth.routes'));  // 👈 Autenticación
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