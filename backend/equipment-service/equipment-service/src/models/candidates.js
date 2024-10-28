const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('candidates', {
    candidateId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fullName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    phoneNumber: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    positionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'positions',
        key: 'positionId'
      }
    },
    applicationDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    resumeAttachment: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'candidates',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__candidat__7437A4841ECD7CC6",
        unique: true,
        fields: [
          { name: "candidateId" },
        ]
      },
    ]
  });
};
