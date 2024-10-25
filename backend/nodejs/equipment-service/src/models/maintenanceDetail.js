const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('maintenanceDetail', {
    maintenanceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'maintenance',
        key: 'maintenanceId'
      }
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'employees',
        key: 'employeeId'
      }
    },
    employeeRole: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    workDone: {
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
    tableName: 'maintenanceDetail',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__maintena__7937D617897BC7E6",
        unique: true,
        fields: [
          { name: "maintenanceId" },
          { name: "employeeId" },
        ]
      },
    ]
  });
};
