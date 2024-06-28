const http = require("http")
const express = require("express")

arrancarServidor()

function arrancarServidor(){

    console.log("Arrancando el servidor HTTP")
    
    let app = express()

    //Cadena de interceptores
    app.use(interceptorLog)
    app.use(interceptorCORS)
    app.use(interceptorAutenticacion)

    //En el api de Express ya vienen algunos interceptores de regalo
    app.use(express.json({
        limit: '5mb' //Tamaño máximo del body que estamos dispuestos a leer. IMPRESCINDIBLE
    }))

    //Este interceptor tambien viene de regalo
    //Está programado para que de igual si está delante o detrás de la definición del api
    app.use(express.static("./recursos"))    
    
    app.get("/discos", listar)
    app.get("/discos/:id", buscarPorId)
    app.post("/discos", insertar)
    app.patch("/discos/:id", modificar)
    app.delete("/discos/:id", borrar)    

    app.listen(6001, function(){
        console.log("Esperando peticiones en el puerto 6001")
    })

}

//////////////////////////////////////////////////////////////////
//MIDDLEWARE. Funciones interceptoras/////////////////////////////
//////////////////////////////////////////////////////////////////

function interceptorLog(request, response, next){
    console.log("=================================================")
    console.log(`Peticion ${request.method} ${request.url} recibidia. ${new Date()}`)
    //...
    next()
}

function interceptorCORS(request, response, next){
    console.log("-------------------------------------------------")
    console.log(`Añadiendo las cabeceras content-policy`)
    response.setHeader("Access-Control-Allow-Origin", "*")
    response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")  
    //Si la petición es un options no tiene sentido que la petición continúe
    //Si un middleware no invoca 'next()' deberá dar él la respuesta
    if(request.method == "OPTIONS"){
        response.end()
        return
    }    
    next()
}

function interceptorAutenticacion(request, response, next){
    console.log("-------------------------------------------------")
    console.log(`Comprobando que la petición es de un usuario autenticado`)
    //Si un interceptor decide no invocar 'next' deberá proporcionar una respuesta
    next()
    //Si un interceptor decide no invocar next deberá ejecutar response.end()
    //response.end("401 Unauthorized")
}

//////////////////////////////////////////////////////////////////
//FUNCIONES CON LA LÓGICA DE CONTROL//////////////////////////////
//////////////////////////////////////////////////////////////////

function listar(request, response){
    console.log("listando...")
    response.json([{ id:1, titulo:"TDSOTM", grupo:"Pink Floyd"},{ id:2, titulo:"IV", grupo:"Led Zeppelin"},{ id:3, titulo:"For those about to rock", grupo:"AC/DC"}])
}

function buscarPorId(request, response){ 
    let id = request.params.id   
    console.log("buscando un disco por el id:"+id)
    response.json({ id:id, titulo:"IV", grupo:"Led Zeppelin"})
}

function insertar(request, response){
    console.log("Insertando...")
    response.status(201).json({ codigo:201, mensaje:"Disco insertado"} )
}

function modificar(request, response){
    console.log("Modificando...")
    response.json({ codigo:200, mensaje:"Disco modificado"} )
}

function borrar(request, response){
    console.log("Borrando...")
    response.json({ codigo:200, mensaje:"Disco eliminado"} )    
}

