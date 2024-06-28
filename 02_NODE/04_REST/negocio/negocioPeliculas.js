const mongodbUtil = require("../util/mongodbUtil")

exports.listarPeliculas = function(criterioBusqueda){
    let coleccion = mongodbUtil.esquema.collection("peliculas")
    return coleccion.find(criterioBusqueda).toArray()
}

exports.insertarPelicula = function(pelicula){

    return new Promise(function(resolve, reject){

        //Eliminamos la propiedad _id para que no se pueda decidir el valor desde el exterior
        delete pelicula._id

        if(!pelicula.titulo || pelicula.titulo.trim().length == 0){
            reject({
                codigo : "400",
                mensaje: "El título es obligatorio"
            })
            return
        }

        mongodbUtil.esquema.collection("peliculas").insertOne(pelicula)
        .then( resultado => {
            console.log(resultado)
            resolve()
        })
        .catch(error => {
            console.log(error)
            reject({
                codigo: "500",
                mensaje: "Error con la bb.dd. al insertar la pelicula"
            })
        })
    })
}



