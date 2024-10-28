const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('assets', {
    assetId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    buildingId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'buildings',
        key: 'buildingId'
      }
    },
    assetName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    assetType: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    deflag: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'assets',
    schema: 'dbo',
    timestamps: false,
    paranoid: true,
    indexes: [
      {
        name: "PK__assets__7D3DF491C5798682",
        unique: true,
        fields: [
          { name: "assetId" },
        ]
      },
    ]
  });
};
