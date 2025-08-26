'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('messages', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      roomId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'rooms', key: 'id' }, onDelete: 'CASCADE' },
      userId: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
      role: { type: Sequelize.ENUM('user','assistant'), allowNull: false, defaultValue: 'user' },
      content: { type: Sequelize.TEXT, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });
    await queryInterface.addIndex('messages', ['roomId', 'createdAt'], { name: 'idx_messages_room_createdAt' });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('messages');
  }
};
