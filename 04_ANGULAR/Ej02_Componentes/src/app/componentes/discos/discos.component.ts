import { Component } from '@angular/core';
import { Disco } from '../../modelo/entidades/disco';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-discos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './discos.component.html'
})
export class DiscosComponent {

  public disco:Disco = new Disco()
  public discos:Disco[] = []

  public insertar():void{
  }

  public modificar():void{
  }

  public borrar():void{
  }

  public vaciarFormulario():void{
    this.disco = new Disco()
  }

}
