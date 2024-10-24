const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('maintenance', {
    maintenanceId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    buildingId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'buildings',
        key: 'buildingId'
      }
    },
    maintenanceDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    notes: {
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
    tableName: 'maintenance',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__maintena__75249A8B9A07B2DD",
        unique: true,
        fields: [
          { name: "maintenanceId" },
        ]
      },
    ]
  });
};
