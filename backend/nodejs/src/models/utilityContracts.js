const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('utilityContracts', {
    contractId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    utilityType: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fee: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    deflag: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'utilityContracts',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__utilityC__138209414F5F6BFB",
        unique: true,
        fields: [
          { name: "contractId" },
        ]
      },
    ]
  });
};
