const {Router,Request,Response,NextFunction} = require('express')
const { expressjwt: jwt } = require("express-jwt");
const Usuario = require('../models/Usuario')

const usuariosController = Router()

const secreto = process.env.SECRET_KEY||'fasgsdgh'
/**Obtiene el usuario del token*/
const validarJWT = jwt({secret : secreto,algorithms:["HS256"]})

usuariosController.post('/usuarios',(req,res)=>{})
usuariosController.get('/usuarios',validarJWT,async (req,res)=>{
    const user=req.auth.usuario
    console.log('authenticado_ ',req.query.estof);
    const s = Number(req.query.size)
    const p = Number(req.query.page)
    console.log('s: ',s,'p: ',p);
    
    try {
        if(!Number.isNaN(s)&&!Number.isNaN(p)){
            const u = await Usuario.findAndCountAll({
                limit:s,
                offset:s * p
            })
            if(!u) return res.status(403).send('no autorizado')
            u.page=p
            u.size=s
            res.status(200).send({users:u})
        }else{
            const u= await Usuario.findAndCountAll()
            res.status(200).send({users:u,msg:'sin paginacion'})
        }
    } catch (error) {
        res.status(401).send(error.message)
    }
    
})
usuariosController.get('/usuarios/:id',async(req,res)=>{
    const user=req.auth.usuario
    console.log('auth: ',req.auth);
    
    try {
        const u= await Usuario.findByPk(req.params.id)
        //console.log('u: ',u);
        
        if(!u) return res.status(403).send('no autorizado')
        res.status(200).send({user:u.usuarioDTO})
    } catch (error) {
        res.status(401).send(error.message)
    }
})
//rutas.put('/usuarios/:id',(req:Request,res:Response,next:NextFunction)=>{})
//rutas.delete('/usuarios/:id',(req:Request,res:Response,next:NextFunction)=>{})

module.exports = usuariosController;