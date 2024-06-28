/*
METODO    URL             ACCION    BODY_P     RESPUESTA
-----------------------------------------------------------
POST      /peliculas      insertar  {pelicula}
PUT       /peliculas/:id  modificar {pelicula} 
DELETE    /peliculas/:id  borrar    - 
GET       /peliculas/:id  buscar    -          {pelicula}
GET       /peliculas      listar    -          [{pelicula}]

METODO    URL           ACCION    BODY_P     RESPUESTA
-----------------------------------------------------------
POST      /actores      insertar  {actor}
PUT       /actores/:id  modificar {actor} 
DELETE    /actores/:id  borrar    - 
GET       /actores/:id  buscar    -          {actor}
GET       /actores      listar    -          [{actor}]


listar los actores de una pelicula
GET /peliculas/{id}/actores

listar las peliculas de un actor
GET /actores/{id}/peliculas

asignar un actor a una película
POST /peliculas/{id}/actores

dame las películas de 1984
GET /peliculas?year=1984

(otra forma) listar los actores de una película
GET /actores?idPelicula={id}
*/

////////////////////////////////////////
// FUNCIONES CON LA LÓGICA DE CONTROL //
////////////////////////////////////////

/*
Las tareas de la lógica de control en un servicio son las siguientes:

- Extraer de la petición los valores necesarios
    -query parameters
    -parámetros interpolados en la ruta
    -contenido del body
    -valores en los headers
    -cualquier combinación de los anteriores

- Adaptar esos valores a las necesidades de la lógica de negocio

- Invocar la función con la lógica de negocio
    -Solo una!!!

- Componer y entregar la respuesta con el resultado de la ejecución
  de la lógica de negocio

Tareas que NO debe ejecutar la lógica de control:

- Lógica de negocio
- Consultas a la BB.DD.

-Y YA!
*/

//GET /peliculas
//
//200 OK
//Content-Type: application/json
//-------------------------
//[{pelicula}]

const negocioPeliculas = require("../negocio/negocioPeliculas")

exports.listarPeliculas = function(request, response){
  //recoger de la petición el criterio de búsqueda
  let criterio = {}
  negocioPeliculas.listarPeliculas(criterio)
    .then(peliculas => {
		response.setHeader('Content-Type', 'application/json')
		response.end(JSON.stringify(peliculas))
    })
    .catch(error => {
		console.log(error)
		response.statusCode = 500
		response.end("Error al listar las películas")
    })
}


//POST /peliculas
//-------------------------
//
exports.insertarPelicula = function(request, response){

	request.on('data', function(body){
		let pelicula = JSON.parse(body)

		negocioPeliculas.insertarPelicula(pelicula)
		.then( resultado => {
			response.statusCode = 201
			response.end()
		})
		.catch(error => {
			console.log(error)
			response.statusCode = error.codigo
			response.end(error.mensaje)    
		})  
	})

}


/*
//Esta es otra manera de hacerlo, perfectamente válida

exports.endpointPeliculas = new EndpointPeliculas()

class EndpointPeliculas {

  listarPeliculas(request, response){

  }

  insertarPelicula(request, response){
    
  }

}
*/




/*

<clientes>
  <cliente id="1">
    <nombre>aaa</nombre>
    <direccion>bbb</direccion>
    <telefono>ccc</telefono>
  </cliente>
  <cliente id="2">
    <nombre>qwe</nombre>
    <direccion>rty</direccion>
    <telefono>uio</telefono>
  </cliente>
  <cliente id="3">
    <nombre>qqq</nombre>
    <direccion>www</direccion>
    <telefono>eee</telefono>
  </cliente>
</clientes>


[
  {
    "nombre"    : "",
    "direccion" : "",
    "telefono"  : "",
  },
  {
    "nombre"    : "",
    "direccion" : "",
    "telefono"  : "",
  },
  {
    "nombre"    : "",
    "direccion" : "",
    "telefono"  : "",
  }
]

*/