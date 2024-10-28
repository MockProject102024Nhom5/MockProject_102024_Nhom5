const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('trainingSchedules', {
    scheduleId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    trainingName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    trainingDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'employees',
        key: 'employeeId'
      }
    },
    deflag: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'trainingSchedules',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__training__A532EDD489C5DCB9",
        unique: true,
        fields: [
          { name: "scheduleId" },
        ]
      },
    ]
  });
};
