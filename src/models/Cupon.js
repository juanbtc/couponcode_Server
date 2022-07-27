const { DataTypes } = require('sequelize')
const sequelize = require('../db/database');

const Producto = sequelize.define('Producto', {
  title: {type: DataTypes.STRING,allowNull: false},
  url: {type: DataTypes.STRING,allowNull: false},
  tipo: {type: DataTypes.STRING}
}, {
    underscored: true,
});
module.exports = Producto