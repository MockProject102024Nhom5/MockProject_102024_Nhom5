module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('buildingDocuments', 'documentId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('buildingDocuments', 'documentId');
  }
};
