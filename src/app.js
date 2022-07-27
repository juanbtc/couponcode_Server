const express = require('express')
const Usuario = require('../src/models/Usuario')
const usuariosController = require('./controllers/UsuariosController')
const sequelize = require('./db/database');


const app = express()

async function algo(){
    await sequelize.sync({ force: true })
}
//algo()

app.use(express.json())

app.get('/test',async(req,res)=>{
    console.log('test prueba');
    //const u = new Usuario({firstName:'luis',lastName:'algo'});
    //const jane = await Usuario.create({ firstName: "Jane", lastName: "Doe" });
    const todos = await Usuario.findAll()

    //const jane = 'fgasg'
    //console.log('u: ',jane);
    res.status(200).send({'user':todos})
})
app.listen(3000, () => {
    console.log('iniciado');
})
