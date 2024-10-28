const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('providers', {
    providerId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    providerName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    contactPerson: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    contactEmail: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    contactPhone: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    deflag: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'providers',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__provider__107017F37FC53962",
        unique: true,
        fields: [
          { name: "providerId" },
        ]
      },
    ]
  });
};
