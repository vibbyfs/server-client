module.exports = (sequelize, DataTypes) => {
  return sequelize.define('room', {
    name: { type: DataTypes.STRING, allowNull: false },
    capacity: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.ENUM('waiting','ongoing','complete'), defaultValue: 'waiting' },
    adminId: { type: DataTypes.INTEGER, allowNull: true },
    dues: { type: DataTypes.DECIMAL(12,2), allowNull: false, defaultValue: 0 },
    drawFrequencyValue: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    drawFrequencyUnit: { type: DataTypes.ENUM('daily','weekly','monthly'), allowNull: false, defaultValue: 'weekly' },
    tenorRounds: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 10 },
    startAt: { type: DataTypes.DATE, allowNull: true },
    allowSpectator: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    pinHash: { type: DataTypes.STRING, allowNull: true }
  }, { 
    tableName: 'rooms',
    defaultScope: {
      attributes: { exclude: ['pinHash'] } // Never return pinHash by default
    },
    scopes: {
      withPin: {
        attributes: { include: ['pinHash'] }
      }
    }
  });
};
