const {Router,Request,Response,NextFunction} = require('express');
const bcryptjs = require('bcryptjs');
const jjwt = require('jsonwebtoken');
const {expressjwt} = require('express-jwt');

const { UsuarioDTO } = require('../models/Usuario');
const Usuario = require('../models/Usuario');


const rutas = Router()



const validatePassword = async (pass,cpass) => {
    return await bcryptjs.compareSync(pass,cpass)
}
const secreto = process.env.SECRET_KEY||'fasgsdgh'
const firmarToken = (usuario) => jjwt.sign({usuario},secreto,{expiresIn:60*60*24})
export const validarJWT = expressjwt({secret : secreto,algorithms:["HS256"]})
const findAndAssignUser = async (req,res,next)=>{
    try {        
        console.log('asasf: auth',req.auth);

        //const user = await Usuario.findByPk(req.auth._id)
        
        //if(!user) return res.status(401).end()
        //req.user = user
        next()
    } catch (e) {
        next(e)
    }
}
//const isAuthenticated = rutas.use(validarJWT,findAndAssignUser)

rutas.post('/register',async (req,res)=>{
    const body = req.body
    //console.log(body);
    try {
        const isUser = await Usuario.findOne({where:{email: body.email}})
        if(isUser) return res.status(403).send('usuario ya existe')
        
        const salt = await bcryptjs.genSaltSync()
        const hashed = await bcryptjs.hashSync(body.password,salt)

        const user = await Usuario.create({...body,password:hashed})
        /*const user:Usuario = await Usuario.create({
                name:body.name,
                lastname:body.lastname,
                email:body.email,
                password:hashed
            })*///new User()+.save()
        //const user:IUser = new User({email:body.email,password:hashed, salt});
        //const u:IUser = await user.save()

        //const firmado = jjwt.sign({_id:user._id},sc)
        const firmado = firmarToken(user.usuarioDTO)

        //const u:UsuarioDTO = {name:user.name,lastname:user.lastname,email:user.email}
        
        res.status(201).send({
            new_user:user.usuarioDTO,
            token:firmado
        })

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message)        
    }
})

rutas.post('/login',async (req,res)=>{
    const {body} = req
    console.log('body : ',body);
    
    try {
        console.log('req: ',body);
        
        const user = await Usuario.findOne({where:{email:body.email}})
        
        if(!user) res.status(403).send('usuario no existe')
        else{
            const isMatch = await validatePassword(body.password,user.password)
            if(isMatch){
                const firmado = firmarToken(user.usuarioDTO)
                res.status(200).send({'token':firmado})
            } else {
                res.status(403).send({'error':'usuario y/o contraseña invalida'})
            }
        }
    } catch (error) {
        console.log('hubo un error: ',error);
        res.status(500).send(error.message)
    }
})

module.exports = rutas;