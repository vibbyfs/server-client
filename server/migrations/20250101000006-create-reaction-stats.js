'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reactionStats', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      roomId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'rooms', key: 'id' }, onDelete: 'CASCADE' },
      sessionDate: { type: Sequelize.DATEONLY, allowNull: false },
      count: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      peakConcurrent: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });
    await queryInterface.addConstraint('reactionStats', {
      fields: ['roomId','sessionDate'],
      type: 'unique',
      name: 'unique_room_sessionDate'
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('reactionStats');
  }
};
