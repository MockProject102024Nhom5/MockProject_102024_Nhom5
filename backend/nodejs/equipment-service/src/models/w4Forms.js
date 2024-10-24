const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('w4Forms', {
    formId: {
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
    numberOfDependents: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    submissionDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    deflag: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'w4Forms',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__w4Forms__51BCB72BBC02919D",
        unique: true,
        fields: [
          { name: "formId" },
        ]
      },
    ]
  });
};
