const { DataTypes } = require('sequelize')
const sequelize = require('../db/database');

const Usuario = sequelize.define('Usuario', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
  }
}, {
  // Other model options go here
});
module.exports = Usuario