module.exports = (sequelize, DataTypes) => {
  return sequelize.define('reactionStat', {
    roomId: { type: DataTypes.INTEGER, allowNull: false },
    sessionDate: { type: DataTypes.DATEONLY, allowNull: false },
    count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    peakConcurrent: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
  }, { tableName: 'reactionStats' });
};
