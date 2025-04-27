const express = require('express');
const router = express.Router();

const {
  registrarUsuario,
  listarUsuarios,
  actualizarUsuario,
  cambiarContraseña,
  eliminarUsuario
} = require('../controllers/usuario');

// Middleware de autenticación
const { authenticateToken } = require('../middlewares/authenticateToken');
const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ mensaje: "Token no proporcionado" });
  }
  authenticateToken(req, res, next);
};

// Middleware de validaciones
const {
  validarRegistrarUsuario,
  validarLogin,
  validarActualizarUsuario,
  validarCambiarContraseña,
  validarEliminarUsuario,
  validarListarUsuarios,
  validarObtenerPerfilUsuario
} = require('../middlewares/validarDatos');

// Endpoints

// Registrar un nuevo usuario
router.post('/registrarUsuario', validarRegistrarUsuario, registrarUsuario);

// Listar usuarios (admin_schnell o empresa_admin)
router.get('/', authenticate, validarListarUsuarios, listarUsuarios);

// Actualizar usuario (por ID)
router.put('/:id', authenticate, validarActualizarUsuario, actualizarUsuario);

// Cambiar contraseña propia
router.put('/cambiar-contraseña', authenticate, validarCambiarContraseña, cambiarContraseña);

// Eliminar (baja lógica) un usuario
router.delete('/:id', authenticate, validarEliminarUsuario, eliminarUsuario);

module.exports = router;
