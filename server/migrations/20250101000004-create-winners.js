'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('winners', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      roomId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'rooms', key: 'id' }, onDelete: 'CASCADE' },
      userId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });
    await queryInterface.addConstraint('winners', {
      fields: ['roomId','userId'],
      type: 'unique',
      name: 'unique_room_winner'
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('winners');
  }
};
