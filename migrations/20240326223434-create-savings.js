'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Savings', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      days: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      cigarettes_per_day: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      tracking_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Trackings',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Savings');
  }
};
