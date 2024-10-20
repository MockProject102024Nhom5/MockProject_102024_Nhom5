const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employeePerformance', {
    reviewId: {
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
    performanceReview: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    discipline: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    rewards: {
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
    tableName: 'employeePerformance',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__employee__2ECD6E047ED7ED4D",
        unique: true,
        fields: [
          { name: "reviewId" },
        ]
      },
    ]
  });
};
