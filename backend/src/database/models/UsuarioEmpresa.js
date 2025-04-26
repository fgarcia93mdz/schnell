module.exports = (sequelize, DataTypes) => {
  let alias = 'UsuarioEmpresa';
  let cols = {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuario_id: { type: DataTypes.INTEGER, allowNull: false },
    empresa_id: { type: DataTypes.INTEGER, allowNull: false },
    rol_interno: {
      type: DataTypes.ENUM('comprador_junior', 'comprador_sr', 'gerente_compras'),
      allowNull: false
    },
    fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  };

  let config = {
    tableName: 'usuarios_empresas',
    timestamps: false
  };

  const UsuarioEmpresa = sequelize.define(alias, cols, config);

  UsuarioEmpresa.associate = function (models) {
    UsuarioEmpresa.belongsTo(models.Usuario, { as: 'usuario', foreignKey: 'usuario_id' });
    UsuarioEmpresa.belongsTo(models.Empresa, { as: 'empresa', foreignKey: 'empresa_id' });
  };

  return UsuarioEmpresa;
};
