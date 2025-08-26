'use strict';

module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('rooms', [
      {
        name: 'Arisan Jumat Seru',
        capacity: 10,
        status: 'waiting',
        adminId: null,
        dues: 50000,
        drawFrequencyValue: 1,
        drawFrequencyUnit: 'weekly',
        tenorRounds: 10,
        startAt: null,
        allowSpectator: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Arisan Bulanan Keluarga',
        capacity: 8,
        status: 'waiting',
        adminId: null,
        dues: 100000,
        drawFrequencyValue: 1,
        drawFrequencyUnit: 'monthly',
        tenorRounds: 8,
        startAt: null,
        allowSpectator: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Arisan Harian Kantor',
        capacity: 5,
        status: 'waiting',
        adminId: null,
        dues: 20000,
        drawFrequencyValue: 1,
        drawFrequencyUnit: 'daily',
        tenorRounds: 5,
        startAt: null,
        allowSpectator: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('rooms', null, {});
  }
};
