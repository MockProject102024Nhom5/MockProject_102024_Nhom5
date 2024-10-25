const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('buildings', {
    buildingId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    constructionYear: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    numberOfFloors: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    numberOfApartments: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    amenities: {
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
    tableName: 'buildings',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__building__979FD1CD1C6B31AE",
        unique: true,
        fields: [
          { name: "buildingId" },
        ]
      },
    ]
  });
};
