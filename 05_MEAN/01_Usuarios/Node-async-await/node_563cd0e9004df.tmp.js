require("./util/configuracion")
const express = require('express')
const https = require('https')
const mongodbUtil = require('./util/mongodbUtil')
const interceptorCORS = require('./middleware/interceptorCORS').interceptorCORS
const interceptorLog = require('./middleware/interceptorLog').interceptorLog
const interceptorJWT = require('./autenticacion/interceptorJWT').interceptorJWT
const usuariosRouter = require('./endpoints/endpointUsuarios').router
const autenticacionRouter = require('./autenticacion/loginRouter').router
const getCertificado = require('./util/certUtil').getCertificado

mongodbUtil.conectar()
    .then(() => {
        arrancarServidor()
    })
    .catch( error => {
        console.log(error)
        console.log("No se pudo conectar a la bb.dd")
    })

function arrancarServidor(){
    let app = express()

    //Middleware
    app.use(interceptorCORS)
    app.use(interceptorLog)
    app.use(interceptorJWT)
    app.use(express.json({
        limit: '5mb' //Tamaño máximo del body que estamos dispuestos a leer. IMPRESCINDIBLE
    }))
    
    //Routers
    app.use(autenticacionRouter)
    app.use(usuariosRouter)

    app.disable("x-powered-by")

    let puerto = process.env["http.puerto"]
    //
    //https.createServer( {
    //      cert: lkdgkjfdhgkjfdshgkjf,
    //      key : iujedhudsguyfedguyed
    //    }, app)
    //
    https.createServer(getCertificado(),app)
        .listen(
                puerto, 
                () => console.log("Esperando peticiones https en el puerto "+puerto)
            )
}










