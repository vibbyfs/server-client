'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rooms', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      capacity: { type: Sequelize.INTEGER, allowNull: false },
      status: { type: Sequelize.ENUM('waiting','ongoing','complete'), allowNull: false, defaultValue: 'waiting' },
      adminId: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
      dues: { type: Sequelize.DECIMAL(12,2), allowNull: false, defaultValue: 0 },
      drawFrequencyValue: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
      drawFrequencyUnit: { type: Sequelize.ENUM('daily','weekly','monthly'), allowNull: false, defaultValue: 'weekly' },
      tenorRounds: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 10 },
      startAt: { type: Sequelize.DATE, allowNull: true },
      allowSpectator: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('rooms');
  }
};
