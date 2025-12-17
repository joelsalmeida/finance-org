'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },

      sourceAccountNumber: {
        type: Sequelize.STRING(14),
        allowNull: false,
        references: {
          model: 'accounts',
          key: 'accountNumber',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },

      destinationAccountNumber: {
        type: Sequelize.STRING(14),
        allowNull: false,
        references: {
          model: 'accounts',
          key: 'accountNumber',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },

      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  },
};
