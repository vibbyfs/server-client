'use strict';

module.exports = {
  async up(queryInterface) {
    // Insert test users
    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin User',
        email: 'admin@test.com',
        passwordHash: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Radian Malik',
        email: 'radian@test.com',
        passwordHash: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Malik Test',
        email: 'malik@test.com',
        passwordHash: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // Set room admin to user ID 1 for the first room
    await queryInterface.sequelize.query(`
      UPDATE rooms SET "adminId" = 1 WHERE id = (SELECT id FROM rooms ORDER BY id LIMIT 1)
    `);

    // Get the first room ID
    const [rooms] = await queryInterface.sequelize.query('SELECT id FROM rooms ORDER BY id LIMIT 1');
    const roomId = rooms[0].id;

    // Insert participants for the first room
    await queryInterface.bulkInsert('roomParticipants', [
      {
        roomId: roomId,
        userId: 1,
        hasWon: false,
        joinedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roomId: roomId,
        userId: 2,
        hasWon: false,
        joinedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roomId: roomId,
        userId: 3,
        hasWon: false,
        joinedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('roomParticipants', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
