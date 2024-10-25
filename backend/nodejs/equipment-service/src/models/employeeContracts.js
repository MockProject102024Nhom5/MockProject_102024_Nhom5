const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employeeContracts', {
    contractId: {
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
    contractNumber: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    salary: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    benefits: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    terminationClauses: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    attachments: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    deflag: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'employeeContracts',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__employee__13820941E52D6065",
        unique: true,
        fields: [
          { name: "contractId" },
        ]
      },
    ]
  });
};
