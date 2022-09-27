'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PublicFunds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      catalogue: {
        type: Sequelize.STRING
      },
      denomination: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      date: {
        type: Sequelize.DATEONLY
      },
      type: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PublicFunds');
  }
};