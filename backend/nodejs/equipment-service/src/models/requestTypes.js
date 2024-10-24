const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('requestTypes', {
    requestTypeId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    requestName: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'requestTypes',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__requestT__DEA2DA88E78300C3",
        unique: true,
        fields: [
          { name: "requestTypeId" },
        ]
      },
    ]
  });
};
