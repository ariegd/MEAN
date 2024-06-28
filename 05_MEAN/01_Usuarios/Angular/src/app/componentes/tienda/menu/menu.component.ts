import { Component } from '@angular/core';
import { ServicioAutenticacion } from '../../../modelo/servicios/servicioAutenticacion';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.component.html'
})
export class MenuComponent {

  public nombre:string

  constructor(
      private servicioAutenticacion:ServicioAutenticacion,
      private router:Router
    ){
    //let usuario:Usuario = servicioAutenticacion.getUsuario()
    //this.nombre = usuario.nombre
    this.nombre = servicioAutenticacion.getUsuario().nombre
  }

  public logout():void{
    this.servicioAutenticacion.logout()
    this.router.navigateByUrl("/")
  }

}
