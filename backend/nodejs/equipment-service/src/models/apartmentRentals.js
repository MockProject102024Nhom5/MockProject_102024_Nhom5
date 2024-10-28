const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('apartmentRentals', {
    rentalId: {
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
    apartmentNumber: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    buildingId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'buildings',
        key: 'buildingId'
      }
    },
    rentalStartDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    rentalEndDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    rentalFee: {
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
    tableName: 'apartmentRentals',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__apartmen__0164732E7B92F390",
        unique: true,
        fields: [
          { name: "rentalId" },
        ]
      },
    ]
  });
};
