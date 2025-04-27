const { EmpresaConfigUsuario, UsuarioEmpresa } = require('../database/models');

const verificarCantidadUsuariosEmpresa = (rolNuevo, subrolNuevo) => {
  return async (req, res, next) => {
    try {
      const empresaId = req.usuario.empresa_id; // Depende cómo hayas manejado la empresa en el token o sesión

      if (!empresaId) {
        return res.status(400).json({ mensaje: 'No se puede determinar la empresa del usuario.' });
      }

      // Buscar la configuración de la empresa para ese rol y subrol
      const config = await EmpresaConfigUsuario.findOne({
        where: { empresa_id: empresaId, rol: rolNuevo, subrol: subrolNuevo }
      });

      if (!config) {
        return res.status(400).json({ mensaje: 'No se ha configurado el límite para este tipo de usuario.' });
      }

      // Contar cuántos usuarios actuales tiene la empresa con ese rol/subrol
      const cantidadActual = await UsuarioEmpresa.count({
        where: { empresa_id: empresaId, rol: rolNuevo, subrol: subrolNuevo }
      });

      if (cantidadActual >= config.cantidad_maxima) {
        return res.status(400).json({ mensaje: `Se alcanzó el límite máximo para ${rolNuevo} - ${subrolNuevo}.` });
      }

      // Todo OK
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al validar cantidad de usuarios.' });
    }
  };
};

module.exports = { verificarCantidadUsuariosEmpresa };
