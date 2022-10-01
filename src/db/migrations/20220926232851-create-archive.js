'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('archives', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      path: {
        type: Sequelize.STRING
      },
      mime_type: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      public_fund_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'public_funds',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('archives');
  }
};