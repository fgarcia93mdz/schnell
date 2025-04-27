const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const { Usuario } = db;
const moment = require('moment');

const login = async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    if (!email || !contraseña) {
      return res.status(400).json({ mensaje: "Faltan datos" });
    }

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const passwordValida = bcrypt.compareSync(contraseña, usuario.contraseña);
    if (!passwordValida) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    if (usuario.estado !== 'activo') {
      return res.status(403).json({ mensaje: "Cuenta desactivada. Contacte al soporte." });
    }

    // Chequeo de estado_clave o vencimiento de contraseña
    let debeCambiarContraseña = false;

    // Si el estado es pendiente
    if (usuario.estado_clave === 'pendiente') {
      debeCambiarContraseña = true;
    }

    // O si la contraseña fue cambiada hace más de 90 días
    if (usuario.fecha_ultimo_cambio_clave) {
      const hoy = moment();
      const fechaCambio = moment(usuario.fecha_ultimo_cambio_clave);
      const diferenciaDias = hoy.diff(fechaCambio, 'days');

      if (diferenciaDias >= 90) {
        debeCambiarContraseña = true;
      }
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        estado_clave: usuario.estado_clave,
        debeCambiarContraseña
      },
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al iniciar sesión" });
  }
};

const cambiarContraseña = async (req, res) => {
  try {
    const { contraseñaActual, nuevaContraseña, confirmarContraseña } = req.body;
    const userId = req.usuario.id;

    if (!contraseñaActual || !nuevaContraseña || !confirmarContraseña) {
      return res.status(400).json({ mensaje: "Faltan datos" });
    }

    if (nuevaContraseña !== confirmarContraseña) {
      return res.status(400).json({ mensaje: "Las nuevas contraseñas no coinciden" });
    }

    const usuario = await Usuario.findByPk(userId);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const passwordValida = bcrypt.compareSync(contraseñaActual, usuario.contraseña);
    if (!passwordValida) {
      return res.status(401).json({ mensaje: "La contraseña actual no es válida" });
    }

    const nuevaHash = bcrypt.hashSync(nuevaContraseña, 10);

    await usuario.update({
      contraseña: nuevaHash,
      estado_clave: 'cambiada',
      fecha_ultimo_cambio_clave: new Date()
    });

    return res.status(200).json({ mensaje: "Contraseña actualizada correctamente" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al cambiar contraseña" });
  }
};

module.exports = {
  login,
  cambiarContraseña
};
