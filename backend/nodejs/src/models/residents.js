const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('residents', {
    residentId: {
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
    tableName: 'residents',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__resident__9AD7183664DD1716",
        unique: true,
        fields: [
          { name: "residentId" },
        ]
      },
    ]
  });
};
