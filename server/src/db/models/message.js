module.exports = (sequelize, DataTypes) => {
  return sequelize.define('message', {
    roomId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: true },
    role: { type: DataTypes.ENUM('user','assistant'), allowNull: false, defaultValue: 'user' },
    content: { type: DataTypes.TEXT, allowNull: false }
  }, { tableName: 'messages' });
};
