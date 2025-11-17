const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const authCtrl = {};

// ✅ REGISTRO - POST /api/auth/register
authCtrl.register = async (req, res) => {
    try {
        // Usa 'name', 'email', 'password' para coincidir con React
        const { name, email, password } = req.body; 

        if (!name || !email || !password)
            return res.status(400).json({ error: 'Todos los campos son requeridos' });

        const existe = await Usuario.findOne({ correo: email });
        if (existe)
            return res.status(400).json({ error: 'El correo ya está registrado' });

        // Mapear los campos de React a los campos del modelo (nombre, correo, contraseña)
        const nuevoUsuario = new Usuario({ 
            nombre: name, 
            correo: email, 
            contraseña: password 
        }); 
        await nuevoUsuario.save();

        const token = jwt.sign({ id: nuevoUsuario._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({ 
            message: 'Usuario registrado correctamente', 
            token, 
            user: { name: nuevoUsuario.nombre, email: nuevoUsuario.correo, isAdmin: nuevoUsuario.isAdmin || false } 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ LOGIN - POST /api/auth/login
authCtrl.login = async (req, res) => {
    try {
        // Usa 'email' y 'password' para coincidir con React
        const { email, password } = req.body;

        const usuario = await Usuario.findOne({ correo: email });
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

        const valido = await usuario.compararContraseña(password); // Usar 'password'
        if (!valido) return res.status(400).json({ error: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ 
            message: 'Login exitoso', 
            token, 
            user: { name: usuario.nombre, email: usuario.correo, isAdmin: usuario.isAdmin || false } 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ GET - Obtener todos los usuarios
authCtrl.getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find({}, '-contraseña'); 
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ PUT - Actualizar usuario (CORREGIDO)
authCtrl.updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        // 🚨 CAMBIO CLAVE: Usar 'name', 'email', 'password' para la entrada
        const { name, email, password } = req.body; 

        // Mapear los campos de entrada a los campos del modelo
        const updateFields = { nombre: name, correo: email };
        
        // Si se proporciona una nueva contraseña, la incluimos
        if (password) {
            // Asume que tu modelo maneja el hashing automáticamente antes de guardar
            updateFields.contraseña = password; 
        }

        const actualizado = await Usuario.findByIdAndUpdate(id, updateFields, { new: true });
        if (!actualizado) return res.status(404).json({ error: 'Usuario no encontrado' });

        res.json({ message: 'Usuario actualizado correctamente', actualizado });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ DELETE - Eliminar usuario (NO necesita cambios en los campos, solo el ID)
authCtrl.deleteUsuario = async (req, res) => {
    try {
        const eliminado = await Usuario.findByIdAndDelete(req.params.id);
        if (!eliminado) return res.status(404).json({ error: 'Usuario no encontrado' });

        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = authCtrl;