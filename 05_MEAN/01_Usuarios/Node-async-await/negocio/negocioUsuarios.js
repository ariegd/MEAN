const ObjectId = require("mongodb").ObjectId
const mongodbUtil = require('../util/mongodbUtil')
const crearError = require("../util/errorUtil").crearError

exports.buscarPorLogin = async function(login){
    try {
        return await mongodbUtil.esquema.collection("usuarios").findOne({ login : login })
    } catch (error) {
        console.log(error)
        throw crearError(500, "Error con la base de datos")
    }
}

exports.insertarUsuario = async function(usuario){
    try {
        //Validar los datos    
        if(!usuario.login   || usuario.login.trim()   == "" || 
           !usuario.correoE || usuario.correoE.trim() == "" || 
           !usuario.nombre  || usuario.nombre.trim()  == "" ){
            throw crearError(400)
        }
        
        //Comprobar que el login no está repetido
        let usuarioEncontrado = await exports.buscarPorLogin(usuario.login)
        if(usuarioEncontrado){
            throw crearError(400, "Ya existe el login") 
        }

        //Le asignamos el rol al usuario
        usuario.rol = "CLIENTE"
        
        //QUITAR EL _ID
        delete usuario._id
        //calcular el hash del password y guardar el hash
        //insertar el usuario
        return await mongodbUtil.esquema.collection("usuarios").insertOne(usuario)
    } catch ( error ){
        if(error.codigo){
            throw error
        }
        console.log(error)
        throw crearError(500, "Error con la base de datos")
    }
}

//Autenticación: si
//Autorización :
//-empleados: pueden modificar cualquier usuario
//-clientes : solo pueden modificarse a si mismos
exports.modificarUsuario = async function(usuario){
    
    //Validación
    if(!usuario.login     || usuario.login.trim()     == "" || 
       !usuario.correoE   || usuario.correoE.trim()   == "" || 
       !usuario.nombre    || usuario.nombre.trim()    == "" ||
       !usuario.direccion || usuario.direccion.trim() == "" ||
       !usuario.telefono  || usuario.telefono.trim()  == "" ){
        throw crearError(400) 
    }     
                    
    //Autorización 
    /*
    if(autoridad.rol=="CLIENTE" && autoridad._id!=usuario._id){                        
        reject( { codigo:403, 
                    mensaje:'Los clientes solo pueden modificarse a si mismos' } ) //Mal
        return
    }
    */
    
    try {
        //Modificar 
        let resultado = await mongodbUtil.esquema.collection("usuarios").findOneAndUpdate( 
                //{ _id : new ObjectId(usuario._id) },
                { _id : ObjectId.createFromHexString(usuario._id) },
                {
                    $set : {
                        //Aqui no podemos colocar el _id (es inmutable)
                        nombre    : usuario.nombre,
                        correoE   : usuario.correoE,
                        telefono  : usuario.telefono,
                        direccion : usuario.direccion
                    }
                }
            ) 
        if(!resultado){
            throw crearError(404, "El usuario no existe")
        }
    } catch ( error ) {
        if(error.codigo){
            throw error
        }
        console.log(error)
        throw crearError(500, "Error con la base de datos")
    }

}
