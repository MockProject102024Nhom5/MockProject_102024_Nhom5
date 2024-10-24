const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employeeLeave', {
    leaveId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'employees',
        key: 'employeeId'
      }
    },
    leaveStartDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    leaveEndDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    leaveType: {
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
    tableName: 'employeeLeave',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__employee__CB461494B7A79A3C",
        unique: true,
        fields: [
          { name: "leaveId" },
        ]
      },
    ]
  });
};
