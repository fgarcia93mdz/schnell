const { check, query, param, validationResult, body } = require('express-validator');

// Middleware general para capturar errores
const validarResultados = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  next();
};

// Registrar usuario
const validarRegistrarUsuario = [
  check('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  check('email').isEmail().withMessage('Debe ser un correo válido'),
  check('contraseña').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  validarResultados
];

// Login de usuario
const validarLogin = [
  check('email').isEmail().withMessage('Debe ser un correo válido'),
  check('contraseña').notEmpty().withMessage('Debe ingresar una contraseña'),
  validarResultados
];

// Actualizar usuario
const validarActualizarUsuario = [
  check('nombre').optional().notEmpty().withMessage('El nombre no puede ser vacío si se envía'),
  check('email').optional().isEmail().withMessage('Debe ser un correo válido si se envía'),
  check('rol').optional().isIn(['admin_schnell', 'empresa_admin', 'empresa_usuario']).withMessage('Rol inválido'),
  validarResultados
];

// Cambiar contraseña
const validarCambiarContraseña = [
  check('contraseñaActual').notEmpty().withMessage('Debe proporcionar la contraseña actual'),
  check('nuevaContraseña').isLength({ min: 6 }).withMessage('La nueva contraseña debe tener al menos 6 caracteres'),
  body('confirmarContraseña').custom((value, { req }) => {
    if (value !== req.body.nuevaContraseña) {
      throw new Error('La confirmación de contraseña no coincide');
    }
    return true;
  }),
  validarResultados
];

// Eliminar usuario
const validarEliminarUsuario = [
  param('id').isInt().withMessage('El ID debe ser numérico'),
  validarResultados
];

// Listar usuarios (opcional, permite agregar filtros en query string si después quieres)
const validarListarUsuarios = [
  query('rol').optional().isIn(['admin_schnell', 'empresa_admin', 'empresa_usuario']).withMessage('Rol de filtro inválido'),
  validarResultados
];

// Obtener perfil (no requiere nada especial)
const validarObtenerPerfilUsuario = [
  validarResultados
];

module.exports = {
  validarRegistrarUsuario,
  validarLogin,
  validarActualizarUsuario,
  validarCambiarContraseña,
  validarEliminarUsuario,
  validarListarUsuarios,
  validarObtenerPerfilUsuario
};
