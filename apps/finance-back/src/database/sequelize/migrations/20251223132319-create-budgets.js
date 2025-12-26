'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('budgets', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },

      accountNumber: {
        type: Sequelize.STRING(14),
        allowNull: false,
        references: {
          model: 'accounts',
          key: 'accountNumber',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      limit: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      spent: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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

    await queryInterface.addConstraint('budgets', {
      fields: ['accountNumber', 'category'],
      type: 'unique',
      name: 'uniq_budgets_account_category',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('budgets');
  },
};
