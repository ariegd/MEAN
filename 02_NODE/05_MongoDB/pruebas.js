//npm install mongodb
const mongodb = require("mongodb")

const url = "mongodb://localhost:27017"


/////////////////////
// MONGO DB CLIENT //
/////////////////////

//Funciones asíncronas:
//-mongoClient.connect
//-dbs.close
//-collection.insert
//-collection.insertOne
//-collection.findOne
//-cursor.toArray

//Funciones síncronas:
//-dbs.db("nombre_esquema")
//-db.collection("nombre_coleccion")
//-collection.find() 

//////////////////////////////////
//Obtener una conexión a MongoDB//
//////////////////////////////////

//
//mongodb://<ip>:<puerto>[/esquema]
//

//1-Conectar
//2-Insertar un disco
//3-Listar los discos
//4-Desconectar

//Creamos el objeto 'MongoClient'
const client = new mongodb.MongoClient(url)

let coleccion
let dbs

client.connect()
    .then( _dbs => {
        dbs = _dbs
        let esquema = dbs.db("esquema-discos")
        coleccion = esquema.collection("discos")
        
        /////////////
        //insertOne//
        /////////////
        let disco = {
            //_id : "TOCOTO",
            titulo : "Leftoverture",
            grupo  : "Kansas",
            year   : 1978,
            discografica : "NPI"
        }  
        return coleccion.insertOne(disco)   
    })
    .then( resultado => {
        console.log("Resultado de la inserción:", resultado)
        
        //return coleccion.find().toArray()

        let cursor = coleccion.find() //Esto es síncrono y devuelve un cursor
        //toArray (o cualquier otro modo de recorrer el cursor) es asóincrono
        return cursor.toArray()

    })
    .then( discos => {
        console.log(discos)
        return dbs.close()
    })
    .then( () => {
        console.log("Desconectado")
    })    
    .catch(error => console.log(error))


