module.exports = (sequelize, DataTypes) => {
  return sequelize.define('shareStat', {
    roomId: { type: DataTypes.INTEGER, allowNull: false },
    winnerId: { type: DataTypes.INTEGER, allowNull: false },
    theme: { type: DataTypes.STRING, allowNull: false, defaultValue: 'classic' },
    count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
  }, { tableName: 'shareStats' });
};
