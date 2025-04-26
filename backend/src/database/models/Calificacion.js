module.exports = (sequelize, DataTypes) => {
  let alias = 'Calificacion';
  let cols = {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cotizacion_id: { type: DataTypes.INTEGER, allowNull: false },
    calificador_id: { type: DataTypes.INTEGER, allowNull: false },
    calificado_id: { type: DataTypes.INTEGER, allowNull: false },
    estrellas: { type: DataTypes.INTEGER, allowNull: false },
    comentario: { type: DataTypes.TEXT },
    fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  };

  let config = {
    tableName: 'calificaciones',
    timestamps: false
  };

  const Calificacion = sequelize.define(alias, cols, config);

  Calificacion.associate = function (models) {
    Calificacion.belongsTo(models.Cotizacion, { as: 'cotizacion', foreignKey: 'cotizacion_id' });
  };

  return Calificacion;
};
