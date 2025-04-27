module.exports = (sequelize, DataTypes) => {
  let alias = 'EmpresaConfigUsuario';

  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    empresa_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rol: {
      type: DataTypes.ENUM('admin_schnell', 'empresa_admin', 'empresa_usuario'),
      allowNull: false
    },
    subrol: {
      type: DataTypes.ENUM('comprador_sr', 'comprador_jr', 'gerencia'),
      allowNull: false
    },
    cantidad_maxima: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    fecha_actualizacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  };

  let config = {
    tableName: 'empresa_config_usuarios',
    timestamps: false
  };

  const EmpresaConfigUsuario = sequelize.define(alias, cols, config);

  EmpresaConfigUsuario.associate = function (models) {
    EmpresaConfigUsuario.belongsTo(models.Empresa, {
      as: 'empresa',
      foreignKey: 'empresa_id'
    });
  };

  return EmpresaConfigUsuario;
};
