const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('residentRequests', {
    requestId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    residentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'residents',
        key: 'residentId'
      }
    },
    requestTypeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'requestTypes',
        key: 'requestTypeId'
      }
    },
    complaintDescription: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    submissionDate: {
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
    receivedDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    processingResult: {
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
    tableName: 'residentRequests',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__resident__E3C5DE31EB8EEC51",
        unique: true,
        fields: [
          { name: "requestId" },
        ]
      },
    ]
  });
};
