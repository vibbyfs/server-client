module.exports = (sequelize, DataTypes) => {
  return sequelize.define('roomParticipant', {
    roomId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    hasWon: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    joinedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    lastActiveAt: { type: DataTypes.DATE, allowNull: true }
  }, { tableName: 'roomParticipants' });
};
