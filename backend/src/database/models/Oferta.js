module.exports = (sequelize, DataTypes) => {
  let alias = 'Oferta';
  let cols = {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cotizacion_id: { type: DataTypes.INTEGER, allowNull: false },
    empresa_ofertante_id: { type: DataTypes.INTEGER, allowNull: false },
    precio: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
    descripcion_oferta: { type: DataTypes.TEXT },
    estado: { type: DataTypes.ENUM('enviada', 'aceptada', 'rechazada'), defaultValue: 'enviada' },
    fecha_oferta: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    fecha_respuesta: { type: DataTypes.DATE }
  };

  let config = {
    tableName: 'ofertas',
    timestamps: false
  };

  const Oferta = sequelize.define(alias, cols, config);

  Oferta.associate = function (models) {
    Oferta.belongsTo(models.Cotizacion, { as: 'cotizacion', foreignKey: 'cotizacion_id' });
    Oferta.belongsTo(models.Empresa, { as: 'ofertante', foreignKey: 'empresa_ofertante_id' });
  };

  return Oferta;
};
