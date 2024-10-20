const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('timekeeping', {
    recordId: {
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
    checkIn: {
      type: DataTypes.DATE,
      allowNull: true
    },
    checkOut: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deflag: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'timekeeping',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__timekeep__D825195EC410CC9F",
        unique: true,
        fields: [
          { name: "recordId" },
        ]
      },
    ]
  });
};
