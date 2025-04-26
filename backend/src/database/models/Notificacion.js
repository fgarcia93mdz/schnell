module.exports = (sequelize, DataTypes) => {
  let alias = 'Notificacion';
  let cols = {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuario_id: { type: DataTypes.INTEGER, allowNull: false },
    tipo: { type: DataTypes.STRING, allowNull: false },
    mensaje: { type: DataTypes.STRING, allowNull: false },
    leido: { type: DataTypes.BOOLEAN, defaultValue: false },
    fecha_envio: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  };

  let config = {
    tableName: 'notificaciones',
    timestamps: false
  };

  const Notificacion = sequelize.define(alias, cols, config);

  Notificacion.associate = function (models) {
    Notificacion.belongsTo(models.Usuario, { as: 'usuario', foreignKey: 'usuario_id' });
  };

  return Notificacion;
};
