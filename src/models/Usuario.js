const { DataTypes } = require('sequelize')
const sequelize = require('../db/database');

const Usuario = sequelize.define('Usuario', {
  name: {type: DataTypes.STRING,allowNull: false},
  last_name: {type: DataTypes.STRING,allowNull: false},
  email: {type: DataTypes.STRING},
  password: {type: DataTypes.STRING}
}, {
    underscored: true,
});
Usuario.prototype.usuarioDTO = (t)=>{
    return {'id':t.id,'name':t.name,last_name:t.last_name,email:t.email};
}
module.exports = Usuario