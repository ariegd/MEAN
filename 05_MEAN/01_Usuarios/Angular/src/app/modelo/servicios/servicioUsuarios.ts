import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "../entidades/usuario";
import { configuracion } from "../../util/configuracion";
import { ServicioAutenticacion } from "./servicioAutenticacion";

@Injectable({
    providedIn : "root"
})
export class ServicioUsuarios {

    constructor(
        private httpClient:HttpClient,
        private servicioAutenticacion:ServicioAutenticacion){
    }

    public comprobarLogin(login:string):Observable<any> {
        return this.httpClient.head(configuracion.urlServicio+"/usuarios?login="+login)
    }

    public insertarUsuario(usuario:Usuario):Observable<any>{
        return this.httpClient.post(configuracion.urlServicio+"/usuarios", usuario)
    }

    public modificarUsuario(usuario:Usuario):Observable<any>{
        return this.httpClient.put(
            configuracion.urlServicio+"/seguro/usuarios/"+usuario._id, 
            usuario,
            { headers : { Authorization : "Bearer "+this.servicioAutenticacion.getJWT() } }       
        )
    }

    //borrarUsuario

}
