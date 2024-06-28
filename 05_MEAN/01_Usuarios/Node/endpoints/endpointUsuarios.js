const negocioUsuarios = require("../negocio/negocioUsuarios")
//const express = require("express")
//let router = express.Router()
//router.get('/usuarios', ...)
const router = require("express").Router()

router.post('/usuarios', insertarUsuario)
router.put('/usuarios/:id', modificarUsuario)
router.delete('/usuarios/:id', bajaUsuario)
router.head('/usuarios',comprobarLoginUsuario)

exports.router = router

///////////////////////////////////////
// FUNCIONES DE LA LÓGICA DE CONTROL //
///////////////////////////////////////

/*
POST /usuarios
Content-type: application/json
------------------------------
{ usuario }
*/
function insertarUsuario(request, response){
    let usuario = request.body

    negocioUsuarios.insertarUsuario(usuario)
    .then( resultado => {
        response
            .status(201)
            .json(resultado)
    } )
    .catch( error => {
        console.log(error)
        response
            .status(error.codigo)
            .json(error)        
    })
}

//PUT /usuarios/87
//CT: app/json
//----------------
//{
//  _id       : 101,
//  nombre    : "Bartolo"
//  direccion : ...
//}
function modificarUsuario(request, response){

    let idUsuario = request.params.id
    let usuario = request.body
    if( usuario._id != idUsuario ){
        response.status(400).json("Qué cojones estás haciendo con los ids")
        return
    }

    negocioUsuarios.modificarUsuario(usuario)
    .then( () => {
        response.json({ mensaje : "El usuario se modificó correctamente" })
    })
    .catch( error => {
        console.log(error)
        response
            .status(error.codigo)
            .json(error)        
    })    

}

function bajaUsuario(request, response){

}

//HEAD /usuarios?login=xXx
function comprobarLoginUsuario(request, response){

    let login = request.query.login
    if(!login){
        response.status(400).end("Falta el login")
        return
    }

    negocioUsuarios.buscarPorLogin(login)
    .then( usuario => {
        if(usuario){
            response.json() //Es un head, no pondremos nada en el body
        } else {
            response
            .status(404)
            .json({ codigo:404, mensaje: "No existe un usuario con ese login"})            
        }            
    })
    .catch(error => {
        console.log(error)
        response
            .status(error.codigo)
            .json(error)
    })

}


