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

const verifyRoles = require('../middlewares/verifyRoles');
const ROLES = require('../config/roles');
const SUBROLES = require('../config/subroles');


const {
  validarRegistrarUsuario,
  validarLogin,
  validarActualizarUsuario,
  validarCambiarContraseña,
  validarEliminarUsuario,
  validarListarUsuarios,
  validarObtenerPerfilUsuario
} = require('../middlewares/validarDatos');

const { verificarCantidadUsuariosEmpresa } = require('../middlewares/verificarCantidadUsuariosEmpresa');


router.post('/registrarUsuario', validarRegistrarUsuario, verifyRoles([ROLES.ADMIN_SCHNELL]), verificarCantidadUsuariosEmpresa('empresa_usuario', 'comprador_sr'), registrarUsuario);

// Listar usuarios (admin_schnell o empresa_admin)
router.get('/', authenticateToken, validarListarUsuarios, listarUsuarios);

// Actualizar usuario (por ID)
router.put('/:id', authenticateToken, validarActualizarUsuario, actualizarUsuario);

// Cambiar contraseña propia
router.put('/cambiar-contraseña', authenticateToken, validarCambiarContraseña, cambiarContraseña);

// Eliminar (baja lógica) un usuario
router.delete('/:id', authenticateToken, validarEliminarUsuario, eliminarUsuario);

module.exports = router;
