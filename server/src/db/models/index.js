const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize');

const User = require('./user')(sequelize, DataTypes);
const Room = require('./room')(sequelize, DataTypes);
const RoomParticipant = require('./roomParticipant')(sequelize, DataTypes);
const Winner = require('./winner')(sequelize, DataTypes);
const Message = require('./message')(sequelize, DataTypes);
const ReactionStat = require('./reactionStat')(sequelize, DataTypes);
const ShareStat = require('./shareStat')(sequelize, DataTypes);

// Associations
User.hasMany(RoomParticipant, { foreignKey: 'userId' });
RoomParticipant.belongsTo(User, { foreignKey: 'userId' });

Room.hasMany(RoomParticipant, { foreignKey: 'roomId' });
RoomParticipant.belongsTo(Room, { foreignKey: 'roomId' });

Room.hasMany(Winner, { foreignKey: 'roomId' });
Winner.belongsTo(Room, { foreignKey: 'roomId' });
User.hasMany(Winner, { foreignKey: 'userId' });
Winner.belongsTo(User, { foreignKey: 'userId' });

Room.hasMany(Message, { foreignKey: 'roomId' });
Message.belongsTo(Room, { foreignKey: 'roomId' });
User.hasMany(Message, { foreignKey: 'userId' });
Message.belongsTo(User, { foreignKey: 'userId' });

Room.hasMany(ReactionStat, { foreignKey: 'roomId' });
ReactionStat.belongsTo(Room, { foreignKey: 'roomId' });

Room.hasMany(ShareStat, { foreignKey: 'roomId' });
ShareStat.belongsTo(Room, { foreignKey: 'roomId' });
ShareStat.belongsTo(Winner, { foreignKey: 'winnerId' });

module.exports = {
  sequelize,
  User, Room, RoomParticipant, Winner, Message, ReactionStat, ShareStat
};
