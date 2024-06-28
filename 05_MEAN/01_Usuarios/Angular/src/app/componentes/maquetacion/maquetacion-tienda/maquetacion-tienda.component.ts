import { Component } from '@angular/core';
import { MenuComponent } from '../../tienda/menu/menu.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-maquetacion-tienda',
  standalone: true,
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './maquetacion-tienda.component.html'
})
export class MaquetacionTiendaComponent {

  constructor(private router:Router){

    //Es este componente el que deide que se verá nada más entrar a la tienda
    router.navigateByUrl("/tienda/perfil")

  }

}
