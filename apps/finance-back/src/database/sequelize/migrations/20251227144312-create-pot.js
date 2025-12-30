'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pots', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
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

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      goalAmount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      allocated: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.addConstraint('pots', {
      fields: ['accountNumber', 'name'],
      type: 'unique',
      name: 'uniq_pots_account_name',
    });

    await queryInterface.addIndex('pots', ['accountNumber']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('pots');
  },
};
