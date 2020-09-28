'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_clinic', {
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      },
      clinic_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'clinic',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addConstraint('user_clinic', {
      fields: ['user_id', 'clinic_id'],
      type: 'primary key',
      name: 'user_clinic_primary_key'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('user_clinic', 'user_clinic_primary_key');
    await queryInterface.dropTable('user_clinic');
  }
};