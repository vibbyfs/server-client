'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('rooms', 'pinHash', {
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Hashed PIN for room protection'
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('rooms', 'pinHash');
  }
};
