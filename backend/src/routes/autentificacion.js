const express = require('express');
const router = express.Router();

const { login,
  cambiarContraseña,

 } = require('../controllers/autentificacion');

// Middleware de validaciones
const { validarLogin,
  validarCambiarContraseña
 } = require('../middlewares/validarDatos');
// Middleware de autenticación
const { authenticateToken } = require('../middlewares/authenticateToken');

// Login
router.post('/login', validarLogin, login);

// Cambiar contraseña propia
router.put('/cambiar-contraseña', authenticateToken, validarCambiarContraseña, cambiarContraseña);

module.exports = router;
