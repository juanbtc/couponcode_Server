const { Sequelize } = require('sequelize');
const configdb = require('../../config/config.json')

//const branch = 'development'
const branch = 'test'

const sequelize = new Sequelize(
    configdb[branch].database,
    configdb[branch].username,
    configdb[branch].password,
    configdb[branch]
);
module.exports = sequelize;