const express = require('express')
const {AuthController} = require('./controllers/AuthController')
const usuariosController = require('./controllers/UsuariosController')
const sequelize = require('./db/database');
const cors = require('cors')


const app = express()

app.use(express.json())
app.use(cors())
app.use(usuariosController)
app.use(AuthController)

async function algo(){
    await sequelize.sync({ force: true })
}
//algo()



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
    console.log('iniciado en puerto 3000');
})
