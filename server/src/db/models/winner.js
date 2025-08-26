module.exports = (sequelize, DataTypes) => {
  return sequelize.define('winner', {
    roomId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false }
  }, { tableName: 'winners' });
};
