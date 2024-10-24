const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employees', {
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'userId'
      }
    },
    positionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'positions',
        key: 'positionId'
      }
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    salary: {
      type: DataTypes.DECIMAL(18,0),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'employees',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__employee__C134C9C17BB219D0",
        unique: true,
        fields: [
          { name: "employeeId" },
        ]
      },
    ]
  });
};
