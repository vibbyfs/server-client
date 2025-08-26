'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('shareStats', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      roomId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'rooms', key: 'id' }, onDelete: 'CASCADE' },
      winnerId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'winners', key: 'id' }, onDelete: 'CASCADE' },
      theme: { type: Sequelize.STRING, allowNull: false, defaultValue: 'classic' },
      count: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });
    await queryInterface.addConstraint('shareStats', {
      fields: ['winnerId','theme'],
      type: 'unique',
      name: 'unique_winner_theme'
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('shareStats');
  }
};
