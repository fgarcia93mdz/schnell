module.exports = (sequelize, DataTypes) => {
  let alias = 'Membresia';
  let cols = {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    empresa_id: { type: DataTypes.INTEGER, allowNull: false },
    tipo: {
      type: DataTypes.ENUM('basica', 'premium', 'ilimitada'),
      defaultValue: 'basica'
    },
    fecha_inicio: { type: DataTypes.DATE, allowNull: false },
    fecha_fin: { type: DataTypes.DATE, allowNull: false },
    monto: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
    estado_pago: {
      type: DataTypes.ENUM('pendiente', 'pagado', 'vencido'),
      defaultValue: 'pendiente'
    }
  };

  let config = {
    tableName: 'membresias',
    timestamps: false
  };

  const Membresia = sequelize.define(alias, cols, config);

  Membresia.associate = function (models) {
    Membresia.belongsTo(models.Empresa, { as: 'empresa', foreignKey: 'empresa_id' });
  };

  return Membresia;
};
