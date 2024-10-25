const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('admins', {
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'userId'
      }
    }
  }, {
    sequelize,
    tableName: 'admins',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__admins__AD0500A69A81D605",
        unique: true,
        fields: [
          { name: "adminId" },
        ]
      },
    ]
  });
};
