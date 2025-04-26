module.exports = (sequelize, DataTypes) => {
  let alias = 'Cotizacion';
  let cols = {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titulo: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.TEXT, allowNull: false },
    tipo: { type: DataTypes.ENUM('publica', 'privada'), defaultValue: 'privada' },
    estado: { type: DataTypes.ENUM('abierta', 'cerrada', 'cancelada'), defaultValue: 'abierta' },
    fecha_limite: { type: DataTypes.DATE },
    formas_pago: { type: DataTypes.STRING },
    formas_entrega: { type: DataTypes.STRING },
    empresa_solicitante_id: { type: DataTypes.INTEGER, allowNull: false },
    fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    fecha_actualizacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  };

  let config = {
    tableName: 'cotizaciones',
    timestamps: false
  };

  const Cotizacion = sequelize.define(alias, cols, config);

  Cotizacion.associate = function (models) {
    Cotizacion.belongsTo(models.Empresa, { as: 'solicitante', foreignKey: 'empresa_solicitante_id' });
    Cotizacion.hasMany(models.Oferta, { as: 'ofertas', foreignKey: 'cotizacion_id' });
  };

  return Cotizacion;
};
