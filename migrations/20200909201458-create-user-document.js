'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_document', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        }
      },
      document_type_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'document_type',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        }
      },
      file: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      clinic_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'clinic',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        }
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
    await queryInterface.dropTable('user_document');
  }
};