'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('rooms', 'customParticipants', {
      type: Sequelize.JSON,
      allowNull: true,
      comment: 'Custom participant names or labels for the room'
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('rooms', 'customParticipants');
  }
};