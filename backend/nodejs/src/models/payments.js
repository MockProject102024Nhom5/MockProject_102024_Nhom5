const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payments', {
    paymentId: {
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
    paymentDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    paymentTypeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'paymentTypes',
        key: 'paymentTypeId'
      }
    },
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    paymentMethod: {
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
    tableName: 'payments',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__payments__A0D9EFC6FB0C2716",
        unique: true,
        fields: [
          { name: "paymentId" },
        ]
      },
    ]
  });
};
