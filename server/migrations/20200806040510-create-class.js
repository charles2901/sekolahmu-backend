'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Classes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rows: {
        type: Sequelize.INTEGER
      },
      columns: {
        type: Sequelize.INTEGER
      },
      teacher: {
        type: Sequelize.STRING
      },
      available_seats: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      occupied_seats: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Classes');
  }
};