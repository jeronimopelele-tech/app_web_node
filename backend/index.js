/**
 * Archivo principal del servidor backend.
 * 
 * Aquí se configura y arranca el servidor Express.
 * Se definen los middlewares, la conexión a la base de datos y las rutas.
 */

// -----------------------------------
// Importaciones de módulos
// -----------------------------------
const express = require('express');
const morgan = require('morgan');           
const cors = require('cors');               
const { mongoose } = require('./database'); 

// -----------------------------------
// Inicialización de la aplicación
// -----------------------------------
const app = express();

// -----------------------------------
// Configuraciones del servidor
// -----------------------------------
app.set('port', process.env.PORT || 3000);

// -----------------------------------
// Middlewares
// -----------------------------------
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));

// -----------------------------------
// Rutas del servidor
// -----------------------------------
app.use('/api/empleados', require('./routes/empleado.routes'));

// -----------------------------------
// Inicio del servidor
// -----------------------------------
app.listen(app.get('port'), () => {
    console.log('Servidor activo en el puerto', app.get('port'));
});
