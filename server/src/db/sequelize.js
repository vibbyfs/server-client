const { Sequelize } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config.dbUrl, {
  dialect: 'postgres',
  logging: false
});

module.exports = { sequelize };
