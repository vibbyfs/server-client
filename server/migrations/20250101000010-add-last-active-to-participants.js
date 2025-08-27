'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('roomParticipants', 'lastActiveAt', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('roomParticipants', 'lastActiveAt');
  }
};
