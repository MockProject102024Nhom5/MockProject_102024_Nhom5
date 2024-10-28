const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('buildingDocuments', {
    documentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    buildingId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'buildings',
        key: 'buildingId'
      }
    },
    designDocuments: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    electricalSystem: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    waterSystem: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    deflag: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'buildingDocuments',
    schema: 'dbo',
    timestamps: false,
  });
};
