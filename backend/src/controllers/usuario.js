const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const { Usuario } = db;

// Crear un nuevo usuario
const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, contraseña, rol } = req.body;

    if (!nombre || !email || !contraseña) {
      return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
    }

    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: "El correo ya está registrado" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(contraseña, salt);

    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      contraseña: hash,
      rol: rol || 'empresa_usuario'
    });

    res.status(201).json({ mensaje: "Usuario creado con éxito", usuario: nuevoUsuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al registrar usuario" });
  }
};

// Listar todos los usuarios (solo admin_schnell o empresa_admin)
const listarUsuarios = async (req, res) => {
  try {
    if (!['admin_schnell', 'empresa_admin'].includes(req.usuario.rol)) {
      return res.status(403).json({ mensaje: "No autorizado" });
    }

    const usuarios = await Usuario.findAll({
      attributes: ['id', 'nombre', 'email', 'rol', 'estado']
    });

    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al listar usuarios" });
  }
};

// Actualizar datos de un usuario
const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, rol } = req.body;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    if (req.usuario.rol !== 'admin_schnell' && req.usuario.rol !== 'empresa_admin' && req.usuario.id !== usuario.id) {
      return res.status(403).json({ mensaje: "No autorizado para editar este usuario" });
    }

    usuario.nombre = nombre || usuario.nombre;
    usuario.email = email || usuario.email;
    if (rol && req.usuario.rol === 'admin_schnell') {
      usuario.rol = rol;
    }

    await usuario.save();

    res.status(200).json({ mensaje: "Usuario actualizado", usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar usuario" });
  }
};

// Cambiar su propia contraseña
const cambiarContraseña = async (req, res) => {
  try {
    const { contraseñaActual, nuevaContraseña } = req.body;

    const usuario = await Usuario.findByPk(req.usuario.id);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const passwordValida = bcrypt.compareSync(contraseñaActual, usuario.contraseña);
    if (!passwordValida) {
      return res.status(401).json({ mensaje: "Contraseña actual incorrecta" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(nuevaContraseña, salt);

    usuario.contraseña = hash;
    await usuario.save();

    res.status(200).json({ mensaje: "Contraseña cambiada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al cambiar contraseña" });
  }
};

// Eliminar usuario (baja lógica)
const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    if (!['admin_schnell', 'empresa_admin'].includes(req.usuario.rol)) {
      return res.status(403).json({ mensaje: "No autorizado" });
    }

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    usuario.estado = 'inactivo';
    await usuario.save();

    res.status(200).json({ mensaje: "Usuario dado de baja correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar usuario" });
  }
};

module.exports = {
  registrarUsuario,
  listarUsuarios,
  actualizarUsuario,
  cambiarContraseña,
  eliminarUsuario
};
