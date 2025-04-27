module.exports = (sequelize, DataTypes) => {
  let alias = 'Usuario';
  let cols = {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    apellido: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    contraseña: { type: DataTypes.STRING, allowNull: false },
    estado_clave: {
      type: DataTypes.ENUM('pendiente', 'cambiada'),
      defaultValue: 'pendiente'
    },
    fecha_ultimo_cambio_clave: {
      type: DataTypes.DATE,
      allowNull: true
    },
    rol: {
      type: DataTypes.ENUM('admin_schnell', 'empresa_admin', 'empresa_usuario'),
      defaultValue: 'empresa_usuario'
    },
    estado: { type: DataTypes.ENUM('activo', 'suspendido'), defaultValue: 'activo' },
    fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    fecha_actualizacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    borrado: { type: DataTypes.INTEGER, defaultValue: false }
  };

  let config = {
    tableName: 'usuarios',
    timestamps: false
  };

  const Usuario = sequelize.define(alias, cols, config);

  Usuario.associate = function (models) {
    Usuario.hasMany(models.UsuarioEmpresa, { as: 'empresas', foreignKey: 'usuario_id' });
    Usuario.hasMany(models.Notificacion, { as: 'notificaciones', foreignKey: 'usuario_id' });
  };

  return Usuario;
};
