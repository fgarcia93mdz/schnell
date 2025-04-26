module.exports = (sequelize, DataTypes) => {
  let alias = 'Empresa';
  let cols = {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    cuit: { type: DataTypes.STRING(15), allowNull: false, unique: true },
    email_empresa: { type: DataTypes.STRING, allowNull: false },
    telefono: { type: DataTypes.STRING },
    rubro: { type: DataTypes.STRING },
    domicilio: { type: DataTypes.STRING },
    pais: { type: DataTypes.STRING },
    provincia: { type: DataTypes.STRING },
    reputacion: { type: DataTypes.FLOAT, defaultValue: 5.0 },
    usuario_admin_id: { type: DataTypes.INTEGER, allowNull: false },
    fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    fecha_actualizacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  };

  let config = {
    tableName: 'empresas',
    timestamps: false
  };

  const Empresa = sequelize.define(alias, cols, config);

  Empresa.associate = function (models) {
    Empresa.belongsTo(models.Usuario, { as: 'admin', foreignKey: 'usuario_admin_id' });
    Empresa.hasMany(models.Cotizacion, { as: 'cotizaciones', foreignKey: 'empresa_solicitante_id' });
  };

  return Empresa;
};
