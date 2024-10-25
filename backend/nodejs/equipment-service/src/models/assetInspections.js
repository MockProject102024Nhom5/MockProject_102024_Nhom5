const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('assetInspections', {
    inspectionId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    assetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'assets',
        key: 'assetId'
      }
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employees',
        key: 'employeeId'
      }
    },
    inspectionDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    statusDescription: {
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
    tableName: 'assetInspections',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__assetIns__2BAC0D09090055A2",
        unique: true,
        fields: [
          { name: "inspectionId" },
        ]
      },
    ]
  });
};
