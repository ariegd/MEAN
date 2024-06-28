const http = require("http")
const mongodbUtil = require("./util/mongodbUtil")

const endpointPeliculas = require("./endpoints/endpointPeliculas")

mongodbUtil.conectar()

http.createServer(procesarPeticion).listen(3000, function(){
    console.log("Esperando peticiones en el puerto 3000")
})

function procesarPeticion(request, response){

    console.log("======================================")
    let metodo = request.method
    let ruta = request.url
    console.log(`Petición recibida: ${metodo} ${ruta}`)

    if(metodo=="GET" && ruta=="/peliculas"){
        endpointPeliculas.listarPeliculas(request, response)
    } else if(metodo=="POST" && ruta=="/peliculas"){
        endpointPeliculas.insertarPelicula(request, response)
    } else {
        response.statusCode = 404
        response.end()
    }
}