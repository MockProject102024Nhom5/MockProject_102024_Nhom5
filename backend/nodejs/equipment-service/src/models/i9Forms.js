const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('i9Forms', {
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
    verifierName: {
      type: DataTypes.STRING(100),
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
    tableName: 'i9Forms',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__i9Forms__51BCB72B44B0B869",
        unique: true,
        fields: [
          { name: "formId" },
        ]
      },
    ]
  });
};
