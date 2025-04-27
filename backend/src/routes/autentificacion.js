const express = require('express');
const router = express.Router();

const { login,
  cambiarContraseña,

 } = require('../controllers/autentificacion');

// Middleware de validaciones
const { validarLogin } = require('../middlewares/validarDatos');

// Login
router.post('/login', validarLogin, login);

// Cambiar contraseña propia
router.put('/cambiar-contraseña', authenticateToken, validarCambiarContraseña, cambiarContraseña);

module.exports = router;
