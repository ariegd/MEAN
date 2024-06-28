import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Disco } from './entidades/app.entidades.disco';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  public mensaje:string = "Hola que tal"
  public numero1:number = 10
  public numero2:number = 20  

  //Con bidirectional binding podremos asociar el 'value' de un elemento de la vista con 
  //una propiedad del componente
  //public titulo:string   = ""  
  //public director:string = ""
  //public year:number     = 0
  //Mucho mejor con un objeto del tipo película:
  public disco:Disco = new Disco()
  public discos:Disco[] = []

  public insertarDisco():void{
    this.discos.push(this.disco)
    //this.disco = new Disco()
    this.vaciarFormulario()
  }
  
  public vaciarFormulario():void{
    console.log("Vaciar formulario")
    //this.disco.vaciar()
    this.disco = new Disco()
  }  

  public seleccionarDisco(disco:Disco):void{
    //No hace falta buscar el disco en el array
    //porque ya nos lo han dado!!!
    //El objeto que hemos recibido es EXACTAMETE el que está en el array
    /*
    let discoEncontrado:Disco|undefined = this.discos.find(function(e){
      return e.titulo == disco.titulo
    })
    if(discoEncontrado){
      this.disco = discoEncontrado
    }
    */
    this.disco = disco
  }

}
 