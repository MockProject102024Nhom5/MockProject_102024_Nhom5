const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('paymentTypes', {
    paymentTypeId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    paymentName: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'paymentTypes',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__paymentT__460ADCD2C4850A46",
        unique: true,
        fields: [
          { name: "paymentTypeId" },
        ]
      },
    ]
  });
};
