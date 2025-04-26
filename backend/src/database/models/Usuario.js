module.exports = (sequelize, DataTypes) => {
  let alias = 'Usuario';
  let cols = {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    contraseña: { type: DataTypes.STRING, allowNull: false },
    rol: {
      type: DataTypes.ENUM('admin_schnell', 'empresa_admin', 'empresa_usuario'),
      defaultValue: 'empresa_usuario'
    },
    estado: { type: DataTypes.ENUM('activo', 'suspendido'), defaultValue: 'activo' },
    fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    fecha_actualizacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
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
